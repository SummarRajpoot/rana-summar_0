import { FadeIn } from "@/components/FadeIn";
import { Navbar } from "@/components/Navbar";
import { SkillsSection } from "@/components/SkillsSection";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    href: "#",
    isPrimary: false,
    isExternal: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    isPrimary: false,
    isExternal: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "#",
    isPrimary: false,
    isExternal: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.399.638-1.161 4.239 4.342-1.139.563.329zm12.39-7.25c-.247-.125-1.464-.723-1.691-.806-.228-.083-.394-.125-.56.125-.166.249-.643.806-.788.972-.145.166-.29.187-.538.062-.247-.125-1.045-.385-1.99-1.229-.738-.658-1.236-1.47-1.38-1.719-.145-.249-.015-.384.109-.508.111-.112.247-.29.37-.435.124-.146.166-.249.249-.415.083-.166.042-.311-.021-.435-.062-.125-.56-1.349-.768-1.849-.203-.487-.41-.421-.56-.429-.144-.008-.31-.008-.476-.008-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.076 0 1.225.892 2.408 1.016 2.574.125.166 1.756 2.681 4.254 3.758.594.256 1.058.409 1.419.524.597.19 1.14.163 1.57.099.48-.071 1.464-.598 1.671-1.176.207-.579.207-1.076.145-1.176-.062-.101-.228-.163-.475-.288z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:placeholder@email.com",
    isPrimary: true,
    isExternal: false,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Fiverr",
    href: "#",
    isPrimary: false,
    isExternal: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5v2H9v2h2v6h2v-6h2v-2h-2V7h-2z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    isPrimary: false,
    isExternal: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    isPrimary: false,
    isExternal: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    isPrimary: false,
    isExternal: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    isPrimary: false,
    isExternal: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── 1. HERO ──────────────────────────────────────────── */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-background px-6 pt-24 pb-20">
          <FadeIn className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3">
                Full-Stack AI Developer
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-foreground mb-6">
                Rana Summar
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 font-body mb-8 max-w-2xl leading-relaxed">
                Final-year Software Engineering student. I build AI agents and scalable full-stack applications with Next.js, FastAPI, and LangChain.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="#projects"
                  className="w-full sm:w-auto bg-accent text-foreground px-8 py-3.5 rounded-full font-semibold hover:brightness-110 transition-all flex items-center justify-center"
                >
                  View Projects
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border-2 border-foreground text-foreground px-8 py-3.5 rounded-full font-semibold hover:bg-foreground hover:text-background transition-colors flex items-center justify-center"
                >
                  Hire Me on Fiverr
                </Link>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="shrink-0">
              <div className="w-56 h-56 md:w-80 md:h-80 rounded-full border-[6px] border-accent/30 overflow-hidden shadow-xl relative">
                <Image
                  src="/images/WhatsApp Image 2026-05-17 at 12.38.50 AM.jpeg"
                  alt="Rana Summar — Full-Stack AI Developer"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 18%" }}
                  priority
                />
              </div>
            </div>

          </FadeIn>
        </section>

        {/* ── 2. EDUCATION ─────────────────────────────────────── */}
        <section id="education" className="py-24 px-6 bg-background border-t border-foreground/5">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
                Qualifications
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-16 text-center">
                Education
              </h2>
            </FadeIn>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-foreground/10 hidden sm:block" />
              <div className="space-y-10">
                {/* 1. DAE */}
                <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0 flex items-start pt-1">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-md z-10">
                      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 6.075-4.925 11-11 11S1 18.075 1 12c0-1.486.296-2.903.84-4.196L12 14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-surface-dark rounded-2xl p-7 border border-foreground/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold font-heading text-white">DAE — Textile Dyeing &amp; Printing</h3>
                      <span className="text-accent text-sm font-semibold shrink-0">2019 – 2022</span>
                    </div>
                    <p className="text-white/80 font-body mb-2">Govt. College of Technology, Samanabad, Faisalabad</p>
                    <p className="text-white/50 text-sm font-body">3-Year Diploma of Associate Engineering (DAE)</p>
                  </div>
                </FadeIn>

                {/* 2. BS Software Engineering */}
                <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0 flex items-start pt-1">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-md z-10">
                      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 6.075-4.925 11-11 11S1 18.075 1 12c0-1.486.296-2.903.84-4.196L12 14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-surface-dark rounded-2xl p-7 border border-foreground/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold font-heading text-white">BS Software Engineering</h3>
                      <span className="text-accent text-sm font-semibold shrink-0">Sep 2023 – April 2027 (Expected)</span>
                    </div>
                    <p className="text-white/80 font-body mb-2">University of Agriculture, Faisalabad (UAF)</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="text-white/50 text-sm font-body">Semester 6 · Section M1</span>
                      <span className="text-white/50 text-sm font-body">Final Year · Hafizabad, Pakistan</span>
                    </div>
                  </div>
                </FadeIn>

                {/* 3. SMIT Agentic AI */}
                <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0 flex items-start pt-1">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-md z-10">
                      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 6.075-4.925 11-11 11S1 18.075 1 12c0-1.486.296-2.903.84-4.196L12 14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-surface-dark rounded-2xl p-7 border border-foreground/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold font-heading text-white">SMIT (Saylani) — Agentic AI</h3>
                      <span className="text-accent text-sm font-semibold shrink-0">Oct 2024 – Sep 2025</span>
                    </div>
                    <p className="text-white/80 font-body mb-2">Saylani Mass IT Training Program</p>
                    <p className="text-white/50 text-sm font-body">6-Month Course</p>
                  </div>
                </FadeIn>

                {/* 4. SMIT AI & Data Science */}
                <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0 flex items-start pt-1">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-md z-10">
                      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 6.075-4.925 11-11 11S1 18.075 1 12c0-1.486.296-2.903.84-4.196L12 14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-surface-dark rounded-2xl p-7 border border-foreground/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold font-heading text-white">SMIT (Saylani) — Artificial Intelligence and Data Science</h3>
                      <span className="text-accent text-sm font-semibold shrink-0">Nov 2025 – April 2026</span>
                    </div>
                    <p className="text-white/80 font-body mb-2">Saylani Mass IT Training Program</p>
                    <p className="text-white/50 text-sm font-body">6-Month Course</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. EXPERIENCE ────────────────────────────────────── */}
        <section id="experience" className="py-24 px-6 bg-background border-t border-foreground/5">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
                Career History
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-16 text-center">
                Work Experience
              </h2>
            </FadeIn>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-foreground/10 hidden sm:block" />
              <div className="space-y-10">
                <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0 flex items-start pt-1">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-md z-10">
                      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-surface-dark rounded-2xl p-7 border border-foreground/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold font-heading text-white">Assistant Supervisor — Retail</h3>
                      <span className="text-accent text-sm font-semibold shrink-0">Prior Experience</span>
                    </div>
                    <p className="text-white/80 font-body mb-1">Chase Value, Faisalabad</p>
                    <p className="text-white/50 text-sm font-body mb-6">Retail Management · Pakistan</p>
                    
                    {/* Image Gallery */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/5">
                        <Image
                          src="/images/experience-1.jpeg"
                          alt="Rana Summar at Chase Value Store"
                          fill
                          sizes="(max-width: 768px) 50vw, 350px"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/5">
                        <Image
                          src="/images/experience-2.jpeg"
                          alt="Rana Summar receiving recognition at Chase Value"
                          fill
                          sizes="(max-width: 768px) 50vw, 350px"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────── */}
        <section id="about" className="py-24 px-6 bg-surface-dark text-background">
          <FadeIn className="w-full max-w-4xl mx-auto">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
              About Me
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6 text-center">
              From Retail to AI Development
            </h2>
            <div className="space-y-6 text-white/80 font-body text-lg leading-relaxed text-center sm:text-left">
              <p>
                I am a final-year BS Software Engineering student at the University of Agriculture, Faisalabad, currently based in Hafizabad, Pakistan. As a freelance Full-Stack AI Developer, I specialize in building intelligent AI agents and robust full-stack applications.
              </p>
              <p>
                Before diving deep into software engineering, I worked in retail management as an Assistant Supervisor at Chase Value, Faisalabad. I carried that discipline, work ethic, and problem-solving mindset into a self-taught transition into AI development, enabling me to build solutions that actually solve real-world problems.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* ── SKILLS ──────────────────────────────────────────── */}
        <SkillsSection />

        {/* ── PROJECTS ────────────────────────────────────────── */}
        <section id="projects" className="py-24 px-6 bg-surface-dark">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
                Portfolio
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-16 text-center">
                Featured Projects
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn delay={0.1} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-colors flex flex-col">
                <h3 className="text-2xl font-bold font-heading text-white mb-3">JobScout AI</h3>
                <p className="text-white/80 font-body mb-6 flex-grow">
                  Autonomous AI agent for CV parsing, real job matching, aur dashboard presentation. Built for SMIT (Saylani) Hackathon.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Next.js 14", "FastAPI", "LangChain/LangGraph", "Groq (llama-3.3-70b-versatile)", "Gemini", "Tavily", "HF Spaces", "Vercel"].map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="text-sm font-semibold text-accent hover:text-white transition-colors">View Live Demo &rarr;</Link>
                  <Link href="#" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">GitHub &rarr;</Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-colors flex flex-col">
                <h3 className="text-2xl font-bold font-heading text-white mb-3">Kisaan Assistant</h3>
                <p className="text-white/80 font-body mb-6 flex-grow">
                  Agricultural assistant agent with live Pakistan crop prices (AMIS/PBS se scraped) and DRAP-approved pesticide recommendations. Strict no-fake-data policy.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Whisper API", "Web Speech API"].map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="text-sm font-semibold text-accent hover:text-white transition-colors">View Live Demo &rarr;</Link>
                  <Link href="#" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">GitHub &rarr;</Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.3} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-colors flex flex-col">
                <h3 className="text-2xl font-bold font-heading text-white mb-3">OutbreakIQ</h3>
                <p className="text-white/80 font-body mb-6 flex-grow">
                  Pakistani disease surveillance dashboard tracking Dengue, Malaria, COVID-19, and Heatstroke. Real APIs integrated (WHO GHO, disease.sh, OpenWeatherMap). Settings page with data export + Framer Motion animations.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Next.js 16", "Flask", "HF Spaces", "Neon PostgreSQL"].map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="text-sm font-semibold text-accent hover:text-white transition-colors">View Live Demo &rarr;</Link>
                  <Link href="#" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">GitHub &rarr;</Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.4} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-colors flex flex-col">
                <h3 className="text-2xl font-bold font-heading text-white mb-3">AgroTrade International</h3>
                <p className="text-white/80 font-body mb-6 flex-grow">
                  International agricultural commodities trading platform.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Next.js 14", "Prisma", "Supabase", "World Bank Commodity Price API"].map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="text-sm font-semibold text-accent hover:text-white transition-colors">View Live Demo &rarr;</Link>
                  <Link href="#" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">GitHub &rarr;</Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        {/* ── 4. CERTIFICATES ──────────────────────────────────── */}
        <section id="certificates" className="py-24 px-6 bg-background border-t border-foreground/5">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
                Credentials
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-16 text-center">
                Certificates
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">

              {/* Certificate 1: Chase Value — Image */}
              <FadeIn delay={0.1} className="bg-surface-dark rounded-2xl overflow-hidden border border-foreground/10 hover:border-accent/50 transition-colors flex flex-col">
                <div className="relative w-full h-56 overflow-hidden bg-white/5">
                  <Image
                    src="/certificates/chase_value_certificate.jpeg"
                    alt="Chase Value Certificate of Achievement — Star Badge Award"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-heading text-white mb-1">Certificate of Achievement — Star Badge Award</h3>
                  <p className="text-accent text-sm font-semibold mb-1">Chase Value</p>
                  <p className="text-white/50 text-sm font-body mb-4">Mar 2023</p>
                  <p className="text-white/60 text-sm font-body leading-relaxed">
                    For extraordinary customer service &amp; selling skills and in recognition of Star Badge Award.
                  </p>
                </div>
              </FadeIn>

              {/* Certificate 2: CS50x Puzzle Day — PDF with iframe preview */}
              <FadeIn delay={0.2} className="bg-surface-dark rounded-2xl overflow-hidden border border-foreground/10 hover:border-accent/50 transition-colors flex flex-col">
                <div className="relative w-full h-56 overflow-hidden bg-white/5">
                  <iframe
                    src="/certificates/cs50x_puzzle_day_2026.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                    className="absolute w-[130%] h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none select-none"
                    title="CS50x Puzzle Day 2026 Certificate Preview"
                  />
                  <div className="absolute inset-0 bg-transparent z-10" /> {/* Click prevention overlay */}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-heading text-white mb-1">CS50x Puzzle Day 2026</h3>
                  <p className="text-accent text-sm font-semibold mb-1">Harvard University</p>
                  <p className="text-white/50 text-sm font-body mb-4">2026</p>
                  <p className="text-white/60 text-sm font-body leading-relaxed mb-4">
                    Recognition for participation in CS50x Puzzle Day 2026 — an online, social event promoting collaboration and problem-solving.
                  </p>
                  <div className="mt-auto">
                    <a
                      href="/certificates/cs50x_puzzle_day_2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent hover:text-foreground transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View / Download
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Certificate 3: Intro to Cybersecurity — PDF with iframe preview */}
              <FadeIn delay={0.3} className="bg-surface-dark rounded-2xl overflow-hidden border border-foreground/10 hover:border-accent/50 transition-colors flex flex-col">
                <div className="relative w-full h-56 overflow-hidden bg-white/5">
                  <iframe
                    src="/certificates/introduction_to_cybersecurity_certificate.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                    className="absolute w-[130%] h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none select-none"
                    title="Introduction to Cybersecurity Certificate Preview"
                  />
                  <div className="absolute inset-0 bg-transparent z-10" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-heading text-white mb-1">Introduction to Cybersecurity</h3>
                  <p className="text-accent text-sm font-semibold mb-1">Cisco Networking Academy</p>
                  <p className="text-white/50 text-sm font-body mb-4">01 Mar 2026</p>
                  <p className="text-white/60 text-sm font-body leading-relaxed mb-4">
                    Successfully completed Introduction to Cybersecurity offered by Networking Academy through the Cisco Networking Academy program.
                  </p>
                  <div className="mt-auto">
                    <a
                      href="/certificates/introduction_to_cybersecurity_certificate.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent hover:text-foreground transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View / Download
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Certificate 4: Networking Devices — PDF with iframe preview */}
              <FadeIn delay={0.4} className="bg-surface-dark rounded-2xl overflow-hidden border border-foreground/10 hover:border-accent/50 transition-colors flex flex-col">
                <div className="relative w-full h-56 overflow-hidden bg-white/5">
                  <iframe
                    src="/certificates/networking_devices_and_initial_configuration.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                    className="absolute w-[130%] h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none select-none"
                    title="Networking Devices Certificate Preview"
                  />
                  <div className="absolute inset-0 bg-transparent z-10" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-heading text-white mb-1">Networking Devices and Initial Configuration</h3>
                  <p className="text-accent text-sm font-semibold mb-1">Cisco Networking Academy</p>
                  <p className="text-white/50 text-sm font-body mb-4">09 Mar 2026</p>
                  <p className="text-white/60 text-sm font-body leading-relaxed mb-4">
                    Successfully completed Networking Devices and Initial Configuration offered by Networking Academy through the Cisco Networking Academy program.
                  </p>
                  <div className="mt-auto">
                    <a
                      href="/certificates/networking_devices_and_initial_configuration.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent hover:text-foreground transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View / Download
                    </a>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>


        {/* ── 6. CONTACT & SOCIALS ────────────────────────────── */}
        <section id="contact" className="py-24 px-6 bg-background border-t border-foreground/5">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-6">
                Let&apos;s Work Together
              </h2>
              <p className="text-foreground/70 font-body text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
                Whether you need an AI agent, a full-stack application, or want to collaborate on something new — I&apos;d love to hear from you.
              </p>

              {/* Social Icons / Links Row */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target={social.isExternal ? "_blank" : undefined}
                    rel={social.isExternal ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 shadow-sm ${
                      social.isPrimary
                        ? "bg-accent text-foreground hover:brightness-110"
                        : "border border-foreground/20 bg-background text-foreground hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>


        {/* ── 8. FOOTER ────────────────────────────────────────── */}
        <footer className="bg-foreground text-background py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-background/60">
              &copy; {new Date().getFullYear()} Rana Summar. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#home" className="text-background/60 hover:text-accent transition-colors">Back to Top</Link>
              <Link href="#projects" className="text-background/60 hover:text-accent transition-colors">Projects</Link>
              <Link href="#contact" className="text-background/60 hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
