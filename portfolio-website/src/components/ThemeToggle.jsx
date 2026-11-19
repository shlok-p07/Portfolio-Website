import { flushSync } from "react-dom";
import { useTheme } from "../theme";

/* The theme switch in the header: a square button in the site's ink-border
   style, a sun in dark mode and a moon in light, showing where it will take
   you. It is a toggle button with a fixed name, so assistive tech hears
   "Dark mode, pressed" or "not pressed". Where view transitions are
   supported and motion is welcome, the new palette spreads out from the
   button in a circle; otherwise the switch is instant. */

const Sun = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter">
    <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7Z" />
  </svg>
);

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const dark = theme === "dark";

  const toggle = (e) => {
    const next = dark ? "light" : "dark";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || !document.startViewTransition) {
      setTheme(next);
      return;
    }

    // Spread from the button's centre out to the farthest corner.
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const t = document.startViewTransition(() => flushSync(() => setTheme(next)));
    t.ready
      .then(() =>
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => {});
  };

  return (
    <button
      type="button"
      aria-pressed={dark}
      aria-label="Dark mode"
      onClick={toggle}
      className="grid size-11 shrink-0 cursor-pointer place-items-center border-2 border-ink bg-paper text-ink transition-colors hover:bg-haze"
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
