import type { MetadataRoute } from "next";
import { getBlogs } from "@/lib/data";

const base = "https://zuxriddindev.uz";

const routes = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/blog",
  "/certificates",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogs();

  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${base}${route}`,
          uz: `${base}${route}?lang=uz`,
          ru: `${base}${route}?lang=ru`,
        },
      },
    })),
    ...posts
      .filter((p) => p.slug)
      .map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.published_at || post.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}