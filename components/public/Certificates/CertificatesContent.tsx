"use client";
import Image from "next/image";
import Link from "next/link";
import { ProfileCard } from "@/components/public/ProfileCard";
import { mockCertificates } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export function CertificatesContent() {
  const { t } = useLanguage();
  const certificates = mockCertificates;

  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          {/* Chap — Profile Card */}
          <div className="w-full lg:self-start lg:sticky lg:top-[104px]">
            <ProfileCard />
          </div>

          {/* O'ng — Certificates */}
          <div className="w-full h-full">
            <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden h-full">
              <div className="px-5 sm:px-10 pt-8 sm:pt-12 pb-8 sm:pb-10">
                <div className="mb-12">
                  <h1 className="text-[30px] sm:text-[40px] font-bold text-head mb-5 sm:mb-6">
                    {t("cert.title")}
                  </h1>
                  <p className="max-w-[630px] text-lg font-semibold text-p leading-normal">
                    {t("cert.subtitle")}
                  </p>
                </div>

                <div className="grid gap-6 grid-cols-1">
                  {certificates.map((cert) => (
                    <Link
                      href={cert.image || "#"}
                      target="_blank"
                      key={cert.id}
                      className="group border border-border rounded-3xl overflow-hidden hover:border-[#4770FF] transition-all duration-300 no-underline bg-mini-card p-3"
                    >
                      {cert.image && (
                        <div className="relative w-full overflow-hidden rounded-2xl">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            width={1000}
                            height={600}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="px-5 py-4 pb-2">
                        <h3 className="text-xl font-bold text-head mb-1 transition-colors group-hover:text-[#4770FF]">
                          {cert.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
