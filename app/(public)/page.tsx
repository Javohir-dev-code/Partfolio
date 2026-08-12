import type { Metadata } from "next";
import { Hero } from "@/components/public/Hero";
import { Services } from "@/components/public/Services";

export const metadata: Metadata = {
  title: "Zuxriddin Hasanov | Frontend Developer & Mentor",
  description:
    "Zuxriddin Hasanov (HasanovTech) - Passionate Front-end Developer, Mentor at Open Web Academy, and Founder of TypeX.uz & Eco-GPS.uz. Specializing in React, Next.js, and modern web applications.",
  alternates: {
    canonical: "/",
    languages: { en: "/", uz: "/?lang=uz", ru: "/?lang=ru" },
  },
  openGraph: {
    title: "Zuxriddin Hasanov | Frontend Developer & Mentor",
    description:
      "Zuxriddin Hasanov (HasanovTech) - Passionate Front-end Developer, Mentor at Open Web Academy, and Founder of TypeX.uz & Eco-GPS.uz. Specializing in React, Next.js, and modern web applications.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
    </>
  );
}