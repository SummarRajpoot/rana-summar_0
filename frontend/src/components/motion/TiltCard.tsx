"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
  glareOpacity?: number;
  dataCursor?: string;
}

export function TiltCard({
  children,
  maxTilt = 6,
  className = "",
  glareOpacity = 0.15,
  dataCursor,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const prefersReducedMotion = useReducedMotion() ?? false;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((centerY - y) / centerY) * maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: glareOpacity });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      style={{
        transform: prefersReducedMotion
          ? undefined
          : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.18s ease-out",
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glare effect */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(181, 245, 236, 0.28), transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

