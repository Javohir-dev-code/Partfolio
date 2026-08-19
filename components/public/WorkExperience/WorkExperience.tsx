"use client";
import { useState } from "react";
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
  const [selectedExp, setSelectedExp] = useState<IExperience | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="bg-card rounded-3xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
        <div className="p-8 pb-10">
          <h3 className="text-2xl font-bold text-head mb-8">
            {t("workexp.title")}
          </h3>
          <div 
            className={`overflow-hidden relative ${experiences.length > 3 ? "h-[180px] sm:h-[200px] lg:h-[220px]" : "min-h-[100px]"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {experiences.length > 3 ? (
              <>
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
                <div
                  className="marquee-y-inner"
                  style={{ animation: `marqueeY 12s linear infinite ${isHovered ? 'paused' : 'running'}` }}
                >
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-6 pb-6">
                      {experiences.map((exp) => (
                        <div 
                          key={exp.id + "-" + i} 
                          className="flex items-start gap-3 sm:gap-4 cursor-pointer hover:bg-card/80 p-2 -m-2 rounded-xl transition-all hover:shadow-sm"
                          onClick={() => setSelectedExp(exp)}
                        >
                          <div className="w-[85px] sm:w-[110px] shrink-0 pt-1">
                            <span className="text-[13px] sm:text-[15px] font-medium text-p whitespace-nowrap">
                              {exp.date}
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] shrink-0 rounded-xl bg-mini-card border border-border/50 flex items-center justify-center p-2.5">
                              {getCompanyIcon(exp.company)}
                            </div>
                            <div className="flex flex-col">
                              <h4 className="text-[15px] sm:text-[16px] font-semibold text-head leading-snug line-clamp-2">
                                {exp.title}
                              </h4>
                              <span className="text-[13px] sm:text-[14px] font-medium text-p mt-0.5 line-clamp-1">
                                {exp.company}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-6">
                {experiences.map((exp) => (
                  <div 
                    key={exp.id} 
                    className="flex items-start gap-3 sm:gap-4 cursor-pointer hover:bg-card/80 p-2 -m-2 rounded-xl transition-all hover:shadow-sm"
                    onClick={() => setSelectedExp(exp)}
                  >
                    <div className="w-[85px] sm:w-[110px] shrink-0 pt-1">
                      <span className="text-[13px] sm:text-[15px] font-medium text-p whitespace-nowrap">
                        {exp.date}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] shrink-0 rounded-xl bg-mini-card border border-border/50 flex items-center justify-center p-2.5">
                        {getCompanyIcon(exp.company)}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[15px] sm:text-[16px] font-semibold text-head leading-snug line-clamp-2">
                          {exp.title}
                        </h4>
                        <span className="text-[13px] sm:text-[14px] font-medium text-p mt-0.5 line-clamp-1">
                          {exp.company}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedExp && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={() => setSelectedExp(null)}
        >
          <div 
            className="bg-card w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-border animate-in zoom-in-95 duration-200" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-p hover:text-head transition-colors p-2"
              onClick={() => setSelectedExp(null)}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col gap-6 mt-2">
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] shrink-0 rounded-2xl bg-mini-card border border-border/50 flex items-center justify-center p-3.5">
                  {getCompanyIcon(selectedExp.company)}
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-[#4770FF]/10 text-[#4770FF] text-[13px] font-bold rounded-full mb-1.5">
                    {selectedExp.date}
                  </span>
                  <h4 className="text-[18px] sm:text-[20px] font-bold text-head leading-tight">
                    {selectedExp.company}
                  </h4>
                </div>
              </div>
              <div className="h-px w-full bg-border/50" />
              <div>
                <h3 className="text-[18px] sm:text-[22px] font-bold text-head leading-snug">
                  {selectedExp.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
