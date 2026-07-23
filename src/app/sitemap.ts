import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/notion";
import { SITE_URL } from "@/lib/site";

export const revalidate = process.env.REVALIDATION_TIME_BLOG
  ? parseInt(process.env.REVALIDATION_TIME_BLOG)
  : 3600;

// Build-time Notion failures throw on purpose — an empty sitemap on error is
// worse than a failed build.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/writing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/books`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/writing/${encodeURIComponent(post.slug)}`,
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
