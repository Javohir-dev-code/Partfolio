import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogs } from "@/lib/data";
import { ProfileCard } from "@/components/public/ProfileCard";

export const dynamic = "force-dynamic";

const POSTS = getBlogs();

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = await POSTS;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return {
    title: `${post.title} | Javohir Turayev`,
    description: post.content?.slice(0, 160) || post.title,
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 160) || post.title,
      images: post.image?.startsWith("bg-") ? undefined : post.image || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await POSTS;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const date = post.date || (post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "");

  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          <div className="w-full self-start sticky top-[104px]">
            <ProfileCard />
          </div>

          <div className="w-full h-full">
            <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden h-full">
              {post.image?.startsWith("bg-") ? (
                <div className={`flex items-center justify-center h-[260px] px-6 ${post.image}`}>
                  <h1 className="text-white text-2xl sm:text-3xl font-semibold text-center leading-snug drop-shadow-md">
                    {post.tag}
                  </h1>
                </div>
              ) : post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={500}
                  className="w-full h-[260px] object-cover"
                />
              ) : null}

              <div className="px-5 sm:px-10 pt-8 sm:pt-10 pb-10">
                <Link
                  href="/blog"
                  className="inline-block text-[14px] font-semibold text-[#4770FF] no-underline mb-6 hover:underline"
                >
                  ← Back to blog
                </Link>

                <h1 className="text-[28px] sm:text-[36px] font-bold text-head mb-5 leading-[1.3]">{post.title}</h1>

                <ul className="flex items-center gap-4 list-none p-0 m-0 mb-8">
                  {post.tag && (
                    <li className="text-[14px] font-bold text-[#4770FF] bg-[#4770FF]/10 px-3 py-1 rounded-lg">
                      {post.tag}
                    </li>
                  )}
                  {post.read_time && (
                    <li className="text-[15px] font-medium text-p relative after:content-['•'] after:absolute after:-right-2.5 after:text-gray-500">
                      {post.read_time}
                    </li>
                  )}
                  {date && <li className="text-[15px] font-medium text-p">{date}</li>}
                </ul>

                <div className="text-[16px] leading-[1.85] text-p whitespace-pre-wrap">
                  {post.content || "Content coming soon..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}