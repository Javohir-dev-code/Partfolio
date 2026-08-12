import type { MetadataRoute } from "next";

const base = "https://zuxriddinhasanov.uz";

const routes = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/blog",
  "/certificates",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${base}${route}`,
        uz: `${base}${route}?lang=uz`,
        ru: `${base}${route}?lang=ru`,
      },
    },
  }));
}