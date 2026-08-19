import { FadeIn } from "@/components/FadeIn";
import { Navbar } from "@/components/Navbar";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const FiverrIcon = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5v2H9v2h2v6h2v-6h2v-2h-2V7h-2z" />
  </svg>
);

const UpworkIcon = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.396-2.007 1.258-3.328 2.838-3.328 1.408 0 2.502 1.134 2.502 2.766 0 1.632-1.094 2.907-2.502 2.907zM18.561 5.5c-3.03 0-4.838 2.05-5.66 4.353-1.085-1.632-1.74-3.79-2.124-5.853H8.318v7.414c0 1.846-1.127 3.328-2.838 3.328-1.71 0-2.838-1.482-2.838-3.328V4h-2.64v7.414c0 3.308 2.274 5.966 5.478 5.966 3.204 0 5.478-2.658 5.478-5.966v-1.196c.456 1.482 1.232 3.013 2.378 4.298l-2.004 9.484h2.75l1.458-6.904c.91.564 1.944.876 3.074.876 3.03 0 5.478-2.482 5.478-6.136 0-3.654-2.448-6.136-5.478-6.136z"/>
  </svg>
);

const TikTokIcon = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const socialLinks = [
  {
    name: "Phone",
    href: "tel:+923087322219",
    isPrimary: false,
    isExternal: false,
    icon: <Phone className="w-5 h-5 shrink-0" />,
  },
  {
    name: "Email",
    href: "mailto:ranasummar48@gmail.com",
    isPrimary: true,
    isExternal: false,
    icon: <Mail className="w-5 h-5 shrink-0" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/SummarRajpoot",
    isPrimary: false,
    isExternal: true,
    icon: <FaGithub className="w-5 h-5 shrink-0" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rana-summar-295a1a262/",
    isPrimary: false,
    isExternal: true,
    icon: <FaLinkedin className="w-5 h-5 shrink-0" />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/rana.summar.756",
    isPrimary: false,
    isExternal: true,
    icon: <FaFacebook className="w-5 h-5 shrink-0" />,
  },
  {
    name: "Fiverr",
    href: "https://www.fiverr.com/rana_summar",
    isPrimary: false,
    isExternal: true,
    icon: <FiverrIcon className="w-5 h-5 shrink-0" />,
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/ranasummar",
    isPrimary: false,
    isExternal: true,
    icon: <UpworkIcon className="w-5 h-5 shrink-0" />,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/RanaSummar4",
    isPrimary: false,
    isExternal: true,
    icon: <FaXTwitter className="w-5 h-5 shrink-0" />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@ranasummar_0",
    isPrimary: false,
    isExternal: true,
    icon: <TikTokIcon className="w-5 h-5 shrink-0" />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ranasummar_0",
    isPrimary: false,
    isExternal: true,
    icon: <FaYoutube className="w-5 h-5 shrink-0" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ranasummar_0/",
    isPrimary: false,
    isExternal: true,
    icon: <FaInstagram className="w-5 h-5 shrink-0" />,
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
                Full-Stack AI Software Engineer
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-foreground mb-6">
                Rana Summar
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 font-body mb-8 max-w-2xl leading-relaxed">
                Final-year Software Engineering student. I build AI agents and scalable full-stack applications with Next.js, FastAPI, and LangChain.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full sm:w-auto">
                <Link
                  href="#projects"
                  className="w-full sm:w-auto bg-accent text-foreground px-7 py-3 rounded-full font-semibold hover:brightness-110 transition-all flex items-center justify-center text-sm sm:text-base"
                >
                  View Projects
                </Link>
                <a
                  href="https://www.fiverr.com/rana_summar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border-2 border-foreground text-foreground px-6 py-3 rounded-full font-semibold hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <FiverrIcon className="w-4 h-4 shrink-0" />
                  <span>Hire Me on Fiverr</span>
                </a>
                <a
                  href="https://www.upwork.com/freelancers/ranasummar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border-2 border-foreground text-foreground px-6 py-3 rounded-full font-semibold hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <UpworkIcon className="w-4 h-4 shrink-0" />
                  <span>Hire Me on Upwork</span>
                </a>
              </div>

              <a
                href="/cv/rana-summar-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground group transition-colors"
              >
                <svg
                  className="w-4 h-4 text-foreground/80 group-hover:text-accent transition-colors shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="border-b-2 border-transparent group-hover:border-accent pb-0.5 transition-colors">
                  Download CV
                </span>
              </a>
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
                {/* Experience 1: Saylani Agentic AI Training */}
                <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0 flex items-start pt-1">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-md z-10">
                      {/* Graduation cap icon — education/training role */}
                      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 6.075-4.925 11-11 11S1 18.075 1 12c0-1.486.296-2.903.84-4.196L12 14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-surface-dark rounded-2xl p-7 border border-foreground/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold font-heading text-white">Student — Agentic AI (Batch-1)</h3>
                      <span className="text-accent text-sm font-semibold shrink-0">Training</span>
                    </div>
                    <p className="text-white/80 font-body mb-1">Saylani IT Training Programme (Saylani Welfare International Trust)</p>
                    <p className="text-white/50 text-sm font-body mb-6">IT Training · Pakistan</p>
                    <p className="text-white/60 text-sm font-body mb-6">Completed 7-month Agentic AI training (Nov 2025 – May 2026) as a student at Saylani IT Training Programme.</p>

                    {/* Image Gallery — natural aspect ratio, no cropping */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/saylani-class-1.jpg.jpg"
                          alt="Rana Summar at Saylani Agentic AI class — Batch 1"
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 50vw, 350px"
                          className="w-full h-auto max-h-[360px] object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/saylani-class-2.jpg.jpg"
                          alt="Rana Summar attending Saylani IT Training Programme session"
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 50vw, 350px"
                          className="w-full h-auto max-h-[360px] object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Experience 2: Assistant Supervisor — Retail */}
                <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-6">
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
                    
                    {/* Image Gallery — natural aspect ratio, no cropping */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/experience-1.jpeg"
                          alt="Rana Summar at Chase Value Store"
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 50vw, 350px"
                          className="w-full h-auto max-h-[360px] object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/experience-2.jpeg"
                          alt="Rana Summar receiving recognition at Chase Value"
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 50vw, 350px"
                          className="w-full h-auto max-h-[360px] object-contain hover:scale-105 transition-transform duration-300"
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

              {/* Certificate 5: Saylani Agentic AI (Batch-1) — PDF with iframe preview */}
              <FadeIn delay={0.5} className="bg-surface-dark rounded-2xl overflow-hidden border border-foreground/10 hover:border-accent/50 transition-colors flex flex-col">
                <div className="relative w-full h-56 overflow-hidden bg-white/5">
                  <iframe
                    src="/certificates/saylani-agentic-ai.png.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                    className="absolute w-[130%] h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none select-none"
                    title="Saylani Agentic AI Batch-1 Certificate Preview"
                  />
                  <div className="absolute inset-0 bg-transparent z-10" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-heading text-white mb-1">Agentic AI (Batch-1)</h3>
                  <p className="text-accent text-sm font-semibold mb-1">Saylani IT Training Programme (Saylani Welfare International Trust)</p>
                  <p className="text-white/50 text-sm font-body mb-4">May 2026</p>
                  <p className="text-white/60 text-sm font-body leading-relaxed mb-4">
                    Successfully completed the Agentic AI (Batch-1) training course, 7 months duration (Nov 2025 – May 2026), as a student under the Education Department of Saylani Welfare International Trust.
                  </p>
                  <div className="mt-auto">
                    <a
                      href="/certificates/saylani-agentic-ai.png.pdf"
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

        {/* ── TESTIMONIALS ─────────────────────────────────────── */}
        <TestimonialsSection />

        {/* ── 6. CONTACT ──────────────────────────────────────── */}
        <ContactSection />


        {/* ── 8. FOOTER ────────────────────────────────────────── */}
        <footer className="bg-background border-t border-foreground/10 py-10 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-foreground/70 text-sm font-body">
              &copy; {new Date().getFullYear()} Rana Summar. All rights reserved.
            </p>

            {/* Social Icons Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.isExternal ? "_blank" : undefined}
                  rel={social.isExternal ? "noopener noreferrer" : undefined}
                  title={social.name}
                  aria-label={social.name}
                  className="text-foreground hover:text-accent transition-colors duration-200 p-2 rounded-full hover:bg-foreground/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm font-semibold text-foreground/80">
              <Link href="#home" className="hover:text-accent transition-colors">Back to Top</Link>
              <Link href="#projects" className="hover:text-accent transition-colors">Projects</Link>
              <Link href="#contact" className="hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
