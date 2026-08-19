import { Suspense } from "react";
import { ServicesContent } from "@/components/public/Services/ServicesContent";
import { ServicesSkeleton } from "@/components/public/Services/ServicesSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Javohir Turayev",
  description: "Frontend development services by Javohir Turayev - development, support, and modern UI/UX implementation.",
  alternates: {
    canonical: "/services",
    languages: {
      en: "/services",
      uz: "/services?lang=uz",
      ru: "/services?lang=ru",
    },
  },
  openGraph: {
    title: "Services — Javohir Turayev",
    description: "Frontend development services by Javohir Turayev - development, support, and modern UI/UX implementation.",
  },
};


export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesSkeleton />}>
      <ServicesContent />
    </Suspense>
  );
}
