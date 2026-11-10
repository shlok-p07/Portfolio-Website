import { siGithub } from "simple-icons";

/* The slate band across the top of an experience card: a small topographic
   map in the hero's language, generated from the organisation's name so each
   card gets its own terrain and keeps it on every visit, with the
   organisation's mark set large over it. Roles with public code also carry a
   commit graph, a branch leaving main and merging back, and the repository's
   name, so the cards with code read differently at a glance. Purely
   decorative: the card's text already names the organisation and the
   footer carries the link.

   The organisation's logo sits on a white plate in the band's corner, so
   every brand keeps its own colours whatever the band behind it. Without a
   logo the plate carries the organisation's mark instead. */

const W = 320;
const H = 112;

// Deterministic randomness from a string (FNV-1a seed into mulberry32).
const seeded = (text) => {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Closed rings around one summit, each a little less regular than the last,
// like contour lines on a hill. Ring 4 is the index contour.
const terrain = (seed, hasRepo) => {
  const rnd = seeded(seed);
  // Repo cards keep the summit left of the commit graph.
  const cx = hasRepo ? 110 + rnd() * 70 : 170 + rnd() * 110;
  const cy = 24 + rnd() * 64;
  const waves = [2, 3, 5].map((n) => ({ n, a: 0.05 + rnd() * 0.1, p: rnd() * Math.PI * 2 }));
  const rings = [];
  for (let k = 1; k <= 11; k++) {
    const pts = [];
    for (let i = 0; i < 72; i++) {
      const th = (i / 72) * Math.PI * 2;
      const wobble = waves.reduce((s, w) => s + w.a * (0.5 + k / 14) * Math.sin(w.n * th + w.p + k * 0.12), 0);
      const r = k * 12 * (1 + wobble);
      pts.push(`${(cx + r * Math.cos(th)).toFixed(1)},${(cy + r * Math.sin(th)).toFixed(1)}`);
    }
    rings.push({ k, d: `M${pts.join("L")}Z` });
  }
  return { cx, cy, rings };
};

// Pinned to the band's bottom-right corner in its own drawing, so the
// terrain's crop on narrow cards never cuts it off.
const Graph = () => (
  <svg viewBox="-7 13 114 48" className="cover-graph absolute right-3 bottom-3 h-12 w-[7.125rem]" strokeLinecap="square">
    <path d="M0 52H100" className="stroke-paper" strokeWidth="2.5" fill="none" />
    <path d="M22 52C22 26 34 22 50 22H58C74 22 80 26 80 52" className="stroke-[var(--cover-index)]" strokeWidth="2.5" fill="none" pathLength="1" />
    {[0, 22, 80, 100].map((x) => (
      <rect key={x} x={x - 4.5} y="47.5" width="9" height="9" className="fill-brand stroke-paper" strokeWidth="2" />
    ))}
    {[40, 62].map((x) => (
      <rect key={x} x={x - 4.5} y="17.5" width="9" height="9" className="fill-brand stroke-[var(--cover-index)]" strokeWidth="2" />
    ))}
  </svg>
);

export default function Cover({ seed, mark, logo, repo }) {
  const { cx, cy, rings } = terrain(seed, Boolean(repo));
  const repoName = repo && new URL(repo).pathname.split("/").filter(Boolean).at(-1);

  return (
    <div aria-hidden="true" className="relative -mx-5 -mt-5 mb-5 h-28 overflow-hidden border-b-2 border-ink bg-brand text-on-brand">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <g className="cover-terrain" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          {rings.map(({ k, d }) => (
            <path
              key={k}
              d={d}
              fill="none"
              strokeLinejoin="round"
              className={k === 4 ? "stroke-[var(--cover-index)]" : "stroke-paper/25"}
              strokeWidth={k === 4 ? 2 : 1.25}
            />
          ))}
        </g>
      </svg>
      {repo && <Graph />}
      <span className="absolute bottom-2.5 left-4 flex h-16 items-center border-2 border-ink bg-paper px-2 py-1.5 text-ink shadow-hard-sm">
        {logo ? (
          <img src={logo} alt="" width="160" height="48" className="h-12 w-auto max-w-[9.5rem] object-contain" />
        ) : (
          <span className="px-1 font-display text-[1.5rem] leading-none font-semibold tracking-[-0.01em]">{mark}</span>
        )}
      </span>
      {repoName && (
        <span className="absolute top-2 right-3 inline-flex max-w-[60%] items-center gap-1.5 border-2 border-ink bg-paper py-0.5 pr-2 pl-1.5 font-mono text-[0.6875rem] leading-5 font-bold text-ink">
          <svg viewBox="0 0 24 24" className="size-3 shrink-0 fill-current">
            <path d={siGithub.path} />
          </svg>
          <span className="truncate">{repoName}</span>
        </span>
      )}
    </div>
  );
}
