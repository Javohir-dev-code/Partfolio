import { Suspense } from "react";
import { PortfolioContent } from "@/components/public/Portfolio/PortfolioContent";
import { PortfolioSkeleton } from "@/components/public/Portfolio/PortfolioSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Zuxriddin Hasanov",
  description: "Explore projects built by Zuxriddin Hasanov - TypeX.uz, Eco-GPS.uz, UzbekUSA and more.",
  alternates: {
    canonical: "/portfolio",
    languages: {
      en: "/portfolio",
      uz: "/portfolio?lang=uz",
      ru: "/portfolio?lang=ru",
    },
  },
};


export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioSkeleton />}>
      <PortfolioContent />
    </Suspense>
  );
}
