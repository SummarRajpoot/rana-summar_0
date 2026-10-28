"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function HeroPhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const prefersReducedMotion = useReducedMotion() ?? false;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((centerY - y) / centerY) * 7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((p) => ({ ...p, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative shrink-0 select-none py-6"
    >
      {/* 3D Tilt Wrapper */}
      <motion.div
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.18s ease-out",
        }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px] p-[3px] rounded-[28px] overflow-visible shadow-[0_20px_60px_rgba(10,18,34,0.6)]"
      >
        {/* Rotating Conic Teal Border */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[28px] conic-border-glow p-[2.5px]"
        >
          <div className="w-full h-full rounded-[26px] bg-[#1B2745]" />
        </div>

        {/* Ambient Glow behind photo */}
        <div
          aria-hidden="true"
          className="absolute -inset-2 rounded-[32px] bg-[#4FD1C5]/15 blur-2xl -z-10"
        />

        {/* Image Frame */}
        <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-[#0A0D14]">
          {/* Ken Burns Zoom on Image */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    scale: [1.02, 1.07, 1.02],
                  }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/WhatsApp Image 2026-05-17 at 12.38.50 AM.jpg"
              alt="Rana Summar — Full-Stack AI Developer"
              fill
              className="object-cover"
              style={{ objectPosition: "center 29%" }}
              priority
              sizes="(max-width: 768px) 256px, 360px"
            />
          </motion.div>

          {/* Mouse Glare Overlay */}
          {!prefersReducedMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
              style={{
                opacity: glarePos.opacity,
                background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(181, 245, 236, 0.35), transparent 70%)`,
              }}
            />
          )}
        </div>

        {/* Floating Tech Chip 1: Next.js (top-left) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  rotate: [0, -1.5, 0],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-3 -left-4 sm:-top-4 sm:-left-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#212F54]/90 border border-[#4FD1C5]/35 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#4FD1C5] shadow-[0_0_8px_#4FD1C5]" />
          <span className="font-body text-xs font-semibold text-[#B5F5EC]">Next.js</span>
        </motion.div>

        {/* Floating Tech Chip 2: LangGraph (bottom-left) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, 9, 0],
                  rotate: [0, 1.5, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-5 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#212F54]/90 border border-[#4FD1C5]/35 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#B5F5EC] shadow-[0_0_8px_#B5F5EC]" />
          <span className="font-body text-xs font-semibold text-[#B5F5EC]">LangGraph</span>
        </motion.div>

        {/* Floating Tech Chip 3: FastAPI (top-right) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -10, 0],
                  rotate: [0, 1, 0],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-6 -right-4 sm:top-8 sm:-right-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#212F54]/90 border border-[#4FD1C5]/35 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#4FD1C5] shadow-[0_0_8px_#4FD1C5]" />
          <span className="font-body text-xs font-semibold text-[#B5F5EC]">FastAPI</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

