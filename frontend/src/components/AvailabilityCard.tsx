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
  const [pakistanTime, setPakistanTime] = useState<string>("");
  const prefersReducedMotion = useReducedMotion() ?? false;

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

  return (
    <div className={`relative ${className}`}>
      <motion.div
        ref={cardRef}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 0.7, 0.2, 1] }}
        className="surface-card rounded-[20px] p-6 sm:p-8 shadow-[0_16px_50px_rgba(10,18,34,0.45)] border border-[#4FD1C5]/25 overflow-hidden transition-all duration-300 hover:border-[#4FD1C5]/50"
      >
        {/* Header Section */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-[#4FD1C5]/15">
          <div>
            <span className="eyebrow-label text-xs mb-1">
              Status &amp; Schedule
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F7F5F0] tracking-tight">
              Availability
            </h3>
          </div>

          {/* Pulsing Teal Dot with Ring Ripple */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#4FD1C5]/10 border border-[#4FD1C5]/30 w-fit shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4FD1C5] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4FD1C5] shadow-[0_0_8px_#4FD1C5]" />
            </span>
            <span className="text-xs font-semibold text-[#B5F5EC] font-body tracking-wide">
              Open for new projects
            </span>
          </div>
        </div>

        {/* Rows List */}
        <div className="relative z-10 pt-2 divide-y divide-[#4FD1C5]/10">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group/row relative py-4 transition-colors duration-200"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#4FD1C5]/15 border border-[#4FD1C5]/30 flex items-center justify-center text-[#B5F5EC] shrink-0">
                      <Icon className="w-4 h-4 text-[#4FD1C5]" />
                    </div>
                    <span className="text-[#C9D1E3] font-body font-medium text-sm sm:text-base">
                      {item.label}
                    </span>
                  </div>

                  <div className="shrink-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold font-body border border-[#4FD1C5]/30 bg-[#16203A] text-[#B5F5EC] shadow-sm">
                      {item.value}
                    </span>
                  </div>
                </div>

                {/* Live Clock for Timezone */}
                {item.showLiveClock && (
                  <div className="mt-2.5 flex items-center justify-between text-xs text-[#AEB8D0] pl-10.5 pr-1 flex-wrap gap-2">
                    <span className="font-body text-[#AEB8D0]">
                      Live local time:
                    </span>
                    <span className="font-mono text-[#4FD1C5] font-semibold tracking-wide flex items-center gap-1.5 bg-[#16203A] px-2.5 py-1 rounded-full border border-[#4FD1C5]/25 shadow-[0_0_8px_rgba(79,209,197,0.15)]">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4FD1C5] animate-pulse" />
                      {pakistanTime ? (
                        <span>Now: {pakistanTime}</span>
                      ) : (
                        <span>Calculating PKT...</span>
                      )}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Footer */}
        <div className="relative z-10 mt-6 pt-5 border-t border-[#4FD1C5]/15 flex items-center justify-between text-xs text-[#AEB8D0] font-body">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5]" />
            Fast turnaround guaranteed
          </span>
          <span className="text-[#4FD1C5] font-medium">Hafizabad, Pakistan</span>
        </div>
      </motion.div>
    </div>
  );
}
