"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useIntro } from "@/components/IntroGate";

export function SmoothScroll() {
  const { ready } = useIntro();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Lock scrolling while intro is running
    if (!ready) {
      lenis.stop();
    }

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Update lenis running state when intro completes
  useEffect(() => {
    if (!lenisRef.current) return;
    if (ready) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }
  }, [ready]);

  return null;
}
