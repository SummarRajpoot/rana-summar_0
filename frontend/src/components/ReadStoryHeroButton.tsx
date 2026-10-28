"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";

export function ReadStoryHeroButton() {
  return (
    <Magnetic strength={0.3}>
      <Link
        href="/story"
        aria-label="Read My Story — Personal journey from village fields to AI engineering"
        className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-[#F7F5F0] text-[#1B2745] px-8 py-3.5 sm:px-9 sm:py-3.5 font-body font-semibold text-[0.9375rem] tracking-[0.01em] shadow-[0_0_20px_rgba(247,245,240,0.2)] hover:bg-[#B5F5EC] hover:shadow-[0_0_30px_rgba(181,245,236,0.5)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer z-10"
      >
        <BookOpen className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-[-6deg] text-[#1B2745]" />
        <span className="font-semibold">Read My Story</span>

        {/* Subtle shimmer highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none"
        />
      </Link>
    </Magnetic>
  );
}
