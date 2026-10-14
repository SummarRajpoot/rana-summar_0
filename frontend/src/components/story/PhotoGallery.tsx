"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, ZoomIn } from "lucide-react";

export interface StoryPhotoItem {
  src: string;
  caption: string;
  alt: string;
}

export interface PhotoGalleryProps {
  photos: StoryPhotoItem[];
  className?: string;
}

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTEwZDBiIi8+PC9zdmc+";

export function PhotoGallery({ photos, className = "" }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const validPhotos = photos.filter((p) => !failedUrls.has(p.src));

  const handleImageError = (src: string) => {
    setFailedUrls((prev) => new Set(prev).add(src));
  };

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || validPhotos.length === 0) return;
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + validPhotos.length) % validPhotos.length
    );
  }, [selectedIndex, validPhotos.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null || validPhotos.length === 0) return;
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % validPhotos.length
    );
  }, [selectedIndex, validPhotos.length]);

  // Modal keyboard navigation & focus trap
  useEffect(() => {
    if (selectedIndex === null) return;
    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
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
  }, [selectedIndex, handlePrev, handleNext]);

  // If no photos remain after error suppression, hide silently
  if (validPhotos.length === 0) {
    return null;
  }

  const activePhoto =
    selectedIndex !== null ? validPhotos[selectedIndex] : null;

  return (
    <div className={`mt-5 w-full ${className}`}>
      {/* Small Header Tag */}
      <div className="flex items-center gap-2 mb-3">
        <Camera className="w-3.5 h-3.5 text-accent" />
        <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-accent/90">
          Photos ({validPhotos.length})
        </span>
      </div>

      {/* Thumbnails Grid */}
      <div
        className={`grid gap-4 sm:gap-6 w-full ${
          validPhotos.length === 1
            ? "max-w-[340px] sm:max-w-[360px] mx-auto grid-cols-1"
            : "max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {validPhotos.map((photo, idx) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => handleOpen(idx)}
            aria-label={`View photo: ${photo.caption || photo.alt}`}
            className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-accent/60 bg-gradient-to-b from-[#16120b] to-[#0e0c08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(201,162,39,0.18)] hover:scale-[1.01] cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {/* Image Box */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/60 flex items-center justify-center">
              {/* Subtle Ambient Blurred Backdrop */}
              <Image
                src={photo.src}
                alt=""
                fill
                aria-hidden="true"
                className="object-cover blur-2xl opacity-20 scale-125 pointer-events-none"
              />

              {/* Full Uncropped Photo (same as open modal view) */}
              <div className="relative w-full h-full p-2.5 flex items-center justify-center">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 90vw, 360px"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  onError={() => handleImageError(photo.src)}
                  className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Zoom Icon in Top-Right on Hover */}
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Clean Caption Bar Under Image */}
            {photo.caption && (
              <div className="w-full px-3.5 py-2.5 bg-[#120f0a] border-t border-white/10 flex items-center justify-center">
                <p className="text-xs font-body text-white/85 text-center leading-relaxed line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhoto && selectedIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-modal-title"
            onClick={handleClose}
          >
            <motion.div
              ref={modalRef}
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }
              }
              animate={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
              }
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[92vh] rounded-3xl bg-gradient-to-br from-[#141414]/98 via-[#181818]/95 to-[#101010]/98 border border-accent/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-accent" />
                  <span
                    id="photo-modal-title"
                    className="text-xs sm:text-sm font-heading font-bold text-white tracking-wide"
                  >
                    Photo {selectedIndex + 1} of {validPhotos.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {validPhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous photo"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next photo"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close photo view"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-red-400 hover:bg-red-500/10 flex items-center justify-center transition-colors cursor-pointer ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Photo View Area */}
              <div className="relative flex-1 min-h-[260px] sm:min-h-[420px] max-h-[64vh] bg-black/80 flex items-center justify-center p-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhoto.src}
                    initial={
                      prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }
                    }
                    animate={
                      prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
                    }
                    exit={
                      prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full max-h-[60vh] flex items-center justify-center"
                  >
                    <Image
                      src={activePhoto.src}
                      alt={activePhoto.alt}
                      width={1200}
                      height={900}
                      loading="lazy"
                      onError={() => {
                        handleImageError(activePhoto.src);
                        handleClose();
                      }}
                      className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Floating Chevrons for Quick Click */}
                {validPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:border-accent hover:bg-accent/20 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:border-accent hover:bg-accent/20 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption Footer */}
              {activePhoto.caption && (
                <div className="p-4 sm:p-5 bg-white/[0.02] border-t border-white/10 text-center">
                  <p className="text-xs sm:text-sm text-white/85 font-body leading-relaxed max-w-xl mx-auto">
                    {activePhoto.caption}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
