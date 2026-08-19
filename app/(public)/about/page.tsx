import { Suspense } from "react";
import { AboutContent } from "@/components/public/About/AboutContent";
import { AboutSkeleton } from "@/components/public/About/AboutSkeleton";
import { getSkills } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Javohir Turayev",
  description: "Learn more about Javohir Turayev - Front-end Developer specializing in modern web applications.",
  alternates: {
    canonical: "/about",
    languages: { en: "/about", uz: "/about?lang=uz", ru: "/about?lang=ru" },
  },
  openGraph: {
    title: "About Javohir Turayev — Frontend Developer",
    description: "Learn more about Javohir Turayev - Front-end Developer specializing in modern web applications.",
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
