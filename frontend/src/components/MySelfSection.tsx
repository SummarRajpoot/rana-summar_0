"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
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
  type LucideIcon,
} from "lucide-react";

export interface TimelineBlock {
  id: number;
  title: string;
  tag?: string;
  description: string;
  icon: LucideIcon;
}

export const timelineBlocks: TimelineBlock[] = [
  {
    id: 1,
    title: "Who I Am",
    description: "Coming Soon",
    icon: User,
  },
  {
    id: 2,
    title: "Roots & Family",
    tag: "Childhood",
    description: "Coming Soon",
    icon: Home,
  },
  {
    id: 3,
    title: "Early Schooling & Moving Cities",
    tag: "Childhood",
    description: "Coming Soon",
    icon: School,
  },
  {
    id: 4,
    title: "Back to the Village",
    description: "Coming Soon",
    icon: MapPin,
  },
  {
    id: 5,
    title: "Learning Life on the Farm",
    tag: "2016",
    description: "Coming Soon",
    icon: Wheat,
  },
  {
    id: 6,
    title: "Matric & DAE",
    tag: "2018",
    description: "Coming Soon",
    icon: GraduationCap,
  },
  {
    id: 7,
    title: "The Switch to IT",
    description: "Coming Soon",
    icon: Laptop,
  },
  {
    id: 8,
    title: "The Sports Quota Trial",
    tag: "2023",
    description: "Coming Soon",
    icon: Medal,
  },
  {
    id: 9,
    title: "The Call That Changed Everything",
    tag: "2023",
    description: "Coming Soon",
    icon: Phone,
  },
  {
    id: 10,
    title: "Study + Job: Balancing Both",
    description: "Coming Soon",
    icon: Briefcase,
  },
  {
    id: 11,
    title: "What the Job Taught Me",
    description: "Coming Soon",
    icon: Trophy,
  },
  {
    id: 12,
    title: "Beyond the Screen",
    description: "Coming Soon",
    icon: Compass,
  },
  {
    id: 13,
    title: "Where I'm Heading",
    description: "Coming Soon",
    icon: Rocket,
  },
];

interface TimelineCardProps {
  block: TimelineBlock;
  index: number;
  isEven: boolean;
  prefersReducedMotion: boolean;
}

function TimelineCard({
  block,
  index,
  isEven,
  prefersReducedMotion,
}: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTilt({ rotateX, rotateY });
    setMousePos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const Icon = block.icon;
  const watermarkText = String(block.id).padStart(2, "0");

  return (
    <div
      ref={cardRef}
      className="relative flex items-start group"
      style={{ perspective: 1000 }}
    >
      {/* Number Marker positioned on the vertical line */}
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0 }
        }
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: (index % 3) * 0.08,
              }
        }
        className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 top-6 sm:top-7 z-20 flex items-center justify-center select-none"
      >
        {/* Ripple rings around marker */}
        <motion.div
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.45, 1],
                  opacity: [0.5, 0, 0.5],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index % 4) * 0.4,
          }}
          className="absolute -inset-2 rounded-full border border-accent/40 pointer-events-none"
        />

        {/* Marker pill */}
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-surface-dark border-2 border-accent text-accent font-heading font-bold text-xs sm:text-sm flex items-center justify-center shadow-[0_0_16px_rgba(201,162,39,0.4)] group-hover:scale-115 group-hover:border-amber-300 group-hover:text-amber-200 group-hover:shadow-[0_0_24px_rgba(201,162,39,0.7)] transition-all duration-300">
          {block.id}
        </div>
      </motion.div>

      {/* Timeline Card */}
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1, x: 0, rotate: 0, filter: "blur(0px)" }
            : {
                opacity: 0,
                x: isEven ? -60 : 60,
                rotate: isEven ? -2.5 : 2.5,
                filter: "blur(8px)",
              }
        }
        whileInView={{
          opacity: 1,
          x: 0,
          rotate: 0,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, amount: 0.25 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 110,
                damping: 18,
                mass: 0.8,
                delay: (index % 3) * 0.08,
              }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            !prefersReducedMotion && isDesktop
              ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
              : undefined,
          transition: "transform 0.15s ease-out",
        }}
        className={`relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border border-white/10 p-6 sm:p-8 md:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-accent/50 hover:shadow-[0_20px_50px_rgba(201,162,39,0.18)] transition-all duration-300 overflow-hidden cursor-default ${
          isEven
            ? "md:mr-auto md:ml-0 md:text-left"
            : "md:ml-auto md:mr-0 md:text-left"
        } ml-13 sm:ml-16 md:ml-0 w-[calc(100%-3.25rem)] sm:w-[calc(100%-4rem)] md:w-[calc(50%-3rem)]`}
      >
        {/* Interactive Mouse-follow Golden Spotlight */}
        {mousePos.isHovered && !prefersReducedMotion && isDesktop && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 162, 39, 0.16), transparent 75%)`,
            }}
          />
        )}

        {/* Faded Watermark Number with Scroll Parallax */}
        <motion.span
          aria-hidden="true"
          style={{ y: prefersReducedMotion ? 0 : watermarkY }}
          className="absolute right-4 bottom-1 sm:right-6 sm:bottom-2 text-7xl sm:text-8xl md:text-9xl font-heading font-black text-white/[0.035] select-none pointer-events-none leading-none z-0 tracking-tighter"
        >
          {watermarkText}
        </motion.span>

        {/* Desktop Connector Line */}
        {isEven ? (
          <div
            aria-hidden="true"
            className="hidden md:block absolute -right-12 top-9 w-12 h-px bg-gradient-to-r from-accent/50 to-accent/15"
          />
        ) : (
          <div
            aria-hidden="true"
            className="hidden md:block absolute -left-12 top-9 w-12 h-px bg-gradient-to-l from-accent/50 to-accent/15"
          />
        )}

        {/* Mobile Connector Line */}
        <div
          aria-hidden="true"
          className="block md:hidden absolute -left-6 sm:-left-8 top-8 w-6 sm:w-8 h-px bg-gradient-to-l from-accent/50 to-accent/15"
        />

        {/* Card Content (Relative z-10 for clean layering) */}
        <div className="relative z-10 flex flex-col items-start gap-4 sm:gap-5">
          {/* Header Row: Icon + Number Badge + Tag Chip */}
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              {/* Icon in Golden Circle */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/40 flex items-center justify-center shadow-[0_0_15px_rgba(201,162,39,0.25)] group-hover:border-accent group-hover:shadow-[0_0_24px_rgba(201,162,39,0.45)] transition-all duration-300 shrink-0">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:scale-110 group-hover:text-amber-200 transition-all duration-300" />
              </div>

              {/* Number Badge */}
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-heading font-bold bg-accent/15 text-accent border border-accent/35 shadow-[0_0_8px_rgba(201,162,39,0.15)] tracking-wide">
                #{watermarkText}
              </span>
            </div>

            {/* Glowing Tag Chip */}
            {block.tag && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-semibold bg-white/10 text-white/90 border border-white/15 shadow-[0_0_12px_rgba(201,162,39,0.25)] tracking-wide">
                {block.tag}
              </span>
            )}
          </div>

          {/* Heading */}
          <h3 className="text-xl sm:text-2xl md:text-[1.65rem] font-bold font-heading text-white group-hover:text-amber-200 transition-colors duration-200 leading-snug">
            {block.title}
          </h3>

          {/* Shimmering "Coming Soon" Badge */}
          <div className="pt-2 border-t border-white/5 w-full">
            <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full overflow-hidden bg-white/[0.04] border border-white/10 text-white/70 text-xs sm:text-sm font-body">
              <span className="text-xs">🚧</span>
              <span className="font-medium tracking-wide">
                {block.description}
              </span>

              {/* Shimmer light sweep */}
              <motion.div
                aria-hidden="true"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        x: ["-100%", "220%"],
                      }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1.2,
                }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function MySelfSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const dotTop = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  const titleLetters = "My Self".split("");

  return (
    <section
      id="myself"
      className="relative py-28 md:py-36 px-4 sm:px-6 md:px-8 bg-background border-t border-foreground/5 overflow-x-clip"
    >
      {/* Subtle Floating Ambient Golden Orbs (Disabled on reduced motion / light mobile) */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <motion.div
            animate={{
              y: [0, -35, 0],
              x: [0, 25, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden md:block absolute top-1/4 left-8 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 45, 0],
              x: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden md:block absolute bottom-1/3 right-8 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl"
          />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 sm:mb-24 md:mb-28">
          <motion.span
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-accent font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block"
          >
            Get To Know Me
          </motion.span>

          {/* Letter by Letter Animated Gradient Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading tracking-tight flex items-center justify-center flex-wrap">
            {titleLetters.map((char, i) => (
              <motion.span
                key={i}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 22, filter: "blur(6px)" }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 220,
                        damping: 16,
                        delay: i * 0.05,
                      }
                }
                className="inline-block bg-gradient-to-r from-amber-200 via-accent to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(201,162,39,0.3)]"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-foreground/75 font-body text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            The journey from a village to Software Engineering
          </motion.p>

          {/* Animated Golden Underline */}
          <motion.div
            initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-1 w-28 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6 rounded-full origin-center shadow-[0_0_12px_rgba(201,162,39,0.6)]"
          />
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Static Background Guideline */}
          <div
            aria-hidden="true"
            className="absolute top-6 bottom-8 left-6 sm:left-8 md:left-1/2 -translate-x-1/2 w-0.5 bg-foreground/10 pointer-events-none"
          />

          {/* Animated Golden Scroll Line */}
          <motion.div
            aria-hidden="true"
            style={{
              scaleY: prefersReducedMotion ? 1 : scaleY,
              originY: 0,
            }}
            className="absolute top-6 bottom-8 left-6 sm:left-8 md:left-1/2 -translate-x-1/2 w-0.5 md:w-1 bg-gradient-to-b from-accent via-amber-300 to-accent/30 rounded-full shadow-[0_0_16px_rgba(201,162,39,0.7)] z-0 origin-top pointer-events-none"
          />

          {/* Traveling Glowing Dot on the Vertical Line */}
          {!prefersReducedMotion && (
            <div
              aria-hidden="true"
              className="absolute top-6 bottom-8 left-6 sm:left-8 md:left-1/2 -translate-x-1/2 w-0 pointer-events-none z-10"
            >
              <motion.div
                style={{ top: dotTop }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_18px_6px_rgba(201,162,39,0.9)] border border-white" />
                  <div className="absolute w-6 h-6 rounded-full bg-accent/40 animate-ping" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Timeline Blocks */}
          <div className="space-y-14 sm:space-y-18 md:space-y-20">
            {timelineBlocks.map((block, index) => {
              const isEven = index % 2 === 0;

              return (
                <TimelineCard
                  key={block.id}
                  block={block}
                  index={index}
                  isEven={isEven}
                  prefersReducedMotion={prefersReducedMotion}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
