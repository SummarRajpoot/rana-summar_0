"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { MapPin, Compass } from "lucide-react";
import { journeyStops } from "@/data/story";

export function TheJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 shadow-[0_0_8px_rgba(201,162,39,0.15)] mb-4">
            THE JOURNEY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight mb-4">
            Five places that made me
          </h2>
          <p className="text-white/70 font-body text-base sm:text-lg">
            A geography of growth — each stop instilled a different principle of grit, discipline, and purpose.
          </p>
        </div>

        {/* Desktop / Tablet Animated SVG Route */}
        <div className="hidden md:block relative mb-12">
          {/* SVG Connecting Line */}
          <div className="relative h-24 w-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 100"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Background Guideline */}
              <path
                d="M 50 50 Q 250 20 500 50 T 950 50"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="3"
                strokeDasharray="6 6"
              />

              {/* Animated Drawing Path */}
              <motion.path
                d="M 50 50 Q 250 20 500 50 T 950 50"
                stroke="url(#route-gold-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  pathLength: prefersReducedMotion ? 1 : pathProgress,
                }}
              />

              {/* Gradient Definition */}
              <defs>
                <linearGradient id="route-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#C9A227" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 5 Nodes positioned along the 5 stops */}
          <div className="grid grid-cols-5 gap-4 -mt-16 relative z-10">
            {journeyStops.map((stop, index) => (
              <motion.div
                key={stop.id}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex flex-col items-center text-center px-2 group"
              >
                {/* Glowing Pulsing Node */}
                <div className="relative mb-5 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-surface-dark border-2 border-accent text-accent flex items-center justify-center shadow-[0_0_18px_rgba(201,162,39,0.4)] group-hover:scale-115 group-hover:border-amber-300 transition-all duration-300 z-10">
                    <MapPin className="w-5 h-5 text-accent group-hover:text-amber-200" />
                  </div>
                  {/* Outer pulse halo */}
                  <div className="absolute -inset-2 rounded-full border border-accent/40 animate-ping pointer-events-none opacity-40" />
                </div>

                {/* Stop Card */}
                <div className="w-full rounded-2xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 border border-white/10 hover:border-accent/40 p-4 shadow-lg transition-all hover:-translate-y-1">
                  <span className="text-[11px] font-heading font-bold text-accent tracking-wider uppercase block mb-1">
                    Stop 0{stop.id}
                  </span>
                  <h3 className="text-base font-bold font-heading text-white mb-1">
                    {stop.name}
                  </h3>
                  <span className="text-xs font-semibold text-white/50 block mb-2">
                    {stop.role}
                  </span>
                  <p className="text-xs text-white/70 font-body leading-relaxed">
                    {stop.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Flow */}
        <div className="block md:hidden relative pl-6 border-l-2 border-accent/30 space-y-8 ml-3 mb-10">
          {journeyStops.map((stop, index) => (
            <motion.div
              key={stop.id}
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative"
            >
              {/* Node dot on line */}
              <div className="absolute -left-[31px] top-4 w-7 h-7 rounded-full bg-surface-dark border-2 border-accent text-accent flex items-center justify-center shadow-[0_0_12px_rgba(201,162,39,0.4)]">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>

              {/* Card */}
              <div className="rounded-2xl bg-surface-dark border border-white/10 p-5 shadow-md">
                <span className="text-[11px] font-heading font-bold text-accent tracking-wider uppercase block mb-1">
                  Stop 0{stop.id} &bull; {stop.role}
                </span>
                <h3 className="text-lg font-bold font-heading text-white mb-2">
                  {stop.name}
                </h3>
                <p className="text-sm text-white/75 font-body leading-relaxed">
                  {stop.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-note */}
        <div className="text-center flex items-center justify-center gap-2 text-xs font-body text-white/45">
          <Compass className="w-3.5 h-3.5 text-accent/60" />
          <span>Stylised route, not to scale.</span>
        </div>
      </div>
    </section>
  );
}
