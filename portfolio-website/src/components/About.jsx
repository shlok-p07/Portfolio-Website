/* About me: a first-person note beside a spread of Shlok's own photos, each
   of which opens large on click. */

import { useEffect, useRef, useState } from "react";

/* Life outside the terminal: a first-person note on what Shlok loves beside a
   spread of their own photos.

   From sm up the prints are laid out on a table: x, y and w are percentages
   of the 25:36 spread, r the resting tilt, z the stacking order. Each row
   sits in front of the one below it, so a print only ever covers the top
   of another photo, never its caption. When the spread scrolls into view
   the prints start stacked in the middle and deal out to those spots. */
const PRINTS = [
  {
    src: "/life/rainier.webp",
    ratio: 1500 / 798,
    alt: "Snowfields and a rocky ridge on Mount Rainier's Skyline Trail, with the jagged Tatoosh Range under heavy clouds",
    caption: "Skyline Trail, Mount Rainier",
    x: 0, y: 1.5, w: 62, r: -2.5, z: 7,
  },
  {
    src: "/life/sunset.webp",
    ratio: 4 / 5,
    alt: "A pink and orange sunset over trees and power lines above a parking lot",
    caption: "Sunset",
    x: 66, y: 0, w: 32, r: 3, z: 6,
  },
  {
    src: "/life/plaza-dome.webp",
    ratio: 3 / 2,
    alt: "The domed Mother Church Extension at Boston's Christian Science Plaza, lit up at night, with a film date stamp",
    caption: "Christian Science Plaza, Boston",
    x: 5, y: 29, w: 44, r: 2, z: 5,
  },
  {
    src: "/life/wing.webp",
    ratio: 1400 / 818,
    alt: "An airplane wing silhouetted against a thin orange horizon above the clouds",
    caption: "Sunrise from the air",
    x: 50, y: 27.5, w: 48, r: -2, z: 4,
  },
  {
    src: "/life/boston-harbor.webp",
    ratio: 3 / 2,
    alt: "Boston's waterfront towers and Rowes Wharf across the harbor under grey skies, seen from a cobblestone pier",
    caption: "Boston Harbor",
    x: 0, y: 51.5, w: 44, r: -1.5, z: 3,
  },
  {
    src: "/life/seattle.webp",
    ratio: 3 / 2,
    alt: "Seattle's skyline and the Space Needle across the water, with a boat's wake in the foreground",
    caption: "Seattle",
    x: 54, y: 49.5, w: 44, r: 2.5, z: 2,
  },
  {
    src: "/life/nyc.webp",
    ratio: 16 / 9,
    alt: "The Manhattan skyline on a clear afternoon, seen over rows of rooftops and trees, with a bridge on the right",
    caption: "New York City skyline",
    x: 0, y: 70, w: 56, r: -1.5, z: 1,
  },
  {
    src: "/life/dome-closeup.webp",
    ratio: 1,
    alt: "A close-up of the lit dome and arched windows of Boston's Christian Science Plaza at night, with a film date stamp",
    caption: "The dome, up close",
    x: 62, y: 71, w: 34, r: 3, z: 1,
  },
];

// The spread is 25:36, so one unit of width is 36/25 of a unit of height.
const SPREAD = 25 / 36;
const CAPTION_SHARE = 0.18; // caption strip and mat, as a share of print width
// Offset from each print's own resting centre to the centre of the spread,
// in percentages of the print's own box (what translate() resolves against).
const stackOffset = ({ x, y, w, ratio }) => {
  const h = w * (1 / ratio + CAPTION_SHARE) * SPREAD;
  return {
    "--sx": `${((50 - (x + w / 2)) / w) * 100}%`,
    "--sy": `${((50 - (y + h / 2)) / h) * 100}%`,
  };
};

function Life() {
  const [open, setOpen] = useState(null);
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16">
      <div className="max-w-[34rem] lg:sticky lg:top-28">
        <h3 className="m-0 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance">
          Life outside the terminal.
        </h3>
        <p className="m-0 mt-6 text-[1.25rem] leading-[1.55] font-medium text-pretty text-ink">
          I love building things that are actually useful to people.
        </p>
        <p className="m-0 mt-4 text-[1.125rem] leading-[1.65] text-pretty text-ink/85">
          I'm really into AI and business integrations, and how the right tech at the right time
          can make a real impact. Whether I'm building on something that already exists or
          starting a new system from scratch, I keep going until it's polished and genuinely
          useful to others. That's the part I find most satisfying.
        </p>
        <p className="m-0 mt-4 text-[1.125rem] leading-[1.65] text-pretty text-ink/85">
          When I'm not coding, I'm usually outside chasing skylines, sunsets and sunrises, or
          out on a hike. My favorite thing to do in a city is walk around right after dawn,
          before it gets busy. I love taking photos and editing them, too.
        </p>
        <p className="m-0 mt-4 text-[1.125rem] leading-[1.65] text-pretty text-ink/85">
          Otherwise I'm playing chess, working in Illustrator and Photoshop until something
          finally looks right, or volunteering with NU ACES around Boston.
        </p>
      </div>

      <div>
        <div data-reveal="prints" className="prints grid grid-cols-2 items-start gap-5 sm:block sm:relative sm:aspect-[25/36]">
          {PRINTS.map((p, i) => (
            <figure
              key={p.src}
              className="print m-0 border-2 border-ink bg-paper p-2 sm:absolute sm:left-[var(--x)] sm:top-[var(--y)] sm:w-[var(--w)] sm:p-2.5"
              style={{ "--x": `${p.x}%`, "--y": `${p.y}%`, "--w": `${p.w}%`, "--r": `${p.r}deg`, "--z": p.z, zIndex: p.z, ...stackOffset(p) }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Enlarge photo: ${p.caption}`}
                className="block w-full cursor-zoom-in overflow-hidden border-2 border-ink bg-ink p-0"
                style={{ aspectRatio: p.ratio }}
              >
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="print-img block size-full object-cover" />
              </button>
              <figcaption className="pt-2 font-mono text-[0.6875rem] leading-[1.4] font-bold sm:text-[0.75rem]">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
        <Lightbox index={open} onChange={setOpen} />
      </div>
    </div>
  );
}

/* Clicking a print opens it large in a native <dialog>: focus is trapped,
   Escape and a click on the backdrop close it, and focus returns to the
   print that opened it. Arrow keys and the side buttons step through the
   rest of the spread. */
function Lightbox({ index, onChange }) {
  const dialog = useRef(null);
  const opener = useRef(null);
  const isOpen = index !== null;

  useEffect(() => {
    const d = dialog.current;
    if (isOpen && !d.open) {
      opener.current = document.activeElement;
      d.showModal();
    } else if (!isOpen && d.open) {
      d.close();
    }
  }, [isOpen]);

  const step = (by) => onChange((i) => (i + by + PRINTS.length) % PRINTS.length);
  const p = isOpen ? PRINTS[index] : null;

  return (
    <dialog
      ref={dialog}
      aria-label={p ? `Photo: ${p.caption}` : "Photo"}
      onClose={() => {
        onChange(null);
        opener.current?.focus();
      }}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="lightbox m-auto max-h-none w-fit max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-ink/85"
    >
      {p && (
        <figure className="lightbox-frame m-0 w-min border-2 border-ink bg-paper p-3 shadow-[10px_10px_0_0_var(--color-brand)] sm:p-4">
          {/* Only the image is keyed, so stepping replays its entrance while
              the buttons, and keyboard focus on them, stay put. */}
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            className="lightbox-img block h-auto max-h-[calc(100svh-11rem)] w-auto max-w-[calc(100vw-3.75rem)] border-2 border-ink sm:max-w-[min(calc(100vw-8rem),75rem)]"
          />
          <figcaption className="mt-3 flex min-w-0 flex-wrap items-center justify-between gap-3" style={{ maxWidth: "100%" }}>
            <span className="font-mono text-[0.875rem] font-bold">
              {p.caption}
              <span className="ml-3 font-normal text-ink/65">
                {index + 1} / {PRINTS.length}
              </span>
            </span>
            <span className="flex gap-2">
              <LightboxButton label="Previous photo" onClick={() => step(-1)} d="M10 3 5 8l5 5" />
              <LightboxButton label="Next photo" onClick={() => step(1)} d="m6 3 5 5-5 5" />
              <LightboxButton label="Close" onClick={() => dialog.current.close()} d="M3 3l10 10M13 3 3 13" />
            </span>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}

const LightboxButton = ({ label, onClick, d }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="grid size-11 cursor-pointer place-items-center border-2 border-ink bg-paper text-ink hover:bg-haze"
  >
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  </button>
);

export default function About() {
  return (
    <div className="text-ink">
      <Life />
    </div>
  );
}
