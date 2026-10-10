"use client";

import { useRef } from "react";
import { FadeIn } from "@/components/FadeIn";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export interface TimelineBlock {
  id: number;
  title: string;
  tag?: string;
  description: string;
}

export const timelineBlocks: TimelineBlock[] = [
  {
    id: 1,
    title: "Who I Am",
    description: "Coming Soon",
  },
  {
    id: 2,
    title: "Roots & Family",
    tag: "Childhood",
    description: "Coming Soon",
  },
  {
    id: 3,
    title: "Early Schooling & Moving Cities",
    tag: "Childhood",
    description: "Coming Soon",
  },
  {
    id: 4,
    title: "Back to the Village",
    description: "Coming Soon",
  },
  {
    id: 5,
    title: "Learning Life on the Farm",
    tag: "2016",
    description: "Coming Soon",
  },
  {
    id: 6,
    title: "Matric & DAE",
    tag: "2018",
    description: "Coming Soon",
  },
  {
    id: 7,
    title: "The Switch to IT",
    description: "Coming Soon",
  },
  {
    id: 8,
    title: "The Sports Quota Trial",
    tag: "2023",
    description: "Coming Soon",
  },
  {
    id: 9,
    title: "The Call That Changed Everything",
    tag: "2023",
    description: "Coming Soon",
  },
  {
    id: 10,
    title: "Study + Job: Balancing Both",
    description: "Coming Soon",
  },
  {
    id: 11,
    title: "What the Job Taught Me",
    description: "Coming Soon",
  },
  {
    id: 12,
    title: "Beyond the Screen",
    description: "Coming Soon",
  },
  {
    id: 13,
    title: "Where I'm Heading",
    description: "Coming Soon",
  },
];

export function MySelfSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="myself"
      className="py-24 px-4 sm:px-6 bg-background border-t border-foreground/5 overflow-x-clip"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
            Get To Know Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-16 md:mb-20 text-center">
            My Self
          </h2>
        </FadeIn>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Static Background Guideline */}
          <div
            aria-hidden="true"
            className="absolute top-4 sm:top-5 bottom-4 sm:bottom-5 left-5 sm:left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-foreground/10"
          />

          {/* Animated Glowing Golden Scroll Line */}
          <motion.div
            aria-hidden="true"
            style={{
              scaleY: prefersReducedMotion ? 1 : scaleY,
              originY: 0,
            }}
            className="absolute top-4 sm:top-5 bottom-4 sm:bottom-5 left-5 sm:left-6 md:left-1/2 -translate-x-1/2 w-0.5 md:w-1 bg-gradient-to-b from-accent via-accent to-accent/30 rounded-full shadow-[0_0_12px_rgba(201,162,39,0.5)] z-0 origin-top"
          />

          {/* Timeline Blocks */}
          <div className="space-y-8 sm:space-y-10">
            {timelineBlocks.map((block, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={block.id}
                  className="relative flex items-start group"
                >
                  {/* Number / Dot Marker positioned exactly on the vertical line */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: (index % 4) * 0.06,
                          }
                    }
                    className="absolute left-5 sm:left-6 md:left-1/2 -translate-x-1/2 top-4 sm:top-5 z-20 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-dark border-2 border-accent text-accent font-heading font-bold text-xs sm:text-sm shadow-[0_0_12px_rgba(201,162,39,0.35)] select-none transition-transform duration-300 group-hover:scale-110"
                  >
                    {block.id}
                  </motion.div>

                  {/* Timeline Card */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: isEven ? -40 : 40 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                            delay: (index % 4) * 0.08,
                          }
                    }
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { y: -4, transition: { duration: 0.2 } }
                    }
                    className={`relative rounded-2xl bg-surface-dark border border-white/10 p-5 sm:p-6 transition-all duration-300 hover:border-accent/60 hover:shadow-[0_8px_30px_rgba(201,162,39,0.18)] cursor-default ${
                      isEven
                        ? "md:mr-auto md:ml-0 md:text-left"
                        : "md:ml-auto md:mr-0 md:text-left"
                    } ml-11 sm:ml-14 md:ml-0 w-[calc(100%-2.75rem)] sm:w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)]`}
                  >
                    {/* Desktop Connector Line */}
                    {isEven ? (
                      <div
                        aria-hidden="true"
                        className="hidden md:block absolute -right-10 top-7 w-10 h-px bg-gradient-to-r from-white/10 to-accent/40"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="hidden md:block absolute -left-10 top-7 w-10 h-px bg-gradient-to-l from-white/10 to-accent/40"
                      />
                    )}

                    {/* Mobile Connector Line */}
                    <div
                      aria-hidden="true"
                      className="block md:hidden absolute -left-6 sm:-left-8 top-6 w-6 sm:w-8 h-px bg-gradient-to-l from-white/10 to-accent/40"
                    />

                    {/* Top Row: Number Badge and optional Tag Chip */}
                    <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-heading font-semibold bg-accent/15 text-accent border border-accent/30 tracking-wide">
                        #{String(block.id).padStart(2, "0")}
                      </span>

                      {block.tag && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium bg-white/10 text-white/80 border border-white/10">
                          {block.tag}
                        </span>
                      )}
                    </div>

                    {/* Heading */}
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-accent transition-colors duration-200 leading-snug">
                      {block.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-white/60 text-xs sm:text-sm font-body flex items-center gap-1.5">
                      {block.description === "Coming Soon" ? (
                        <>
                          <span className="text-xs">🚧</span>
                          <span>Coming Soon</span>
                        </>
                      ) : (
                        <span>{block.description}</span>
                      )}
                    </p>
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
