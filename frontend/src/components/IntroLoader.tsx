"use client";

import { useEffect, useState, useCallback, useRef, useSyncExternalStore } from "react";
import styles from "./IntroLoader.module.css";

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

const emptySubscribe = () => () => {};

function getIntroInitialState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const forceIntro = searchParams.get("intro") === "1" || searchParams.get("intro") === "true";
    if (forceIntro) return true;

    const hasSeen = sessionStorage.getItem("rs_intro_seen_v2");
    if (hasSeen) return false;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return false;

    return true;
  } catch {
    return true;
  }
}

export function IntroLoader() {
  const shouldShow = useSyncExternalStore(
    emptySubscribe,
    getIntroInitialState,
    () => false
  );

  const [isDismissed, setIsDismissed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, []);

  const handleFinish = useCallback(() => {
    try {
      sessionStorage.setItem("rs_intro_seen_v2", "true");
    } catch {}
    setIsDismissed(true);
    unlockScroll();
    window.dispatchEvent(new CustomEvent("preloader-finished"));
  }, [unlockScroll]);

  const handleSkip = useCallback(() => {
    try {
      sessionStorage.setItem("rs_intro_seen_v2", "true");
    } catch {}
    setIsExiting(true);
    setTimeout(() => {
      handleFinish();
    }, 280);
  }, [handleFinish]);

  useEffect(() => {
    if (!shouldShow || isDismissed) return;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Synchronize percentage counter 0% -> 100% (from 3.3s to 4.4s matching mockup @keyframes cnt)
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 3300) {
        setProgress(0);
      } else if (elapsed >= 3300 && elapsed < 4400) {
        const p = Math.min(100, Math.floor(((elapsed - 3300) / 1100) * 100));
        setProgress(p);
      } else {
        setProgress(100);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }
    }, 35);

    // Total sequence is 10s (Iris wipe finishes at 9.4s, holds until 10s then unmounts)
    timerRef.current = setTimeout(() => {
      handleFinish();
    }, 10000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      unlockScroll();
    };
  }, [shouldShow, isDismissed, handleFinish, unlockScroll]);

  // Keyboard shortcut listener (Esc key skips)
  useEffect(() => {
    if (!shouldShow || isDismissed) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shouldShow, isDismissed, handleSkip]);

  if (!shouldShow || isDismissed) {
    return null;
  }

  return (
    <div
      role="status"
      aria-label="Portfolio introductory loading sequence"
      className={`${styles.introWrapper} ${isExiting ? styles.introExiting : ""}`}
    >
      <span className="sr-only">
        Initializing Rana Summar portfolio, Full-Stack AI Developer
      </span>

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

      {/* Subtle Corner HUD Data */}
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

      {/* Skip Button (Top-Right) */}
      <button
        type="button"
        onClick={handleSkip}
        className={styles.skipBtn}
        aria-label="Skip introduction"
        title="Press Esc to skip"
      >
        <span>SKIP</span>
        <kbd className={styles.skipKbd}>ESC</kbd>
      </button>

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
            {/* Outer Drawing Circle */}
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
            {/* Orbiting Dashed Ring */}
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
            {/* Inner Ring */}
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

        {/* < Rana Summar /> */}
        <div className={styles.nm}>
          <span className={styles.br}>&lt;</span>
          <span>
            Rana <em>Summar</em>
          </span>
          <span className={styles.br}>/&gt;</span>
        </div>

        {/* Subtitle */}
        <div className={styles.sb}>FULL-STACK AI DEVELOPER</div>
      </div>
    </div>
  );
}
