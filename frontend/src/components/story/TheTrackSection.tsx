"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Flag, Flame, Zap, Trophy, type LucideIcon } from "lucide-react";
import { trackMilestones } from "@/data/story";

const iconMap: Record<string, LucideIcon> = {
  Flag,
  Flame,
  Zap,
  Trophy,
};

export function TheTrackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Runner moves along track: 2% to 92% of track length
  const runnerLeft = useTransform(smoothProgress, [0, 1], ["4%", "92%"]);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 shadow-[0_0_8px_rgba(201,162,39,0.15)] mb-4">
            THE TRACK
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight mb-4">
            The run that changed my life
          </h2>
          <p className="text-white/70 font-body text-base sm:text-lg">
            600 meters in full afternoon heat. No spikes, no prior athletic training — just endurance and a second chance.
          </p>
        </div>

        {/* 4-Lane Running Track Visual */}
        <div className="relative mb-14 rounded-3xl bg-gradient-to-r from-[#17130c] via-[#22180d] to-[#1a1309] border-2 border-accent/40 p-5 sm:p-7 shadow-[0_20px_60px_rgba(201,162,39,0.15)] overflow-hidden">
          {/* Subtle track texture / gravel glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(201,162,39,0.1) 0px, rgba(201,162,39,0.1) 1px, transparent 1px, transparent 40px)",
            }}
          />

          {/* 4 Lanes */}
          <div className="space-y-3 relative z-10">
            {[1, 2, 3, 4].map((lane) => (
              <div
                key={lane}
                className="relative h-11 sm:h-14 rounded-xl border-y border-dashed border-white/20 flex items-center justify-between px-4 bg-black/35"
              >
                {/* Lane Label */}
                <span className="text-[11px] sm:text-xs font-heading font-bold text-white/30 tracking-widest uppercase">
                  LANE 0{lane}
                </span>

                {/* Meter markers along lane */}
                <div className="flex items-center gap-12 sm:gap-24 text-[10px] sm:text-xs font-heading font-semibold text-white/20 select-none">
                  <span>100m</span>
                  <span>200m</span>
                  <span>300m</span>
                  <span>400m</span>
                  <span>500m</span>
                </div>

                {/* Finish Line Checkered Strip */}
                <div
                  aria-hidden="true"
                  className="w-4 h-full rounded-sm opacity-80"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #FFF 0, #FFF 6px, #000 6px, #000 12px)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Moving Golden Runner (runs in Lane 2) */}
          <motion.div
            style={{
              left: prefersReducedMotion ? "90%" : runnerLeft,
            }}
            className="absolute top-16 sm:top-20 z-20 -translate-x-1/2 flex flex-col items-center pointer-events-none"
          >
            {/* Glowing Golden Runner Badge */}
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-amber-400 via-accent to-amber-500 text-surface-dark flex items-center justify-center shadow-[0_0_25px_rgba(201,162,39,0.9)] border-2 border-white">
                <span className="text-base sm:text-lg">🏃‍♂️</span>
              </div>
              <div className="absolute -inset-1 rounded-full border border-amber-300 animate-ping opacity-60" />
            </div>

            {/* Runner Pill Badge */}
            <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-heading font-extrabold bg-surface-dark text-accent border border-accent shadow-md whitespace-nowrap">
              Rana Summar #1
            </span>
          </motion.div>
        </div>

        {/* 4 Track Milestones Underneath */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trackMilestones.map((milestone, idx) => {
            const Icon = iconMap[milestone.iconName] || Flag;
            return (
              <motion.div
                key={milestone.distance}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 border border-white/10 hover:border-accent/50 p-6 sm:p-7 shadow-lg flex flex-col justify-between transition-all hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-heading font-bold text-accent tracking-wider uppercase px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30">
                      {milestone.distance}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-surface-dark transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-white mb-2 leading-snug">
                    {milestone.title}
                  </h3>
                  <p className="text-white/70 font-body text-xs sm:text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
