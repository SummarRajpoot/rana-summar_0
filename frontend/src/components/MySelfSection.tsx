"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

export function MySelfSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const titleLetters = "My Self".split("");

  return (
    <section
      id="myself"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-background border-t border-foreground/5 overflow-x-clip"
    >
      {/* Subtle Floating Ambient Golden Orbs */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden md:block absolute top-1/4 left-8 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 40, 0],
              x: [0, -25, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden md:block absolute bottom-1/3 right-8 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl"
          />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.span
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-accent font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block"
        >
          Get To Know Me
        </motion.span>

        {/* Letter by Letter Animated Gradient Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading tracking-tight flex items-center justify-center flex-wrap">
          {titleLetters.map((char, i) => (
            <motion.span
              key={i}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 22, filter: "blur(6px)" }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 220,
                      damping: 16,
                      delay: i * 0.05,
                    }
              }
              className="inline-block bg-gradient-to-r from-amber-200 via-accent to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(201,162,39,0.3)]"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>

        {/* Subtitle */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-foreground/75 font-body text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed"
        >
          The journey from a village to Software Engineering
        </motion.p>

        {/* Animated Golden Underline */}
        <motion.div
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-1 w-28 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6 mb-10 rounded-full origin-center shadow-[0_0_12px_rgba(201,162,39,0.6)]"
        />

        {/* Centered Luxury "Read My Story" Button Linking to /story */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            href="/story"
            className="group relative inline-flex items-center gap-3 px-9 py-4 sm:px-11 sm:py-4.5 rounded-full bg-gradient-to-r from-[#171717] via-[#202020] to-[#141414] border-2 border-accent/70 hover:border-amber-300 text-white font-heading font-extrabold text-base sm:text-lg shadow-[0_0_25px_rgba(201,162,39,0.35)] hover:shadow-[0_0_35px_rgba(201,162,39,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all overflow-hidden cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-accent shrink-0 group-hover:scale-115 transition-transform" />
            <span className="bg-gradient-to-r from-amber-200 via-accent to-amber-300 bg-clip-text text-transparent tracking-wide">
              Read My Story
            </span>
            <ArrowRight className="w-5 h-5 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />

            {/* Shimmer sweep effect on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
