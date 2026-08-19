"use client";
import { useState } from "react";
import Link from "next/link";
import { ProfileCard } from "@/components/public/ProfileCard";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/components/public/useSiteSettings";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          {/* Chap — Profile Card */}
          <div className="w-full lg:self-start lg:sticky lg:top-[104px]">
            <ProfileCard />
          </div>

          {/* O'ng — Content */}
          <div className="w-full h-full">
            <div className="bg-card rounded-2xl border border-card shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden h-full">
              <div className="px-5 sm:px-10 pt-8 sm:pt-12 pb-8 sm:pb-10">
                {/* Top info */}
                <div className="mb-12">
                  <h1 className="text-[30px] sm:text-[40px] font-bold text-head mb-5 sm:mb-6 leading-[1.3]">
                    {t("contact.title")}{" "}
                    <span className="text-[#4770FF]">{t("contact.titleHighlight")}</span>
                  </h1>
                  <p className="max-w-[480px] text-xl sm:text-2xl text-p leading-[1.4]">
                    {t("contact.subtitle")}
                  </p>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
                  <Link
                    href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-4 bg-mini-card rounded-2xl p-6 no-underline transition-all hover:border hover:border-[#4770FF]/40"
                  >
                    <span className="shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-[#4770FF]/10 text-[#4770FF]">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium text-p mb-1">
                        {t("contact.phone")}
                      </span>
                      <span className="block text-lg font-semibold text-head truncate">
                        {settings.phone}
                      </span>
                    </span>
                  </Link>
                  <Link
                    href={settings.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-mini-card rounded-2xl p-6 no-underline transition-all hover:border hover:border-[#4770FF]/40"
                  >
                    <span className="shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-[#4770FF]/10 text-[#4770FF]">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium text-p mb-1">
                        {t("contact.telegram")}
                      </span>
                      <span className="block text-lg font-semibold text-head truncate">
                        {"@" + settings.telegram.replace(/^https?:\/\/(?:t\.me|telegram\.me)\/?/i, "")}
                      </span>
                    </span>
                  </Link>
                </div>

                {/* Form */}
                <div className="bg-mini-card rounded-2xl p-7">
                  <form onSubmit={handleSubmit}>
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-p">
                          {t("contact.name")}
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder={t("contact.namePh")}
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="px-4 py-3 border border-border rounded-xl text-base text-p bg-background outline-none transition-all placeholder:text-[#adb5bd] focus:border-[#4770FF] focus:shadow-[0_0_0_3px_rgba(71,112,255,0.1)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-p">
                          {t("contact.emailLabel")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder={t("contact.emailPh")}
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="px-4 py-3 border border-border rounded-xl text-base text-p bg-background outline-none transition-all placeholder:text-[#adb5bd] focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(71,112,255,0.1)]"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2 mb-4">
                      <label className="text-sm font-medium text-p">
                        {t("contact.subject")}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder={t("contact.subjectPh")}
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 border border-border rounded-xl text-base text-p bg-background outline-none transition-all placeholder:text-[#adb5bd] focus:border-[#4770FF] focus:shadow-[0_0_0_3px_rgba(71,112,255,0.1)]"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-p">
                        {t("contact.message")}
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder={t("contact.messagePh")}
                        value={form.message}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 border border-border rounded-xl text-base text-p bg-background outline-none transition-all placeholder:text-[#adb5bd] focus:border-[#4770FF] focus:shadow-[0_0_0_3px_rgba(71,112,255,0.1)] resize-y"
                      />
                    </div>

                    {/* Success / Error xabar */}
                    {status === "success" && (
                      <p className="mt-4 text-sm font-medium text-green-600">
                        {t("contact.success")}
                      </p>
                    )}
                    {status === "error" && (
                      <p className="mt-4 text-sm font-medium text-red-500">
                        {t("contact.error")}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 mt-5 px-4 py-4 bg-[#4770FF] text-white border-none rounded-xl text-[15px] font-semibold cursor-pointer transition-colors hover:bg-[#2c56ee] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading"
                        ? t("contact.sending")
                        : t("contact.send")}
                      {status !== "loading" && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M17.5 11.6665V6.6665H12.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}