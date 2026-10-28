import { Navbar } from "@/components/Navbar";
import { TypewriterEyebrow } from "@/components/luxury/TypewriterEyebrow";
import { HeroPhoto } from "@/components/luxury/HeroPhoto";
import { RollButton } from "@/components/luxury/RollButton";
import { ReadStoryHeroButton } from "@/components/ReadStoryHeroButton";
import { TechMarquee, LargeWordsMarquee } from "@/components/luxury/MarqueeBands";
import { EducationSection } from "@/components/luxury/EducationSection";
import { ExperienceSection } from "@/components/luxury/ExperienceSection";
import { AboutSection } from "@/components/luxury/AboutSection";
import { MySelfSection } from "@/components/MySelfSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/luxury/ProjectsSection";
import { CertificatesSection } from "@/components/luxury/CertificatesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { FooterSection } from "@/components/luxury/FooterSection";

const FiverrIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5v2H9v2h2v6h2v-6h2v-2h-2V7h-2z" />
  </svg>
);

const UpworkIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.396-2.007 1.258-3.328 2.838-3.328 1.408 0 2.502 1.134 2.502 2.766 0 1.632-1.094 2.907-2.502 2.907zM18.561 5.5c-3.03 0-4.838 2.05-5.66 4.353-1.085-1.632-1.74-3.79-2.124-5.853H8.318v7.414c0 1.846-1.127 3.328-2.838 3.328-1.71 0-2.838-1.482-2.838-3.328V4h-2.64v7.414c0 3.308 2.274 5.966 5.478 5.966 3.204 0 5.478-2.658 5.478-5.966v-1.196c.456 1.482 1.232 3.013 2.378 4.298l-2.004 9.484h2.75l1.458-6.904c.91.564 1.944.876 3.074.876 3.03 0 5.478-2.482 5.478-6.136 0-3.654-2.448-6.136-5.478-6.136z"/>
  </svg>
);

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── 1. HERO ──────────────────────────────────────────── */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-16 relative"
        >
          <div className="w-full max-w-[1160px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <TypewriterEyebrow text="FULL-STACK AI DEVELOPER" className="mb-4" />

              <h1 className="font-heading font-bold text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.04] tracking-[-0.03em] text-[#F7F5F0] mb-6">
                <span className="block overflow-hidden">
                  <span className="inline-block">
                    Rana{" "}
                    <span className="font-heading italic accent-shimmer drop-shadow-[0_0_20px_rgba(79,209,197,0.4)]">
                      Summar
                    </span>
                  </span>
                </span>
              </h1>

              <p className="font-body font-normal text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.65] text-[#C9D1E3] max-w-[38rem] mb-9">
                Final-year BS Software Engineering student at the University of Agriculture, Faisalabad, and freelance Full-Stack AI Developer. I design, build and deploy AI agents and full-stack web applications with <strong className="font-semibold text-[#F7F5F0]">Next.js</strong>, <strong className="font-semibold text-[#F7F5F0]">FastAPI</strong>, <strong className="font-semibold text-[#F7F5F0]">LangChain</strong> and <strong className="font-semibold text-[#F7F5F0]">LangGraph</strong>.
              </p>

              {/* 4 Buttons stagger */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <ReadStoryHeroButton />
                <RollButton href="#projects" variant="primary">
                  View Projects
                </RollButton>
                <RollButton
                  href="https://www.fiverr.com/rana_summar"
                  isExternal
                  variant="secondary"
                  icon={<FiverrIcon className="w-4 h-4 text-[#4FD1C5]" />}
                >
                  Hire Me on Fiverr
                </RollButton>
                <RollButton
                  href="https://www.upwork.com/freelancers/ranasummar"
                  isExternal
                  variant="secondary"
                  icon={<UpworkIcon className="w-4 h-4 text-[#4FD1C5]" />}
                >
                  Hire Me on Upwork
                </RollButton>
              </div>

              {/* Download CV */}
              <div className="mt-5">
                <a
                  href="/cv/rana-summar-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9D1E3] hover:text-[#4FD1C5] group transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-[#4FD1C5] group-hover:translate-y-0.5 transition-transform shrink-0"
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
                  <span className="border-b border-transparent group-hover:border-[#4FD1C5] pb-0.5 transition-colors">
                    Download CV
                  </span>
                </a>
              </div>

              {/* Sub Metadata Row */}
              <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-x-3.5 gap-y-2 font-body font-medium text-[0.8125rem] tracking-[0.02em] text-[#AEB8D0]">
                <span>Hafizabad, Pakistan</span>
                <span className="hidden sm:inline-block w-px h-3.5 bg-[#4FD1C5]/30" aria-hidden="true" />
                <span>Freelance on Fiverr</span>
                <span className="hidden sm:inline-block w-px h-3.5 bg-[#4FD1C5]/30" aria-hidden="true" />
                <span>BS Software Engineering, UAF</span>
              </div>
            </div>

            {/* Profile Photo */}
            <HeroPhoto />
          </div>

          {/* Animated Scroll Cue */}
          <div className="w-full flex justify-center mt-12 mb-2">
            <a
              href="#education"
              aria-label="Scroll down to Education"
              className="flex flex-col items-center gap-2 text-[#AEB8D0] hover:text-[#4FD1C5] transition-colors group"
            >
              <div className="w-6 h-10 rounded-full border-[1.5px] border-[#4FD1C5]/40 group-hover:border-[#4FD1C5] flex items-start justify-center p-1.5 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5] shadow-[0_0_6px_#4FD1C5] animate-[bounce_2s_infinite]" />
              </div>
            </a>
          </div>
        </section>

        {/* ── TECH MARQUEE BAND (a) ────────────────────────────── */}
        <TechMarquee />

        {/* ── 2. EDUCATION ─────────────────────────────────────── */}
        <EducationSection />

        {/* ── 3. WORK EXPERIENCE ───────────────────────────────── */}
        <ExperienceSection />

        {/* ── 4. ABOUT ME ──────────────────────────────────────── */}
        <AboutSection />

        {/* ── 5. MY SELF ───────────────────────────────────────── */}
        <MySelfSection />

        {/* ── 6. SKILLS ────────────────────────────────────────── */}
        <SkillsSection />

        {/* ── LARGE WORDS MARQUEE BAND (b) ─────────────────────── */}
        <LargeWordsMarquee />

        {/* ── 7. SERVICES & METHODOLOGY & CTA ─────────────────── */}
        <ServicesSection />

        {/* ── 8. FEATURED PROJECTS ─────────────────────────────── */}
        <ProjectsSection />

        {/* ── 9. CERTIFICATES & VERIFICATION ───────────────────── */}
        <CertificatesSection />

        {/* ── 10. TESTIMONIALS ─────────────────────────────────── */}
        <TestimonialsSection />

        {/* ── 11. CONTACT & AVAILABILITY ───────────────────────── */}
        <ContactSection />

        {/* ── 12. FOOTER ───────────────────────────────────────── */}
        <FooterSection />
      </main>
    </>
  );
}
