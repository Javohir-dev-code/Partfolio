"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const socialLinks = [
  {
    href: "https://t.me/HasanovTech",
    label: "Telegram",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com/root_v7be",
    label: "Instagram",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/HasanovTech",
    label: "Github",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/zuxriddin-hasanov/",
    label: "LinkedIn",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
];

export function ProfileCard() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("zuhriddin.h.011@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-card rounded-2xl border border-card shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] h-fit">
      {/* Image */}
      <div className="relative h-[350px] mb-5 rounded-2xl overflow-hidden">
        <Image
          src="/assets/img/avatar.png"
          alt="Zuxriddin Hasanov"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>

      {/* Text */}
      <div className="pb-6">
        <h3 className="text-[28px] font-semibold text-head mb-3">
          Zuxriddin Hasanov 👋
        </h3>
        <p className="text-[19px] font-semibold text-p leading-7 mb-2">
          <span className="font-bold text-special">{t("profile.role")}</span>{" "}
          {t("profile.desc")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
          <Link
            href="https://t.me/HasanovTech"
            target="_blank"
            className="flex w-full sm:flex-1 sm:min-w-0 items-center justify-center gap-1.5 bg-[#4770FF] text-white px-3.5 sm:px-5 py-3.5 sm:py-4 rounded-xl text-[14px] sm:text-[17px] font-semibold whitespace-nowrap hover:bg-[#2562EB] transition-all no-underline"
          >
            <span className="shrink-0">
              <svg width="24" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M5.5 4H9.5L11.5 9L9 10.5C10.071 12.6715 11.8285 14.429 14 15.5L15.5 13L20.5 15V19C20.5 19.5304 20.2893 20.0391 19.9142 20.4142C19.5391 20.7893 19.0304 21 18.5 21C14.5993 20.763 10.9202 19.1065 8.15683 16.3432C5.3935 13.5798 3.73705 9.90074 3.5 6C3.5 5.46957 3.71071 4.96086 4.08579 4.58579C4.46086 4.21071 4.96957 4 5.5 4Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 7C16.0304 7 16.5391 7.21071 16.9142 7.58579C17.2893 7.96086 17.5 8.46957 17.5 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 3C17.0913 3 18.6174 3.63214 19.7426 4.75736C20.8679 5.88258 21.5 7.4087 21.5 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            </span>
            {t("profile.bookCall")}
          </Link>
          <button
            onClick={handleCopy}
            className="flex w-full sm:flex-1 sm:min-w-0 items-center justify-center gap-1.5 bg-transparent text-special border border-border px-3.5 sm:px-5 py-3.5 sm:py-4 rounded-xl text-[14px] sm:text-[17px] font-semibold whitespace-nowrap hover:bg-[#F0F2F5] transition-all cursor-pointer dark:hover:bg-[#1a1f2c]"
          >
            <span className="shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8H18C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H10C9.46957 20 8.96086 19.7893 8.58579 19.4142C8.21071 19.0391 8 18.5304 8 18V10Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              />
              <path
                d="M16 8V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              />
            </svg>
            </span>
            {copied ? t("profile.copied") : t("profile.copyEmail")}
          </button>
        </div>

        {/* Social Links */}
        <div className="flex gap-2.5 mt-4">
          {socialLinks.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              aria-label={s.label}
              className="w-12 h-12 flex items-center justify-center rounded-xl border border-border text-[#384559] no-underline hover:text-[#4770FF] hover:border-[#4770FF] transition-all dark:bg-[#0E1018]"
            >
              {s.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
