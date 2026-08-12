"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

interface CounterProps {
  target: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

function Counter({ target, suffix, label, icon }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div
      ref={ref}
      className="flex items-center justify-center gap-4 py-8 text-center"
    >
      <span className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-[#4770FF]/10 text-[#4770FF]">
        {icon}
      </span>
      <span className="text-[34px] sm:text-[40px] font-bold leading-none text-head">
        {value}
        <span className="text-[#4770FF]">{suffix}</span>
      </span>
      <span className="text-[15px] font-medium text-p">{label}</span>
    </div>
  );
}

export function Stats() {
  const { t } = useLanguage();

  const items = [
    {
      target: 2,
      suffix: "+",
      label: t("stats.years"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 7v5l3.5 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      target: 7,
      suffix: "+",
      label: t("stats.projects"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      target: 17,
      suffix: "+",
      label: t("stats.techs"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="m8 9-4 3 4 3M16 9l4 3-4 3M13 5l-2 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
        {items.map((item) => (
          <Counter key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}