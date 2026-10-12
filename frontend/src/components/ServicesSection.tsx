"use client";

import { useState, useEffect, useRef } from "react";
import { FadeIn } from "@/components/FadeIn";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Bot,
  MessageSquare,
  Mic,
  Globe,
  Code2,
  BarChart3,
  Rocket,
  GraduationCap,
  Check,
  ArrowRight,
  Zap,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  included: string[];
  icon: LucideIcon;
  gradient: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI & LLM Systems",
    tagline: "Let's scope it",
    description:
      "Multi-step AI agents that plan, use tools and remember context, built with LangChain and LangGraph on models like Gemini, GPT and Claude.",
    included: [
      "Tool-calling agents connected to your APIs and databases",
      "RAG over your own documents with vector search",
      "Multi-agent workflows with human review steps",
      "Conversation memory and saved state",
      "Prompt design, guardrails and evaluation",
    ],
    icon: Bot,
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots for Business",
    tagline: "Let's scope it",
    description:
      "Custom website and support chatbots trained on your own content, like the AI assistant running on this portfolio.",
    included: [
      "Chat widget for any website (Next.js / React)",
      "Answers grounded in your FAQs, docs and PDFs",
      "Lead capture with email notifications",
      "English and Urdu / Roman Urdu support",
      "Admin controls and conversation logs",
    ],
    icon: MessageSquare,
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
  },
  {
    id: "voice-speech-ai",
    title: "Voice & Speech AI",
    tagline: "Let's scope it",
    description:
      "Voice-enabled assistants with speech-to-text and spoken replies, in the same spirit as my Kisaan Assistant project.",
    included: [
      "Voice input and spoken responses",
      "Urdu and English language support",
      "Domain-specific knowledge (e.g. agriculture, support)",
      "Integration with web apps",
      "WhatsApp and call integrations on request",
    ],
    icon: Mic,
    gradient: "from-sky-400 via-teal-500 to-emerald-500",
  },
  {
    id: "fullstack-web",
    title: "Full-Stack Web Development",
    tagline: "Let's scope it",
    description:
      "Fast, responsive Next.js frontends with FastAPI backends and MongoDB, built to be clean, secure and easy to maintain.",
    included: [
      "Next.js, TypeScript and Tailwind CSS interfaces",
      "FastAPI REST APIs",
      "MongoDB database design",
      "Authentication (JWT, Google OAuth)",
      "SEO-friendly, mobile-first, high performance",
    ],
    icon: Globe,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    id: "automation-extraction",
    title: "Automation & Data Extraction",
    tagline: "Let's scope it",
    description:
      "Remove repetitive work with Python scripts, workflow automation and reliable web data extraction.",
    included: [
      "Python and browser automation",
      "Web scraping into clean JSON or CSV",
      "Scheduled jobs with retry handling",
      "Email, Google Sheets and API integrations",
      "Error alerts and run logs",
    ],
    icon: Code2,
    gradient: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: "dashboards-analytics",
    title: "Dashboards & Data Analytics",
    tagline: "Let's scope it",
    description:
      "Interactive dashboards that turn raw data into clear insights, like my OutbreakIQ disease surveillance project.",
    included: [
      "Charts, maps and filters",
      "Data cleaning and processing APIs",
      "Live or scheduled data refresh",
      "Role-based views",
      "Export to CSV or PDF",
    ],
    icon: BarChart3,
    gradient: "from-emerald-400 via-cyan-500 to-blue-600",
  },
  {
    id: "deployment-maintenance",
    title: "Deployment, Maintenance & Support",
    tagline: "Let's scope it",
    description:
      "Get your app live and keep it running smoothly after launch.",
    included: [
      "Deployment on Vercel, Render, Hugging Face Spaces or Docker",
      "CI/CD with GitHub Actions",
      "Environment and secrets setup",
      "Bug fixes and performance tuning",
      "Documentation and handover",
    ],
    icon: Rocket,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
  },
  {
    id: "mentorship-tutoring",
    title: "Mentorship & Tutoring",
    tagline: "Let's scope it",
    description:
      "One-on-one guidance for students and beginners who want to grow in software and AI.",
    included: [
      "Python, web development and AI fundamentals",
      "Final-year project guidance",
      "GitHub, portfolio and CV review",
      "Personalised learning roadmap",
      "Code reviews and feedback",
    ],
    icon: GraduationCap,
    gradient: "from-cyan-500 via-indigo-500 to-accent",
  },
];

const howIWorkSteps = [
  {
    step: "01",
    title: "Discuss",
    description: "We define goals, scope and timeline.",
  },
  {
    step: "02",
    title: "Plan",
    description: "Clear milestones and a simple proposal.",
  },
  {
    step: "03",
    title: "Build",
    description: "Regular updates and working demos.",
  },
  {
    step: "04",
    title: "Deliver",
    description: "Deployment, documentation and support.",
  },
];

const whyWorkWithMe = [
  {
    title: "Clear Communication",
    icon: MessageSquare,
    description: "Prompt daily updates and transparent expectations.",
  },
  {
    title: "Fast Turnaround",
    icon: Zap,
    description: "Rapid prototyping and disciplined delivery cycles.",
  },
  {
    title: "Clean, Maintainable Code",
    icon: Code2,
    description: "Well-structured, documented, and production-ready.",
  },
  {
    title: "Post-Delivery Support",
    icon: ShieldCheck,
    description: "Deployment assistance and handover support.",
  },
];

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onDiscuss: (title: string) => void;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
}

function ServiceCard({
  service,
  index,
  onDiscuss,
  isDesktop,
  prefersReducedMotion,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTilt({ rotateX, rotateY });
    setMousePos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 28 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: (index % 2) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          !prefersReducedMotion && isDesktop
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
            : undefined,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border border-white/10 hover:border-accent/50 p-7 sm:p-9 shadow-[0_16px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Golden Backlight Glow on Hover */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-accent/15 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* Mouse Spotlight on Desktop */}
      {mousePos.isHovered && !prefersReducedMotion && isDesktop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 162, 39, 0.14), transparent 75%)`,
          }}
        />
      )}

      {/* Top Header: Icon & Tagline */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Gradient Rounded Square Icon */}
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0 group-hover:scale-105 transition-transform duration-300`}
          >
            <div className="w-full h-full bg-[#141414] rounded-[14px] flex items-center justify-center">
              <Icon className="w-7 h-7 text-white animate-pulse" />
            </div>
          </div>

          {/* Small Tagline Chip */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-semibold tracking-wider text-accent bg-accent/10 border border-accent/30 shadow-[0_0_8px_rgba(201,162,39,0.15)]">
            {service.tagline}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-accent transition-colors duration-200 mb-3 leading-snug">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-white/70 font-body text-sm sm:text-base leading-relaxed mb-6">
          {service.description}
        </p>

        {/* What's Included List */}
        <div className="pt-5 border-t border-white/10 mb-8">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-white/50 block mb-4">
            What&apos;s Included
          </span>
          <ul className="space-y-2.5">
            {service.included.map((bullet, bIdx) => (
              <motion.li
                key={bIdx}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -8 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: bIdx * 0.05,
                }}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 font-body leading-relaxed"
              >
                <div className="w-4 h-4 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full-width Gradient Button */}
      <div className="relative z-10 pt-2">
        <button
          type="button"
          onClick={() => onDiscuss(service.title)}
          className="group/btn relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 py-3.5 px-6 font-heading font-bold text-sm sm:text-base text-white shadow-[0_4px_22px_rgba(79,70,229,0.35)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Discuss Your Project</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />

          {/* Light-sweep effect */}
          {!prefersReducedMotion && (
            <div
              aria-hidden="true"
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none"
            />
          )}
        </button>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 75%"],
  });

  const timelineScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleDiscussProject = (serviceTitle: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("prefill-contact-service", {
          detail: { service: serviceTitle },
        })
      );
    }

    const subjectInput = document.getElementById(
      "subject"
    ) as HTMLInputElement | null;
    if (subjectInput) {
      subjectInput.value = `I'm interested in: ${serviceTitle}`;
      subjectInput.dispatchEvent(new Event("input", { bubbles: true }));
      subjectInput.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#contact";
    }
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 md:px-8 bg-background border-t border-foreground/5 overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <FadeIn>
            <span className="text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block">
              SERVICES
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground mb-6 tracking-tight">
              Build smart.{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(56,189,248,0.3)]">
                Ship real.
              </span>
            </h2>
            <p className="text-foreground/75 font-body text-base md:text-lg leading-relaxed">
              AI agents, full-stack apps and automation, built end to end, tested,
              deployed and handed over with clear documentation.
            </p>
          </FadeIn>
        </div>

        {/* 2-Column Grid of 8 Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 mb-24">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onDiscuss={handleDiscussProject}
              isDesktop={isDesktop}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Extra Block 1: "How I Work" (4-Step Timeline) */}
        <div className="mb-24 pt-12 border-t border-foreground/10" ref={timelineRef}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-2 block font-heading">
              METHODOLOGY
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-heading text-foreground">
              How I Work
            </h3>
            <p className="text-foreground/70 font-body text-sm sm:text-base mt-2">
              A transparent, high-momentum process from first message to deployment.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Connecting Line that Draws on Scroll */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-foreground/10 -z-0"
            />
            <motion.div
              aria-hidden="true"
              style={{
                scaleX: prefersReducedMotion ? 1 : timelineScale,
                transformOrigin: "left",
              }}
              className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-accent shadow-[0_0_12px_rgba(201,162,39,0.5)] -z-0"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
              {howIWorkSteps.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                  }}
                  className="bg-surface-dark rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col items-start shadow-md hover:border-accent/40 transition-colors"
                >
                  <div className="w-13 h-13 rounded-2xl bg-surface-dark border-2 border-accent text-accent font-heading font-extrabold text-lg flex items-center justify-center shadow-[0_0_15px_rgba(201,162,39,0.3)] mb-5">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold font-heading text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-white/70 font-body text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra Block 2: "Why Work With Me" (4 Icon Tiles) */}
        <div className="mb-24 pt-12 border-t border-foreground/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-2 block font-heading">
              VALUE PROPOSITION
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-heading text-foreground">
              Why Work With Me
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyWorkWithMe.map((tile, idx) => {
              const TileIcon = tile.icon;
              return (
                <motion.div
                  key={tile.title}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                  }}
                  className="bg-surface-dark rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-accent/50 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col justify-start transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mb-5 shrink-0 shadow-[0_0_12px_rgba(201,162,39,0.2)]">
                    <TileIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-white mb-2">
                    {tile.title}
                  </h4>
                  <p className="text-white/60 font-body text-sm leading-relaxed">
                    {tile.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Extra Block 3: Final CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border border-accent/40 p-8 sm:p-12 md:p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/15 via-accent/25 to-purple-500/15 blur-2xl opacity-75 pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/30 shadow-[0_0_10px_rgba(201,162,39,0.2)] mb-5">
              READY TO COMMENCE
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-4">
              Have a project in mind?
            </h3>

            <p className="text-white/70 font-body text-base sm:text-lg mb-8 leading-relaxed">
              Tell me what you need and I&apos;ll reply within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Button */}
              <button
                type="button"
                onClick={() => handleDiscussProject("General Inquiry")}
                className="w-full sm:w-auto relative group/btn overflow-hidden rounded-full bg-accent text-surface-dark px-9 py-4 font-heading font-bold text-base hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(201,162,39,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Button: Hire on Fiverr */}
              <a
                href="https://www.fiverr.com/rana_summar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 font-heading font-semibold text-base transition-all hover:border-accent/50 flex items-center justify-center gap-2"
              >
                <span>Hire me on Fiverr</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
