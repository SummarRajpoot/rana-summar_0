"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";

export function MySelfSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const titleLetters = "My Self".split("");

  return (
    <section
      id="myself"
      className="py-24 sm:py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-[1160px] mx-auto">
        {/* Dark Panel Block with Moving Aurora */}
        <div className="relative rounded-[24px] bg-[#2C3D6C]/85 border border-[#4FD1C5]/25 p-8 sm:p-14 md:p-20 shadow-[0_20px_60px_rgba(10,18,34,0.5)] overflow-hidden text-center backdrop-blur-md">
          {/* Slow moving aurora gradient */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-20"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(79, 209, 197, 0.4) 0%, rgba(74, 111, 184, 0.3) 35%, transparent 70%)",
              }}
            />
          )}

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Section Eyebrow */}
            <div className="eyebrow-label mb-4 justify-center">Get To Know Me</div>

            {/* Letter by Letter Staggered Heading */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading tracking-tight flex items-center justify-center flex-wrap mb-4">
              {titleLetters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 30, filter: "blur(6px)" }
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
                          stiffness: 240,
                          damping: 18,
                          delay: i * 0.06,
                        }
                  }
                  className="inline-block font-heading italic accent-shimmer drop-shadow-[0_2px_20px_rgba(79,209,197,0.4)]"
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
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[#C9D1E3] font-body text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            >
              The journey from a village to Software Engineering
            </motion.p>

            {/* Magnetic Read My Story Button */}
            <Magnetic strength={0.35}>
              <Link
                href="/story"
                className="group relative inline-flex items-center gap-3 px-9 py-4 sm:px-11 sm:py-4.5 rounded-full btn-primary-luxury text-[#1B2745] font-body font-semibold text-base sm:text-lg shadow-[0_0_30px_rgba(79,209,197,0.35)] hover:shadow-[0_0_45px_rgba(181,245,236,0.6)] active:scale-95 transition-all overflow-hidden cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-[#1B2745] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wide">
                  Read My Story
                </span>
                <ArrowRight className="w-5 h-5 text-[#1B2745] shrink-0 group-hover:translate-x-1.5 transition-transform" />

                {/* Shimmer sweep effect */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none"
                />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
