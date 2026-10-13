"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, GitFork, Lightbulb, Sparkles } from "lucide-react";
import { pathSteps, pathDetour } from "@/data/story";

export function ThePathSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 shadow-[0_0_8px_rgba(201,162,39,0.15)] mb-4">
            THE PATH
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight mb-4">
            Not a straight line
          </h2>
          <p className="text-white/70 font-body text-base sm:text-lg">
            Engineering wasn&apos;t a handed-down path. It was an unconventional route built one pivot at a time.
          </p>
        </div>

        {/* Connected Steps with Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pathSteps.map((step, idx) => {
            const isLast = idx === pathSteps.length - 1;
            return (
              <motion.div
                key={step.step}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`relative rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all hover:-translate-y-1 ${
                  step.isCurrent
                    ? "bg-gradient-to-br from-[#1f1708] via-[#1a1407] to-[#120e05] border-accent shadow-[0_0_35px_rgba(201,162,39,0.3)] ring-1 ring-accent/40"
                    : "bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 border-white/10 hover:border-accent/40 shadow-lg"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-heading font-extrabold px-3 py-1 rounded-full border ${
                        step.isCurrent
                          ? "bg-accent text-surface-dark border-amber-300 shadow-md"
                          : "bg-white/5 text-accent border-accent/30"
                      }`}
                    >
                      Step 0{step.step}
                    </span>

                    <span className="text-xs font-semibold text-white/40 tracking-wider uppercase">
                      {step.category}
                    </span>
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-bold font-heading mb-2 leading-snug ${
                      step.isCurrent ? "text-amber-200" : "text-white"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow to Next Step (if not last) */}
                {!isLast && (
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-end text-accent/50">
                    <span className="text-[11px] font-heading font-semibold uppercase tracking-wider mr-2">
                      Next
                    </span>
                    <ArrowRight className="hidden lg:block w-4 h-4" />
                    <ArrowDown className="block lg:hidden w-4 h-4" />
                  </div>
                )}

                {isLast && (
                  <div className="mt-5 pt-3 border-t border-accent/20 flex items-center justify-between text-accent font-heading text-xs font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Current Milestone
                    </span>
                    <span>Today</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Dashed Detour Card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-3xl bg-gradient-to-br from-[#15120d] via-[#1a150e] to-[#110e09] border-2 border-dashed border-accent/50 p-7 sm:p-9 md:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/10 via-accent/20 to-cyan-500/10 blur-xl opacity-60 pointer-events-none"
          />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                  <GitFork className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-accent block">
                    The detour:
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    {pathDetour.title}
                  </h3>
                </div>
              </div>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-bold text-amber-200 bg-amber-400/15 border border-amber-300/30 self-start sm:self-auto">
                {pathDetour.badge}
              </span>
            </div>

            <p className="text-white/80 font-body text-sm sm:text-base leading-relaxed mb-6">
              {pathDetour.description}
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-accent/30 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-accent/25 flex items-center justify-center text-accent shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4 text-amber-200" />
              </div>
              <p className="text-xs sm:text-sm text-white/90 font-body font-medium leading-relaxed italic">
                &ldquo;{pathDetour.lesson}&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
