import { Suspense } from "react";
import { ServicesContent } from "@/components/public/Services/ServicesContent";
import { ServicesSkeleton } from "@/components/public/Services/ServicesSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Zuxriddin Hasanov",
  description: "Frontend development services by Zuxriddin Hasanov - development, support, UI/UX implementation, and mentoring.",
  alternates: {
    canonical: "/services",
    languages: {
      en: "/services",
      uz: "/services?lang=uz",
      ru: "/services?lang=ru",
    },
  },
};


export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesSkeleton />}>
      <ServicesContent />
    </Suspense>
  );
}
