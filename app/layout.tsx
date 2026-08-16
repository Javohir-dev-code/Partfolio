import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/i18n";
import { Preloader } from "@/components/public/Preloader";

const siteUrl = "https://zuxriddindev.uz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Zuxriddin Hasanov Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    default: "Zuxriddin Hasanov | Frontend Developer & Mentor",
    template: "%s | Zuxriddin Hasanov",
  },
  description:
    "Zuxriddin Hasanov (HasanovTech) - Passionate Front-end Developer, Mentor at Open Web Academy (OWA), and Founder of TypeX.uz & Eko-gps.uz. Specializing in React, Next.js, and modern web applications.",
  keywords: [
    "Zuxriddin Hasanov",
    "HasanovTech",
    "Frontend Developer",
    "Open Web Academy",
    "Mentor",
    "TypeX.uz",
    "Eko-gps.uz",
    "React",
    "Next.js",
    "UzbekUSA",
    "Developer",
    "Frontend Dasturchi",
  ],
  authors: [
    { name: "Zuxriddin Hasanov", url: "https://github.com/HasanovTech" },
  ],
  creator: "Zuxriddin Hasanov",
  publisher: "Zuxriddin Hasanov",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      uz: "/?lang=uz",
      ru: "/?lang=ru",
    },
  },
  openGraph: {
    title: "Zuxriddin Hasanov | Frontend Developer & Mentor",
    description:
      "Zuxriddin Hasanov (HasanovTech) - Passionate Front-end Developer, Mentor at Open Web Academy, and Founder of TypeX.uz.",
    url: siteUrl,
    siteName: "Zuxriddin Hasanov Portfolio",
    type: "website",
    locale: "en_US",
    alternateLocale: ["uz_UZ", "ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuxriddin Hasanov | Frontend Developer & Mentor",
    description:
      "Zuxriddin Hasanov (HasanovTech) - Passionate Front-end Developer, Mentor at Open Web Academy, and Founder of TypeX.uz.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Zuxriddin Hasanov",
    "alternateName": ["HasanovTech", "Hasanov", "Zuxriddin"],
    "jobTitle": ["Frontend Developer", "Mentor", "Founder"],
    "description":
      "Front-end Developer, Mentor at Open Web Academy, and Founder of TypeX.uz & Eko-gps.uz.",
    "url": siteUrl,
    "email": "mailto:zuhriddin.h.011@gmail.com",
    "image": `${siteUrl}/opengraph-image`,
    "nationality": "Uzbekistan",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UZ",
    },
    "sameAs": [
      "https://github.com/HasanovTech",
      "https://www.linkedin.com/in/zuxriddin-hasanov/",
      "https://t.me/HasanovTech",
      "https://instagram.com/root_v7be",
    ],
    "worksFor": [
      { "@type": "Organization", "name": "Open Web Academy", "url": "https://www.openwebacademy.uz" },
      { "@type": "Organization", "name": "TypeX.uz", "url": "https://typex.uz" },
      { "@type": "Organization", "name": "Eko-gps.uz", "url": "https://eko-gps.uz" },
      { "@type": "Organization", "name": "UzbekUSA.com" },
    ],
    "alumniOf": { "@type": "CollegeOrUniversity", "name": "Open Web Academy" },
    "knowsAbout": [
      "React.js",
      "React Router",
      "React Hook Form",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "Tailwind CSS",
      "Linux",
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zuxriddin Hasanov - Portfolio",
    "alternateName": "Zuxriddin Hasanov Frontend Developer",
    "url": siteUrl,
    "inLanguage": ["en", "uz", "ru"],
    "author": {
      "@type": "Person",
      "name": "Zuxriddin Hasanov",
      "url": `${siteUrl}/`,
    },
  };

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "url": `${siteUrl}/`,
    "inLanguage": ["en", "uz", "ru"],
    "name": "Zuxriddin Hasanov - Portfolio",
    "dateModified": new Date().toISOString().slice(0, 10),
    "mainEntity": {
      "@id": `${siteUrl}/#person`,
    },
  };

  const graphLd = {
    "@context": "https://schema.org",
    "@graph": [
      { ...jsonLd, "@id": `${siteUrl}/#person` },
      websiteLd,
      profileLd,
    ],
  };

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="antialiased"
    >
      <body suppressHydrationWarning className="w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }}
        />
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <Preloader />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[3000] focus:bg-[#4770FF] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
            >
              Skip to content
            </a>
            <div id="main-content">{children}</div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}