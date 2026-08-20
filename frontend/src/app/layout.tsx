import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://ranasummar.vercel.app";
const heroImageUrl = "/images/WhatsApp%20Image%202026-05-17%20at%2012.38.50%20AM.jpeg";

const seoDescription =
  "Rana Summar — Full-Stack AI Developer from Pakistan. Building AI agents & scalable apps with Next.js, FastAPI, LangChain, and LangGraph. Hire on Fiverr & Upwork.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rana Summar | Full-Stack AI Developer — Portfolio",
  description: seoDescription,
  keywords: [
    "Rana Summar",
    "Summar Rajpoot",
    "Rana Summar Rajpoot",
    "ranasummar",
    "Full-Stack AI Developer",
    "AI developer Pakistan",
    "Next.js developer",
    "FastAPI developer",
    "LangChain developer",
    "AI agents",
    "freelance developer Pakistan",
    "Rana Summar portfolio",
    "Summar Rajpoot portfolio",
  ],
  authors: [{ name: "Rana Summar", url: SITE_URL }],
  creator: "Rana Summar",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Rana Summar (Summar Rajpoot) | Full-Stack AI Developer",
    description: seoDescription,
    url: SITE_URL,
    siteName: "Rana Summar Portfolio",
    images: [
      {
        url: heroImageUrl,
        width: 800,
        height: 800,
        alt: "Rana Summar (Summar Rajpoot) — Full-Stack AI Developer from Pakistan",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rana Summar (Summar Rajpoot) | Full-Stack AI Developer",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rana Summar",
  alternateName: ["Summar Rajpoot", "Rana Summar Rajpoot", "ranasummar"],
  url: SITE_URL,
  image: `${SITE_URL}${heroImageUrl.replace(/%20/g, " ")}`,
  jobTitle: "Full-Stack AI Developer",
  description:
    "Final-year BS Software Engineering student specializing in AI agents and full-stack applications.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
