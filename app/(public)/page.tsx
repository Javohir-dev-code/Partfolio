import type { Metadata } from "next";
import { Hero } from "@/components/public/Hero";
import { Services } from "@/components/public/Services";

export const metadata: Metadata = {
  title: "Javohir Turayev | Frontend Developer",
  description:
    "Javohir Turayev (turayevdev) - Passionate Front-end Developer specializing in building modern, responsive, and user-friendly web applications.",
  alternates: {
    canonical: "/",
    languages: { en: "/", uz: "/?lang=uz", ru: "/?lang=ru" },
  },
  openGraph: {
    title: "Javohir Turayev | Frontend Developer",
    description:
      "Javohir Turayev (turayevdev) - Passionate Front-end Developer specializing in building modern, responsive, and user-friendly web applications.",
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