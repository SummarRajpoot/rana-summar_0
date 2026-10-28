"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

const educationItems = [
  {
    degree: "DAE — Textile Dyeing & Printing",
    period: "2019 – 2022",
    institution: "Govt. College of Technology, Samanabad, Faisalabad",
    details: "3-Year Diploma of Associate Engineering (DAE)",
  },
  {
    degree: "BS Software Engineering",
    period: "Sep 2023 – April 2027 (Expected)",
    institution: "University of Agriculture, Faisalabad (UAF)",
    details: "Semester 6 · Section M1 · Final Year · Hafizabad, Pakistan",
  },
  {
    degree: "SMIT (Saylani) — Agentic AI",
    period: "Oct 2024 – Sep 2025",
    institution: "Saylani Mass IT Training Program",
    details: "6-Month Course",
  },
  {
    degree: "SMIT (Saylani) — Artificial Intelligence and Data Science",
    period: "Nov 2025 – April 2026",
    institution: "Saylani Mass IT Training Program",
    details: "6-Month Course",
  },
];

export function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="education" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1160px] mx-auto">
        {/* Eyebrow & Section Heading */}
        <div className="text-center mb-16">
          <div className="eyebrow-label mb-3">Qualifications</div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] tracking-tight">
            Education
          </h2>
        </div>

        {/* Vertical Timeline Container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Background Track Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#4FD1C5]/15 hidden sm:block" />

          {/* Scroll-linked Animated Teal Line */}
          {!prefersReducedMotion && (
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#4FD1C5] via-[#B5F5EC] to-[#4FD1C5] hidden sm:block shadow-[0_0_12px_#4FD1C5]"
            />
          )}

          <div className="space-y-12 sm:space-y-16">
            {educationItems.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.degree}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Dot */}
                  <div className="hidden sm:flex absolute left-6 md:left-1/2 -translate-x-1/2 z-20 items-center justify-center">
                    <motion.div
                      initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="w-10 h-10 rounded-full bg-[#212F54] border-2 border-[#4FD1C5] flex items-center justify-center shadow-[0_0_16px_rgba(79,209,197,0.45)]"
                    >
                      <motion.div
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : {
                                scale: [1, 1.4, 1],
                                opacity: [0.8, 1, 0.8],
                              }
                        }
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-3 h-3 rounded-full bg-[#4FD1C5] shadow-[0_0_8px_#4FD1C5]"
                      />
                    </motion.div>
                  </div>

                  {/* Card Content (Alternates left & right) */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 0,
                            x: isEven ? 50 : -50,
                          }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.85,
                      ease: [0.22, 0.7, 0.2, 1],
                      delay: idx * 0.1,
                    }}
                    className={`w-full md:w-[calc(50%-40px)] sm:pl-16 md:pl-0 ${
                      isEven ? "md:pl-8" : "md:pr-8"
                    }`}
                  >
                    <div className="surface-card rounded-[20px] p-7 sm:p-8 hover:border-[#4FD1C5]/50 transition-all duration-300 shadow-[0_12px_40px_rgba(10,18,34,0.4)] group">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-3">
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-[#F7F5F0] group-hover:text-[#B5F5EC] transition-colors">
                          {item.degree}
                        </h3>
                        <span className="text-[#4FD1C5] text-xs sm:text-sm font-semibold shrink-0 bg-[#4FD1C5]/10 px-3 py-1 rounded-full border border-[#4FD1C5]/20">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-[#C9D1E3] font-body text-sm sm:text-base mb-2">
                        {item.institution}
                      </p>
                      <p className="text-[#AEB8D0] text-xs sm:text-sm font-body">
                        {item.details}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

