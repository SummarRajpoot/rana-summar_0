"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  highlightWord?: string;
  highlightClassName?: string;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  highlightWord,
  highlightClassName = "font-heading italic accent-shimmer",
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {words.map((word, i) => {
          const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
          return (
            <span key={i} className={isHighlight ? highlightClassName : undefined}>
              {word}{i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIdx) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <span key={wordIdx} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
            <motion.span
              initial={{ y: "115%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.85,
                delay: delay + wordIdx * stagger,
                ease: [0.22, 0.7, 0.2, 1],
              }}
              className={`inline-block ${isHighlight ? highlightClassName : ""}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

