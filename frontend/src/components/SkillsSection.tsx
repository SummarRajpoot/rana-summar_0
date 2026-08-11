"use client";

import { FadeIn } from "@/components/FadeIn";
import { motion } from "framer-motion";

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "AI & Agents",
    skills: ["LangChain", "LangGraph", "Groq (LLaMA)", "Google Gemini", "Claude API", "n8n"],
  },
  {
    category: "Frontend",
    skills: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Python", "FastAPI"],
  },
  {
    category: "Tools & Deployment",
    skills: ["Git/GitHub", "Vercel", "Hugging Face Spaces"],
  },
];

export function SkillsSection() {
  let badgeIndex = 0;

  return (
    <section id="skills" className="py-24 px-6 bg-background border-t border-foreground/5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
            Skills
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-16 text-center">
            Tech Stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {skillCategories.map((group) => (
              <div
                key={group.category}
                className="bg-white/60 border border-foreground/10 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-start"
              >
                <h3 className="font-heading font-bold text-sm tracking-wider uppercase text-foreground/80 mb-4 block">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {group.skills.map((skill) => {
                    const delay = badgeIndex * 0.05;
                    badgeIndex++;
                    return (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.35, ease: "easeOut", delay }}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-[#FAFAF9] border border-[#0A0A0A] text-[#0A0A0A] font-body text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-200 cursor-default shadow-xs"
                      >
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
