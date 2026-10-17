"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Sparkles } from "lucide-react";
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
    <div className="relative min-h-screen bg-[#0A0A0B] text-white overflow-x-clip selection:bg-accent/30 selection:text-white">
      {/* Subtle Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-40 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(201, 162, 39, 0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Floating Ambient Glow Orbs */}
      {!prefersReducedMotion && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Top Gold Orb */}
          <motion.div
            animate={{
              y: [0, -35, 0],
              x: [0, 25, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px]"
          />
          {/* Cyan/Sky Accent Orb */}
          <motion.div
            animate={{
              y: [0, 40, 0],
              x: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-sky-500/[0.06] blur-[130px]"
          />
          {/* Lower Amber Orb */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-amber-500/[0.05] blur-[140px]"
          />
        </div>
      )}

      {/* Main Content Layer */}
      <main className="relative z-10">
        {/* ================================================================== */}
        {/* 1. TOP HERO SECTION */}
        {/* ================================================================== */}
        <section className="pt-12 sm:pt-16 pb-20 sm:pb-24 px-4 sm:px-6 md:px-8 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            {/* Back Link */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10 sm:mb-14"
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-heading font-semibold text-white/70 hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to home</span>
              </Link>
            </motion.div>

            {/* Header Content */}
            <div className="text-center max-w-3xl mx-auto">
              {/* Chip */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-5 inline-block"
              >
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-heading font-extrabold uppercase tracking-widest text-accent bg-accent/10 border border-accent/30 shadow-[0_0_12px_rgba(201,162,39,0.2)]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>MY STORY</span>
                </span>
              </motion.div>

              {/* Big Heading */}
              <motion.h1
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading text-white tracking-tight leading-[1.1] mb-6"
              >
                From village fields to{" "}
                <span className="bg-gradient-to-r from-amber-200 via-accent to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(201,162,39,0.35)]">
                  AI engineering.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-white/75 font-body text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
              >
                The long version: a soldier&apos;s son who grew up between classrooms and farm fields,
                switched from textile to IT, and found his way to UAF through a 600m race.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 2. THE JOURNEY: Five places that made me */}
        {/* ================================================================== */}
        <TheJourneySection />

        {/* ================================================================== */}
        {/* 3. THE TRACK: The run that changed my life */}
        {/* ================================================================== */}
        <TheTrackSection />

        {/* ================================================================== */}
        {/* 4. IN NUMBERS: My story, counted */}
        {/* ================================================================== */}
        <InNumbersSection />

        {/* ================================================================== */}
        {/* 5. THE PATH: Not a straight line */}
        {/* ================================================================== */}
        <ThePathSection />

        {/* ================================================================== */}
        {/* 6. THE CHAPTERS: The full story */}
        {/* ================================================================== */}
        <ChaptersSection onViewProof={(proof) => setSelectedProof(proof)} />

        {/* ================================================================== */}
        {/* 8. ASK MY AI: Ask about my story */}
        {/* ================================================================== */}
        <AskMyAISection />

        {/* ================================================================== */}
        {/* 9. CLOSING CTA BANNER */}
        {/* ================================================================== */}
        <section className="py-24 px-4 sm:px-6 md:px-8 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border border-accent/40 p-8 sm:p-12 md:p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Backlight ambient glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400/15 via-accent/25 to-cyan-400/15 blur-2xl opacity-75 pointer-events-none"
              />

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/30 shadow-[0_0_10px_rgba(201,162,39,0.2)] mb-5">
                  COMMENCE COLLABORATION
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-4">
                  Let&apos;s build something{" "}
                  <span className="bg-gradient-to-r from-amber-200 via-accent to-amber-400 bg-clip-text text-transparent">
                    together.
                  </span>
                </h2>

                <p className="text-white/70 font-body text-base sm:text-lg mb-8 leading-relaxed">
                  The village taught me patience. Software lets me use it.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Primary CTA Button */}
                  <Link
                    href="/#contact"
                    className="w-full sm:w-auto relative group/btn overflow-hidden rounded-full bg-accent text-surface-dark px-9 py-4 font-heading font-extrabold text-base hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(201,162,39,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  {/* Secondary CTA Button: Fiverr */}
                  <a
                    href="https://www.fiverr.com/rana_summar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 font-heading font-semibold text-base transition-all hover:border-accent/50 flex items-center justify-center gap-2"
                  >
                    <span>Hire me on Fiverr</span>
                    <ExternalLink className="w-4 h-4 text-accent/80" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================== */}
      {/* 7. PROOF LIGHTBOX MODAL */}
      {/* ================================================================== */}
      <ProofLightbox proof={selectedProof} onClose={() => setSelectedProof(null)} />
    </div>
  );
}
