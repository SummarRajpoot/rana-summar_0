"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterEyebrowProps {
  text?: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function TypewriterEyebrow({
  text = "FULL-STACK AI DEVELOPER",
  speed = 45,
  delay = 300,
  className = "",
}: TypewriterEyebrowProps) {
  const [displayedText, setDisplayedText] = useState("");
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      return;
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
  }, [text, speed, delay, prefersReducedMotion]);

  return (
    <div className={`eyebrow-label ${className}`}>
      <span>{displayedText}</span>
      <span className="inline-block w-[2px] h-[0.9em] bg-[#4FD1C5] animate-pulse ml-0.5 align-middle" />
    </div>
  );
}

