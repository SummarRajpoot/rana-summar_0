"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { ChapterProof } from "@/data/story";
import { TheJourneySection } from "@/components/story/TheJourneySection";
import { TheTrackSection } from "@/components/story/TheTrackSection";
import { InNumbersSection } from "@/components/story/InNumbersSection";
import { ThePathSection } from "@/components/story/ThePathSection";
import { ChaptersSection } from "@/components/story/ChaptersSection";
import { ProofLightbox } from "@/components/story/ProofLightbox";
import { AskMyAISection } from "@/components/story/AskMyAISection";

export function StoryPageContent() {
  const [selectedProof, setSelectedProof] = useState<ChapterProof | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
      className="relative min-h-screen bg-[#1B2745] text-[#F7F5F0] overflow-x-clip selection:bg-[#4FD1C5]/30 selection:text-[#B5F5EC]"
    >
      {/* Background Dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-100 z-0 bg-luxury-dots"
      />

      {/* Floating Ambient Glow Orbs */}
      {!prefersReducedMotion && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -35, 0],
              x: [0, 25, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[#4FD1C5]/08 blur-[120px]"
          />
          <motion.div
            animate={{
              y: [0, 40, 0],
              x: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-[#4A6FB8]/12 blur-[130px]"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-[#B5F5EC]/06 blur-[140px]"
          />
        </div>
      )}

      {/* Main Content Layer */}
      <main className="relative z-10">
        {/* ================================================================== */}
        {/* 1. TOP HERO SECTION */}
        {/* ================================================================== */}
        <section className="pt-12 sm:pt-16 pb-20 sm:pb-24 px-6 border-b border-[#4FD1C5]/15">
          <div className="max-w-[1160px] mx-auto">
            {/* Back Link */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10 sm:mb-14"
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-body font-semibold text-[#C9D1E3] hover:text-[#4FD1C5] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to home</span>
              </Link>
            </motion.div>

            {/* Header Content */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="eyebrow-label mb-5 justify-center">
                <BookOpen className="w-3.5 h-3.5 text-[#4FD1C5]" />
                <span>MY STORY</span>
              </div>

              {/* Big Heading */}
              <motion.h1
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading text-[#F7F5F0] tracking-tight leading-[1.1] mb-6"
              >
                From village fields to{" "}
                <span className="font-heading italic accent-shimmer drop-shadow-[0_2px_20px_rgba(79,209,197,0.4)]">
                  AI engineering.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-[#C9D1E3] font-body text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
              >
                The long version: a soldier&apos;s son who grew up between classrooms and farm fields,
                switched from textile to IT, and found his way to UAF through a 600m race.
              </motion.p>
            </div>
          </div>
        </section>

        {/* 2. THE JOURNEY: Five places that made me */}
        <TheJourneySection />

        {/* 3. THE TRACK: The run that changed my life */}
        <TheTrackSection />

        {/* 4. IN NUMBERS: My story, counted */}
        <InNumbersSection />

        {/* 5. THE PATH: Not a straight line */}
        <ThePathSection />

        {/* 6. THE CHAPTERS: The full story */}
        <ChaptersSection onViewProof={(proof) => setSelectedProof(proof)} />

        {/* 8. ASK MY AI: Ask about my story */}
        <AskMyAISection />

        {/* 9. CLOSING CTA BANNER */}
        <section className="py-24 px-6 border-t border-[#4FD1C5]/15">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-[24px] surface-card p-8 sm:p-12 md:p-14 text-center shadow-[0_20px_60px_rgba(10,18,34,0.6)] overflow-hidden border border-[#4FD1C5]/30">
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="eyebrow-label mb-5 justify-center">Commence Collaboration</div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#F7F5F0] tracking-tight mb-4">
                  Let&apos;s build something{" "}
                  <span className="font-heading italic accent-shimmer drop-shadow-[0_2px_15px_rgba(79,209,197,0.4)]">
                    together.
                  </span>
                </h2>

                <p className="text-[#C9D1E3] font-body text-base sm:text-lg mb-8 leading-relaxed">
                  The village taught me patience. Software lets me use it.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/#contact"
                    className="w-full sm:w-auto btn-primary-luxury px-9 py-4 rounded-full text-base font-semibold text-[#1B2745] shadow-[0_0_25px_rgba(79,209,197,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="https://www.fiverr.com/rana_summar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto rounded-full border-[1.5px] border-[#4FD1C5] text-[#F7F5F0] hover:bg-[#4FD1C5]/15 px-8 py-4 font-body font-semibold text-base transition-all flex items-center justify-center gap-2"
                  >
                    <span>Hire me on Fiverr</span>
                    <ExternalLink className="w-4 h-4 text-[#4FD1C5]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. PROOF LIGHTBOX MODAL */}
      <ProofLightbox proof={selectedProof} onClose={() => setSelectedProof(null)} />
    </motion.div>
  );
}
