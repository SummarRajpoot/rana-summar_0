"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ShieldCheck, Link2, TrendingUp, ArrowRight } from "lucide-react";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  year: number;
}

export const defaultCertificates: CertificateItem[] = [
  {
    id: "chase-value",
    title: "Certificate of Achievement — Star Badge Award",
    issuer: "Chase Value",
    date: "Mar 2023",
    year: 2023,
  },
  {
    id: "cs50x-puzzle-day-2026",
    title: "CS50x Puzzle Day 2026",
    issuer: "Harvard University",
    date: "2026",
    year: 2026,
  },
  {
    id: "intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "01 Mar 2026",
    year: 2026,
  },
  {
    id: "networking-devices",
    title: "Networking Devices and Initial Configuration",
    issuer: "Cisco Networking Academy",
    date: "09 Mar 2026",
    year: 2026,
  },
  {
    id: "saylani-agentic-ai",
    title: "Agentic AI (Batch-1)",
    issuer: "Saylani IT Training Programme",
    date: "May 2026",
    year: 2026,
  },
];

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({
  target,
  duration = 1.6,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // easeOutExpo easing curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

interface CertificatesTrustBlockProps {
  certificates?: CertificateItem[];
  className?: string;
}

export function CertificatesTrustBlock({
  certificates = defaultCertificates,
  className = "",
}: CertificatesTrustBlockProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
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

  // Compute all counts dynamically from data
  const totalCount = certificates.length;
  const uniqueIssuersCount = new Set(certificates.map((c) => c.issuer)).size;
  const latestYear = certificates.length > 0
    ? Math.max(...certificates.map((c) => c.year))
    : new Date().getFullYear();

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

  const features = [
    {
      icon: ShieldCheck,
      title: "Authentic Documents",
      description: "Original certificates, not screenshots.",
      color: "from-sky-400/20 to-blue-500/10 text-sky-300 border-sky-400/30",
    },
    {
      icon: Link2,
      title: "Verifiable Where Possible",
      description: "Credential links and IDs are shown when the issuer provides them.",
      color: "from-purple-400/20 to-indigo-500/10 text-purple-300 border-purple-400/30",
    },
    {
      icon: TrendingUp,
      title: "Always Learning",
      description: "Currently deepening my skills in AI agents and full-stack development.",
      color: "from-accent/20 to-amber-500/10 text-accent border-accent/30",
    },
  ];

  return (
    <div className={`mt-16 sm:mt-20 relative ${className}`} style={{ perspective: 1000 }}>
      {/* Soft Multi-Color Ambient Glow Behind the Card */}
      <div
        aria-hidden="true"
        className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/15 to-accent/25 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      <motion.div
        ref={cardRef}
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 28, filter: "blur(8px)" }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
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
        className="group relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border border-white/10 hover:border-accent/50 p-7 sm:p-10 md:p-12 shadow-[0_16px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300"
      >
        {/* Continuous Slow Shimmer Sweep across the Border / Surface */}
        {!prefersReducedMotion && isDesktop && (
          <motion.div
            aria-hidden="true"
            animate={{
              x: ["-130%", "260%"],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2,
            }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400/10 via-accent/15 to-transparent -skew-x-12 pointer-events-none"
          />
        )}

        {/* Cursor-Following Radial Glow on Desktop Hover */}
        {mousePos.isHovered && !prefersReducedMotion && isDesktop && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 162, 39, 0.14), transparent 75%)`,
            }}
          />
        )}

        {/* Top Header Block */}
        <div className="relative z-10 max-w-3xl mb-10 sm:mb-12">
          {/* Chip */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/30 shadow-[0_0_10px_rgba(201,162,39,0.2)] mb-4">
            VERIFICATION
          </span>

          {/* Heading with Gradient Accent */}
          <h3 className="text-2xl sm:text-4xl md:text-[2.6rem] font-bold font-heading text-white tracking-tight leading-tight mb-4">
            Every credential,{" "}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-accent bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(201,162,39,0.3)]">
              verifiable.
            </span>
          </h3>

          {/* Paragraph */}
          <p className="text-white/70 font-body text-sm sm:text-base md:text-lg leading-relaxed">
            Each certificate listed here is genuine and earned through completed coursework and assessments. Original documents are available to view in full, and where an issuer provides a verification link or credential ID, it is included on the card. If you need additional confirmation, I&apos;m happy to provide it.
          </p>
        </div>

        {/* Stats Row: 2x2 grid on mobile down to 375px, 4-col on desktop */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 py-6 border-y border-white/10">
          {/* Stat 1: Total Certifications */}
          <div className="flex flex-col items-start p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
              <AnimatedCounter target={totalCount} />
            </span>
            <span className="text-xs sm:text-sm text-white/55 font-body font-medium mt-1">
              Certifications
            </span>
          </div>

          {/* Stat 2: Unique Issuing Institutions */}
          <div className="flex flex-col items-start p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-sky-300 tracking-tight">
              <AnimatedCounter target={uniqueIssuersCount} />
            </span>
            <span className="text-xs sm:text-sm text-white/55 font-body font-medium mt-1">
              Issuing Institutions
            </span>
          </div>

          {/* Stat 3: Latest Earned Year */}
          <div className="flex flex-col items-start p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-accent tracking-tight">
              <AnimatedCounter target={latestYear} />
            </span>
            <span className="text-xs sm:text-sm text-white/55 font-body font-medium mt-1">
              Latest Earned
            </span>
          </div>

          {/* Stat 4: Documents Available */}
          <div className="flex flex-col items-start p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-emerald-400 tracking-tight">
              <AnimatedCounter target={100} suffix="%" />
              <span className="text-lg sm:text-xl font-bold ml-1 text-white/80">Original</span>
            </span>
            <span className="text-xs sm:text-sm text-white/55 font-body font-medium mt-1">
              Documents Available
            </span>
          </div>
        </div>

        {/* 3 Small Feature Points with Icons */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                className="group/item flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} border flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(201,162,39,0.15)] group-hover/item:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-bold font-heading text-white group-hover/item:text-accent transition-colors duration-200">
                    {feature.title}
                  </h4>
                  <p className="text-white/60 font-body text-xs sm:text-sm leading-relaxed mt-1">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Row */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Primary Button */}
            <a
              href="#contact"
              className="relative group/btn overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent text-surface-dark font-heading font-bold text-sm sm:text-base hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(201,162,39,0.35)]"
            >
              <span>Request Verification</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              {/* Button light-sweep effect */}
              {!prefersReducedMotion && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none"
                />
              )}
            </a>

            {/* Secondary Text Link */}
            <a
              href="#experience"
              className="inline-flex items-center gap-1.5 text-sm sm:text-base text-white/70 hover:text-accent font-semibold transition-colors duration-200 self-start sm:self-center"
            >
              <span>View my experience</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <span className="text-xs text-white/40 font-body self-start sm:self-center">
            Verification inquiries answered promptly
          </span>
        </div>
      </motion.div>
    </div>
  );
}
