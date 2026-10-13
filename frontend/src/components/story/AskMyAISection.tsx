"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare, Sparkles, ArrowUpRight } from "lucide-react";
import { askChips } from "@/data/story";

export function AskMyAISection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const handleAskQuestion = (question: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-chat", { detail: { question } }));
    }
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 shadow-[0_0_8px_rgba(201,162,39,0.15)] mb-4">
            ASK MY AI
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight mb-4">
            Ask about my story
          </h2>
          <p className="text-white/70 font-body text-base sm:text-lg">
            Have a specific question about my background, projects, or degree transition? Click any prompt to chat with my AI assistant.
          </p>
        </div>

        {/* Question Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
          {askChips.map((chip, idx) => (
            <motion.button
              key={chip}
              type="button"
              onClick={() => handleAskQuestion(chip)}
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="group relative inline-flex items-center gap-2.5 px-4.5 py-3 sm:px-5 sm:py-3.5 rounded-full bg-surface-dark border border-white/10 hover:border-accent/70 hover:bg-white/[0.04] text-white/90 hover:text-white font-body text-xs sm:text-sm font-medium shadow-md hover:shadow-[0_0_20px_rgba(201,162,39,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer text-left"
            >
              <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/35 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-3 h-3" />
              </div>

              <span>{chip}</span>

              <ArrowUpRight className="w-3.5 h-3.5 text-accent/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.button>
          ))}
        </div>

        {/* Hint footer */}
        <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs font-body text-white/50">
          <MessageSquare className="w-3.5 h-3.5 text-accent" />
          <span>Powered by Summar AI — grounded directly in my real resume and portfolio knowledge.</span>
        </div>
      </div>
    </section>
  );
}
