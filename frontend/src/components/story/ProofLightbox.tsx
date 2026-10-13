"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, RotateCcw, ShieldCheck, FileText } from "lucide-react";
import { ChapterProof } from "@/data/story";

interface ProofLightboxProps {
  proof: ChapterProof | null;
  onClose: () => void;
}

export function ProofLightbox({ proof, onClose }: ProofLightboxProps) {
  const [scale, setScale] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape & trap focus
  useEffect(() => {
    if (!proof) return;
    setScale(1);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [proof, onClose]);

  if (!proof) return null;

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.35, 2.5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.35, 0.75));
  const handleResetZoom = () => setScale(1);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="proof-modal-title"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-gradient-to-br from-[#141414]/98 via-[#181818]/95 to-[#101010]/98 border border-accent/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-accent block">
                  Document Available
                </span>
                <h3 id="proof-modal-title" className="text-base sm:text-lg font-bold font-heading text-white">
                  {proof.title}
                </h3>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleZoomIn}
                aria-label="Zoom In"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                aria-label="Zoom Out"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {scale !== 1 && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  aria-label="Reset Zoom"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-red-400 hover:bg-red-500/10 flex items-center justify-center transition-colors cursor-pointer ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Container with Watermark */}
          <div
            className="relative flex-1 min-h-[300px] sm:min-h-[440px] max-h-[60vh] bg-black/70 flex items-center justify-center p-4 overflow-hidden select-none"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* The Document Image */}
            <div
              style={{ transform: `scale(${scale})`, transition: "transform 0.2s ease-out" }}
              className="relative w-full h-full max-h-[58vh] flex items-center justify-center pointer-events-none"
            >
              <Image
                src={proof.image}
                alt={proof.title}
                width={1200}
                height={850}
                onDragStart={(e) => e.preventDefault()}
                className="max-h-[58vh] w-auto object-contain rounded-lg shadow-2xl pointer-events-none"
              />
            </div>

            {/* Subtle Diagonal Repeating Watermark Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-25"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='100' viewBox='0 0 220 100'%3E%3Ctext transform='rotate(-25 110 50)' x='50%25' y='50%25' fill='%23C9A227' font-family='sans-serif' font-weight='bold' font-size='13' text-anchor='middle' opacity='0.3'%3Eranasummar.vercel.app%3C/text%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
              }}
            />
          </div>

          {/* Caption Footer */}
          <div className="p-5 sm:p-6 bg-white/[0.02] border-t border-white/10 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0 mt-0.5">
              <ShieldCheck className="w-3 h-3 stroke-[2.5]" />
            </div>
            <p className="text-white/80 font-body text-xs sm:text-sm leading-relaxed">
              {proof.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
