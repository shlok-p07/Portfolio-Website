import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import TextType from "./text";

const BOOT_LINES = ["booting shlok.dev", "status: ready"];

const REVEAL_TEXT = "WELCOME!";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";
const TYPING_SPEED = 14;
const REVEAL_DURATION = 650;

export const Preloader = ({ onDone }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [phase, setPhase] = useState("boot"); // boot -> reveal -> exit
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const rootRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const contentRef = useRef(null);
  const revealRef = useRef(null);
  const barFillRef = useRef(null);
  const percentRef = useRef(null);

  // Lock scroll for the lifetime of the preloader.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (reducedMotion) {
      const t = setTimeout(() => setPhase("exit"), 400);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prevOverflow;
      };
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [reducedMotion]);

  // Advance through the boot lines, timed to roughly match each line's typing duration.
  useEffect(() => {
    if (reducedMotion || phase !== "boot" || lineIndex >= BOOT_LINES.length) return;
    const duration = BOOT_LINES[lineIndex].length * TYPING_SPEED + 150;
    const t = setTimeout(() => setLineIndex((n) => n + 1), duration);
    return () => clearTimeout(t);
  }, [lineIndex, phase, reducedMotion]);

  // Boot lines finished typing -> move into the welcome reveal.
  useEffect(() => {
    if (reducedMotion || lineIndex < BOOT_LINES.length) return;
    const t = setTimeout(() => setPhase("reveal"), 150);
    return () => clearTimeout(t);
  }, [lineIndex, reducedMotion]);

  // Reveal phase: scramble-decode the welcome text while a progress bar fills.
  useEffect(() => {
    if (phase !== "reveal") return;
    const duration = REVEAL_DURATION;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealCount = Math.floor(progress * REVEAL_TEXT.length);

      if (revealRef.current) {
        revealRef.current.textContent = REVEAL_TEXT.split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < revealCount) return c;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("");
      }
      if (barFillRef.current) barFillRef.current.style.transform = `scaleX(${progress})`;
      if (percentRef.current) {
        percentRef.current.textContent = `${String(Math.floor(progress * 100)).padStart(3, "0")}%`;
      }

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("exit"), 150);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Exit phase: curtain-split reveal of the page underneath.
  useEffect(() => {
    if (phase !== "exit") return;
    const tl = gsap.timeline({ onComplete: () => onDone?.() });

    if (reducedMotion) {
      tl.to(rootRef.current, { opacity: 0, duration: 0.25, ease: "power1.out" });
    } else {
      tl.to(contentRef.current, { opacity: 0, y: -10, duration: 0.2, ease: "power2.in" })
        .to(topPanelRef.current, { yPercent: -100, duration: 0.55, ease: "power4.inOut" }, "-=0.05")
        .to(bottomPanelRef.current, { yPercent: 100, duration: 0.55, ease: "power4.inOut" }, "<");
    }

    return () => tl.kill();
  }, [phase, onDone, reducedMotion]);

  const skip = () => setPhase("exit");

  // Any real attempt to interact — scroll, click, key, touch — jumps straight to the reveal.
  // A loading animation should never cost an impatient visitor real time.
  useEffect(() => {
    const handler = () => skip();
    window.addEventListener("wheel", handler, { passive: true });
    window.addEventListener("touchstart", handler, { passive: true });
    window.addEventListener("keydown", handler);
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] font-mono select-none"
      role="button"
      tabIndex={0}
      aria-label="Skip loading animation"
      onClick={skip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") skip();
      }}
    >
      <div ref={topPanelRef} className="absolute inset-x-0 top-0 h-1/2 bg-black" />
      <div ref={bottomPanelRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-black" />

      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-4"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.10), transparent 60%)",
        }}
      >
        {phase === "boot" && !reducedMotion && (
          <div className="flex flex-col gap-2 items-start min-w-[240px]">
            {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) =>
              i === lineIndex ? (
                <TextType
                  key={i}
                  text={[line]}
                  typingSpeed={TYPING_SPEED}
                  loop={false}
                  showCursor
                  cursorCharacter="_"
                  hideCursorWhenDone
                  className="text-xs sm:text-sm text-blue-400/90 tracking-wide"
                />
              ) : (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  {line}
                </div>
              )
            )}
          </div>
        )}

        {(phase === "reveal" || phase === "exit") && (
          <div className="flex flex-col items-center gap-5">
            <span
              ref={revealRef}
              className="text-4xl sm:text-6xl font-extrabold tracking-wider text-blue-500 whitespace-pre"
            >
              {reducedMotion ? REVEAL_TEXT : ""}
            </span>
            <div className="w-56 sm:w-72 h-px bg-white/10 overflow-hidden rounded-full">
              <div
                ref={barFillRef}
                className="h-full w-full origin-left scale-x-0 bg-linear-to-r from-sky-400 via-indigo-500 to-blue-500"
              />
            </div>
            <span ref={percentRef} className="text-[11px] tracking-widest text-neutral-500">
              000%
            </span>
          </div>
        )}
      </div>

      <span className="absolute bottom-6 inset-x-0 text-center text-[10px] tracking-widest uppercase text-neutral-700">
        scroll, click, or press any key to skip
      </span>
    </div>
  );
};

export default Preloader;
