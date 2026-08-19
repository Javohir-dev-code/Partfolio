import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/i18n";
import { Preloader } from "@/components/public/Preloader";

const siteUrl = "https://turayevdev.uz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Javohir Turayev Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    default: "Javohir Turayev | Frontend Developer",
    template: "%s | Javohir Turayev",
  },
  description:
    "Javohir Turayev Uyg’unovich (turayevdev) - Passionate Front-end Developer specializing in building modern, responsive, and user-friendly web applications.",
  keywords: [
    "Javohir Turayev",
    "Javohir Turayev Uyg'unovich",
    "turayevdev",
    "Frontend Developer",
    "HTML5",
    "CSS3",
    "Sass",
    "JavaScript",
    "Developer",
    "Frontend Dasturchi",
    "Portfolio",
  ],
  authors: [
    { name: "Javohir Turayev", url: "https://t.me/turayevdev" },
  ],
  creator: "Javohir Turayev",
  publisher: "Javohir Turayev",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      uz: "/?lang=uz",
      ru: "/?lang=ru",
    },
  },
  openGraph: {
    title: "Javohir Turayev | Frontend Developer",
    description:
      "Javohir Turayev (turayevdev) - Passionate Front-end Developer specializing in building modern, responsive, and user-friendly web applications.",
    url: siteUrl,
    siteName: "Javohir Turayev Portfolio",
    type: "website",
    locale: "en_US",
    alternateLocale: ["uz_UZ", "ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Javohir Turayev | Frontend Developer",
    description:
      "Javohir Turayev (turayevdev) - Passionate Front-end Developer specializing in modern web applications.",
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
    "name": "Javohir Turayev",
    "alternateName": ["turayevdev", "Javohir Turayev Uyg’unovich", "Javohir"],
    "jobTitle": ["Frontend Developer"],
    "description":
      "Front-end Developer specializing in modern, responsive, and user-friendly web applications.",
    "url": siteUrl,
    "telephone": "+998970701702",
    "image": `${siteUrl}/opengraph-image`,
    "nationality": "Uzbekistan",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UZ",
    },
    "sameAs": [
      "https://t.me/turayevdev",
      "https://instagram.com/__turayevvv1",
      "https://github.com/turayevdev",
    ],
    "knowsAbout": [
      "HTML5",
      "CSS3",
      "Sass",
      "JavaScript",
      "Git",
      "GitHub",
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Javohir Turayev - Portfolio",
    "alternateName": "Javohir Turayev Frontend Developer",
    "url": siteUrl,
    "inLanguage": ["en", "uz", "ru"],
    "author": {
      "@type": "Person",
      "name": "Javohir Turayev",
      "url": `${siteUrl}/`,
    },
  };

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "url": `${siteUrl}/`,
    "inLanguage": ["en", "uz", "ru"],
    "name": "Javohir Turayev - Portfolio",
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
      data-scroll-behavior="smooth"
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