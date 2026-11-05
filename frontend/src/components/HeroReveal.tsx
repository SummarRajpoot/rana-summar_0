"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntro } from "@/components/IntroGate";

interface HeroRevealProps {
  children: React.ReactNode;
  className?: string;
}

const ease = [0.22, 0.7, 0.2, 1] as const;

export function HeroStagger({ children, className = "" }: HeroRevealProps) {
  const { ready } = useIntro();
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={prefersReduced || ready ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.09, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroReveal({ children, className = "" }: HeroRevealProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
