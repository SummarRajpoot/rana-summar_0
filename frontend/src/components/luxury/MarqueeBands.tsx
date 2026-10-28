"use client";

import { useReducedMotion } from "framer-motion";

const techItems = [
  "Next.js",
  "LangGraph",
  "FastAPI",
  "Python",
  "LangChain",
  "TypeScript",
  "MongoDB",
  "Google Gemini",
  "Tailwind CSS",
  "RAG",
  "Hugging Face",
  "Docker",
  "Claude API",
  "Groq LLaMA",
  "Playwright",
  "REST APIs",
];

export function TechMarquee() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className="w-full bg-[#141D35] border-y border-[#4FD1C5]/15 py-4 overflow-hidden relative select-none"
      style={{ isolation: "isolate" }}
    >
      {/* Edge gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#141D35] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#141D35] to-transparent z-10 pointer-events-none" />

      <div
        className={`flex items-center gap-8 whitespace-nowrap ${
          prefersReducedMotion ? "overflow-x-auto no-scrollbar" : "animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]"
        }`}
      >
        {/* Render repeated list for continuous loop */}
        {[...techItems, ...techItems, ...techItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="font-body text-xs sm:text-sm font-semibold text-[#C9D1E3] tracking-wide uppercase hover:text-[#B5F5EC] transition-colors cursor-default">
              {item}
            </span>
            <span className="text-[#4FD1C5] text-xs" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const largeWords = [
  "AI AGENTS",
  "FULL-STACK",
  "LANGGRAPH",
  "NEXT.JS",
  "FASTAPI",
  "AUTOMATION",
];

export function LargeWordsMarquee() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className="w-full bg-[#141D35] border-y border-[#4FD1C5]/15 py-6 sm:py-8 overflow-hidden relative select-none my-12"
      style={{ isolation: "isolate" }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#141D35] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#141D35] to-transparent z-10 pointer-events-none" />

      <div
        className={`flex items-center gap-12 sm:gap-16 whitespace-nowrap ${
          prefersReducedMotion ? "overflow-x-auto no-scrollbar" : "animate-[marqueeReverse_35s_linear_infinite] hover:[animation-play-state:paused]"
        }`}
      >
        {[...largeWords, ...largeWords, ...largeWords].map((word, idx) => (
          <div key={idx} className="flex items-center gap-12 sm:gap-16 shrink-0 group">
            <span
              className="font-heading italic font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight transition-all duration-300 cursor-pointer text-transparent hover:text-[#4FD1C5] hover:drop-shadow-[0_0_25px_rgba(79,209,197,0.45)]"
              style={{
                WebkitTextStroke: "1.5px #4FD1C5",
              }}
            >
              {word}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4FD1C5]/40 group-hover:bg-[#4FD1C5] group-hover:scale-125 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
}

