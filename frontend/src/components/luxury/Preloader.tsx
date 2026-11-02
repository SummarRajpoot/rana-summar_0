"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Monospace code rain snippets for desktop background
const CODE_RAIN_COLUMNS = [
  "const fn = () => { import { ai } from 'langchain'; await ai.run(); }",
  "01001001 01101110 01101001 01110100 00100000 01000001 01001001",
  "export async function generateAgent() { return new AgentWorker(); }",
  "interface Config { model: 'llama-3.3-70b'; memory: true; rag: true; }",
  "0x4F 0xD1 0xC5 0xD4 0xAF 0x37 0x1B 0x27 0x45 0xB5 0xF5 0xEC",
  "import { StateGraph, END } from '@langchain/langgraph'; const flow = new StateGraph();",
  "def initialize_pipeline(): return FastAPI(title='Summar AI Engine', version='2.0')",
  "while (agent.is_thinking()) { yield streaming_tokens(context); }",
];

const TERMINAL_LINES = [
  { prefix: "$", text: 'init portfolio --owner "Rana Summar"', isCommand: true },
  { prefix: ">", text: "loading ai_agents ............ ", isTask: true, targetProgress: 45 },
  { prefix: ">", text: "compiling interface .......... ", isTask: true, targetProgress: 75 },
  { prefix: ">", text: "deploying experience ......... ", isTask: true, targetProgress: 100 },
];

const NAME_LETTERS = "RANA SUMMAR".split("");
const SUBTITLE_TEXT = "Full-Stack AI Engineer";

export function Preloader() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const [isRendered, setIsRendered] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"terminal" | "name" | "exit" | "done">("terminal");
  const [terminalStep, setTerminalStep] = useState(0); // 0 = start, 1 = cmd, 2 = task1, 3 = task2, 4 = task3
  const [typedCommand, setTypedCommand] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [isSkipping, setIsSkipping] = useState(false);

  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timerRefs.current.push(t);
    return t;
  }, []);

  const clearAllTimers = useCallback(() => {
    timerRefs.current.forEach((t) => clearTimeout(t));
    timerRefs.current = [];
  }, []);

  // Cleanup helper
  const finalizeIntro = useCallback(() => {
    clearAllTimers();
    try {
      sessionStorage.setItem("rs_intro_seen", "true");
    } catch {
      // storage disabled
    }

    // Restore page scroll
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      // Move focus to main content
      const main = document.getElementById("main-content") || document.querySelector("main");
      if (main instanceof HTMLElement) {
        main.focus();
      }
    }

    window.dispatchEvent(new CustomEvent("preloader-finished"));
    setIsVisible(false);
  }, [clearAllTimers]);

  // Handle immediate Skip action (click or Esc key)
  const handleSkip = useCallback(() => {
    if (isSkipping || !isVisible) return;
    setIsSkipping(true);
    clearAllTimers();

    // 300ms quick fade out
    setTimeout(() => {
      finalizeIntro();
    }, 300);
  }, [isSkipping, isVisible, clearAllTimers, finalizeIntro]);

  // Keyboard accessibility: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  // Main lifecycle & sequence runner
  useEffect(() => {
    // Check if force intro via query parameter ?intro=1
    let forceIntro = false;
    let hasSeen = false;

    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        forceIntro = params.get("intro") === "1";
      } catch {
        forceIntro = false;
      }

      try {
        hasSeen = sessionStorage.getItem("rs_intro_seen") === "true";
      } catch {
        hasSeen = false;
      }
    }

    // If already seen and not forced, skip completely on first render without flash
    if (hasSeen && !forceIntro) {
      setIsVisible(false);
      setIsRendered(false);
      return;
    }

    // Lock page scroll while intro plays
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    // Reduced motion fast-path
    if (prefersReducedMotion) {
      setPhase("name");
      addTimer(() => {
        finalizeIntro();
      }, 1000);
      return;
    }

    // --- TIMELINE RUNNER (~3.5s total) ---
    // 0.15s: Start typing command
    addTimer(() => {
      setTerminalStep(1);
      setProgress(15);
      const fullCmd = TERMINAL_LINES[0].text;
      let charIdx = 0;
      const typeInterval = setInterval(() => {
        charIdx++;
        setTypedCommand(fullCmd.slice(0, charIdx));
        if (charIdx >= fullCmd.length) {
          clearInterval(typeInterval);
        }
      }, 10);
    }, 150);

    // 0.65s: Line 2 (loading ai_agents ... ok)
    addTimer(() => {
      setTerminalStep(2);
      setProgress(45);
    }, 650);

    // 1.05s: Line 3 (compiling interface ... ok)
    addTimer(() => {
      setTerminalStep(3);
      setProgress(75);
    }, 1050);

    // 1.45s: Line 4 (deploying experience ... ok)
    addTimer(() => {
      setTerminalStep(4);
      setProgress(100);
    }, 1450);

    // 1.85s: Terminal fades up & away, transition to Name Reveal
    addTimer(() => {
      setPhase("name");
    }, 1850);

    // 2.30s: Type subtitle "Full-Stack AI Engineer"
    addTimer(() => {
      let subIdx = 0;
      const subInterval = setInterval(() => {
        subIdx++;
        setTypedSubtitle(SUBTITLE_TEXT.slice(0, subIdx));
        if (subIdx >= SUBTITLE_TEXT.length) {
          clearInterval(subInterval);
        }
      }, 25);
    }, 2300);

    // 3.05s: Curtain split exit starts (top slides up, bottom slides down)
    addTimer(() => {
      setPhase("exit");
    }, 3050);

    // 3.55s: Complete intro and unmount
    addTimer(() => {
      finalizeIntro();
    }, 3550);

    return () => {
      clearAllTimers();
      if (typeof document !== "undefined") {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };
  }, [prefersReducedMotion, addTimer, clearAllTimers, finalizeIntro]);

  if (!isRendered) return null;

  return (
    <AnimatePresence onExitComplete={() => setIsRendered(false)}>
      {isVisible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[9999] select-none overflow-hidden pointer-events-auto"
        >
          {/* Screen-reader announcement */}
          <span className="sr-only">Loading portfolio of Rana Summar, Full-Stack AI Engineer</span>

          {/* Curtain Split: TOP PANEL (slides -100% up on exit) */}
          <motion.div
            key="curtain-top"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={
              isSkipping
                ? { opacity: 0, transition: { duration: 0.3 } }
                : {
                    y: "-100%",
                    transition: { duration: 0.55, ease: [0.77, 0, 0.18, 1] },
                  }
            }
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#080C14] border-b border-[#D4AF37]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
          >
            {/* Faint gold grid texture */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(212, 175, 55, 0.08) 1.5px, transparent 1.5px)",
                backgroundSize: "32px 32px",
              }}
            />
          </motion.div>

          {/* Curtain Split: BOTTOM PANEL (slides 100% down on exit) */}
          <motion.div
            key="curtain-bottom"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={
              isSkipping
                ? { opacity: 0, transition: { duration: 0.3 } }
                : {
                    y: "100%",
                    transition: { duration: 0.55, ease: [0.77, 0, 0.18, 1] },
                  }
            }
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#080C14] border-t border-[#D4AF37]/20 shadow-[0_-4px_30px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
          >
            {/* Faint gold grid texture */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(212, 175, 55, 0.08) 1.5px, transparent 1.5px)",
                backgroundSize: "32px 32px",
              }}
            />
          </motion.div>

          {/* Main Overlay Content (Centered above the curtain panels) */}
          <motion.div
            key="curtain-content"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: isSkipping ? 0.3 : 0.4 },
            }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6"
          >
            {/* 1. Ambient Background Glowing Orbs (Gold & Cyan) */}
            <div
              aria-hidden="true"
              className="absolute -top-16 -left-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#D4AF37]/15 blur-[120px] pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -right-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#4FD1C5]/12 blur-[130px] pointer-events-none"
            />

            {/* 2. Desktop-Only Faint Code Rain (~6% opacity, pure CSS/Motion) */}
            <div
              aria-hidden="true"
              className="hidden md:flex pointer-events-none absolute inset-0 justify-between px-8 overflow-hidden select-none opacity-[0.06] font-mono text-[11px] text-[#E5C07B]"
            >
              {CODE_RAIN_COLUMNS.map((line, cIdx) => (
                <motion.div
                  key={cIdx}
                  animate={{
                    y: [0, -320],
                  }}
                  transition={{
                    duration: 18 + (cIdx % 4) * 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: cIdx * 0.4,
                  }}
                  className="flex flex-col gap-4 whitespace-nowrap [writing-mode:vertical-rl]"
                >
                  <span>{line}</span>
                  <span>{line}</span>
                </motion.div>
              ))}
            </div>

            {/* 3. CENTER STAGE: TERMINAL vs NAME REVEAL */}
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] flex flex-col items-center justify-center z-30">
              <AnimatePresence mode="wait">
                {/* ── PHASE A: TERMINAL BOOT SEQUENCE ── */}
                {phase === "terminal" && (
                  <motion.div
                    key="intro-terminal"
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: -24,
                      scale: 0.94,
                      transition: { duration: 0.28, ease: "easeInOut" },
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 0.7, 0.2, 1] }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Terminal Window Card */}
                    <div className="w-full rounded-2xl bg-[#0B101B]/90 border border-[#D4AF37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.12)] backdrop-blur-md overflow-hidden">
                      {/* Window Header */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F1626]/80 border-b border-[#D4AF37]/20 select-none">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        </div>
                        <span className="text-[11px] font-mono text-[#E5C07B]/70 tracking-wide">
                          boot.sh — 80x24
                        </span>
                        <div className="w-8" />
                      </div>

                      {/* Window Body Lines */}
                      <div className="p-4 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-relaxed text-[#F7F5F0] space-y-2.5 min-h-[170px] sm:min-h-[185px]">
                        {/* Line 1: Command */}
                        {terminalStep >= 1 && (
                          <div className="flex items-baseline gap-2 break-all sm:break-normal text-[#E5C07B]">
                            <span className="text-[#D4AF37] font-bold select-none">$</span>
                            <span>{typedCommand}</span>
                            {terminalStep === 1 && (
                              <span className="inline-block w-2 h-3.5 bg-[#D4AF37] animate-pulse align-middle" />
                            )}
                          </div>
                        )}

                        {/* Line 2: ai_agents */}
                        {terminalStep >= 2 && (
                          <motion.div
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between text-xs sm:text-[13px] text-[#C9D1E3]"
                          >
                            <span className="truncate">
                              <span className="text-[#AEB8D0]/60 mr-1.5">&gt;</span>
                              loading ai_agents
                              <span className="text-[#AEB8D0]/30 hidden sm:inline"> ............</span>
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold text-[#D4AF37] shrink-0 ml-2">
                              <span>✓</span>
                              <span className="text-[11px] uppercase tracking-wider">ok</span>
                            </span>
                          </motion.div>
                        )}

                        {/* Line 3: compiling interface */}
                        {terminalStep >= 3 && (
                          <motion.div
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between text-xs sm:text-[13px] text-[#C9D1E3]"
                          >
                            <span className="truncate">
                              <span className="text-[#AEB8D0]/60 mr-1.5">&gt;</span>
                              compiling interface
                              <span className="text-[#AEB8D0]/30 hidden sm:inline"> ..........</span>
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold text-[#D4AF37] shrink-0 ml-2">
                              <span>✓</span>
                              <span className="text-[11px] uppercase tracking-wider">ok</span>
                            </span>
                          </motion.div>
                        )}

                        {/* Line 4: deploying experience */}
                        {terminalStep >= 4 && (
                          <motion.div
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between text-xs sm:text-[13px] text-[#C9D1E3]"
                          >
                            <span className="truncate">
                              <span className="text-[#AEB8D0]/60 mr-1.5">&gt;</span>
                              deploying experience
                              <span className="text-[#AEB8D0]/30 hidden sm:inline"> .........</span>
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold text-[#D4AF37] shrink-0 ml-2">
                              <span>✓</span>
                              <span className="text-[11px] uppercase tracking-wider">ok</span>
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar & Percentage Counter */}
                    <div className="w-full mt-4 px-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#E5C07B] mb-1.5 font-semibold">
                        <span className="text-[#AEB8D0]/70 text-[10px] tracking-wider uppercase">
                          System Boot
                        </span>
                        <span className="tabular-nums">{progress}%</span>
                      </div>
                      <div className="w-full h-1 sm:h-1.5 bg-[#121826] rounded-full overflow-hidden border border-[#D4AF37]/20 p-0.5 shadow-inner">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── PHASE B: NAME REVEAL ── */}
                {(phase === "name" || phase === "exit") && (
                  <motion.div
                    key="intro-name"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 1.05,
                      filter: "blur(8px)",
                      transition: { duration: 0.4 },
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 0.7, 0.2, 1] }}
                    className="flex flex-col items-center justify-center text-center px-4"
                  >
                    {/* Small luxury top monogram tag */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121826]/90 border border-[#D4AF37]/35 shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-4 text-[#F5D77F] font-mono text-[11px] tracking-widest uppercase"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                      <span>System Ready</span>
                    </motion.div>

                    {/* Staggered "RANA SUMMAR" Title with Gold Shimmer */}
                    <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-none mb-3 flex items-center justify-center flex-wrap select-none">
                      {NAME_LETTERS.map((char, cIdx) => (
                        <motion.span
                          key={cIdx}
                          initial={
                            prefersReducedMotion
                              ? { opacity: 1 }
                              : { opacity: 0, y: 16, filter: "blur(10px)" }
                          }
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.45,
                            delay: cIdx * 0.035,
                            ease: [0.22, 0.7, 0.2, 1],
                          }}
                          className={
                            char === " "
                              ? "w-3 sm:w-4 inline-block"
                              : "gold-shimmer inline-block drop-shadow-[0_0_24px_rgba(212,175,55,0.35)]"
                          }
                        >
                          {char}
                        </motion.span>
                      ))}
                    </h1>

                    {/* Subtitle typed with cursor */}
                    <div className="h-6 flex items-center justify-center">
                      <p className="font-mono text-xs sm:text-sm text-[#E5C07B] tracking-[0.22em] uppercase font-semibold">
                        {typedSubtitle || (!prefersReducedMotion ? "" : SUBTITLE_TEXT)}
                        <span className="inline-block w-1.5 h-3.5 bg-[#D4AF37] ml-1.5 animate-pulse align-middle" />
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. SKIP BUTTON (Bottom-Right, Keyboard Accessible, Esc hint) */}
            <button
              type="button"
              onClick={handleSkip}
              aria-label="Skip intro animation (Esc)"
              className="absolute bottom-6 right-6 z-40 flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#0D131F]/90 border border-[#D4AF37]/30 text-[#E5C07B] hover:text-[#FFF2CC] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#080C14] transition-all text-xs font-mono cursor-pointer active:scale-95 select-none"
            >
              <span>Skip</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#16203A] text-[10px] text-[#AEB8D0] border border-[#D4AF37]/20 font-mono">
                Esc
              </kbd>
              <span className="sm:hidden text-xs">&rarr;</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
