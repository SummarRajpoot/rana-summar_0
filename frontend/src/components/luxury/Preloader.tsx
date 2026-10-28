"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Check sessionStorage to show only once per session
    const hasSeen = sessionStorage.getItem("rs_preloader_seen");
    if (!hasSeen) {
      setIsVisible(true);
      setIsRendered(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    sessionStorage.setItem("rs_preloader_seen", "true");
    setIsVisible(false);
    // Dispatch custom event so hero animations know preloader has lifted
    window.dispatchEvent(new CustomEvent("preloader-finished"));
  };

  if (!isRendered) return null;

  return (
    <AnimatePresence onExitComplete={() => setIsRendered(false)}>
      {isVisible && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.9,
              ease: [0.77, 0, 0.18, 1], // Luxury large transition easing
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1B2745] text-[#F7F5F0] overflow-hidden"
          style={{ willChange: "transform" }}
        >
          {/* Subtle background glow */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[#4FD1C5]/10 blur-[100px] pointer-events-none" />

          {/* Monogram "RS" */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.7, 0.2, 1],
              delay: 0.1,
            }}
            className="font-heading font-bold text-5xl sm:text-6xl text-[#B5F5EC] tracking-tight relative mb-4 select-none"
          >
            RS
          </motion.div>

          {/* Teal line drawing to 200px */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 0.7, 0.2, 1],
              delay: 0.5,
            }}
            className="h-[1px] bg-[#4FD1C5] mb-4"
          />

          {/* "RANA SUMMAR" with 0.5em letter spacing */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.7, 0.2, 1],
              delay: 0.9,
            }}
            onAnimationComplete={() => {
              // Wait briefly before sliding up, total duration ~ 2.4s
              setTimeout(() => {
                handleAnimationComplete();
              }, 400);
            }}
            className="font-body text-xs sm:text-sm font-semibold text-[#F7F5F0] tracking-[0.5em] uppercase select-none text-center pl-[0.5em]"
          >
            Rana Summar
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

