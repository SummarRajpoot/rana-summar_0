"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RotateCw, Maximize2, X, ShieldCheck } from "lucide-react";

export interface FlipCardProps {
  front: string;
  back: string;
  caption: string;
  alt: string;
  orientation?: "landscape" | "portrait";
  className?: string;
}

const BLUR_PLACEHOLDER_LANDSCAPE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTEwZDBiIi8+PC9zdmc+";

const BLUR_PLACEHOLDER_PORTRAIT =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzE2IiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTEwZDBiIi8+PC9zdmc+";

export function FlipCard({
  front,
  back,
  caption,
  alt,
  orientation = "landscape",
  className = "",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const isPortrait = orientation === "portrait";
  const aspectRatioStr = isPortrait ? "0.62 / 1" : "1.58 / 1";
  const maxCardWidthClass = isPortrait ? "max-w-[300px]" : "max-w-[520px]";
  const blurPlaceholder = isPortrait
    ? BLUR_PLACEHOLDER_PORTRAIT
    : BLUR_PLACEHOLDER_LANDSCAPE;

  // Preload both images immediately when mounted/chapter opens so flips never show blank faces
  useEffect(() => {
    if (typeof window !== "undefined") {
      const imgFront = new window.Image();
      imgFront.src = front;
      imgFront.onerror = () => setHasError(true);

      const imgBack = new window.Image();
      imgBack.src = back;
      imgBack.onerror = () => setHasError(true);
    }
  }, [front, back]);

  // Detect desktop for hover tilt (disabled on touch devices)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
          window.innerWidth >= 768
      );
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Modal keyboard handling (Escape key + focus trap)
  useEffect(() => {
    if (!isModalOpen) return;
    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus?.();
    };
  }, [isModalOpen]);

  // If either image fails to load, silently hide the entire item
  if (hasError) {
    return null;
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div className={`my-6 w-full flex flex-col items-center ${className}`}>
      {/* 3D Perspective Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1200,
          aspectRatio: aspectRatioStr,
          transform:
            !prefersReducedMotion && isDesktop
              ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
              : undefined,
          transition: "transform 0.15s ease-out",
        }}
        className={`relative w-full ${maxCardWidthClass} select-none group mx-auto`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Expand Modal Trigger Button (Top-Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          aria-label="Expand student card in modal"
          title="Expand card view"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-xl bg-black/70 backdrop-blur-md border border-accent/40 hover:border-amber-300 text-white/80 hover:text-white flex items-center justify-center transition-all shadow-md hover:scale-105 cursor-pointer"
        >
          <Maximize2 className="w-4 h-4 text-accent" />
        </button>

        {/* The Flip Card Button */}
        <button
          type="button"
          onClick={handleFlip}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleFlip();
            }
          }}
          aria-pressed={isFlipped}
          aria-label={
            isFlipped
              ? "Student card, back side. Press to flip."
              : "Student card, front side. Press to flip."
          }
          className="w-full h-full relative rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent block text-left"
        >
          {/* Motion Card Inner with 3D Transform (NO overflow-hidden here to preserve 3D space) */}
          <motion.div
            style={{
              transformStyle: "preserve-3d",
            }}
            animate={
              prefersReducedMotion
                ? { rotateY: 0 }
                : { rotateY: isFlipped ? 180 : 0 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            className="w-full h-full relative rounded-2xl shadow-[0_10px_35px_rgba(201,162,39,0.22)] hover:shadow-[0_16px_50px_rgba(201,162,39,0.38)] transition-shadow duration-300"
          >
            {/* FRONT FACE */}
            <motion.div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              animate={
                prefersReducedMotion
                  ? { opacity: isFlipped ? 0 : 1 }
                  : { opacity: 1 }
              }
              transition={{ duration: 0.25 }}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-accent/50 group-hover:border-amber-300 transition-colors bg-[#120f0a]"
            >
              <Image
                src={front}
                alt={`${alt} — Front`}
                fill
                loading="lazy"
                sizes={
                  isPortrait
                    ? "(max-width: 640px) 100vw, 300px"
                    : "(max-width: 640px) 100vw, 520px"
                }
                placeholder="blur"
                blurDataURL={blurPlaceholder}
                onError={() => setHasError(true)}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="object-cover rounded-2xl pointer-events-none select-none"
                style={{ WebkitTouchCallout: "none" }}
              />

              {/* Repeating Watermark */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-10 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='80' viewBox='0 0 180 80'%3E%3Ctext transform='rotate(-25 90 40)' x='50%25' y='50%25' fill='%23C9A227' font-family='sans-serif' font-weight='bold' font-size='11' text-anchor='middle' opacity='0.4'%3Eranasummar.vercel.app%3C/text%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />

              {/* Front Label */}
              <div className="absolute top-3 left-3 z-20">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-200 border border-accent/40 shadow-sm">
                  Front
                </span>
              </div>

              {/* Shimmer Light Sweep on Hover (Desktop) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none z-20"
              />
            </motion.div>

            {/* BACK FACE */}
            <motion.div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: prefersReducedMotion ? "none" : "rotateY(180deg)",
              }}
              animate={
                prefersReducedMotion
                  ? { opacity: isFlipped ? 1 : 0 }
                  : { opacity: 1 }
              }
              transition={{ duration: 0.25 }}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-accent/50 group-hover:border-amber-300 transition-colors bg-[#120f0a]"
            >
              <Image
                src={back}
                alt={`${alt} — Back`}
                fill
                loading="lazy"
                sizes={
                  isPortrait
                    ? "(max-width: 640px) 100vw, 300px"
                    : "(max-width: 640px) 100vw, 520px"
                }
                placeholder="blur"
                blurDataURL={blurPlaceholder}
                onError={() => setHasError(true)}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="object-cover rounded-2xl pointer-events-none select-none"
                style={{ WebkitTouchCallout: "none" }}
              />

              {/* Repeating Watermark */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-10 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='80' viewBox='0 0 180 80'%3E%3Ctext transform='rotate(-25 90 40)' x='50%25' y='50%25' fill='%23C9A227' font-family='sans-serif' font-weight='bold' font-size='11' text-anchor='middle' opacity='0.4'%3Eranasummar.vercel.app%3C/text%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />

              {/* Back Label */}
              <div className="absolute top-3 left-3 z-20">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-200 border border-accent/40 shadow-sm">
                  Back
                </span>
              </div>

              {/* Shimmer Light Sweep on Hover (Desktop) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none z-20"
              />
            </motion.div>
          </motion.div>
        </button>
      </div>

      {/* Small Hint Under Card */}
      <div className="mt-3.5 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={handleFlip}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-heading font-semibold text-accent bg-accent/10 border border-accent/30 hover:border-accent hover:bg-accent/20 transition-all cursor-pointer"
        >
          <RotateCw
            className={`w-3.5 h-3.5 text-accent transition-transform duration-500 ${
              isFlipped ? "rotate-180" : ""
            }`}
          />
          <span>
            {isFlipped ? "Showing back, tap to flip back" : "Tap to flip"}
          </span>
        </button>
      </div>

      {/* Caption Under Hint */}
      {caption && (
        <p className="text-xs sm:text-sm text-white/70 font-body text-center max-w-[500px] leading-relaxed mt-2.5">
          {caption}
        </p>
      )}

      {/* EXPAND MODAL VIEW */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="flipcard-modal-title"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${
                isPortrait ? "max-w-md max-h-[92vh]" : "max-w-2xl"
              } rounded-3xl bg-gradient-to-br from-[#16130d] via-[#1a160f] to-[#120f0a] border border-accent/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-5 sm:p-7 flex flex-col items-center overflow-y-auto`}
            >
              {/* Modal Header Bar */}
              <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <h4
                    id="flipcard-modal-title"
                    className="text-sm sm:text-base font-bold font-heading text-white"
                  >
                    Student Identity Card (Expanded View)
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-red-400 hover:bg-red-500/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Card Flip Container */}
              <div
                style={{
                  perspective: 1200,
                  aspectRatio: aspectRatioStr,
                }}
                className={`relative w-full ${
                  isPortrait
                    ? "max-w-[280px] sm:max-w-[320px] max-h-[58vh]"
                    : "max-w-xl"
                } my-2 cursor-pointer select-none mx-auto`}
                onClick={handleFlip}
                onContextMenu={(e) => e.preventDefault()}
              >
                <motion.div
                  style={{ transformStyle: "preserve-3d" }}
                  animate={
                    prefersReducedMotion
                      ? { rotateY: 0 }
                      : { rotateY: isFlipped ? 180 : 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                  }}
                  className="w-full h-full relative rounded-2xl shadow-2xl"
                >
                  {/* Front Face */}
                  <motion.div
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    animate={
                      prefersReducedMotion
                        ? { opacity: isFlipped ? 0 : 1 }
                        : { opacity: 1 }
                    }
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-accent/50 bg-[#120f0a]"
                  >
                    <Image
                      src={front}
                      alt={`${alt} — Front`}
                      fill
                      loading="lazy"
                      sizes={
                        isPortrait
                          ? "(max-width: 768px) 100vw, 360px"
                          : "(max-width: 768px) 100vw, 700px"
                      }
                      placeholder="blur"
                      blurDataURL={blurPlaceholder}
                      className="object-cover rounded-2xl pointer-events-none select-none"
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ WebkitTouchCallout: "none" }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none z-10 opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='80' viewBox='0 0 180 80'%3E%3Ctext transform='rotate(-25 90 40)' x='50%25' y='50%25' fill='%23C9A227' font-family='sans-serif' font-weight='bold' font-size='11' text-anchor='middle' opacity='0.4'%3Eranasummar.vercel.app%3C/text%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                      }}
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-200 border border-accent/40">
                        Front
                      </span>
                    </div>
                  </motion.div>

                  {/* Back Face */}
                  <motion.div
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: prefersReducedMotion
                        ? "none"
                        : "rotateY(180deg)",
                    }}
                    animate={
                      prefersReducedMotion
                        ? { opacity: isFlipped ? 1 : 0 }
                        : { opacity: 1 }
                    }
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-accent/50 bg-[#120f0a]"
                  >
                    <Image
                      src={back}
                      alt={`${alt} — Back`}
                      fill
                      loading="lazy"
                      sizes={
                        isPortrait
                          ? "(max-width: 768px) 100vw, 360px"
                          : "(max-width: 768px) 100vw, 700px"
                      }
                      placeholder="blur"
                      blurDataURL={blurPlaceholder}
                      className="object-cover rounded-2xl pointer-events-none select-none"
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ WebkitTouchCallout: "none" }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none z-10 opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='80' viewBox='0 0 180 80'%3E%3Ctext transform='rotate(-25 90 40)' x='50%25' y='50%25' fill='%23C9A227' font-family='sans-serif' font-weight='bold' font-size='11' text-anchor='middle' opacity='0.4'%3Eranasummar.vercel.app%3C/text%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                      }}
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-200 border border-accent/40">
                        Back
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Modal Hint & Caption */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleFlip}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-heading font-semibold text-accent bg-accent/10 border border-accent/30 hover:border-accent hover:bg-accent/20 transition-all cursor-pointer"
                >
                  <RotateCw
                    className={`w-3.5 h-3.5 text-accent transition-transform duration-500 ${
                      isFlipped ? "rotate-180" : ""
                    }`}
                  />
                  <span>
                    {isFlipped
                      ? "Showing back, tap to flip back"
                      : "Tap to flip"}
                  </span>
                </button>
              </div>

              {caption && (
                <p className="text-xs sm:text-sm text-white/70 font-body text-center max-w-[540px] leading-relaxed mt-2.5">
                  {caption}
                </p>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
