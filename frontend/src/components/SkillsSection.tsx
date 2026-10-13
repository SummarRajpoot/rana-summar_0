"use client";

import { useState, useEffect, useRef } from "react";
import { FadeIn } from "@/components/FadeIn";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Brain,
  Code2,
  Layers,
  Database,
  Cloud,
  Mic,
  Workflow,
  Sparkles,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

// ============================================================================
// 1) TECH STACK DATA
// All existing chips are preserved and merged with new items.
// Categories rendered in strict order:
// 1. AI / ML & Agents
// 2. Programming
// 3. Frameworks & Tools
// 4. Databases
// 5. Cloud & DevOps
// 6. Voice & Speech AI
// 7. Automation & Data
// ============================================================================

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

// ============================================================================
// 2) CORE SKILLS DATA
// Edit percentage values (0 - 100) easily in the `value` field below.
// ============================================================================

export interface CoreSkillItem {
  name: string;
  value: number; // Editable percentage value (0 - 100)
}

export const coreSkillsData: CoreSkillItem[] = [
  { name: "LangChain / Agentic AI", value: 80 },
  { name: "Next.js / React / TypeScript", value: 82 },
  { name: "MongoDB", value: 78 },
  { name: "REST API Design", value: 80 },
  { name: "Problem Solving & Data Structures", value: 80 },
];

// ============================================================================
// COMPONENT: Animated Progress Bar for Core Skills
// ============================================================================

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
    const duration = 1.3; // duration in seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // easeOutExpo curve for smooth deceleration
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
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="space-y-2.5"
    >
      <div className="flex items-center justify-between text-sm sm:text-base font-medium">
        <span className="font-heading font-semibold text-white/95 text-sm sm:text-base flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-accent/80 shrink-0" />
          {name}
        </span>
        <span className="font-heading font-extrabold text-accent text-sm sm:text-base tabular-nums tracking-wide">
          {displayValue}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-3 sm:h-3.5 w-full bg-white/5 border border-white/10 rounded-full p-0.5 overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1.3, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }
          }
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-purple-500 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.35)] relative"
        >
          {/* Subtle light glint on bar edge */}
          <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/40 rounded-full blur-[1px]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// COMPONENT: Category Block with Chips for Tech Stack
// ============================================================================

interface CategoryBlockProps {
  categoryItem: TechCategory;
  index: number;
  prefersReducedMotion: boolean;
}

function CategoryBlock({
  categoryItem,
  index,
  prefersReducedMotion,
}: CategoryBlockProps) {
  const Icon = categoryItem.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border border-white/10 hover:border-accent/40 p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
    >
      {/* Soft Ambient Glow on Hover */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-accent/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      <div className="relative z-10">
        {/* Small blue category title */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
            <Icon className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-sky-400">
            {categoryItem.category}
          </h3>
        </div>

        {/* Pill chips below */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {categoryItem.skills.map((skill, chipIndex) => (
            <motion.span
              key={skill}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.88 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.28,
                delay: prefersReducedMotion ? 0 : 0.04 + chipIndex * 0.025,
                ease: "easeOut",
              }}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-body text-xs sm:text-sm font-medium hover:border-accent/60 hover:text-white hover:bg-accent/10 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(201,162,39,0.25)] transition-all duration-200 cursor-default select-none"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT: SkillsSection
// ============================================================================

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 md:px-8 bg-background border-t border-foreground/5 overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-heading font-bold tracking-wider text-accent bg-accent/10 border border-accent/30 shadow-[0_0_8px_rgba(201,162,39,0.15)] mb-4">
              SKILLS & EXPERTISE
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground mb-6 tracking-tight">
              Tech Stack &amp;{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(56,189,248,0.3)]">
                Core Skills
              </span>
            </h2>
            <p className="text-foreground/75 font-body text-base md:text-lg leading-relaxed">
              Modern full-stack technologies, agentic AI frameworks, and engineering
              competencies I leverage to build reliable, high-performance systems.
            </p>
          </FadeIn>
        </div>

        {/* ── PART 2: CORE SKILLS (Progress Bars) ─────────────────────────── */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border border-white/10 p-7 sm:p-9 md:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Subtle Glow Backdrop */}
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-emerald-500/10 blur-2xl opacity-60 pointer-events-none"
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Header for Core Skills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-10 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-accent block mb-1">
                  Core Skills
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Engineering Competencies
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium font-body bg-white/5 border border-white/10 text-white/70 self-start sm:self-auto">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Production &amp; Project Validated</span>
              </div>
            </div>

            {/* List of 5 Core Skill Progress Bars */}
            <div className="space-y-6 sm:space-y-7">
              {coreSkillsData.map((item, idx) => (
                <ProgressBar
                  key={item.name}
                  name={item.name}
                  value={item.value}
                  index={idx}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── PART 1: TECH STACK (Categorized Chips) ──────────────────────── */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-sky-400 block mb-2 font-heading">
              TECH STACK
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-heading text-foreground">
              Technologies &amp; Frameworks
            </h3>
            <p className="text-foreground/70 font-body text-sm sm:text-base mt-2">
              Grouped by domain for instant readability and architectural context.
            </p>
          </div>

          {/* Grid of 7 Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {techStackCategories.map((categoryItem, index) => (
              <CategoryBlock
                key={categoryItem.category}
                categoryItem={categoryItem}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
