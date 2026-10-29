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
    id: "factory-maintenance",
    title: "Factory Maintenance Agent",
    description:
      "Upload a photo of a machine part, a sensor report, or a maintenance document (PDF/text). The app finds the defect, looks up the right procedure in the maintenance manuals and shows the exact manual page it relied on, writes a recommended action, asks a person to approve or reject it, and then hands the approved case to Evolus, which prepares the maintenance task.",
    image: "/images/factory-maintenance.png",
    tags: ["Next.js", "FastAPI", "Python", "LangGraph", "Supabase"],
    liveDemo: "https://act-iii-hackathon-prototype.vercel.app/",
    github: "https://github.com/SummarRajpoot/ACT-III-Hackathon-Prototype",
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

  const targetUrl =
    project.liveDemo && project.liveDemo !== "#"
      ? project.liveDemo
      : project.github || project.frontend;

  return (
    <div
      ref={cardRef}
      className="sticky top-24 sm:top-28 mb-12 sm:mb-16 last:mb-0"
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        style={{
          scale: prefersReducedMotion ? 1 : scale,
        }}
        className="surface-card rounded-[24px] border border-[#4FD1C5]/25 overflow-hidden shadow-[0_20px_60px_rgba(10,18,34,0.6)] backdrop-blur-md transition-all duration-300 hover:border-[#4FD1C5]/60"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-5 sm:p-7 lg:p-9 items-center">
          {/* Project Screenshot / Media Area in a luxury browser frame */}
          <div
            data-cursor="view"
            onClick={() => targetUrl && window.open(targetUrl, "_blank")}
            className="lg:col-span-7 relative group cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#4FD1C5]/30 bg-[#141D35] shadow-[0_12px_40px_rgba(0,0,0,0.5)] group-hover:border-[#4FD1C5]/70 group-hover:shadow-[0_16px_50px_rgba(79,209,197,0.22)] transition-all duration-500">
              {/* Browser window header bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#1B2745]/90 border-b border-[#4FD1C5]/15 backdrop-blur-sm select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-[#141D35] border border-[#4FD1C5]/15 text-[11px] font-mono text-[#AEB8D0]/80 truncate max-w-[200px] sm:max-w-[280px]">
                  {project.liveDemo && project.liveDemo !== "#"
                    ? project.liveDemo.replace(/^https?:\/\//, "").replace(/\/$/, "")
                    : "preview"}
                </div>
                <div className="flex items-center text-[#4FD1C5] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Full Screenshot Container with natural 1370/648 aspect ratio */}
              {project.image ? (
                <div className="relative w-full aspect-[1370/648] bg-[#0F172A] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} — project screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 680px"
                    className="object-contain sm:object-cover sm:object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    priority={index === 0}
                  />
                  {/* Subtle inner highlight */}
                  <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-b-2xl" />
                </div>
              ) : (
                <div className="w-full aspect-[1370/648] flex items-center justify-center bg-gradient-to-br from-[#293962] to-[#1B2745] p-8 text-center">
                  <span className="font-heading italic text-3xl sm:text-4xl text-[#4FD1C5]/40 font-bold select-none">
                    {project.title}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Project Content Area */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="eyebrow-label text-xs">Project 0{index + 1}</span>
                <span className="text-xs font-semibold text-[#AEB8D0]">
                  0{index + 1} / 0{total}
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F7F5F0] mb-3">
                {project.title}
              </h3>

              <p className="font-body text-[#C9D1E3] text-sm sm:text-base leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tags with stagger */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tIdx) => (
                  <motion.span
                    key={tag}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: tIdx * 0.03 }}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-[#141D35] text-[#B5F5EC] border border-[#4FD1C5]/20"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Links with sliding arrows */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#4FD1C5]/15">
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
                  target="_blank"
                  rel="noopener noreferrer"
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

