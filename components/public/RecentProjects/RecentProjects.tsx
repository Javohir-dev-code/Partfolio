"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { IProject } from "@/types";

interface RecentProjectsProps {
  projects: IProject[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, 2);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] h-full overflow-hidden">
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-head">{t("recent.title")}</h3>
          {projects.length > 2 && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-base font-medium text-[#5770FF] border-b border-gray-200 no-underline hover:border-p transition-all cursor-pointer"
            >
              {showAll ? t("recent.showLess") : t("recent.seeAll")}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {visible.map((project) => (
            <Link
              key={project.id}
              href={project.detail_link ?? "/portfolio"}
              className="border border-border rounded-2xl overflow-hidden transition-colors hover:border-[#4770FF] no-underline"
            >
              <div className="bg-mini-card rounded-lg p-2">
                {project.image && (
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[4/3] w-full overflow-hidden rounded-lg">
                    {project.image_light ? (
                      <>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="rounded-lg object-contain p-1 hidden dark:block"
                        />
                        <Image
                          src={project.image_light}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="rounded-lg object-contain p-1 block dark:hidden"
                        />
                      </>
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="rounded-lg object-contain p-1"
                      />
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}