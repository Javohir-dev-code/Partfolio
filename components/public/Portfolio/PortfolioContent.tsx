"use client";
import Image from "next/image";
import Link from "next/link";
import { ProfileCard } from "@/components/public/ProfileCard";
import { mockProjects } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const ArrowIcon = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    className="w-3.5 h-[15px]"
  >
    <path
      d="M9.91634 4.5835L4.08301 10.4168"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66699 4.5835H9.91699V9.8335"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function PortfolioContent() {
  const { t } = useLanguage();
  const projects = mockProjects;

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
                <div className="mb-12">
                  <h1 className="text-[30px] sm:text-[40px] font-bold text-head mb-5 sm:mb-6">
                    {t("portfolio.title")}{" "}
                    <span className="text-[#4770FF]">{t("portfolio.titleHighlight")}</span>
                  </h1>
                  <p className="max-w-[630px] text-lg font-semibold text-p leading-normal">
                    {t("portfolio.subtitle")}
                  </p>
                </div>

                <div className="flex flex-col gap-8 mb-7">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={project.site_link ?? project.detail_link ?? "/portfolio"}
                      target="_blank"
                      className="group block border border-border rounded-3xl overflow-hidden transition-all duration-300 hover:border-[#4770FF] no-underline bg-mini-card p-4"
                    >
                      {project.image && (
                        <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 aspect-[16/10] sm:aspect-[16/9]">
                          {project.image_light ? (
                            <>
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={1000}
                                height={600}
                                className="w-full h-full hidden dark:block object-contain"
                              />
                              <Image
                                src={project.image_light}
                                alt={project.title}
                                width={1000}
                                height={600}
                                className="w-full h-full block dark:hidden object-contain"
                              />
                            </>
                          ) : (
                            <Image
                              src={project.image}
                              alt={project.title}
                              width={1000}
                              height={600}
                              className="w-full h-full block object-contain"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                        </div>
                      )}
                      <div className="flex-col items-center justify-center text-center mt-6 mb-3 gap-2">
                        <h3 className="text-3xl font-bold text-head mb-2 transition-colors group-hover:text-[#4770FF]">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <p className="text-[18px] text-p">
                            {project.subtitle}
                          </p>
                        )}
                        <div className="mt-5 flex items-center justify-center gap-5">
                           <span className="flex items-center gap-1.5 text-base font-medium text-[#4770FF]">View Details <ArrowIcon /></span>
                           {project.site_link && (
                             <span className="flex items-center gap-1.5 text-base font-medium text-[#4770FF]">Visit Site <ArrowIcon /></span>
                           )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="overflow-hidden border-t border-border pt-5">
                  <div className="flex w-max animate-marquee-slide">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-8 pr-8">
                        {[...Array(4)].map((_, j) => (
                          <Link
                            key={j}
                            href="/contact"
                            className="text-[40px] font-bold text-p no-underline whitespace-nowrap transition-colors hover:text-head"
                          >
                            Let&apos;s 👋 Work Together
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
