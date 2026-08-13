import { Suspense } from "react";
import { AboutContent } from "@/components/public/About/AboutContent";
import { AboutSkeleton } from "@/components/public/About/AboutSkeleton";
import { getSkills } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Zuxriddin Hasanov",
  description: "Learn more about Zuxriddin Hasanov - Front-end Developer, Mentor at Open Web Academy, and Founder of TypeX.uz.",
  alternates: {
    canonical: "/about",
    languages: { en: "/about", uz: "/about?lang=uz", ru: "/about?lang=ru" },
  },
  openGraph: {
    title: "About Zuxriddin Hasanov — Frontend Developer & Mentor",
    description: "Learn more about Zuxriddin Hasanov - Front-end Developer, Mentor at Open Web Academy, and Founder of TypeX.uz.",
  },
};


export default async function AboutPage() {
  const skills = await getSkills();

  return (
    <Suspense fallback={<AboutSkeleton />}>
      <AboutContent skills={skills} />
    </Suspense>
  );
}
