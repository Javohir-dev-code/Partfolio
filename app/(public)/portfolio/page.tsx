import { Suspense } from "react";
import { PortfolioContent } from "@/components/public/Portfolio/PortfolioContent";
import { PortfolioSkeleton } from "@/components/public/Portfolio/PortfolioSkeleton";
import { getProjects } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Zuxriddin Hasanov",
  description: "Explore projects built by Zuxriddin Hasanov - TypeX.uz, Eko-gps.uz, UzbekUSA and more.",
  alternates: {
    canonical: "/portfolio",
    languages: {
      en: "/portfolio",
      uz: "/portfolio?lang=uz",
      ru: "/portfolio?lang=ru",
    },
  },
  openGraph: {
    title: "Portfolio — Zuxriddin Hasanov",
    description: "Explore projects built by Zuxriddin Hasanov - TypeX.uz, Eko-gps.uz, UzbekUSA and more.",
  },
};


export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <Suspense fallback={<PortfolioSkeleton />}>
      <PortfolioContent projects={projects} />
    </Suspense>
  );
}
