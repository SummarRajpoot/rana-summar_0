"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./IntroGate.module.css";

// 16 code-rain streams replicating the exact character sequences from Intro.dc.html
const RAIN_COLUMNS = [
  { left: "3.0%", duration: "9s", delay: "-11s", text: "<Σ\n1{]\nλ\n1[/\n{\n+{\n{\n+1&\n=\n&1&\nΣ1=\n]\n)\n<]\n&\n]>\n&\n/λ}\n{&1\n/*]\n;-\n-λ)\n>\n={&\n[*\n-)\n{ }[\n>;\n*\n1{\n&;;\nλ|*\n-{{\n*{" },
  { left: "9.2%", duration: "16s", delay: "-1s", text: ")&-\nΣλ\n-\n>|\n*\n/\n<=\nΣ*\n>\nΣ]\n<+\n(+λ\nΣ=<\n>\n=\n=0*\n>()\n<\n]λ\n&;<\n[|1\n]Σ\nΣΣ\n*\nΣ1/\n/\n>}\n|1\n0\n<]}\n|0\n/\nΣ<(\n|λ" },
  { left: "15.4%", duration: "9s", delay: "-12s", text: "*\n**\n{<\n;\n(*>\n0/[\n<]\n[\n{(\nλ>λ\n]\n[;=\n/=Σ\n=/[\nλ0\n(\n(/\n|λ-\nλλ{\n}\n*\n;\n*\n|0*\nλ{}\n/*\n+\n;{Σ\nΣ{\n>><\n<\n-<|\n*λ<\n]<0" },
  { left: "21.6%", duration: "11s", delay: "-7s", text: "}[<\n//\n(\n)\n=&;\n]+\n1\nλ-&\n+[<\n<[[\n-\n|\n<\n<\n|}\n1;[\n]*}\n1=/\n1}\n-]0\n-\n|[\n[(/\n[]\n[=\n[(]\n-\n+\nΣ\n;{\n=+{\n)\n<\nλ<(" },
  { left: "27.8%", duration: "9s", delay: "0s", text: "}\n*>\n=>+\nΣ;+\nλ\n{λ\n;\n--0\n;[\n)[{\n=\n{\n(1\n(\n+\n(Σ<\n[&*\n;{(\n>\n{(\n{\n{|\n{\n}-\n;\n+(|\n1\n=}>\n1>\n)\n)[/\n-[\n>(λ\n(" },
  { left: "34.0%", duration: "9s", delay: "-10s", text: "[\n/[*\n-\n+\n*]Σ\n)/=\n/<\nλ1\n0\n(\n>1\nΣ\n)|=\n)1-\n>\n-0\nλ;\n;=1\n/λ\n0\nΣ{\n([\n=/[\n{\n{<\n&1\n0)\n={\n[<|\n;*\n)\n|<1\n+[[\n[" },
  { left: "40.2%", duration: "16s", delay: "-6s", text: "={0\n<\nλ}Σ\n]1\n0]=\n(0\n{[\n{[{\n*({\n=/\n-\nΣ{\n)1\n/{|\n;\n)|\n<0*\n*\n}/\n*)[\n--\n}]\n)\n*\n)\n{[\n(Σ\n/\n&\n<\n[(λ\n|\n[(}\nλ=*" },
  { left: "46.4%", duration: "14s", delay: "-8s", text: ">\n*\n-Σ)\n<+λ\n;}\n0;\nΣ}\n0\n)(λ\nΣ\n&{\n+(\n(\n1\n)<=\n+[\n/λ\n0Σ\n]/{\n+\n|<\n)*1\n<>*\n;)\n((\n=)\n]Σ\n>\n>{/\n*]=\n;-\n<]\n=\n>" },
  { left: "52.6%", duration: "13s", delay: "0s", text: ";\nλ\n&/\n+\n+[\nΣ\n;1\n(&\n<[\n/{( \nΣ\n-+\n0<\n+\n*&*\n{\n[-\n=}\n<\n[\n}-{\n10<\n&\n)\n(\n+}}\n)\n&/Σ\n=|\n0\n)-(\n=*\n=]=\n+" },
  { left: "58.8%", duration: "10s", delay: "0s", text: "/\n+{\n=+\n=*\n;\n+λΣ\n0\n[{\n*\n)\n=\n=(\n}|\n|>\n*\n1|\nΣ\n/\n|\n+\n1\nΣ\n;}\n>\n/>\n[-1\nΣλ\n->\n0\n(\nλ\n}]\nΣ\n)+" },
  { left: "65.0%", duration: "13s", delay: "-5s", text: "*/λ\n-/;\n*0\n+=Σ\nΣ\n-\n1\n/{\n;λ(\n|1\n;(\n0|\n{0=\n*\n-Σ(\n*<\n>0\n)<|\n;\n-λ\n{[/\n>=\n{1\n]]\n>+\n{\n|{\n}\n*-\n=\n+\n|=\n]})\n(&" },
  { left: "71.2%", duration: "15s", delay: "0s", text: "(/\n=>\n=\n)\n/;{\n(=\n[=}\n-1}\n*\n-\n1)\n}\n/\n&/{\n[>\n|(\n0}|\n|λ/\nλ\n<1\n(\n|\n/0;\nλ>\n){/\n*\n*{+\nΣ\n]<]\n>\n(+\n)+\n)\n&λ+" },
  { left: "77.4%", duration: "15s", delay: "-1s", text: "/Σ\nΣ/0\n>+\n{\n&λ\n><\n1\n<Σ{\n|λ[\n<\n)>\n>{}\n*/\n<1\n;1\nΣ{|\n>=|\n|/\n>&\n1\n[>\nλ}\n=\n/1]\n1;}\n|-\n)+)\n=+Σ\nλ-[\n>0\n|\n-=\n|-\n*" },
  { left: "83.6%", duration: "13s", delay: "-9s", text: "<\n+λ\n-\n[11\n<{;\n[{1\nΣ<0\n|\n}/<\n)>\n={λ\n(>;\n(-<\n[*\n&\n|[\n;\n1/\nΣ\n(\n;Σ>\n}[\nλ\n][\n}(]\nΣλ(\nλ&\nλ\n{-\n>\n1)[\n)&\n;01\n<" },
  { left: "89.8%", duration: "12s", delay: "-10s", text: "++[\n1<\n=|\n101\n&\n)}\nλ]=\n&)\n*><\n=\n<-}\n<\n(Σ(\n1\n]λ|\n&-|\n*=>\n1\n]\nΣ\n=\n1\n0\n]/<\n/[\n[+|\n[\n{)\n1*]\nΣ\n-{\n->=\n(" },
  { left: "96.0%", duration: "9s", delay: "-11s", text: "}\n(1\n]+\n[()\n/{[\n>\n=/\n;\nΣ\n|=\n]*\n[0\n+\n=&)\nΣ\n&{&\n<\n0\n}\n>λ<\n001\n1\n{1{\nλ/]\n{Σ}\n/\n}\n1\n{)*\n<\n/\n;;\n(0\n()" },
];

export type IntroPhase = "intro" | "exiting" | "done";

interface IntroContextType {
  phase: IntroPhase;
  ready: boolean;
  skipIntro: () => void;
}

const IntroContext = createContext<IntroContextType>({
  phase: "intro",
  ready: false,
  skipIntro: () => {},
});

export const useIntro = () => useContext(IntroContext);

const CONTENT_FADE_AT = 7000;
const EXIT_AT = 7600;
const PROGRESS_START = 1400;
const PROGRESS_END = 3200;

export function IntroGate({ children }: { children: React.ReactNode }) {
  // Phase starts at "intro" so server HTML renders the overlay and never flashes the hero
  const [phase, setPhase] = useState<IntroPhase>("intro");
  const [bootstrapped, setBootstrapped] = useState(false);
  const [isContentFading, setIsContentFading] = useState(false);
  const [progress, setProgress] = useState(0);

  const rafRef = useRef<number | null>(null);
  const fadedRef = useRef(false);
  const finishedRef = useRef(false);

  const lockScroll = useCallback(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  const handleExitComplete = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem("introSeen", "true");
    } catch {}
    document.documentElement.classList.add("intro-seen");
    setPhase("done");
    unlockScroll();
    window.dispatchEvent(new CustomEvent("preloader-finished"));
  }, [unlockScroll]);

  const skipIntro = useCallback(() => {
    if (phase === "done" || phase === "exiting") return;
    fadedRef.current = true;
    setIsContentFading(true);
    setPhase("exiting");
  }, [phase]);

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const forceIntro =
        searchParams.get("intro") === "1" || searchParams.get("intro") === "true";
      const hasSeen = sessionStorage.getItem("introSeen") === "true";
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!forceIntro && (hasSeen || prefersReduced)) {
        try {
          sessionStorage.setItem("introSeen", "true");
        } catch {}
        document.documentElement.classList.add("intro-seen");
        setPhase("done");
        unlockScroll();
        return;
      }

      document.documentElement.classList.remove("intro-seen");
      setBootstrapped(true);
    } catch {
      setBootstrapped(true);
    }
  }, [unlockScroll]);

  // One master rAF timeline (~7.6s scene, then 0.9s iris wipe ≈ 8.5s)
  useEffect(() => {
    if (!bootstrapped || phase !== "intro") return;

    lockScroll();
    fadedRef.current = false;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;

      if (elapsed < PROGRESS_START) {
        setProgress(0);
      } else if (elapsed < PROGRESS_END) {
        setProgress(Math.min(100, Math.floor(((elapsed - PROGRESS_START) / (PROGRESS_END - PROGRESS_START)) * 100)));
      } else {
        setProgress(100);
      }

      if (!fadedRef.current && elapsed >= CONTENT_FADE_AT) {
        fadedRef.current = true;
        setIsContentFading(true);
      }

      if (elapsed >= EXIT_AT) {
        setPhase("exiting");
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [bootstrapped, phase, lockScroll]);

  useEffect(() => {
    if (phase === "done") {
      unlockScroll();
      return;
    }
    lockScroll();
  }, [phase, lockScroll, unlockScroll]);

  // Backup if Framer never reports the wipe as complete
  useEffect(() => {
    if (phase !== "exiting") return;
    const fallback = window.setTimeout(() => {
      handleExitComplete();
    }, 950);
    return () => window.clearTimeout(fallback);
  }, [phase, handleExitComplete]);

  // Keyboard shortcut listener (Esc key skips to exit)
  useEffect(() => {
    if (phase !== "intro") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, skipIntro]);

  return (
    <IntroContext.Provider value={{ phase, ready: phase === "done", skipIntro }}>
      {/* Intro Overlay Curtain: solid opaque background, NO rgba, NO backdrop-filter */}
      <AnimatePresence>
        {phase !== "done" && (
          <motion.div
            id="intro-overlay"
            role="status"
            aria-label="Portfolio intro sequence"
            className={styles.overlay}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              opacity: 1,
              background: "linear-gradient(180deg, #1F2D52 0%, #16203A 100%)",
            }}
            initial={false}
            animate={{
              clipPath:
                phase === "exiting"
                  ? "circle(0% at 50% 50%)"
                  : "circle(150% at 50% 50%)",
            }}
            transition={
              phase === "exiting"
                ? { duration: 0.9, ease: [0.77, 0, 0.18, 1] }
                : { duration: 0 }
            }
            onAnimationComplete={() => {
              if (phase === "exiting") {
                handleExitComplete();
              }
            }}
          >
            <span className="sr-only">
              Initializing Rana Summar portfolio, Full-Stack AI Developer
            </span>

            {phase === "intro" && (
              <button
                type="button"
                onClick={skipIntro}
                className={styles.skipBtn}
                aria-label="Skip introduction"
                title="Press Esc to skip"
              >
                <span>SKIP</span>
                <kbd className={styles.skipKbd}>ESC</kbd>
              </button>
            )}

            {/* Inner Content: Fades out completely to 0 before the wipe starts */}
            <motion.div
              className={styles.innerContent}
              animate={{
                opacity: phase === "exiting" || isContentFading ? 0 : 1,
              }}
              transition={{
                duration: isContentFading && phase !== "exiting" ? 0.55 : 0.15,
                ease: "easeOut",
              }}
            >
              {/* Dotted Grid Background */}
              <div className={styles.grid} aria-hidden="true" />

              {/* Code Rain Matrix */}
              <div className={styles.rain} aria-hidden="true">
                {RAIN_COLUMNS.map((col, idx) => (
                  <i
                    key={idx}
                    className={styles.rainColumn}
                    style={{
                      left: col.left,
                      animationDuration: col.duration,
                      animationDelay: col.delay,
                    }}
                  >
                    {col.text}
                  </i>
                ))}
              </div>

              {/* Neural Network SVG */}
              <svg
                className={styles.net}
                viewBox="0 0 1360 800"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <line x1="170" y1="180" x2="330" y2="360" />
                <line x1="330" y1="360" x2="210" y2="560" />
                <line x1="330" y1="360" x2="480" y2="220" />
                <line x1="480" y1="220" x2="520" y2="600" />
                <line x1="210" y1="560" x2="520" y2="600" />
                <line x1="900" y1="200" x2="1050" y2="380" />
                <line x1="1050" y1="380" x2="1180" y2="230" />
                <line x1="1050" y1="380" x2="1120" y2="590" />
                <line x1="1120" y1="590" x2="860" y2="610" />
                <line x1="900" y1="200" x2="860" y2="610" />
                <line x1="520" y1="600" x2="860" y2="610" />
                <line x1="480" y1="220" x2="900" y2="200" />
                <circle cx="170" cy="180" r="4" style={{ animationDelay: "0.0s" }} />
                <circle cx="330" cy="360" r="4" style={{ animationDelay: "-0.4s" }} />
                <circle cx="210" cy="560" r="4" style={{ animationDelay: "-0.8s" }} />
                <circle cx="480" cy="220" r="4" style={{ animationDelay: "-1.2s" }} />
                <circle cx="520" cy="600" r="4" style={{ animationDelay: "-1.6s" }} />
                <circle cx="900" cy="200" r="4" style={{ animationDelay: "-2.0s" }} />
                <circle cx="1050" cy="380" r="4" style={{ animationDelay: "-2.4s" }} />
                <circle cx="1180" cy="230" r="4" style={{ animationDelay: "-2.8s" }} />
                <circle cx="1120" cy="590" r="4" style={{ animationDelay: "-3.2s" }} />
                <circle cx="860" cy="610" r="4" style={{ animationDelay: "-3.6s" }} />
              </svg>

              {/* Corner HUD Data */}
              <div className={styles.hud} style={{ left: "28px", top: "26px" }}>
                AI.AGENT / v2.0
              </div>
              <div
                className={`${styles.hud} hidden sm:block`}
                style={{ right: "128px", top: "28px" }}
              >
                LANGCHAIN • FASTAPI • NEXT.JS • PYTHON • MONGODB
              </div>
              <div className={styles.hud} style={{ left: "28px", bottom: "24px" }}>
                HAFIZABAD • PK
              </div>
              <div className={styles.hud} style={{ right: "28px", bottom: "24px" }}>
                INITIALIZING PORTFOLIO
              </div>

              {/* Glass Terminal Window */}
              <div className={styles.term} aria-label="Developer Terminal">
                <div className={styles.th}>
                  <span className={styles.dot} />
                  <span className={`${styles.dot} ${styles.dot2}`} />
                  <span className={`${styles.dot} ${styles.dot3}`} />
                  <span style={{ marginLeft: "8px" }}>summar@portfolio ~ %</span>
                </div>
                <div className={styles.tb}>
                  <div className={styles.ln}>
                    <span className={`${styles.ty} ${styles.t1}`}>
                      $ npx create-agent summar --luxury
                    </span>
                  </div>
                  <div className={styles.ln}>
                    <span className={`${styles.ty} ${styles.t2}`}>
                      [ok] LangChain + LangGraph + Groq
                    </span>
                  </div>
                  <div className={styles.ln}>
                    <span className={`${styles.ty} ${styles.t3}`}>
                      [ok] Next.js + FastAPI + MongoDB
                    </span>
                  </div>
                  <div className={styles.ln}>
                    <span className={`${styles.ty} ${styles.t4}`}>
                      [ok] Python AI engine connected ...
                    </span>
                  </div>

                  {/* Synchronized Progress Bar */}
                  <div className={styles.pbw}>
                    <div className={styles.pb}>
                      <i className={styles.pbf} style={{ width: `${progress}%` }} />
                    </div>
                    <div className={styles.pc}>{progress}%</div>
                  </div>
                </div>
              </div>

              {/* Horizontal Scan Line Sweep */}
              <div className={styles.scan} aria-hidden="true" />

              {/* Luxury Monogram & Name Reveal */}
              <div className={styles.logo}>
                <div className={styles.rg} aria-hidden="true">
                  <svg viewBox="0 0 220 220">
                    <circle
                      className={styles.ringDraw}
                      cx="110"
                      cy="110"
                      r="105"
                      fill="none"
                      stroke="#4FD1C5"
                      strokeWidth="1.5"
                      transform="rotate(-90 110 110)"
                    />
                    <g className={styles.ringOrbit}>
                      <circle
                        cx="110"
                        cy="110"
                        r="92"
                        fill="none"
                        stroke="rgba(79,209,197,0.45)"
                        strokeWidth="1"
                        strokeDasharray="2 9"
                      />
                    </g>
                    <circle
                      cx="110"
                      cy="110"
                      r="76"
                      fill="none"
                      stroke="rgba(181,245,236,0.18)"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className={styles.orb} />
                  <div className={styles.rs}>RS</div>
                </div>

                <div className={styles.nm}>
                  <span className={styles.br}>&lt;</span>
                  <span>
                    Rana <em>Summar</em>
                  </span>
                  <span className={styles.br}>/&gt;</span>
                </div>

                <div className={styles.sb}>FULL-STACK AI DEVELOPER</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invisible during intro (opaque overlay). Shown under the iris wipe; unlocked at "done". */}
      <div
        id="site-wrapper"
        className={phase === "intro" ? styles.siteWrapperHidden : styles.siteWrapperVisible}
        style={{
          visibility: phase === "intro" ? "hidden" : "visible",
        }}
        inert={phase !== "done" ? true : undefined}
        aria-hidden={phase !== "done"}
      >
        {children}
      </div>
    </IntroContext.Provider>
  );
}
