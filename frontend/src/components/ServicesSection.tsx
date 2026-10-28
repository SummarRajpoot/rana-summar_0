"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  AnimatePresence,
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
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  included: string[];
  icon: LucideIcon;
  numeral: string;
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
    numeral: "01",
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots for Business",
    tagline: "Let's scope it",
    description:
      "Custom website and support chatbots trained on your own content, like the AI assistant running on this website.",
    included: [
      "Chat widget for any website (Next.js / React)",
      "Answers grounded in your FAQs, docs and PDFs",
      "Lead capture with email notifications",
      "English and Urdu / Roman Urdu support",
      "Admin controls and conversation logs",
    ],
    icon: MessageSquare,
    numeral: "02",
  },
  {
    id: "voice-speech-ai",
    title: "Voice & Speech AI",
    tagline: "Let's scope it",
    description:
      "Voice-enabled assistants with speech-to-text, real-time audio streaming, and natural spoken conversational replies.",
    included: [
      "Voice input and spoken responses",
      "Urdu and English language support",
      "Domain-specific knowledge (e.g. agriculture, support)",
      "Integration with web apps",
      "WhatsApp and call integrations on request",
    ],
    icon: Mic,
    numeral: "03",
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
    numeral: "04",
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
    numeral: "05",
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
    numeral: "06",
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
    numeral: "07",
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
      "GitHub, projects and CV review",
      "Personalised learning roadmap",
      "Code reviews and feedback",
    ],
    icon: GraduationCap,
    numeral: "08",
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
  const [isExpanded, setIsExpanded] = useState(true);

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
          : { opacity: 0, y: 30 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.75,
        delay: (index % 2) * 0.12,
        ease: [0.22, 0.7, 0.2, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          !prefersReducedMotion && isDesktop
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
            : undefined,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative rounded-[20px] surface-card p-7 sm:p-9 shadow-[0_16px_50px_rgba(10,18,34,0.45)] flex flex-col justify-between transition-all duration-300 hover:border-[#4FD1C5]/60 hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Rotating Conic Teal Border Beam on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1.5px] rounded-[21px] opacity-0 group-hover:opacity-100 conic-border-glow transition-opacity duration-500 -z-10"
      />

      {/* Mouse Spotlight on Desktop */}
      {mousePos.isHovered && !prefersReducedMotion && isDesktop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[20px] opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 209, 197, 0.14), transparent 75%)`,
          }}
        />
      )}

      {/* Top Header: Numeral, Icon & Tagline */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Numeral that counts in / displays */}
            <span className="font-heading italic font-bold text-2xl sm:text-3xl text-[#4FD1C5]/70 group-hover:text-[#4FD1C5] transition-colors select-none">
              {service.numeral}
            </span>
            <div className="w-12 h-12 rounded-2xl bg-[#212F54] border border-[#4FD1C5]/30 flex items-center justify-center text-[#B5F5EC] group-hover:border-[#4FD1C5] group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(79,209,197,0.2)]">
              <Icon className="w-6 h-6 text-[#4FD1C5]" />
            </div>
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wider text-[#4FD1C5] bg-[#4FD1C5]/10 border border-[#4FD1C5]/25">
            {service.tagline}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F7F5F0] group-hover:text-[#B5F5EC] transition-colors duration-200 mb-3 leading-snug">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-[#C9D1E3] font-body text-sm sm:text-base leading-relaxed mb-6">
          {service.description}
        </p>

        {/* What's Included Accordion Header */}
        <div className="pt-5 border-t border-[#4FD1C5]/15 mb-6">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left text-xs font-body font-bold uppercase tracking-wider text-[#AEB8D0] hover:text-[#4FD1C5] transition-colors mb-3 cursor-pointer"
          >
            <span>What&apos;s Included</span>
            <ChevronDown
              className={`w-4 h-4 text-[#4FD1C5] transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Expandable Bullets with smooth height animation */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 0.7, 0.2, 1] }}
                className="space-y-2.5 overflow-hidden"
              >
                {service.included.map((bullet, bIdx) => (
                  <motion.li
                    key={bIdx}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -8 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: bIdx * 0.04,
                    }}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#C9D1E3] font-body leading-relaxed"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#4FD1C5]/15 border border-[#4FD1C5]/40 flex items-center justify-center text-[#4FD1C5] shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="relative z-10 pt-2">
        <Magnetic strength={0.25}>
          <button
            type="button"
            onClick={() => onDiscuss(service.title)}
            className="group/btn relative w-full overflow-hidden rounded-full btn-primary-luxury py-3.5 px-6 font-body font-semibold text-sm sm:text-base text-[#1B2745] shadow-[0_4px_22px_rgba(79,209,197,0.3)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Magnetic>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
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
      className="py-24 px-6 relative bg-[#2C3D6C]/50 border-t border-[#4FD1C5]/15 overflow-hidden"
    >
      {/* Soft Blue-Teal Radial Glow Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#4FD1C5]/08 rounded-full blur-[140px] -z-10"
      />

      <div className="max-w-[1160px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="eyebrow-label mb-4 justify-center">Services</div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-[#F7F5F0] mb-6 tracking-tight">
            Build smart.{" "}
            <span className="font-heading italic accent-shimmer drop-shadow-[0_2px_15px_rgba(79,209,197,0.4)]">
              Ship real.
            </span>
          </h2>
          <p className="text-[#C9D1E3] font-body text-base md:text-lg leading-relaxed">
            AI agents, full-stack apps and automation, built end to end, tested,
            deployed and handed over with clear documentation.
          </p>
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

        {/* ── METHODOLOGY: HOW I WORK ──────────────────────────── */}
        <div className="mb-24 pt-16 border-t border-[#4FD1C5]/15" ref={timelineRef}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow-label mb-3 justify-center">Methodology</div>
            <h3 className="text-2xl sm:text-4xl font-bold font-heading text-[#F7F5F0]">
              How I Work
            </h3>
            <p className="text-[#C9D1E3] font-body text-sm sm:text-base mt-2">
              A transparent, high-momentum process from first message to deployment.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Connecting Line that Draws on Scroll */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[#4FD1C5]/15 -z-0"
            />
            <motion.div
              aria-hidden="true"
              style={{
                scaleX: prefersReducedMotion ? 1 : timelineScale,
                transformOrigin: "left",
              }}
              className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-[#4FD1C5] via-[#B5F5EC] to-[#4FD1C5] shadow-[0_0_12px_#4FD1C5] -z-0"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
              {howIWorkSteps.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 22 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.22, 0.7, 0.2, 1],
                  }}
                  className="surface-card rounded-[20px] p-6 sm:p-7 flex flex-col items-start shadow-md hover:border-[#4FD1C5]/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#212F54] border-2 border-[#4FD1C5] text-[#4FD1C5] font-heading font-extrabold text-base flex items-center justify-center shadow-[0_0_15px_rgba(79,209,197,0.3)] mb-5">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold font-heading text-[#F7F5F0] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[#C9D1E3] font-body text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── VALUE PROPOSITION: WHY WORK WITH ME ─────────────── */}
        <div className="mb-24 pt-16 border-t border-[#4FD1C5]/15">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow-label mb-3 justify-center">Value Proposition</div>
            <h3 className="text-2xl sm:text-4xl font-bold font-heading text-[#F7F5F0]">
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
                      : { opacity: 0, y: 20 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.08,
                    ease: [0.22, 0.7, 0.2, 1],
                  }}
                  className="group relative surface-card rounded-[20px] p-6 sm:p-7 shadow-[0_10px_30px_rgba(10,18,34,0.4)] flex flex-col justify-start transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                >
                  {/* Teal top border growing from center on hover */}
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#4FD1C5] scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 shadow-[0_0_8px_#4FD1C5]" />

                  <div className="w-12 h-12 rounded-xl bg-[#4FD1C5]/15 border border-[#4FD1C5]/30 text-[#4FD1C5] flex items-center justify-center mb-5 shrink-0 shadow-[0_0_12px_rgba(79,209,197,0.2)]">
                    <TileIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-[#F7F5F0] mb-2">
                    {tile.title}
                  </h4>
                  <p className="text-[#AEB8D0] font-body text-sm leading-relaxed">
                    {tile.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── "HAVE A PROJECT IN MIND?" CTA ───────────────────── */}
        <div className="relative rounded-[24px] bg-[#2C3D6C] border border-[#4FD1C5]/30 p-8 sm:p-14 md:p-16 text-center shadow-[0_20px_60px_rgba(10,18,34,0.5)] overflow-hidden">
          {/* Looping gradient sheen background */}
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-[24px] bg-gradient-to-r from-[#4FD1C5]/15 via-[#B5F5EC]/20 to-[#4A6FB8]/20 blur-2xl opacity-60 pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="eyebrow-label mb-4 justify-center">Ready to Commence</div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#F7F5F0] tracking-tight mb-4">
              Have a project in{" "}
              <span className="font-heading italic accent-shimmer drop-shadow-[0_2px_15px_rgba(79,209,197,0.4)]">
                mind?
              </span>
            </h3>

            <p className="text-[#C9D1E3] font-body text-base sm:text-lg mb-9 leading-relaxed">
              Tell me what you need and I&apos;ll reply within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={() => handleDiscussProject("General Inquiry")}
                  className="w-full sm:w-auto relative group/btn overflow-hidden rounded-full btn-primary-luxury px-9 py-4 font-body font-semibold text-base text-[#1B2745] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(79,209,197,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href="https://www.fiverr.com/rana_summar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto rounded-full border-[1.5px] border-[#4FD1C5] text-[#F7F5F0] hover:bg-[#4FD1C5]/15 px-8 py-4 font-body font-semibold text-base transition-all flex items-center justify-center gap-2"
                >
                  <span>Hire me on Fiverr</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
