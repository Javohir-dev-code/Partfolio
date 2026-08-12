"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage, Lang } from "@/lib/i18n";

const options: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "uz", label: "O'zbekcha" },
  { code: "ru", label: "Русский" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#4770FF] hover:text-[#4770FF] transition-all cursor-pointer bg-transparent"
        aria-label="Change language"
        aria-expanded={open}
        title={options.find((o) => o.code === lang)?.label}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle
            cx="9"
            cy="9"
            r="7.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M1.5 9h15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9 1.5a9.3 9.3 0 0 1 2.7 7.5A9.3 9.3 0 0 1 9 16.5a9.3 9.3 0 0 1-2.7-7.5A9.3 9.3 0 0 1 9 1.5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-44 bg-card border border-border rounded-xl shadow-[0_10px_30px_rgba(26,31,44,0.18)] py-1.5 z-[1001]">
          {options.map((opt) => (
            <button
              key={opt.code}
              onClick={() => {
                setLang(opt.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer border-none bg-transparent hover:bg-mini-card ${
                lang === opt.code
                  ? "text-[#4770FF]"
                  : "text-p hover:text-head"
              }`}
            >
              <span className="w-7 text-xs font-bold uppercase">
                {opt.code}
              </span>
              {opt.label}
              {lang === opt.code && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-auto text-[#4770FF]"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}