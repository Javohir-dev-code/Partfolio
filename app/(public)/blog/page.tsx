import { Suspense } from "react";
import { BlogContent } from "@/components/public/Blog/BlogContent";
import { BlogSkeleton } from "@/components/public/Blog/BlogSkeleton";
import { getBlogs } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Zuxriddin Hasanov",
  description: "Articles about web development, best practices, and modern technologies by Zuxriddin Hasanov.",
  alternates: {
    canonical: "/blog",
    languages: { en: "/blog", uz: "/blog?lang=uz", ru: "/blog?lang=ru" },
  },
  openGraph: {
    title: "Blog — Zuxriddin Hasanov",
    description: "Articles about web development, best practices, and modern technologies by Zuxriddin Hasanov.",
  },
};


export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent posts={posts} />
    </Suspense>
  );
}