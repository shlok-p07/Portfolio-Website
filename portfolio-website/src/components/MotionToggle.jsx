import { useEffect, useState } from "react";

/* WCAG 2.2.2: anything that moves on its own for more than five seconds
   needs a way to stop it. This one button pauses the ticker, the contour
   maps, the interest posters and the card rails for the rest of
   the visit. It deliberately isn't remembered across visits: a pause chosen
   once shouldn't leave the page looking frozen on every later load.
   Visitors who already prefer reduced motion see nothing moving, so the
   button isn't shown to them. */

export default function MotionToggle({ className = "" }) {
  const [paused, setPaused] = useState(false);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
  }, [paused]);

  if (reduced) return null;

  return (
    <button
      type="button"
      onClick={() => setPaused((p) => !p)}
      className={`flex min-h-11 cursor-pointer items-center gap-2 border-ink bg-paper px-3 font-mono text-[0.8125rem] font-bold text-ink hover:bg-haze ${className}`}
    >
      <span aria-hidden="true" className="inline-grid size-3 place-items-center">
        {paused ? (
          <span className="size-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-ink" />
        ) : (
          <span className="flex gap-[3px]">
            <span className="h-3 w-[3px] bg-ink" />
            <span className="h-3 w-[3px] bg-ink" />
          </span>
        )}
      </span>
      {paused ? "Play" : "Pause"}
      <span className="max-sm:sr-only"> motion</span>
    </button>
  );
}
