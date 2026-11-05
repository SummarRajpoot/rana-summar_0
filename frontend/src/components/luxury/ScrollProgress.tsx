"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useIntro } from "@/components/IntroGate";

export function ScrollProgress() {
  const { phase } = useIntro();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (phase === "intro") return null;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4FD1C5] to-[#B5F5EC] z-[9990] pointer-events-none"
    />
  );
}

