import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";
import { isPublishedPageId } from "@/lib/notion";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Notion-hosted (S3-signed) image URLs expire after ~1 hour, so pages reference
// this stable proxy instead: /api/notion-image/{pageId} streams a page cover,
// /api/notion-image/{pageId}/{blockId} streams an in-post image block.
// Authorization: pageId must belong to a published post (the unguessable block
// UUID is the capability for the block fetch). external-type images are never
// proxied — callers use their permanent URLs directly.

const FETCH_TIMEOUT_MS = 10_000;
const MAX_BYTES = 15 * 1024 * 1024;

const OK_CACHE =
  "public, max-age=300, s-maxage=3000, stale-while-revalidate=86400, stale-if-error=86400";
const ERR_CACHE = "no-store";

function errorResponse(status: number, retryAfter?: string | null) {
  const headers: Record<string, string> = { "Cache-Control": ERR_CACHE };
  if (retryAfter) headers["Retry-After"] = retryAfter;
  return new NextResponse(null, { status, headers });
}

async function resolveUpstreamUrl(pageId: string, blockId?: string): Promise<string | null> {
  if (blockId) {
    const block = (await notion.blocks.retrieve({ block_id: blockId })) as {
      type?: string;
      image?: { type: string; file?: { url: string } };
    };
    if (block.type !== "image" || block.image?.type !== "file" || !block.image.file) return null;
    return block.image.file.url;
  }
  const page = (await notion.pages.retrieve({ page_id: pageId })) as {
    cover?: { type: string; file?: { url: string }; external?: { url: string } } | null;
  };
  if (!page.cover) return null;
  // External covers shouldn't be requested through the proxy, but answer
  // harmlessly if they are.
  if (page.cover.type === "external" && page.cover.external) {
    return page.cover.external.url;
  }
  return page.cover.file?.url ?? null;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { ids: string[] } }
) {
  const [pageId, blockId, ...rest] = params.ids ?? [];
  if (!pageId || rest.length > 0) return errorResponse(404);
  if (!/^[0-9a-fA-F-]{32,36}$/.test(pageId) || (blockId && !/^[0-9a-fA-F-]{32,36}$/.test(blockId))) {
    return errorResponse(404);
  }

  try {
    if (!(await isPublishedPageId(pageId))) return errorResponse(404);

    const upstreamUrl = await resolveUpstreamUrl(pageId, blockId);
    if (!upstreamUrl) return errorResponse(404);

    const upstream = await fetch(upstreamUrl, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!upstream.ok || !upstream.body) {
      return errorResponse(503, upstream.headers.get("retry-after"));
    }

    const contentType = upstream.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) return errorResponse(404);

    const contentLength = upstream.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BYTES) return errorResponse(404);

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": OK_CACHE,
    };
    if (contentLength) headers["Content-Length"] = contentLength;

    return new NextResponse(upstream.body, { status: 200, headers });
  } catch (error) {
    // Notion 429/5xx or upstream fetch failure. The CDN keeps serving any
    // previously cached copy via stale-if-error.
    const retryAfter =
      (error as { headers?: { get?: (h: string) => string | null } })?.headers?.get?.("retry-after") ?? null;
    console.error(`notion-image proxy failure for ${pageId}${blockId ? "/" + blockId : ""}:`, error);
    return errorResponse(503, retryAfter);
  }
}
