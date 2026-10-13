"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { stats, StoryStat } from "@/data/story";

interface StatCardProps {
  stat: StoryStat;
  index: number;
  prefersReducedMotion: boolean;
}

function StatCard({ stat, index, prefersReducedMotion }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.35 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayValue(stat.value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1.4; // seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // easeOutExpo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.round(easeProgress * stat.value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, stat.value, prefersReducedMotion]);

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border border-white/10 hover:border-accent/50 p-7 sm:p-8 shadow-xl hover:shadow-[0_20px_50px_rgba(201,162,39,0.18)] transition-all hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
    >
      {/* Golden Backlight Glow on Hover */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-accent/15 to-amber-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      <div className="relative z-10">
        <div className="flex items-baseline gap-1 mb-3">
          {stat.prefix && (
            <span className="text-2xl sm:text-3xl font-extrabold font-heading text-accent">
              {stat.prefix}
            </span>
          )}
          <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight bg-gradient-to-r from-amber-200 via-accent to-amber-400 bg-clip-text text-transparent tabular-nums">
            {displayValue}
          </span>
          {stat.suffix && (
            <span className="text-xl sm:text-2xl font-bold font-heading text-accent/80 ml-1">
              {stat.suffix}
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-2 leading-snug group-hover:text-amber-200 transition-colors">
          {stat.label}
        </h3>

        <p className="text-xs sm:text-sm text-white/65 font-body leading-relaxed">
          {stat.sub}
        </p>
      </div>
    </motion.div>
  );
}

export function InNumbersSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 shadow-[0_0_8px_rgba(201,162,39,0.15)] mb-4">
            IN NUMBERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight mb-4">
            My story, counted
          </h2>
          <p className="text-white/70 font-body text-base sm:text-lg">
            Hard milestones distilled into numbers that define the turning points.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {stats.map((stat, idx) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={idx}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
