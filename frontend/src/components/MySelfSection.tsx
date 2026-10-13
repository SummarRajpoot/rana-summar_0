"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
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
  BookOpen,
  ChevronDown,
  Lightbulb,
  Check,
  type LucideIcon,
} from "lucide-react";

// ============================================================================
// STORY DATA ARRAY
// Easily edit text, paragraphs, bullets or lessons for any timeline block.
// ============================================================================

export interface TimelineBlock {
  id: number;
  numberStr: string;
  title: string;
  tag?: string;
  icon: LucideIcon;
  paragraphs: string[];
  bullets?: string[];
  lesson?: string;
}

export const storyTimelineBlocks: TimelineBlock[] = [
  {
    id: 1,
    numberStr: "01",
    title: "Who I Am",
    icon: User,
    paragraphs: [
      "I'm Rana Summar, a Software Engineering student and Full-Stack AI developer. I come from a village in Pakistan, a soldier's son who grew up between classrooms and farm fields. That mix of discipline and hard work shapes how I build software today.",
    ],
  },
  {
    id: 2,
    numberStr: "02",
    title: "Roots & Family",
    tag: "Childhood",
    icon: Home,
    paragraphs: [
      "My father served in the army, and our family is also deeply connected to farming. Growing up around both, I learned discipline from one and patience from the other.",
    ],
    lesson: "Respect for hard work and responsibility.",
  },
  {
    id: 3,
    numberStr: "03",
    title: "Early Schooling & Moving Cities",
    tag: "Childhood",
    icon: School,
    paragraphs: [
      "I started my schooling at APS (ACS). Because of my father's postings, we moved from Bahawalpur to Kohat and then Islamabad. Living in different cities taught me to adapt quickly and meet new people with confidence.",
    ],
  },
  {
    id: 4,
    numberStr: "04",
    title: "Back to the Village",
    icon: MapPin,
    paragraphs: [
      "We returned to our village, and I joined Government High School Khanqa Dogran. As a child I dreamed of joining the army. Seeing life in different places made me want to learn much more than my surroundings offered.",
    ],
  },
  {
    id: 5,
    numberStr: "05",
    title: "Learning Life on the Farm",
    tag: "2016",
    icon: Wheat,
    paragraphs: [
      "In 2016 I learned to drive a tractor and started helping my baba and chachu on the farm, alongside school. Farm work taught me responsibility early and showed me that real results come from consistent effort.",
    ],
  },
  {
    id: 6,
    numberStr: "06",
    title: "Matric & DAE",
    tag: "2018",
    icon: GraduationCap,
    paragraphs: [
      "After passing matric, I joined a DAE program in 2018. I entered the textile field almost by chance, and the three years were not easy, but I worked hard and finished with an A grade.",
    ],
    lesson: "I can succeed even in a field I didn't plan for.",
  },
  {
    id: 7,
    numberStr: "07",
    title: "The Switch to IT",
    icon: Laptop,
    paragraphs: [
      "After DAE I decided to move into IT. I applied to several universities for Software Engineering, Computer Science and IT. My name appeared on merit lists, but my diploma background stopped me from getting admission in those programs. So I joined NFC in IT and spent a year building my basics.",
    ],
  },
  {
    id: 8,
    numberStr: "08",
    title: "The Sports Quota Trial",
    tag: "2023",
    icon: Medal,
    paragraphs: [
      "A friend invited me to the UAF sports trials, and I had no idea what they would lead to. I ran the 600m race in full heat and secured 1st position among 16 boys. Even though the trials closed and I went back to NFC, that run turned out to be the start of something bigger.",
    ],
  },
  {
    id: 9,
    numberStr: "09",
    title: "The Call That Changed Everything",
    tag: "2023",
    icon: Phone,
    paragraphs: [
      "Months later I got a call from UAF asking which degree I wanted. I thought it was a prank and even hung up on the first call! When they called again, I chose Software Engineering, Computer Science and IT in that order. At my documents submission I was nervous that my DAE background would cause rejection, but alhamdulillah, my documents were accepted and I secured my admission.",
    ],
    lesson: "Stay ready, because opportunities don't announce themselves.",
  },
  {
    id: 10,
    numberStr: "10",
    title: "Study + Job: Balancing Both",
    icon: Briefcase,
    paragraphs: [
      "Alongside my degree, I worked a job from 2023 up to my 6th semester. My grades went up and down, but I never gave up on either study or work. Balancing both made me stronger and more independent.",
    ],
  },
  {
    id: 11,
    numberStr: "11",
    title: "What the Job Taught Me",
    icon: Trophy,
    paragraphs: [
      "Working at Chase Value gave me lessons no classroom could:",
    ],
    bullets: [
      "Time management while balancing deadlines, classes and work",
      "Responsibility in delivering on time even when tired",
      "Communication with people from different backgrounds",
      "Staying calm under pressure",
      "A professional mindset",
    ],
  },
  {
    id: 12,
    numberStr: "12",
    title: "Beyond the Screen",
    icon: Compass,
    paragraphs: [
      "Away from code, I love playing badminton and cricket. Sports gave me teamwork, fitness and a never-quit attitude, and honestly, my UAF journey began on a running track.",
    ],
  },
  {
    id: 13,
    numberStr: "13",
    title: "Where I'm Heading",
    icon: Rocket,
    paragraphs: [
      "Today I build AI agents and full-stack applications with Next.js, FastAPI and LangChain. My goal is to create real products that solve real problems, especially for people like those in the community I come from. This journey is still being written.",
    ],
  },
];

// ============================================================================
// COMPONENT: Accordion Timeline Card
// ============================================================================

interface TimelineCardProps {
  block: TimelineBlock;
  index: number;
  isEven: boolean;
  isOpen: boolean;
  onToggle: () => void;
  prefersReducedMotion: boolean;
}

function TimelineCard({
  block,
  index,
  isEven,
  isOpen,
  onToggle,
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
    setMousePos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const Icon = block.icon;
  const hasContent = block.paragraphs.length > 0;

  return (
    <div
      ref={cardRef}
      className="relative flex items-start group"
      style={{ perspective: 1000 }}
    >
      {/* Number Marker positioned on the vertical center line */}
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
                  scale: isOpen ? [1, 1.6, 1] : [1, 1.35, 1],
                  opacity: isOpen ? [0.7, 0, 0.7] : [0.4, 0, 0.4],
                }
          }
          transition={{
            duration: isOpen ? 2 : 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index % 4) * 0.4,
          }}
          className={`absolute -inset-2 rounded-full border pointer-events-none ${
            isOpen ? "border-amber-300/80" : "border-accent/40"
          }`}
        />

        {/* Marker badge */}
        <div
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full font-heading font-bold text-xs sm:text-sm flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isOpen
              ? "bg-accent text-surface-dark border-2 border-amber-200 shadow-[0_0_24px_rgba(201,162,39,0.9)] scale-110"
              : "bg-surface-dark border-2 border-accent text-accent shadow-[0_0_16px_rgba(201,162,39,0.4)] group-hover:scale-110 group-hover:border-amber-300 group-hover:text-amber-200"
          }`}
          onClick={onToggle}
          title={`Click to read #${block.numberStr}`}
        >
          {block.id}
        </div>
      </motion.div>

      {/* Accordion Card Container */}
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1, x: 0, rotate: 0 }
            : {
                opacity: 0,
                x: isEven ? -50 : 50,
                rotate: isEven ? -2 : 2,
              }
        }
        whileInView={{
          opacity: 1,
          x: 0,
          rotate: 0,
        }}
        viewport={{ once: true, amount: 0.15 }}
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
        className={`relative rounded-3xl bg-gradient-to-br from-[#121212]/95 via-[#181818]/90 to-[#0e0e0e]/95 backdrop-blur-md border transition-all duration-300 overflow-hidden ${
          isOpen
            ? "border-accent/80 shadow-[0_20px_60px_rgba(201,162,39,0.3)] ring-1 ring-accent/30"
            : "border-white/10 hover:border-accent/50 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(201,162,39,0.18)]"
        } ${
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

        {/* Ambient Backlight Glow on Card when Open */}
        {isOpen && (
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400/10 via-accent/20 to-amber-500/10 blur-xl opacity-100 pointer-events-none"
          />
        )}

        {/* Faded Watermark Number */}
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-1 sm:right-6 sm:bottom-2 text-7xl sm:text-8xl md:text-9xl font-heading font-black text-white/[0.035] select-none pointer-events-none leading-none z-0 tracking-tighter"
        >
          {block.numberStr}
        </span>

        {/* Desktop Connector Line */}
        {isEven ? (
          <div
            aria-hidden="true"
            className={`hidden md:block absolute -right-12 top-9 w-12 h-px transition-colors duration-300 ${
              isOpen
                ? "bg-gradient-to-r from-accent to-accent/40"
                : "bg-gradient-to-r from-accent/50 to-accent/15"
            }`}
          />
        ) : (
          <div
            aria-hidden="true"
            className={`hidden md:block absolute -left-12 top-9 w-12 h-px transition-colors duration-300 ${
              isOpen
                ? "bg-gradient-to-l from-accent to-accent/40"
                : "bg-gradient-to-l from-accent/50 to-accent/15"
            }`}
          />
        )}

        {/* Mobile Connector Line */}
        <div
          aria-hidden="true"
          className="block md:hidden absolute -left-6 sm:-left-8 top-8 w-6 sm:w-8 h-px bg-gradient-to-l from-accent/50 to-accent/15"
        />

        {/* Real Accessible Accordion Button Header */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`story-panel-${block.id}`}
          id={`story-header-${block.id}`}
          className="relative z-10 w-full text-left p-6 sm:p-8 md:p-9 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-3xl cursor-pointer group/btn"
        >
          <div className="flex flex-col items-start gap-4 sm:gap-5 w-full">
            {/* Header Row: Icon + Number Badge + Tag Chip */}
            <div className="flex items-center justify-between w-full gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                {/* Icon in Golden Circle */}
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isOpen
                      ? "bg-gradient-to-br from-accent/30 to-accent/15 border border-accent shadow-[0_0_20px_rgba(201,162,39,0.4)]"
                      : "bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/40 shadow-[0_0_15px_rgba(201,162,39,0.25)] group-hover/btn:border-accent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                      isOpen
                        ? "text-amber-200 scale-110"
                        : "text-accent group-hover/btn:text-amber-200"
                    }`}
                  />
                </div>

                {/* Number Badge */}
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-heading font-bold bg-accent/15 text-accent border border-accent/35 shadow-[0_0_8px_rgba(201,162,39,0.15)] tracking-wide">
                  #{block.numberStr}
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
            <h3
              className={`text-xl sm:text-2xl md:text-[1.65rem] font-bold font-heading transition-colors duration-200 leading-snug ${
                isOpen
                  ? "text-amber-200"
                  : "text-white group-hover/btn:text-amber-200"
              }`}
            >
              {block.title}
            </h3>

            {/* Interactive Accordion Action Bar */}
            <div className="pt-3 border-t border-white/10 w-full flex items-center justify-between text-xs sm:text-sm font-body">
              <span className="font-semibold tracking-wider uppercase text-accent flex items-center gap-1.5 group-hover/btn:text-amber-200 transition-colors">
                <span>{isOpen ? "Close Story" : "Read Story"}</span>
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? "bg-accent text-surface-dark rotate-180 shadow-[0_0_12px_rgba(201,162,39,0.5)]"
                    : "bg-white/5 border border-white/15 text-accent group-hover/btn:border-accent group-hover/btn:bg-accent/10"
                }`}
              >
                <ChevronDown className="w-4 h-4 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </button>

        {/* Collapsible Panel Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`story-panel-${block.id}`}
              role="region"
              aria-labelledby={`story-header-${block.id}`}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, height: "auto" }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0 }
              }
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 px-6 sm:px-8 md:px-9 pb-7 sm:pb-9 overflow-hidden"
            >
              <div className="pt-4 border-t border-white/10 space-y-4 max-w-[65ch]">
                {hasContent ? (
                  <>
                    {/* Paragraphs */}
                    {block.paragraphs.map((para, pIdx) => (
                      <motion.p
                        key={pIdx}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: pIdx * 0.08,
                          ease: "easeOut",
                        }}
                        className="text-white/85 font-body text-base sm:text-[17px] leading-[1.8]"
                      >
                        {para}
                      </motion.p>
                    ))}

                    {/* Bullet Points (e.g. Chase Value Job Lessons) */}
                    {block.bullets && block.bullets.length > 0 && (
                      <motion.ul
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: 10 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                        className="space-y-2.5 pt-2"
                      >
                        {block.bullets.map((bullet, bIdx) => (
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
                      </motion.ul>
                    )}

                    {/* "What I learned" Highlight Box */}
                    {block.lesson && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.96 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.2 }}
                        className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-accent/15 via-accent/10 to-amber-500/10 border border-accent/40 flex items-start gap-3.5 shadow-[0_0_20px_rgba(201,162,39,0.15)]"
                      >
                        <div className="w-8 h-8 rounded-xl bg-accent/25 border border-accent/50 flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-[0_0_10px_rgba(201,162,39,0.3)]">
                          <Lightbulb className="w-4.5 h-4.5 text-amber-200" />
                        </div>
                        <div>
                          <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-accent block mb-1">
                            What I Learned
                          </span>
                          <p className="text-sm sm:text-base text-white/95 font-body font-medium leading-relaxed">
                            {block.lesson}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <p className="text-white/60 font-body text-sm italic">
                    Coming Soon
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: MySelfSection
// ============================================================================

export function MySelfSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionHeaderRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  // By default, the timeline is COLLAPSED (only header + button visible)
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  // Accordion state: only one card open at a time
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  // Listen for the custom "open-story" event triggered by the Hero button
  useEffect(() => {
    const handleOpenStoryEvent = () => {
      setIsStoryExpanded(true);
      // Wait for React to expand state, then smooth scroll so header sits at top
      setTimeout(() => {
        const el = document.getElementById("myself");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    };

    window.addEventListener("open-story", handleOpenStoryEvent);
    return () => window.removeEventListener("open-story", handleOpenStoryEvent);
  }, []);

  const handleToggleStory = () => {
    setIsStoryExpanded((prev) => {
      const next = !prev;
      if (!next) {
        // Close all cards when collapsing
        setActiveCardId(null);
      }
      return next;
    });
  };

  const handleCardToggle = (cardId: number) => {
    setActiveCardId((prev) => (prev === cardId ? null : cardId));
  };

  // Scroll animations for the timeline vertical line
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
      ref={containerRef}
      className="relative py-28 md:py-36 px-4 sm:px-6 md:px-8 bg-background border-t border-foreground/5 overflow-x-clip"
    >
      {/* Subtle Floating Ambient Golden Orbs */}
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
        <div ref={sectionHeaderRef} className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }
            }
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
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }
            }
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
            className="h-1 w-28 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6 mb-10 rounded-full origin-center shadow-[0_0_12px_rgba(201,162,39,0.6)]"
          />

          {/* Centered Luxury Interactive Button: Read My Story / Hide Story */}
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={handleToggleStory}
              aria-expanded={isStoryExpanded}
              aria-label={
                isStoryExpanded
                  ? "Hide personal story timeline"
                  : "Read personal story timeline"
              }
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-gradient-to-r from-[#171717] via-[#202020] to-[#141414] border-2 border-accent/70 hover:border-amber-300 text-white font-heading font-extrabold text-base sm:text-lg shadow-[0_0_25px_rgba(201,162,39,0.35)] hover:shadow-[0_0_35px_rgba(201,162,39,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all overflow-hidden cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-accent shrink-0 group-hover:scale-115 transition-transform" />
              <span className="bg-gradient-to-r from-amber-200 via-accent to-amber-300 bg-clip-text text-transparent tracking-wide">
                {isStoryExpanded ? "Hide Story" : "Read My Story"}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${
                  isStoryExpanded ? "rotate-180" : ""
                }`}
              />

              {/* Shimmer sweep effect on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none"
              />
            </button>
          </div>
        </div>

        {/* Collapsible Timeline Container */}
        <AnimatePresence initial={false}>
          {isStoryExpanded && (
            <motion.div
              key="timeline-story-content"
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, height: "auto" }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0 }
              }
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden"
            >
              <div className="relative pt-6 sm:pt-10">
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

                {/* Timeline Accordion Blocks */}
                <div className="space-y-14 sm:space-y-18 md:space-y-20">
                  {storyTimelineBlocks.map((block, index) => {
                    const isEven = index % 2 === 0;
                    const isOpen = activeCardId === block.id;

                    return (
                      <TimelineCard
                        key={block.id}
                        block={block}
                        index={index}
                        isEven={isEven}
                        isOpen={isOpen}
                        onToggle={() => handleCardToggle(block.id)}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
