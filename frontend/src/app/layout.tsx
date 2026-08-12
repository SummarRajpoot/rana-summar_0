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

const heroImageUrl = "/images/WhatsApp%20Image%202026-05-17%20at%2012.38.50%20AM.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ranasummar.com"),
  title: "Rana Summar | Full-Stack AI Developer",
  description:
    "final-year Software Engineering student who builds AI agents and full-stack apps with Next.js, FastAPI, and LangChain",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Rana Summar | Full-Stack AI Developer",
    description:
      "final-year Software Engineering student who builds AI agents and full-stack apps with Next.js, FastAPI, and LangChain",
    url: "/",
    siteName: "Rana Summar Portfolio",
    images: [
      {
        url: heroImageUrl,
        width: 800,
        height: 800,
        alt: "Rana Summar - Full-Stack AI Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rana Summar | Full-Stack AI Developer",
    description:
      "final-year Software Engineering student who builds AI agents and full-stack apps with Next.js, FastAPI, and LangChain",
    images: [heroImageUrl],
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
