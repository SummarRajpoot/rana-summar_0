"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: -1, isolation: "isolate" }}
    >
      {/* 34px Dotted Grid Overlay */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(rgba(79, 209, 197, 0.06) 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Aurora Conic Gradient Rotating behind Hero */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(79, 209, 197, 0.09) 0deg, rgba(74, 111, 184, 0.12) 120deg, rgba(181, 245, 236, 0.08) 240deg, rgba(79, 209, 197, 0.09) 360deg)",
          }}
          className="absolute -top-[20vw] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[950px] max-h-[950px] rounded-full blur-[130px] opacity-70"
        />
      )}

      {/* 1. Teal Orb */}
      {!prefersReducedMotion ? (
        <motion.div
          animate={{
            x: [0, 45, -35, 0],
            y: [0, -50, 25, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[15%] left-[8%] w-[420px] h-[420px] rounded-full bg-[#4FD1C5]/12 blur-[120px]"
        />
      ) : (
        <div className="absolute top-[15%] left-[8%] w-[420px] h-[420px] rounded-full bg-[#4FD1C5]/10 blur-[120px]" />
      )}

      {/* 2. Deep Blue Orb (#4A6FB8) */}
      {!prefersReducedMotion ? (
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[45%] right-[10%] w-[520px] h-[520px] rounded-full bg-[#4A6FB8]/16 blur-[140px]"
        />
      ) : (
        <div className="absolute top-[45%] right-[10%] w-[520px] h-[520px] rounded-full bg-[#4A6FB8]/14 blur-[140px]" />
      )}

      {/* 3. Aqua Orb (#B5F5EC) */}
      {!prefersReducedMotion ? (
        <motion.div
          animate={{
            x: [0, 50, -45, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.1, 0.92, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[18%] left-[20%] w-[460px] h-[460px] rounded-full bg-[#B5F5EC]/10 blur-[130px]"
        />
      ) : (
        <div className="absolute bottom-[18%] left-[20%] w-[460px] h-[460px] rounded-full bg-[#B5F5EC]/08 blur-[130px]" />
      )}

      {/* 4. Luxury Starlight Spark Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { top: "14%", left: "16%", delay: 0, dur: 7 },
            { top: "26%", left: "84%", delay: 1.5, dur: 9 },
            { top: "45%", left: "12%", delay: 3, dur: 8 },
            { top: "62%", left: "78%", delay: 2, dur: 10 },
            { top: "76%", left: "22%", delay: 4, dur: 8.5 },
            { top: "86%", left: "70%", delay: 1, dur: 7.5 },
          ].map((star, sIdx) => (
            <motion.div
              key={sIdx}
              animate={{
                y: [0, -18, 0],
                opacity: [0.15, 0.75, 0.15],
                scale: [0.8, 1.25, 0.8],
              }}
              transition={{
                duration: star.dur,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
              style={{
                top: star.top,
                left: star.left,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#B5F5EC] shadow-[0_0_8px_#4FD1C5]"
            />
          ))}
        </div>
      )}
    </div>
  );
}

