"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  User,
  Home,
  School,
  MapPin,
  Wheat,
  GraduationCap,
  Laptop,
  Medal,
  Phone,
  Briefcase,
  Trophy,
  Compass,
  Rocket,
  Sparkles,
  ChevronDown,
  Lightbulb,
  Check,
  FileText,
  Camera,
  type LucideIcon,
} from "lucide-react";
import { chapters, ChapterProof, Media } from "@/data/story";
import { FlipCard } from "@/components/story/FlipCard";
import { PhotoGallery } from "@/components/story/PhotoGallery";

const iconMap: Record<string, LucideIcon> = {
  User,
  Home,
  School,
  MapPin,
  Wheat,
  GraduationCap,
  Laptop,
  Medal,
  Phone,
  Briefcase,
  Trophy,
  Compass,
  Rocket,
};

interface ChaptersSectionProps {
  onViewProof: (proof: ChapterProof) => void;
}

export function ChaptersSection({ onViewProof }: ChaptersSectionProps) {
  const [openChapterId, setOpenChapterId] = useState<number | null>(1); // first chapter open by default
  const prefersReducedMotion = useReducedMotion() ?? false;

  const handleToggle = (id: number) => {
    setOpenChapterId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden" id="chapters">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 shadow-[0_0_8px_rgba(201,162,39,0.15)] mb-4">
            CHAPTERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight mb-4">
            The full story
          </h2>
          <p className="text-white/70 font-body text-base sm:text-lg">
            Every step, decision, and lesson detailed chronologically from childhood to artificial intelligence.
          </p>
        </div>

        {/* Vertical Accordion Timeline */}
        <div className="relative space-y-6 sm:space-y-7">
          {/* Vertical Background Line */}
          <div
            aria-hidden="true"
            className="absolute top-8 bottom-8 left-6 sm:left-9 w-0.5 bg-foreground/10 pointer-events-none hidden sm:block"
          />

          {chapters.map((chapter, index) => {
            const Icon = iconMap[chapter.iconName] || Sparkles;
            const isOpen = openChapterId === chapter.id;

            const mediaList = Array.isArray(chapter.media)
              ? chapter.media
              : chapter.media
              ? [chapter.media]
              : [];

            const flipcards = mediaList.filter(
              (m): m is Extract<Media, { type: "flipcard" }> => m.type === "flipcard"
            );
            const photos = mediaList.filter(
              (m): m is Extract<Media, { type: "photo" | "image" }> =>
                m.type === "photo" || m.type === "image"
            );

            const hasDocument = Boolean(chapter.proof || flipcards.length > 0);
            const hasPhotos = photos.length > 0;

            return (
              <motion.div
                key={chapter.id}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
                className={`relative rounded-3xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-gradient-to-br from-[#16130d] via-[#1a160f] to-[#120f0a] border border-accent/70 shadow-[0_15px_50px_rgba(201,162,39,0.22)] ring-1 ring-accent/30"
                    : "bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 border border-white/10 hover:border-accent/40 shadow-lg"
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => handleToggle(chapter.id)}
                  aria-expanded={isOpen}
                  aria-controls={`chapter-content-${chapter.id}`}
                  id={`chapter-header-${chapter.id}`}
                  className="w-full text-left p-6 sm:p-7 md:p-8 flex items-start gap-4 sm:gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-3xl cursor-pointer group"
                >
                  {/* Number & Icon Container */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-accent to-amber-500 text-surface-dark shadow-[0_0_20px_rgba(201,162,39,0.7)] scale-105"
                          : "bg-surface-dark border-2 border-accent/50 text-accent group-hover:border-accent group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="absolute -bottom-2 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold bg-surface-dark border border-accent text-accent">
                      #{chapter.numberStr}
                    </span>
                  </div>

                  {/* Header Title & Badges */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-2">
                      {chapter.tag && (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-accent bg-accent/15 border border-accent/30">
                          {chapter.tag}
                        </span>
                      )}

                      {/* Document available badge (never "Verified") */}
                      {hasDocument && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-400/30 shadow-[0_0_8px_rgba(52,211,153,0.15)]">
                          <FileText className="w-3 h-3" />
                          <span>Document available</span>
                        </span>
                      )}

                      {/* Photos badge */}
                      {hasPhotos && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-semibold text-sky-400 bg-sky-500/10 border border-sky-400/30 shadow-[0_0_8px_rgba(56,189,248,0.15)]">
                          <Camera className="w-3 h-3" />
                          <span>Photos</span>
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-lg sm:text-xl md:text-2xl font-bold font-heading transition-colors duration-200 leading-snug ${
                        isOpen ? "text-amber-200" : "text-white group-hover:text-amber-200"
                      }`}
                    >
                      {chapter.title}
                    </h3>
                  </div>

                  {/* Chevron Indicator */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-accent text-surface-dark rotate-180 shadow-md"
                        : "bg-white/5 border border-white/10 text-accent group-hover:bg-accent/15"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Accordion Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`chapter-content-${chapter.id}`}
                      role="region"
                      aria-labelledby={`chapter-header-${chapter.id}`}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 md:px-8 pb-7 sm:pb-8 pt-2 border-t border-white/10 space-y-4">
                        {/* Paragraphs */}
                        {chapter.paragraphs.map((para, pIdx) => (
                          <motion.p
                            key={pIdx}
                            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: pIdx * 0.08 }}
                            className="text-white/85 font-body text-base sm:text-[17px] leading-[1.8] max-w-[68ch]"
                          >
                            {para}
                          </motion.p>
                        ))}

                        {/* Bullets if present */}
                        {chapter.bullets && chapter.bullets.length > 0 && (
                          <ul className="space-y-2.5 pt-2 max-w-[68ch]">
                            {chapter.bullets.map((bullet, bIdx) => (
                              <li
                                key={bIdx}
                                className="flex items-start gap-3 text-white/90 font-body text-sm sm:text-base leading-relaxed"
                              >
                                <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 stroke-[2.5]" />
                                </div>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* What I learned lesson box */}
                        {chapter.lesson && (
                          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-accent/15 via-accent/10 to-amber-500/10 border border-accent/40 flex items-start gap-3.5 shadow-[0_0_20px_rgba(201,162,39,0.15)] max-w-[68ch]">
                            <div className="w-8 h-8 rounded-xl bg-accent/25 border border-accent/50 flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-sm">
                              <Lightbulb className="w-4.5 h-4.5 text-amber-200" />
                            </div>
                            <div>
                              <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-accent block mb-1">
                                What I Learned
                              </span>
                              <p className="text-sm sm:text-base text-white/95 font-body font-medium leading-relaxed">
                                {chapter.lesson}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Proof & Photos / Media section */}
                        {(hasDocument || hasPhotos) && (
                          <div className="pt-3 w-full space-y-4">
                            {/* FlipCard(s) - top of Proof & Photos area */}
                            {flipcards.length > 0 && (
                              <div
                                className={`w-full ${
                                  flipcards.length > 1
                                    ? "flex flex-col md:flex-row items-center justify-center gap-6"
                                    : "flex justify-center"
                                }`}
                              >
                                {flipcards.map((card, cIdx) => (
                                  <FlipCard
                                    key={cIdx}
                                    front={card.front}
                                    back={card.back}
                                    caption={card.caption}
                                    alt={card.alt}
                                    orientation={card.orientation}
                                  />
                                ))}
                              </div>
                            )}

                            {/* Photo Gallery Thumbnails (with Lightbox Prev/Next) */}
                            {photos.length > 0 && <PhotoGallery photos={photos} />}

                            {/* View Proof Button (ONLY if proof exists) */}
                            {chapter.proof && (
                              <div className="pt-2 flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => onViewProof(chapter.proof!)}
                                  className="group/proof inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-accent hover:text-surface-dark border border-white/20 hover:border-accent text-white font-heading font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                                >
                                  <FileText className="w-4 h-4 text-accent group-hover/proof:text-surface-dark transition-colors" />
                                  <span>View proof</span>
                                </button>

                                <span className="text-xs text-white/45 font-body">
                                  {chapter.proof.title}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
