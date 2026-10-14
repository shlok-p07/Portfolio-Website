import { useEffect, useRef, useState } from "react";
import MotionToggle from "./MotionToggle";

/* Proof points set as a market ticker. "up" is a gain, "flat" is a result
   that didn't clear significance — reported anyway. The list is rendered as
   many times as it takes to fill the window at any size or zoom (re-measured
   on resize), and the track slides by exactly one copy's width at a constant
   speed, so the loop is seamless and never shows a gap. The visual copies are
   hidden from screen readers, which get the plain list instead. The motion toggle sits at the end of the
   strip, beside the thing that moves. */

const MARK = { up: "▲", flat: "■" };
const SPEED = 55; // px per second

const Item = ({ sym, value, dir }) => (
  <li className="flex shrink-0 items-baseline gap-2.5 px-6">
    <span className="font-bold text-ink">{sym}</span>
    <span className="text-ink/70">{value}</span>
    <span className={dir === "up" ? "text-cta" : "text-ink/50"}>{MARK[dir]}</span>
  </li>
);

export default function Ticker({ items }) {
  const strip = useRef(null);
  const first = useRef(null);
  const [fill, setFill] = useState({ copies: 2, width: 0 });

  useEffect(() => {
    const measure = () => {
      const width = first.current?.offsetWidth ?? 0;
      const view = strip.current?.clientWidth ?? 0;
      if (width) setFill({ copies: 1 + Math.ceil(view / width), width });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(strip.current);
    ro.observe(first.current);
    measure();
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex items-stretch border-y-2 border-ink bg-paper font-mono text-[0.875rem]">
      <div ref={strip} className="ticker group relative min-w-0 flex-1 overflow-hidden py-3.5">
        <ul className="sr-only">
          {items.map((i) => (
            <li key={i.sym}>
              {i.sym}: {i.value}
            </li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="ticker-track flex w-max"
          style={
            fill.width
              ? { "--shift": `${fill.width}px`, animationDuration: `${fill.width / SPEED}s` }
              : undefined
          }
        >
          {Array.from({ length: fill.copies + 1 }, (_, copy) => (
            <ul key={copy} ref={copy === 0 ? first : undefined} className="m-0 flex list-none p-0">
              {items.map((i) => (
                <Item key={i.sym} {...i} />
              ))}
            </ul>
          ))}
        </div>
      </div>
      <MotionToggle className="shrink-0 border-y-0 border-r-0 border-l-2" />
    </div>
  );
}
