"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { ISkill } from "@/types";

interface ExpertAreaProps {
  skills: ISkill[];
}

export function ExpertArea({ skills }: ExpertAreaProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-head">{t("expert.title")}</h3>
          <Link
            href="/about"
            className="text-base font-medium text-[#4770FF] border-b border-gray-200 no-underline hover:border-p transition-all"
          >
            {t("expert.seeAll")}
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-y-6 gap-x-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center rounded-xl"
            >
              <div className="flex justify-center w-full bg-mini-card py-6 rounded-xl border border-transparent transition-colors hover:border-[#4770FF]">
                <Image
                  src={`/assets/img/icons/${skill.file}.${skill.ext}`}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h4 className="text-[16px] text-special mt-3 text-center font-medium">
                {skill.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
