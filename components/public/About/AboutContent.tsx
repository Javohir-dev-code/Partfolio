"use client";
import Image from "next/image";
import Link from "next/link";
import { ProfileCard } from "@/components/public/ProfileCard";
import { ISkill } from "@/types";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/components/public/useSiteSettings";

export function AboutContent({ skills }: { skills: ISkill[] }) {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();

  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          <div className="w-full lg:self-start lg:sticky lg:top-[104px]">
            <ProfileCard />
          </div>

          <div className="w-full h-full">
            <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden h-full">
              <div className="px-5 sm:px-10 pt-8 sm:pt-12 pb-8 sm:pb-10">
                {/* Top info */}
                <div className="flex items-start justify-between gap-5 mb-12 flex-col sm:flex-row">
                  <div className="w-full max-w-[540px]">
                    <h1 className="text-[30px] sm:text-[40px] font-bold text-head mb-5 sm:mb-6 leading-[1.3]">
                      {t("about.hi")}{" "}
                      <div className="block text-[#4770FF]">
                        {settings.full_name} 👋
                      </div>
                    </h1>
                    <p className="max-w-[460px] text-xl sm:text-2xl font-medium text-p leading-[1.33]">
                      <span className="font-bold text-head">
                        {settings.role || t("profile.role")}
                      </span>{" "}
                      {t("about.desc")}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0f2f5] border border-[#dbdfe5] text-base sm:text-lg font-medium text-indigo-500 whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                      <i className="not-italic w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse-dot" />
                      {t("about.available")}
                    </span>
                  </div>
                </div>

                {/* Counter + Circle */}
                <div className="flex items-center justify-between mb-[50px] pb-5 border-b border-[#dbdfe5]">
                  <div className="flex gap-6 sm:gap-10">
                    <div>
                      <h3 className="text-[32px] sm:text-[40px] font-semibold text-head mb-1">
                        2+
                      </h3>
                      <p className="text-base text-p">{t("about.yearExp")}</p>
                    </div>
                    <div>
                      <h3 className="text-[32px] sm:text-[40px] font-semibold text-head mb-1">
                        7+
                      </h3>
                      <p className="text-base text-p ">{t("about.projectCompleted")}</p>
                    </div>
                  </div>
                  <div className="relative w-[110px] h-[110px] flex items-center justify-center">
                    <Image
                      src="/assets/img/about-us/circle-text.svg"
                      alt="circle-text"
                      width={110}
                      height={110}
                      className="absolute inset-0 w-full h-full animate-spin [animation-duration:10s] [animation-timing-function:linear]"
                    />
                    <div className="relative z-10 w-[75px] h-[75px] bg-indigo-500 rounded-full flex items-center justify-center">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          d="M20 5V35"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 30L20 35L25 30"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-[50px]">
                  <h2 className="text-3xl font-semibold text-head mb-8">
                    {t("about.expertArea")}
                  </h2>
                  <div className="flex flex-wrap gap-[17.8px]">
                    {skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative w-20 h-20 flex items-center justify-center bg-mini-card border border-border rounded-2xl cursor-pointer transition-all hover:border-[#4770FF]"
                      >
                        <Image
                          src={skill.file.startsWith("http") ? skill.file : `/assets/img/icons/${skill.file}.${skill.ext || 'svg'}`}
                          alt={skill.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                        <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 transition-all duration-200 bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded-md whitespace-nowrap z-10 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-900">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Together Slider */}
                <div className="overflow-hidden border-t border-[#dbdfe5] pt-5">
                  <div className="flex w-max animate-marquee-slide">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-8 pr-8">
                        {[...Array(4)].map((_, j) => (
                          <Link
                            key={j}
                            href="/contact"
                            className="text-[40px] font-[550] text-gray-500 no-underline whitespace-nowrap transition-colors hover:text-gray-900"
                          >
                            {t("about.workTogether")}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}