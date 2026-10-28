"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Brain,
  Code2,
  Layers,
  Database,
  Cloud,
  Mic,
  Workflow,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

export interface TechCategory {
  category: string;
  icon: LucideIcon;
  skills: string[];
}

export const techStackCategories: TechCategory[] = [
  {
    category: "AI / ML & Agents",
    icon: Brain,
    skills: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Agentic AI",
      "Google Gemini",
      "Claude API",
      "Groq (LLaMA)",
      "OpenAI",
      "Hugging Face",
      "Prompt Engineering",
    ],
  },
  {
    category: "Programming",
    icon: Code2,
    skills: [
      "Python",
      "JavaScript (ES6+)",
      "TypeScript",
      "SQL",
      "C++",
    ],
  },
  {
    category: "Frameworks & Tools",
    icon: Layers,
    skills: [
      "FastAPI",
      "Next.js",
      "React",
      "Node.js",
      "REST APIs",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Databases",
    icon: Database,
    skills: [
      "MongoDB (Atlas)",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      "Docker",
      "Vercel",
      "Render",
      "Hugging Face Spaces",
      "Git / GitHub",
    ],
  },
  {
    category: "Voice & Speech AI",
    icon: Mic,
    skills: [
      "Speech-to-Text",
      "Text-to-Speech",
    ],
  },
  {
    category: "Automation & Data",
    icon: Workflow,
    skills: [
      "Web Scraping",
      "BeautifulSoup",
      "Playwright",
      "Selenium",
      "Pandas",
      "n8n",
    ],
  },
];

export interface CoreSkillItem {
  name: string;
  value: number;
}

export const coreSkillsData: CoreSkillItem[] = [
  { name: "LangChain / Agentic AI", value: 80 },
  { name: "Next.js / React / TypeScript", value: 82 },
  { name: "MongoDB", value: 78 },
  { name: "REST API Design", value: 80 },
  { name: "Problem Solving & Data Structures", value: 80 },
];

interface ProgressBarProps {
  name: string;
  value: number;
  index: number;
  prefersReducedMotion: boolean;
}

function ProgressBar({
  name,
  value,
  index,
  prefersReducedMotion,
}: ProgressBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1.4;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.round(easeProgress * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, prefersReducedMotion]);

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 0.7, 0.2, 1],
      }}
      className="space-y-2.5"
    >
      <div className="flex items-center justify-between text-sm sm:text-base font-medium">
        <span className="font-heading font-semibold text-[#F7F5F0] text-sm sm:text-base flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4FD1C5] shrink-0" />
          {name}
        </span>
        <span className="font-body font-bold text-[#4FD1C5] text-sm sm:text-base tabular-nums tracking-wide">
          {displayValue}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-3 sm:h-3.5 w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-full p-0.5 overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1.4, delay: index * 0.1, ease: [0.22, 0.7, 0.2, 1] }
          }
          className="h-full rounded-full bg-gradient-to-r from-[#2BB3A8] via-[#4FD1C5] to-[#B5F5EC] shadow-[0_0_12px_rgba(79,209,197,0.4)] relative"
        >
          <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/60 rounded-full blur-[1px]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface CategoryBlockProps {
  categoryItem: TechCategory;
  index: number;
  prefersReducedMotion: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function CategoryBlock({
  categoryItem,
  index,
  prefersReducedMotion,
  isDimmed,
  onHover,
  onLeave,
}: CategoryBlockProps) {
  const Icon = categoryItem.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.22, 0.7, 0.2, 1],
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{
        opacity: isDimmed ? 0.45 : 1,
        scale: !prefersReducedMotion && !isDimmed ? 1 : 0.99,
      }}
      className="group relative rounded-[20px] surface-card p-6 sm:p-7 shadow-[0_12px_35px_rgba(10,18,34,0.4)] transition-all duration-300 hover:border-[#4FD1C5]/60 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
    >
      {/* Soft Ambient Glow on Hover */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-[20px] bg-[#4FD1C5]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#4FD1C5]/15 border border-[#4FD1C5]/30 flex items-center justify-center text-[#B5F5EC] shrink-0">
            <Icon className="w-4 h-4 text-[#4FD1C5]" />
          </div>
          <h3 className="font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-[#B5F5EC]">
            {categoryItem.category}
          </h3>
        </div>

        {/* Chips with subtle floating bob */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {categoryItem.skills.map((skill, chipIndex) => (
            <motion.span
              key={skill}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, chipIndex % 2 === 0 ? -4 : 4, 0],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (chipIndex % 4) * 0.4,
              }}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#16203A]/70 border border-[#4FD1C5]/20 text-[#F7F5F0]/90 font-body text-xs sm:text-sm font-medium hover:border-[#4FD1C5] hover:text-[#B5F5EC] hover:bg-[#4FD1C5]/10 hover:shadow-[0_0_12px_rgba(79,209,197,0.3)] transition-all duration-200 cursor-default select-none"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1160px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="eyebrow-label mb-3">Core Stack</div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] tracking-tight">
            Skills &amp; Expertise
          </h2>
        </div>

        {/* 1. Core Competency Progress Bars */}
        <div className="max-w-3xl mx-auto mb-20 surface-card rounded-[24px] p-7 sm:p-10 shadow-[0_16px_50px_rgba(10,18,34,0.4)]">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F7F5F0] mb-8 text-center sm:text-left">
            Core Competencies
          </h3>
          <div className="space-y-6">
            {coreSkillsData.map((item, index) => (
              <ProgressBar
                key={item.name}
                name={item.name}
                value={item.value}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

        {/* 2. Tech Stack Groups (Spotlight effect on hover) */}
        <div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F7F5F0] mb-8 text-center sm:text-left">
            Tech Stack Directory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStackCategories.map((categoryItem, index) => (
              <CategoryBlock
                key={categoryItem.category}
                categoryItem={categoryItem}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
                isDimmed={hoveredIdx !== null && hoveredIdx !== index}
                onHover={() => setHoveredIdx(index)}
                onLeave={() => setHoveredIdx(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
