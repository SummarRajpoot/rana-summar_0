import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AIChatBot } from "@/components/AIChatBot";
import { Preloader } from "@/components/luxury/Preloader";
import { SmoothScroll } from "@/components/luxury/SmoothScroll";
import { ScrollProgress } from "@/components/luxury/ScrollProgress";
import { AmbientBackground } from "@/components/luxury/AmbientBackground";
import { CustomCursor } from "@/components/luxury/CustomCursor";
import { FilmGrain } from "@/components/luxury/FilmGrain";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://ranasummar.vercel.app";
const heroImageUrl = "/images/WhatsApp%20Image%202026-05-17%20at%2012.38.50%20AM.jpg";

const seoDescription =
  "Rana Summar — Software Engineer & Full-Stack AI Developer specializing in autonomous AI agents, LLM architectures, Next.js, and FastAPI. Building production-grade intelligent systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rana Summar | Software Engineer & AI Systems Developer",
  description: seoDescription,
  applicationName: "Rana Summar",
  keywords: [
    "Rana Summar",
    "Summar Rajpoot",
    "Rana Summar Rajpoot",
    "ranasummar",
    "Software Engineer",
    "Full-Stack AI Developer",
    "AI Engineer Pakistan",
    "Next.js developer",
    "FastAPI developer",
    "LangChain developer",
    "LangGraph AI agents",
    "freelance software engineer",
  ],
  authors: [{ name: "Rana Summar", url: SITE_URL }],
  creator: "Rana Summar",
  publisher: "Rana Summar",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rana Summar | Software Engineer & AI Systems Developer",
    description: seoDescription,
    url: SITE_URL,
    siteName: "Rana Summar",
    images: [
      {
        url: heroImageUrl,
        width: 720,
        height: 1520,
        alt: "Rana Summar — Software Engineer & AI Developer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rana Summar | Software Engineer & AI Systems Developer",
    description: seoDescription,
    images: [heroImageUrl],
    creator: "@RanaSummar4",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rana Summar",
  alternateName: ["Summar Rajpoot", "Rana Summar Rajpoot"],
  url: SITE_URL,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rana Summar",
  alternateName: ["Summar Rajpoot", "Rana Summar Rajpoot", "ranasummar"],
  url: SITE_URL,
  image: `${SITE_URL}${heroImageUrl.replace(/%20/g, " ")}`,
  jobTitle: "Software Engineer & AI Developer",
  description:
    "Software Engineer and AI Systems Developer specializing in autonomous agents, LLM pipelines, Next.js, and FastAPI.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hafizabad",
    addressCountry: "PK",
  },
  sameAs: [
    "https://github.com/SummarRajpoot",
    "https://www.linkedin.com/in/rana-summar-295a1a262/",
    "https://www.fiverr.com/rana_summar",
    "https://www.upwork.com/freelancers/ranasummar",
    "https://x.com/RanaSummar4",
    "https://www.facebook.com/rana.summar.756",
    "https://www.instagram.com/ranasummar_0/",
    "https://www.youtube.com/@ranasummar_0",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#1B2745] text-[#F7F5F0] relative selection:bg-[#4FD1C5]/30 selection:text-[#B5F5EC]">
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <AmbientBackground />
        <CustomCursor />
        <FilmGrain />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <AIChatBot />
      </body>
    </html>
  );
}
