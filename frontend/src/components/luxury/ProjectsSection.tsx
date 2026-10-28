"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveDemo: string;
  frontend?: string;
  backend?: string;
  github?: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "jobscout",
    title: "JobScout AI",
    description:
      "Autonomous AI agent for CV parsing, real-time job matching, and dashboard presentation. Built as a 6th semester project under Sir Hassan Tariq.",
    image: "/images/jobscout.png",
    tags: [
      "Next.js 14",
      "FastAPI",
      "LangChain/LangGraph",
      "Groq (llama-3.3-70b-versatile)",
      "Gemini",
      "Tavily",
      "HF Spaces",
      "Vercel",
    ],
    liveDemo: "https://jobacort-ai.vercel.app/",
    frontend: "https://github.com/SummarRajpoot/UAF-6th-Project-Frontend",
    backend: "https://github.com/SummarRajpoot/UAF-6th-Project-Backend",
  },
  {
    id: "outbreakiq",
    title: "OutbreakIQ",
    description:
      "Pakistani disease surveillance dashboard tracking Dengue, Malaria, COVID-19, and Heatstroke. Real APIs integrated (WHO GHO, disease.sh, OpenWeatherMap). Settings page with data export + Framer Motion animations.",
    image: "/images/OutbreakIQ.png",
    tags: ["Next.js 16", "Flask", "HF Spaces", "Neon PostgreSQL"],
    liveDemo: "https://healthintelligence.vercel.app",
    frontend: "https://github.com/SummarRajpoot/OutbreakIQ_frontend",
    backend: "https://github.com/SummarRajpoot/OutbreakIQ_backend",
  },
  {
    id: "githubagent",
    title: "GitHub Agent",
    description:
      "Autonomous AI Agent for GitHub repository analysis, automated code review, issue management, and workflow automation.",
    image: "/images/githubagent.png",
    tags: ["Next.js", "FastAPI", "LangChain / AI Agents", "GitHub API", "Python", "Vercel"],
    liveDemo: "https://githubagent.vercel.app/",
    frontend: "https://github.com/SummarRajpoot/github-agent-frontend",
    backend: "https://github.com/SummarRajpoot/github-agent-backend",
  },
];

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
}

function ProjectCard({ project, index, total }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // Calculate deck scaling as subsequent cards scroll over
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <div
      ref={cardRef}
      className="sticky top-28 sm:top-32 mb-12 sm:mb-16 last:mb-0"
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        style={{
          scale: prefersReducedMotion ? 1 : scale,
        }}
        className="surface-card rounded-[24px] border border-[#4FD1C5]/25 overflow-hidden shadow-[0_20px_60px_rgba(10,18,34,0.6)] backdrop-blur-md transition-all duration-300 hover:border-[#4FD1C5]/60"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Project Screenshot / Media Area */}
          <div
            data-cursor="view"
            className="lg:col-span-5 relative min-h-[220px] sm:min-h-[280px] lg:min-h-full bg-[#16203A] overflow-hidden group cursor-pointer"
          >
            {project.image ? (
              <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} — project screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#212F54]/30 to-[#212F54] opacity-80" />
              </div>
            ) : (
              <div className="w-full h-full min-h-[220px] sm:min-h-[280px] flex items-center justify-center bg-gradient-to-br from-[#293962] to-[#1B2745] p-8 text-center">
                <span className="font-heading italic text-4xl text-[#4FD1C5]/30 font-bold select-none">
                  {project.title}
                </span>
              </div>
            )}
          </div>

          {/* Project Content Area */}
          <div className="lg:col-span-7 p-7 sm:p-9 lg:p-11 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="eyebrow-label text-xs">Project 0{index + 1}</span>
                <span className="text-xs font-semibold text-[#AEB8D0]">
                  0{index + 1} / 0{total}
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F7F5F0] mb-4">
                {project.title}
              </h3>

              <p className="font-body text-[#C9D1E3] text-sm sm:text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tags with stagger */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, tIdx) => (
                  <motion.span
                    key={tag}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: tIdx * 0.03 }}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-[#16203A] text-[#B5F5EC] border border-[#4FD1C5]/20"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Links with sliding arrows */}
            <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-[#4FD1C5]/15">
              {project.liveDemo && project.liveDemo !== "#" && (
                <Link
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#4FD1C5] hover:text-[#B5F5EC] transition-colors"
                >
                  <span>View Live Demo</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
              {project.frontend && (
                <Link
                  href={project.frontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9D1E3] hover:text-[#F7F5F0] transition-colors"
                >
                  <span>Frontend</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
              {project.backend && (
                <Link
                  href={project.backend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9D1E3] hover:text-[#F7F5F0] transition-colors"
                >
                  <span>Backend</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
              {project.github && (
                <Link
                  href={project.github}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9D1E3] hover:text-[#F7F5F0] transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-[1160px] mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow-label mb-3 justify-center">Featured Work</div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] tracking-tight">
            Featured Projects
          </h2>
        </div>

        <div className="relative">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projectsData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

