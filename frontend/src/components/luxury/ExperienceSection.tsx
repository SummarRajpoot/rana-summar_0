"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1160px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="eyebrow-label mb-3">Career History</div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] tracking-tight">
            Work Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience Card 1: Saylani Agentic AI Training */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 0.7, 0.2, 1] }}
            className="surface-card rounded-[20px] p-7 sm:p-9 flex flex-col justify-between hover:border-[#4FD1C5]/50 transition-all duration-300 shadow-[0_16px_45px_rgba(10,18,34,0.4)]"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F7F5F0]">
                  Student — Agentic AI (Batch-1)
                </h3>
                <span className="text-[#4FD1C5] text-xs font-semibold px-3 py-1 rounded-full bg-[#4FD1C5]/10 border border-[#4FD1C5]/20">
                  Training
                </span>
              </div>
              <p className="text-[#C9D1E3] font-body text-sm sm:text-base font-medium mb-1">
                Saylani IT Training Programme (Saylani Welfare International Trust)
              </p>
              <p className="text-[#AEB8D0] text-xs font-body mb-4">
                IT Training · Pakistan
              </p>
              <p className="text-[#C9D1E3]/85 text-sm font-body leading-relaxed mb-6">
                Completed 7-month Agentic AI training (Nov 2025 – May 2026) as a student at Saylani IT Training Programme.
              </p>
            </div>

            {/* Photos with clip-path wipe entrance and hover zoom */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <motion.div
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { clipPath: "inset(0 100% 0 0)" }
                }
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 0.7, 0.2, 1] }}
                className="rounded-xl border border-[#4FD1C5]/20 bg-[#16203A] overflow-hidden flex items-center justify-center p-1 group"
              >
                <div className="relative w-full h-[180px] sm:h-[220px]">
                  <Image
                    src="/images/saylani-class-1.jpg.jpg"
                    alt="Rana Summar at Saylani Agentic AI class — Batch 1"
                    fill
                    sizes="(max-width: 768px) 50vw, 260px"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { clipPath: "inset(0 100% 0 0)" }
                }
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 0.7, 0.2, 1] }}
                className="rounded-xl border border-[#4FD1C5]/20 bg-[#16203A] overflow-hidden flex items-center justify-center p-1 group"
              >
                <div className="relative w-full h-[180px] sm:h-[220px]">
                  <Image
                    src="/images/saylani-class-2.jpg.jpg"
                    alt="Rana Summar attending Saylani IT Training Programme session"
                    fill
                    sizes="(max-width: 768px) 50vw, 260px"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Experience Card 2: Assistant Supervisor — Retail */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 0.7, 0.2, 1] }}
            className="surface-card rounded-[20px] p-7 sm:p-9 flex flex-col justify-between hover:border-[#4FD1C5]/50 transition-all duration-300 shadow-[0_16px_45px_rgba(10,18,34,0.4)]"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F7F5F0]">
                  Assistant Supervisor — Retail
                </h3>
                <span className="text-[#4FD1C5] text-xs font-semibold px-3 py-1 rounded-full bg-[#4FD1C5]/10 border border-[#4FD1C5]/20">
                  Prior Experience
                </span>
              </div>
              <p className="text-[#C9D1E3] font-body text-sm sm:text-base font-medium mb-1">
                Chase Value, Faisalabad
              </p>
              <p className="text-[#AEB8D0] text-xs font-body mb-4">
                Retail Management · Pakistan
              </p>
              <p className="text-[#C9D1E3]/85 text-sm font-body leading-relaxed mb-6">
                Customer service leadership, inventory coordination, and sales operations at Chase Value, building operational rigor and problem-solving excellence.
              </p>
            </div>

            {/* Photos with clip-path wipe entrance and hover zoom */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <motion.div
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { clipPath: "inset(0 100% 0 0)" }
                }
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 0.7, 0.2, 1] }}
                className="rounded-xl border border-[#4FD1C5]/20 bg-[#16203A] overflow-hidden flex items-center justify-center p-1 group"
              >
                <div className="relative w-full h-[180px] sm:h-[220px]">
                  <Image
                    src="/images/experience-1.jpeg"
                    alt="Rana Summar at Chase Value Store"
                    fill
                    sizes="(max-width: 768px) 50vw, 260px"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { clipPath: "inset(0 100% 0 0)" }
                }
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 0.7, 0.2, 1] }}
                className="rounded-xl border border-[#4FD1C5]/20 bg-[#16203A] overflow-hidden flex items-center justify-center p-1 group"
              >
                <div className="relative w-full h-[180px] sm:h-[220px]">
                  <Image
                    src="/images/experience-2.jpeg"
                    alt="Rana Summar receiving recognition at Chase Value"
                    fill
                    sizes="(max-width: 768px) 50vw, 260px"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

