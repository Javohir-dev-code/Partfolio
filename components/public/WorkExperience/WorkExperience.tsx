"use client";
import { useLanguage } from "@/lib/i18n";
import { IExperience } from "@/types";

interface WorkExperienceProps {
  experiences: IExperience[];
}

const getCompanyIcon = (company: string) => {
  if (company.includes("Open Web Academy")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4770FF]">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    );
  }
  if (company.includes("Typex")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4770FF]">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10"/>
      </svg>
    );
  }
  if (company.includes("Eko-gps")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4770FF]">
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
      </svg>
    );
  }
  if (company.includes("UzbekUSA")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4770FF]">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    );
  }
  return (
    <span className="text-head font-bold text-lg">{company.charAt(0)}</span>
  );
};

export function WorkExperience({ experiences }: WorkExperienceProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-card rounded-3xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
      <div className="p-8 pb-10">
        <h3 className="text-2xl font-bold text-head mb-8">
          {t("workexp.title")}
        </h3>
        <div className="overflow-hidden relative h-[150px] sm:h-[170px] lg:h-[190px]">
          {/* Fading effect on bottom and top if desired, but let's keep it clean */}
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
          <div
            className="marquee-y-inner"
            style={{ animation: "marqueeY 10s linear infinite" }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-6 pb-6">
                {experiences.map((exp) => (
                  <div key={exp.id + i} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <div className="w-auto sm:w-[135px] shrink-0">
                      <span className="text-[14px] sm:text-[18px] font-semibold text-p whitespace-nowrap">
                        {exp.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div className="w-[48px] h-[48px] sm:w-[68px] sm:h-[68px] shrink-0 rounded-2xl bg-mini-card border border-border/50 flex items-center justify-center p-2.5 overflow-hidden">
                        {getCompanyIcon(exp.company)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="text-[17px] sm:text-[20px] lg:text-[22px] font-bold text-head leading-snug line-clamp-1" title={exp.title}>
                          {exp.title}
                        </h4>
                        <span className="text-[13.5px] sm:text-[16px] lg:text-[17px] font-medium text-p mt-0.5 sm:mt-1 line-clamp-1" title={exp.company}>
                          {exp.company}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
