import { getAllPosts } from "@/lib/notion";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

// Cached like the writing index; without an explicit revalidate a GET handler
// returning Response is cached indefinitely in Next 14. (Deliberately no
// Request argument — reading it would opt this route out of caching.)
export const revalidate = process.env.REVALIDATION_TIME_BLOG
  ? parseInt(process.env.REVALIDATION_TIME_BLOG)
  : 3600;

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Build-time Notion failures throw (fail loud) — a caught 503 would be baked
// into the cache and served for the whole revalidation window.
export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/writing/${encodeURIComponent(post.slug)}`;
      const pubDate = new Date(post.date);
      return [
        "    <item>",
        `      <title>${xmlEscape(post.title)}</title>`,
        `      <link>${xmlEscape(url)}</link>`,
        `      <guid isPermaLink="false">${xmlEscape(post.id)}</guid>`,
        ...(isNaN(pubDate.getTime()) ? [] : [`      <pubDate>${pubDate.toUTCString()}</pubDate>`]),
        ...(post.description ? [`      <description>${xmlEscape(post.description)}</description>`] : []),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${xmlEscape(SITE_TAGLINE)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
