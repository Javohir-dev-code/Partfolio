"use client";
import Image from "next/image";
import Link from "next/link";
import { ProfileCard } from "@/components/public/ProfileCard";
import { mockBlogs } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export function BlogContent() {
  const { t } = useLanguage();
  const posts = mockBlogs;

  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          <div className="w-full self-start sticky top-[104px]">
            <ProfileCard />
          </div>

          <div className="w-full h-full">
            <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden h-full">
              <div className="px-5 sm:px-10 pt-8 sm:pt-12 pb-8 sm:pb-10">
                <div className="mb-6">
                  <h1 className="text-[30px] sm:text-[40px] font-bold text-head mb-5 sm:mb-6 leading-[1.3]">
                    {t("blog.title")}
                  </h1>
                  <p className="text-lg font-semibold text-p leading-normal">
                    {t("blog.subtitle")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-3xl overflow-hidden border border-border transition-all duration-300 hover:border-[#4770FF] hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="relative">
                        <Link
                          href={`/blog/${post.slug || "#"}`}
                          className="block overflow-hidden group h-[220px]"
                        >
                          {post.image?.startsWith("bg-") ? (
                            <div className={`w-full h-full flex items-center justify-center ${post.image} transition-transform duration-500 group-hover:scale-105`}>
                                <h3 className="text-white text-3xl font-semibold px-6 text-center leading-snug drop-shadow-md">{post.tag}</h3>
                            </div>
                          ) : (
                            post.image && (
                              <Image
                                src={post.image}
                                alt={post.title}
                                width={600}
                                height={400}
                                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105 object-cover"
                              />
                            )
                          )}
                        </Link>
                        {post.tag && (
                          <Link
                            href={`/blog/${post.slug || "#"}`}
                            className="absolute bottom-4 left-4 bg-white/90 text-[#212529] text-[14px] font-bold px-3 py-1.5 rounded-lg no-underline transition-colors hover:bg-[#4770FF] hover:text-white shadow-sm"
                          >
                            {post.tag}
                          </Link>
                        )}
                      </div>
                      <div className="px-5 py-5">
                        <Link
                          href={`/blog/${post.slug || "#"}`}
                          className="block text-[21px] font-bold text-head no-underline leading-[1.45] mb-4 transition-colors hover:text-[#4770FF]"
                        >
                          {post.title}
                        </Link>
                        <ul className="flex items-center gap-4 list-none p-0 m-0">
                          {post.read_time && (
                            <li className="text-[16px] font-medium text-p relative after:content-['•'] after:absolute after:-right-2.5 after:text-gray-500">
                              {post.read_time}
                            </li>
                          )}
                          <li className="text-[16px] font-medium text-p">
                            {post.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}