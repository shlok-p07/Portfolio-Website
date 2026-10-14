import { useEffect, useRef, useState } from "react";

/* A horizontal rail of cards spanning the full window, each card shown
   exactly once. When the cards overflow the window, the rail drifts slowly
   to the last card, rests a moment, glides back to the first, and repeats;
   the turn eases through zero, so it never jerks. When every card already
   fits (a wide window or a zoomed-out browser), the cards widen to fill the
   width corner to corner and the rail stays still, since there is nothing
   off-screen to reveal. All of it is re-measured on every resize and zoom.

   The drift eases to a stop under the mouse pointer and while a visitor is
   handling the rail (dragging, touching, scrolling, navigating it by
   keyboard, or reading an open details panel), and resumes as soon as the
   pointer leaves or moments after they let go. It also rests while
   off-screen, in a hidden tab, and when the page-wide "Pause motion" control
   is on. Visitors who prefer reduced motion get a still rail with snap
   scrolling. */

// Drift speed scales with the window, so the pace feels the same on a phone
// and a wide monitor: about 2.5% of the viewport width per second, clamped.
const speed = () => Math.min(56, Math.max(26, window.innerWidth * 0.025));
const RESUME_AFTER = 1500; // ms after the visitor lets go before moving again
const EASE_MS = 300; // time constant for easing between speeds
const DWELL = 1600; // ms to rest at either end before turning back

const NAV_KEYS = new Set(["Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"]);

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Arrow = ({ dir, disabled, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className="grid size-11 cursor-pointer place-items-center border-2 border-ink bg-paper text-ink transition-opacity hover:bg-haze disabled:cursor-default disabled:opacity-30 disabled:hover:bg-paper"
  >
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`size-4 ${dir < 0 ? "rotate-180" : ""}`}>
      <path d="M3 8h9M8 3.5 12.5 8 8 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  </button>
);

export default function Rail({ label, children }) {
  const track = useRef(null);
  const [auto] = useState(() => !prefersReduced());
  const [edge, setEdge] = useState({ start: true, end: false });

  // Engagement state shared between the drift loop and the event handlers.
  const hold = useRef({ dragging: false, keyboard: false, until: 0 });
  // How the visitor last moved focus, page-wide: "key" after Tab or arrow
  // keys, "pointer" after a click or tap. Escape doesn't count, so closing a
  // details panel opened by mouse doesn't look like keyboard navigation.
  const modality = useRef("pointer");
  const pauseFor = (ms = RESUME_AFTER) => {
    hold.current.until = performance.now() + ms;
  };

  // Layout: if the cards would leave empty space at the right, widen them
  // so the set fills the window exactly. Also keeps the arrow states current.
  useEffect(() => {
    const el = track.current;
    const fit = () => {
      const cards = [...el.children];
      if (!cards.length) return;
      const css = getComputedStyle(el);
      const gap = parseFloat(css.columnGap) || 0;
      const inner = el.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight);
      el.style.setProperty("--fill", `${(inner - gap * (cards.length - 1)) / cards.length}px`);
    };
    const edges = () =>
      setEdge({
        start: el.scrollLeft <= 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      });
    const update = () => {
      fit();
      edges();
    };
    update();
    el.addEventListener("scroll", edges, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", edges);
      ro.disconnect();
    };
  }, []);

  // Drift: back and forth across the single set of cards.
  useEffect(() => {
    if (!auto) return;
    const el = track.current;

    let raf = 0, last = 0, v = 0, dir = 1, restUntil = 0, visible = true;
    let pos = el.scrollLeft, written = el.scrollLeft;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    // Ask the browser whether the pointer is over the rail each frame rather
    // than tracking enter/leave events, which can be missed around dialogs.
    // Only on devices with a real hover, so a tap on a phone never counts.
    const canHover = window.matchMedia("(hover: hover)");

    // A drag ends wherever the pointer is released, not only over the rail.
    const release = () => {
      if (!hold.current.dragging) return;
      hold.current.dragging = false;
      pauseFor();
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    const onKey = (e) => NAV_KEYS.has(e.key) && (modality.current = "key");
    const onPointer = () => (modality.current = "pointer");
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onPointer, true);

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(now - last, 64) : 0;
      last = now;
      if (!visible || document.hidden) return; // rest off-screen; no catch-up jump later

      const max = el.scrollWidth - el.clientWidth;
      const h = hold.current;
      const stopped =
        max <= 1 || // everything fits: nothing to reveal
        now < restUntil ||
        h.dragging || now < h.until ||
        // Keyboard users moving through the cards: hold still so the focused
        // card doesn't slide away from them.
        h.keyboard ||
        document.querySelector("dialog[open]") ||
        document.documentElement.dataset.motion === "paused" ||
        (canHover.matches && el.matches(":hover")); // stop to let a card be read

      // Ease toward the target velocity so starts, stops and turns all glide.
      const target = stopped ? 0 : dir * speed();
      v += (target - v) * Math.min(1, dt / EASE_MS);
      if (stopped && Math.abs(v) < 0.5) {
        v = 0;
        pos = written = el.scrollLeft; // follow any scrolling the visitor did
        return;
      }

      // If something else moved the rail (a swipe that just ended), adopt it.
      if (Math.abs(el.scrollLeft - written) > 1.5) pos = el.scrollLeft;
      pos += (v * dt) / 1000;

      // At either end: rest, then head back the other way.
      if (pos >= max && dir > 0) {
        pos = max;
        v = 0;
        dir = -1;
        restUntil = now + DWELL;
      } else if (pos <= 0 && dir < 0) {
        pos = 0;
        v = 0;
        dir = 1;
        restUntil = now + DWELL;
      }

      // Browsers round scroll offsets to whole pixels, so accumulate the
      // fractional drift in pos and only write whole-pixel steps.
      const px = Math.round(pos);
      if (px !== written) {
        el.scrollLeft = px;
        written = el.scrollLeft;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("pointerdown", onPointer, true);
    };
  }, [auto]);

  // Step to the next or previous card edge, wherever the drift has left the
  // rail, so a click always lands a card flush with the left gutter.
  const step = (dir) => {
    const el = track.current;
    const lis = [...el.children];
    const base = lis[0]?.offsetLeft ?? 0;
    const edges = lis.map((li) => li.offsetLeft - base);
    pauseFor(RESUME_AFTER + 1500);
    const at = el.scrollLeft;
    const target =
      dir > 0 ? edges.find((x) => x > at + 2) : [...edges].reverse().find((x) => x < at - 2);
    el.scrollTo({ left: target ?? (dir > 0 ? el.scrollWidth : 0), behavior: prefersReduced() ? "auto" : "smooth" });
  };

  return (
    <div role="region" aria-label={label}>
      {/* No arrows when every card already fits: there is nothing to scroll to. */}
      <div className={`mb-5 flex justify-end ${edge.start && edge.end ? "invisible" : ""}`}>
        <div className="flex gap-2">
          <Arrow dir={-1} disabled={edge.start} onClick={() => step(-1)} label={`Previous ${label.toLowerCase()}`} />
          <Arrow dir={1} disabled={edge.end} onClick={() => step(1)} label={`Next ${label.toLowerCase()}`} />
        </div>
      </div>
      <ul
        ref={track}
        tabIndex={0}
        aria-label={`${label}, scrollable`}
        onPointerDown={() => {
          hold.current.dragging = true;
          hold.current.keyboard = false;
        }}
        onWheel={() => pauseFor()}
        onFocus={() => (hold.current.keyboard = modality.current === "key")}
        onKeyDown={(e) => NAV_KEYS.has(e.key) && (hold.current.keyboard = true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            hold.current.keyboard = false;
            pauseFor();
          }
        }}
        // Snap only on still rails: on a drifting rail it would yank the
        // cards to the nearest edge the moment the drift pauses. "relative"
        // makes the rail the containing block for the cards' visually hidden
        // labels, so they scroll with it instead of escaping and widening the
        // page. The rail spans the full window; its side padding matches the
        // header's corner gutters.
        className={`rail relative m-0 flex list-none gap-6 overflow-x-auto p-0 px-4 pb-5 scroll-px-4 sm:px-6 sm:scroll-px-6 ${
          auto ? "" : "snap-x snap-mandatory"
        }`}
        style={{ marginInline: "calc(50% - 50vw)" }}
      >
        {children}
      </ul>
    </div>
  );
}

/* One card in a rail: full height, snaps to the left gutter, and sized to
   the window (about 16rem on phones up to 22rem on large monitors). When the
   whole set fits on screen, --fill widens every card equally so the row
   reaches both edges. */
export const RailCard = ({ children }) => (
  <li className="flex shrink-0 snap-start" style={{ width: "max(clamp(16rem, 21vw, 22rem), var(--fill, 0px))" }}>
    <article className="flex w-full flex-col border-2 border-ink bg-paper p-5 shadow-hard-sm">{children}</article>
  </li>
);
