import { Client, isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { cache } from "react";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Types for our Notion database entries
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  categories: string[];
  content: string;
  status: string;
  /** Proxy path (file covers) or direct URL (external covers). */
  coverImage?: string;
  description?: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  url?: string;
  dateFinished: string;
  rating?: number;
  notes: string;
  isPublic: boolean;
};

/** Join every rich-text fragment, not just [0]. */
function richText(prop: unknown): string {
  const p = prop as { rich_text?: Array<{ plain_text: string }> } | undefined;
  if (!p?.rich_text) return "";
  return p.rich_text.map((t) => t.plain_text).join("");
}

function titleText(prop: unknown): string {
  const p = prop as { title?: Array<{ plain_text: string }> } | undefined;
  if (!p?.title) return "";
  return p.title.map((t) => t.plain_text).join("");
}

/**
 * Cover URL for a page: external covers are permanent — use them directly;
 * file covers are expiring S3 URLs — route through the image proxy.
 */
function coverFor(page: PageObjectResponse): string | undefined {
  const cover = page.cover;
  if (!cover) return undefined;
  if (cover.type === "external") return cover.external.url;
  return `/api/notion-image/${page.id}`;
}

/**
 * Typed parse boundary. Returns null (and logs) for rows that would otherwise
 * crash the whole index — a renamed property or an empty slug must cost us one
 * row, not the site, the feed, and the build.
 */
function parsePostPage(page: unknown): BlogPost | null {
  if (!isFullPage(page as Parameters<typeof isFullPage>[0])) return null;
  const pageObj = page as PageObjectResponse;
  const props = pageObj.properties as Record<string, unknown>;

  const title = titleText(props.Title);
  const slug = richText(props.Slug).trim();
  const dateProp = props.Date as { date?: { start?: string } } | undefined;
  const date = dateProp?.date?.start ?? "";
  const statusProp = props.Status as
    | { status?: { name?: string }; select?: { name?: string } }
    | undefined;
  const status = statusProp?.status?.name ?? statusProp?.select?.name ?? "Unknown";
  const categoriesProp = props.Categories as
    | { multi_select?: Array<{ name: string }> }
    | undefined;

  if (!title || !slug || !date) {
    console.warn(
      `Skipping malformed Notion post row ${pageObj.id} (title="${title}", slug="${slug}", date="${date}")`
    );
    return null;
  }

  return {
    id: pageObj.id,
    title,
    slug,
    date,
    categories: categoriesProp?.multi_select?.map((c) => c.name) ?? [],
    content: "", // fetched separately when needed
    status,
    coverImage: coverFor(pageObj),
    description: richText(props.Description) || undefined,
  };
}

/**
 * Gets all published blog posts. Paginated (Notion caps responses at 100).
 * Throws on API failure: at build time that fails the build loudly; during ISR
 * regeneration Next retains the last good page.
 */
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID as string;

  const posts: BlogPost[] = [];
  let cursor: string | undefined = undefined;
  do {
    const response = await notion.databases.query({
      database_id: blogDatabaseId,
      start_cursor: cursor,
      filter: {
        property: "Status",
        status: { equals: "Done" },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    });
    for (const page of response.results) {
      const post = parsePostPage(page);
      if (post) posts.push(post);
    }
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) {
      console.warn(`Duplicate slug "${post.slug}" in Notion — later post ${post.id} is shadowed`);
    }
    seen.add(post.slug);
  }

  return posts;
});

/**
 * Published page-ID set for image-proxy authorization. Module-scope cache with
 * TTL + single-flight refresh so the hero of a just-published post doesn't 404
 * until the TTL lapses.
 */
const PUBLISHED_SET_TTL_MS = 5 * 60 * 1000;
let publishedSet: { ids: Set<string>; fetchedAt: number } | null = null;
let publishedSetInflight: Promise<Set<string>> | null = null;

function normalizeId(id: string): string {
  return id.replace(/-/g, "").toLowerCase();
}

async function fetchPublishedIds(): Promise<Set<string>> {
  const posts = await getAllPosts();
  return new Set(posts.map((p) => normalizeId(p.id)));
}

export async function isPublishedPageId(pageId: string): Promise<boolean> {
  const id = normalizeId(pageId);
  const now = Date.now();
  if (publishedSet && now - publishedSet.fetchedAt < PUBLISHED_SET_TTL_MS) {
    if (publishedSet.ids.has(id)) return true;
  }
  // Miss or stale: single-flight refresh before saying no.
  if (!publishedSetInflight) {
    publishedSetInflight = fetchPublishedIds()
      .then((ids) => {
        publishedSet = { ids, fetchedAt: Date.now() };
        return ids;
      })
      .finally(() => {
        publishedSetInflight = null;
      });
  }
  try {
    const ids = await publishedSetInflight;
    return ids.has(id);
  } catch {
    // Refresh failed — fall back to any cached set rather than 404ing valid images.
    return publishedSet?.ids.has(id) ?? false;
  }
}

/**
 * Converts a page's blocks to sanitized HTML. A fresh NotionToMarkdown per call
 * so the image transformer's pageId closure can't race concurrent conversions.
 * File-type images are rewritten to stable proxy URLs at the only point where
 * the block ID is available (post-hoc regex on the HTML cannot recover it).
 */
export async function notionBlocksToHtml(pageId: string): Promise<string> {
  const n2m = new NotionToMarkdown({ notionClient: notion });

  n2m.setCustomTransformer("image", async (block) => {
    const image = (block as { image?: { type: string; external?: { url: string }; file?: { url: string }; caption?: Array<{ plain_text: string }> } }).image;
    if (!image) return "";
    const caption = image.caption?.map((c) => c.plain_text).join("") ?? "";
    if (image.type === "external" && image.external) {
      // External images never expire — pass through untouched.
      return `![${caption}](${image.external.url})`;
    }
    return `![${caption}](/api/notion-image/${pageId}/${block.id})`;
  });

  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);

  // remark-html's sanitizer stays ON (default) — it is the XSS boundary in
  // front of dangerouslySetInnerHTML. Never pass `sanitize: false`.
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(mdString.parent);

  // Body images stay unoptimized by design; at least load them lazily.
  return processedContent.toString().replace(/<img /g, '<img loading="lazy" ');
}

/**
 * Gets a published post by slug. Contract:
 *  - no matching published row → null (page calls notFound())
 *  - Notion/API/conversion failure → throws (reaches error.tsx / retains ISR page)
 */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID as string;

  const response = await notion.databases.query({
    database_id: blogDatabaseId,
    filter: {
      and: [
        { property: "Slug", rich_text: { equals: slug } },
        { property: "Status", status: { equals: "Done" } },
      ],
    },
  });

  const post = response.results.map(parsePostPage).find((p): p is BlogPost => p !== null);
  if (!post) return null;

  post.content = await notionBlocksToHtml(post.id);
  return post;
});

/**
 * Gets all public books.
 */
export async function getAllBooks(): Promise<Book[]> {
  const booksDatabaseId = process.env.NOTION_BOOKS_DATABASE_ID as string;

  try {
    const response = await notion.databases.query({
      database_id: booksDatabaseId,
      filter: {
        property: "Public",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Date Finished", direction: "descending" }],
    });

    return response.results.filter(isFullPage).map((pageObj) => {
      const props = pageObj.properties as Record<string, unknown>;
      const urlProp = props.Url as { url?: string } | undefined;
      const dateProp = props["Date Finished"] as { date?: { start?: string } } | undefined;
      const ratingProp = props.Rating as { number?: number } | undefined;
      const publicProp = props.Public as { checkbox?: boolean } | undefined;
      return {
        id: pageObj.id,
        title: titleText(props.Title) || "Untitled",
        author: richText(props.Author),
        url: urlProp?.url ?? "",
        dateFinished: dateProp?.date?.start ?? "",
        rating: ratingProp?.number,
        notes: richText(props.Notes),
        isPublic: publicProp?.checkbox ?? false,
      };
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

// (Thoughts page removed 2026-07 — getThoughtsPage and its block parsing were
// deleted with it; see git history if the section ever returns.)
