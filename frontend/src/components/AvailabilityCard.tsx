"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  Calendar,
  Globe,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface AvailabilityItem {
  id: string;
  label: string;
  value: string;
  colorScheme: "blue" | "green" | "white" | "purple";
  icon: LucideIcon;
  showLiveClock?: boolean;
}

export const defaultAvailabilityData: AvailabilityItem[] = [
  {
    id: "response-time",
    label: "Response time",
    value: "Within 24 hours",
    colorScheme: "blue",
    icon: Clock,
  },
  {
    id: "project-start",
    label: "Project start",
    value: "1-2 weeks",
    colorScheme: "green",
    icon: Calendar,
  },
  {
    id: "timezone",
    label: "Timezone",
    value: "PKT (UTC+5)",
    colorScheme: "white",
    icon: Globe,
    showLiveClock: true,
  },
  {
    id: "mentorship",
    label: "Mentorship",
    value: "Available",
    colorScheme: "purple",
    icon: Sparkles,
  },
];

interface AvailabilityCardProps {
  items?: AvailabilityItem[];
  className?: string;
}

export function AvailabilityCard({
  items = defaultAvailabilityData,
  className = "",
}: AvailabilityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [pakistanTime, setPakistanTime] = useState<string>("");
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Live Pakistan (Asia/Karachi) clock updated every second (mount-only to avoid hydration mismatch)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setPakistanTime(`${formatted} PKT`);
      } catch {
        const now = new Date();
        setPakistanTime(`${now.toLocaleTimeString("en-US", { hour12: true })} PKT`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTilt({ rotateX, rotateY });
    setMousePos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const getColorStyles = (scheme: AvailabilityItem["colorScheme"]) => {
    switch (scheme) {
      case "blue":
        return "text-sky-300 bg-sky-500/10 border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.18)]";
      case "green":
        return "text-emerald-300 bg-emerald-500/10 border-emerald-400/30 shadow-[0_0_12px_rgba(52,211,153,0.18)]";
      case "white":
        return "text-amber-200 bg-amber-400/10 border-amber-300/30 shadow-[0_0_12px_rgba(201,162,39,0.18)]";
      case "purple":
        return "text-purple-300 bg-purple-500/10 border-purple-400/30 shadow-[0_0_12px_rgba(192,132,252,0.18)]";
      default:
        return "text-white bg-white/10 border-white/20";
    }
  };

  return (
    <div className={`relative ${className}`} style={{ perspective: 1000 }}>
      {/* Soft Ambient Golden Glow Behind the Card */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent/25 via-amber-400/10 to-accent/25 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      <motion.div
        ref={cardRef}
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 24, filter: "blur(6px)" }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.65,
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
        className="group relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border border-accent/35 p-6 sm:p-8 md:p-9 shadow-[0_14px_45px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:border-accent/60 hover:shadow-[0_20px_50px_rgba(201,162,39,0.2)]"
      >
        {/* Continuous Slow Shimmer Sweep across the Card Border / Surface */}
        {!prefersReducedMotion && isDesktop && (
          <motion.div
            aria-hidden="true"
            animate={{
              x: ["-120%", "240%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2,
            }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-accent/20 to-transparent -skew-x-12 pointer-events-none"
          />
        )}

        {/* Cursor-Following Golden Glow on Hover */}
        {mousePos.isHovered && !prefersReducedMotion && isDesktop && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 162, 39, 0.16), transparent 75%)`,
            }}
          />
        )}

        {/* Header Section */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-white/10">
          <div>
            <span className="text-accent text-xs font-heading font-bold uppercase tracking-widest block mb-1">
              Status &amp; Schedule
            </span>
            <h3 className="text-white font-bold font-heading text-2xl sm:text-3xl tracking-tight">
              Availability
            </h3>
          </div>

          {/* Pulsing Green Dot Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 w-fit shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-400 font-body tracking-wide">
              Open for new projects
            </span>
          </div>
        </div>

        {/* Rows List */}
        <div className="relative z-10 pt-2 divide-y divide-white/5">
          {items.map((item, index) => {
            const Icon = item.icon;
            const colorClass = getColorStyles(item.colorScheme);

            return (
              <div
                key={item.id}
                className="group/row relative py-4 sm:py-4.5 transition-colors duration-200"
              >
                {/* Subtle Hover Highlight Bar */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -mx-3 px-3 rounded-xl bg-white/[0.03] opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 -z-10"
                />

                <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                  {/* Left Label with Icon */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -16 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-2.5 min-w-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-white/80 font-body font-medium text-sm sm:text-base">
                      {item.label}
                    </span>
                  </motion.div>

                  {/* Right Value Pill */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: 16 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08 + 0.04,
                      ease: "easeOut",
                    }}
                    className="shrink-0"
                  >
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold font-body border tracking-wide group-hover/row:scale-105 transition-transform duration-200 ${colorClass}`}
                    >
                      {item.value}
                    </span>
                  </motion.div>
                </div>

                {/* Optional Live Clock for Timezone */}
                {item.showLiveClock && (
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 6 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-2.5 flex items-center justify-between text-xs text-white/50 pl-10.5 pr-1 flex-wrap gap-2"
                  >
                    <span className="font-body text-white/50">
                      Live local time:
                    </span>
                    <span className="font-mono text-accent font-semibold tracking-wide flex items-center gap-1.5 bg-accent/10 px-2.5 py-1 rounded-full border border-accent/25 shadow-[0_0_8px_rgba(201,162,39,0.1)]">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      {pakistanTime ? (
                        <motion.span
                          key={pakistanTime}
                          initial={{ opacity: 0.6 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          Now: {pakistanTime}
                        </motion.span>
                      ) : (
                        <span>Calculating PKT...</span>
                      )}
                    </span>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Subtle Bottom Assurance Footer */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-body">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Fast turnaround guaranteed
          </span>
          <span className="text-accent font-medium">Hafizabad, Pakistan</span>
        </div>
      </motion.div>
    </div>
  );
}
