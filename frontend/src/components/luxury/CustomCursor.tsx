"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;
    setIsPointerDevice(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewEl = target.closest('[data-cursor="view"]');
      const dragEl = target.closest('[data-cursor="drag"]');
      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"]');

      if (viewEl) {
        setCursorType("view");
      } else if (dragEl) {
        setCursorType("drag");
      } else if (interactiveEl) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isPointerDevice) return null;

  const ringSizes = {
    default: { width: 36, height: 36, bg: "transparent", border: "rgba(79, 209, 197, 0.45)" },
    hover: { width: 52, height: 52, bg: "rgba(79, 209, 197, 0.12)", border: "#4FD1C5" },
    view: { width: 68, height: 68, bg: "rgba(33, 47, 84, 0.9)", border: "#4FD1C5" },
    drag: { width: 68, height: 68, bg: "rgba(33, 47, 84, 0.9)", border: "#4FD1C5" },
  };

  const currentSize = ringSizes[cursorType];

  return (
    <div className="pointer-events-none fixed inset-0 z-[9995] overflow-hidden">
      {/* Central 8px Teal Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorType === "view" || cursorType === "drag" ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="w-2 h-2 rounded-full bg-[#4FD1C5] shadow-[0_0_8px_#4FD1C5]"
      />

      {/* Lagging 36px Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: currentSize.width,
          height: currentSize.height,
          backgroundColor: currentSize.bg,
          borderColor: currentSize.border,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.22, ease: [0.22, 0.7, 0.2, 1] },
          height: { duration: 0.22, ease: [0.22, 0.7, 0.2, 1] },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
          opacity: { duration: 0.15 },
        }}
        className="rounded-full border flex items-center justify-center backdrop-blur-[1px]"
      >
        {cursorType === "view" && (
          <span className="text-[11px] font-semibold text-[#B5F5EC] uppercase tracking-wider font-body">
            View
          </span>
        )}
        {cursorType === "drag" && (
          <span className="text-[11px] font-semibold text-[#B5F5EC] uppercase tracking-wider font-body">
            Drag
          </span>
        )}
      </motion.div>
    </div>
  );
}

