import { Suspense } from "react";
import { CertificatesContent } from "@/components/public/Certificates/CertificatesContent";
import { getCertificates } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificates | Javohir Turayev",
  description: "Courses and certifications completed by Javohir Turayev to improve his skills.",
  alternates: {
    canonical: "/certificates",
    languages: {
      en: "/certificates",
      uz: "/certificates?lang=uz",
      ru: "/certificates?lang=ru",
    },
  },
  openGraph: {
    title: "Certificates — Javohir Turayev",
    description: "Courses and certifications completed by Javohir Turayev to improve his skills.",
  },
};


function CertificatesSkeleton() {
  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          <div className="w-full lg:self-start lg:sticky lg:top-[104px]">
            <div className="p-6 bg-card rounded-2xl border border-border">
              <div className="h-[340px] mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="pb-6 flex flex-col gap-3">
                <div className="h-7 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="flex gap-2.5 mt-2">
                  <div className="h-12 w-36 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                  <div className="h-12 w-36 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                </div>
                <div className="flex gap-2.5 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-10 pt-12 pb-10 flex flex-col gap-8">
              <div className="h-10 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-border rounded-2xl overflow-hidden animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-100 dark:bg-gray-800" />
                    <div className="px-5 py-4 flex flex-col gap-2">
                      <div className="h-5 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                      <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <Suspense fallback={<CertificatesSkeleton />}>
      <CertificatesContent certificates={certificates} />
    </Suspense>
  );
}
