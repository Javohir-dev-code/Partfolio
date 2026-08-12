"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage, TranslationKey } from "@/lib/i18n";

const services: { nameKey: TranslationKey; icon: string }[] = [
  {
    nameKey: "services.s1",
    icon: "/assets/img/icons/web-development.svg",
  },
  { nameKey: "services.s2", icon: "/assets/img/icons/prd-design.svg" },
  { nameKey: "services.s3", icon: "/assets/img/icons/ui-ux.svg" },
  { nameKey: "services.s4", icon: "/assets/img/icons/branding.svg" },
];

export function Services() {
  const { t } = useLanguage();

  return (
    <section className="pb-8">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Services card */}
        <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
          <div className="p-8 lg:p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl lg:text-3xl font-semibold text-head">
                {t("services.title")}
              </h3>
              <Link
                href="/services"
                className="text-base lg:text-lg font-medium text-[#5770FF] border-b border-border no-underline hover:border-p transition-all"
              >
                {t("expert.seeAll")}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => (
                <div
                  key={service.nameKey}
                  className="flex items-center gap-3.5 border border-border rounded-xl p-5 lg:p-6 hover:border-[#4770FF] transition-all cursor-default"
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-mini-card rounded-xl flex items-center justify-center shrink-0">
                    <Image
                      src={service.icon}
                      alt={t(service.nameKey)}
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-[15px] lg:text-[17px] font-semibold text-p">
                    {t(service.nameKey)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Let's Work Together card */}
        <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
          <div className="p-8 lg:p-10 flex flex-col h-full">
            {/* Marquee */}
            <div className="overflow-hidden mb-8">
              <p className="text-base lg:text-lg font-medium text-p whitespace-nowrap animate-[marquee_12s_linear_infinite] inline-block">
                {t("services.workTogether")} 🚀 {t("services.workTogether")} 🎨{" "}
                {t("services.workTogether")} 🚀 {t("services.workTogether")} 🎨
              </p>
            </div>

            <h3 className="text-[34px] lg:text-[40px] font-bold text-head leading-snug mb-8">
              {t("services.workTogetherLine1")} 👋 <br /> {t("services.workTogetherLine2")}
            </h3>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-lg lg:text-xl font-semibold text-[#4770FF] border-b-2 border-[#4770FF] no-underline hover:opacity-80 transition-all w-fit pb-1"
            >
              {t("nav.letsTalk")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}