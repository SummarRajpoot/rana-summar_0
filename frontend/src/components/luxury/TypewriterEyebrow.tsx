"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIntro } from "@/components/IntroGate";

interface TypewriterEyebrowProps {
  text?: string;
  speed?: number;
  delay?: number;
  className?: string;
  start?: boolean;
}

export function TypewriterEyebrow({
  text = "FULL-STACK AI DEVELOPER",
  speed = 45,
  delay = 200,
  className = "",
  start = true,
}: TypewriterEyebrowProps) {
  const { ready } = useIntro();
  const [displayedText, setDisplayedText] = useState("");
  const prefersReducedMotion = useReducedMotion() ?? false;
  const shouldStart = start && ready;

  useEffect(() => {
    if (!shouldStart) {
      setDisplayedText("");
      return;
    }

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setDisplayedText(text);
      }, 0);
      return () => clearTimeout(timer);
    }

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      timeoutId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(timeoutId);
        }
      }, speed);
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(timeoutId);
    };
  }, [text, speed, delay, prefersReducedMotion, shouldStart]);

  return (
    <div className={`eyebrow-label ${className}`}>
      <span>{displayedText}</span>
      <span className="inline-block w-[2px] h-[0.9em] bg-[#4FD1C5] animate-pulse ml-0.5 align-middle" />
    </div>
  );
}
