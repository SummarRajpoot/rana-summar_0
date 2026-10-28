"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
  isReducedMotion: boolean;
}

function Word({ children, progress, range, isReducedMotion }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  if (isReducedMotion) {
    return <span className="inline-block mr-[0.25em] text-[#F7F5F0]">{children}</span>;
  }

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-[0.25em] text-[#F7F5F0] transition-colors"
    >
      {children}
    </motion.span>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  });

  const p1 =
    "I am a final-year BS Software Engineering student at the University of Agriculture, Faisalabad, currently based in Hafizabad, Pakistan. As a freelance Full-Stack AI Developer, I specialize in building intelligent AI agents and robust full-stack applications.";

  const p2 =
    "Before diving deep into software engineering, I worked in retail management as an Assistant Supervisor at Chase Value, Faisalabad. I carried that discipline, work ethic, and problem-solving mindset into a self-taught transition into AI development, enabling me to build solutions that actually solve real-world problems.";

  const words1 = p1.split(" ");
  const words2 = p2.split(" ");
  const totalWords = words1.length + words2.length;

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 sm:py-32 px-6 relative bg-[#1B2745]/60 border-y border-[#4FD1C5]/15"
    >
      <div className="max-w-[1160px] mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow-label mb-3">About Me</div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] mb-12 tracking-tight">
            From Retail to <span className="font-heading italic accent-shimmer">AI Development</span>
          </h2>

          <div className="space-y-8 font-body text-lg sm:text-2xl leading-relaxed text-left [text-wrap:pretty]">
            <p className="flex flex-wrap">
              {words1.map((word, i) => {
                const start = i / totalWords;
                const end = start + 1 / totalWords;
                return (
                  <Word
                    key={`p1-${i}`}
                    progress={scrollYProgress}
                    range={[start, end]}
                    isReducedMotion={prefersReducedMotion}
                  >
                    {word}
                  </Word>
                );
              })}
            </p>

            <p className="flex flex-wrap">
              {words2.map((word, i) => {
                const start = (words1.length + i) / totalWords;
                const end = start + 1 / totalWords;
                return (
                  <Word
                    key={`p2-${i}`}
                    progress={scrollYProgress}
                    range={[start, end]}
                    isReducedMotion={prefersReducedMotion}
                  >
                    {word}
                  </Word>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

