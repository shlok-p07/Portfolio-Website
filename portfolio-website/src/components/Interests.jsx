/* Interests as a poster series. Nothing to click: each poster carries one
   slow, looping detail so a skimming eye catches movement. All loops stop
   under prefers-reduced-motion. */

const Poster = ({ word, tone, foot, children }) => (
  <figure className={`m-0 flex flex-col border-2 border-ink shadow-hard ${tone}`}>
    <span className="block px-5 pt-5 font-display text-[2.75rem] leading-[0.9] lg:text-[clamp(2rem,3vw,2.75rem)] font-semibold tracking-[-0.03em]">
      {word}
    </span>
    <div className="flex-1 px-5 py-5">{children}</div>
    <figcaption className="border-t-2 border-current px-5 py-3 font-mono text-[0.75rem] leading-[1.5]">
      {foot}
    </figcaption>
  </figure>
);

// A rook's closed loop around a 4x4 corner of the board, sliding along files
// and ranks: a1, a4, d4, d1 and back. Columns a–d left to right, ranks 4–1
// top to bottom.
const TOUR = [
  [0, 3],
  [0, 0],
  [3, 0],
  [3, 3],
];
// The moves played, in notation: every square after the start, then home.
const MOVES = [...TOUR.slice(1), TOUR[0]];
const square = ([c, r]) => `${"abcd"[c]}${4 - r}`;

function ChessArt() {
  const S = 60;
  return (
    <svg viewBox="0 0 240 240" className="block w-full" role="img" aria-label="A rook sliding around the edge of a chess board">
      {Array.from({ length: 16 }, (_, k) => {
        const c = k % 4, r = Math.floor(k / 4);
        return <rect key={k} x={c * S} y={r * S} width={S} height={S} className={(c + r) % 2 ? "fill-ink" : "fill-paper"} />;
      })}
      {/* The route sits on both light and dark squares, so it gets a light
          halo beneath it, and the waypoints get light rings. */}
      <polyline
        points={[...TOUR, TOUR[0]].map(([c, r]) => `${c * S + 30},${r * S + 30}`).join(" ")}
        fill="none"
        className="stroke-paper"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <polyline
        points={[...TOUR, TOUR[0]].map(([c, r]) => `${c * S + 30},${r * S + 30}`).join(" ")}
        fill="none"
        className="stroke-cta"
        strokeWidth="3"
        strokeDasharray="6 6"
        strokeLinejoin="round"
      />
      {TOUR.map(([c, r]) => (
        <circle key={`${c}${r}`} cx={c * S + 30} cy={r * S + 30} r="6.5" className="fill-cta stroke-paper" strokeWidth="2.5" />
      ))}
      <rect x="2" y="2" width="236" height="236" fill="none" className="stroke-on-brand" strokeWidth="4" />
      <g className="piece-tour">
        <circle cx="30" cy="210" r="24" className="fill-paper stroke-ink" strokeWidth="3" />
        <text x="30" y="223" textAnchor="middle" fontSize="36" className="fill-ink">
          ♜
        </text>
      </g>
    </svg>
  );
}

// One line, like the other posters' captions; the map labels the route.
const HIKE = "Mount Rainier, WA";

/* Mount Rainier as a contour map: irregular rings around the summit (the
   mountain is a volcano, so the rings are near-concentric but lumpy), and
   route from Paradise up the Skyline Trail to Camp Muir, partway up its
   flank at a little over 10,000 ft. */
const RAINIER = { cx: 126, cy: 98 };
const ring = (r0, k) => {
  const pts = Array.from({ length: 49 }, (_, i) => {
    const t = (i / 48) * Math.PI * 2;
    const r = r0 * (1 + 0.09 * Math.sin(3 * t + k) + 0.05 * Math.sin(5 * t - k * 1.7));
    return `${(RAINIER.cx + r * Math.cos(t)).toFixed(1)},${(RAINIER.cy + r * Math.sin(t) * 0.8).toFixed(1)}`;
  });
  return `M${pts.join(" L")}Z`;
};

function TrailArt() {
  return (
    <svg viewBox="0 0 240 240" className="block w-full" role="img" aria-label="A contour map of Mount Rainier with the route from Paradise up the Skyline Trail to Camp Muir, above 10,000 feet">
      {[100, 86, 72, 59, 46, 34, 23, 13].map((r, i) => (
        <path
          key={r}
          d={ring(r, i * 0.6)}
          fill="none"
          className="stroke-ink"
          strokeWidth={i % 4 === 0 ? 2 : 1.1}
          strokeOpacity={i % 4 === 0 ? 0.9 : 0.4}
        />
      ))}
      {/* Summit */}
      <path d={`M${RAINIER.cx - 6} ${RAINIER.cy + 4} L${RAINIER.cx} ${RAINIER.cy - 6} L${RAINIER.cx + 6} ${RAINIER.cy + 4} Z`} className="fill-ink" />
      {/* Skyline Trail from Paradise to its high point */}
      <path
        d="M30 222 C 52 214, 58 200, 78 194 S 102 182, 98 168 S 106 152, 110 146"
        fill="none"
        className="trail-loop stroke-brand"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength="1"
      />
      <path d="M110 120 V146 M110 120 L130 127 L110 134" className="fill-brand stroke-ink" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="30" cy="222" r="6" className="fill-ink" />
      {/* Map labels get a paper-coloured halo so they read over the contours. */}
      <g className="fill-ink stroke-paper font-mono text-[10px]" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
        <text x="40" y="236">Paradise</text>
        <text x="40" y="206" className="font-bold">Skyline Trail</text>
        <text x="134" y="132" className="font-bold">Camp Muir</text>
        <text x="134" y="144">10,000+ ft</text>
      </g>
    </svg>
  );
}

// The letter S as a pen-tool construction drawing: the stroke, its anchors
// and their handles, the way a letterform looks mid-edit in Illustrator.
const S_PATH = [
  [[204, 52], [186, 22], [96, 18], [76, 62]],
  [[76, 62], [58, 104], [118, 120], [146, 132]],
  [[146, 132], [190, 150], [206, 206], [148, 222]],
  [[148, 222], [100, 234], [62, 208], [56, 184]],
];

function DesignArt() {
  const d = `M${S_PATH[0][0]} ` + S_PATH.map(([, c1, c2, p]) => `C${c1} ${c2} ${p}`).join(" ");
  return (
    <svg viewBox="0 0 240 240" className="block w-full" role="img" aria-label="The letter S drawn with pen-tool anchors and handles">
      <path className="s-draw stroke-on-brand" d={d} fill="none" strokeWidth="30" strokeLinecap="round" pathLength="1" />
      <path d={d} fill="none" className="stroke-brand" strokeWidth="1.5" />
      {S_PATH.map(([a, c1, c2, b], i) => (
        <g key={i}>
          <line x1={a[0]} y1={a[1]} x2={c1[0]} y2={c1[1]} className="stroke-on-brand" strokeWidth="1.25" />
          <line x1={b[0]} y1={b[1]} x2={c2[0]} y2={c2[1]} className="stroke-on-brand" strokeWidth="1.25" />
          <circle cx={c1[0]} cy={c1[1]} r="4.5" className="fill-brand stroke-on-brand" strokeWidth="1.5" />
          <circle cx={c2[0]} cy={c2[1]} r="4.5" className="fill-brand stroke-on-brand" strokeWidth="1.5" />
        </g>
      ))}
      {[S_PATH[0][0], ...S_PATH.map((s) => s[3])].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x - 6} y={y - 6} width="12" height="12" className="fill-cta stroke-on-brand" strokeWidth="2" />
      ))}
    </svg>
  );
}

const PILLARS = ["Service", "Civic learning", "Civic action", "Alliance building"];

function ServiceArt() {
  return (
    <div
      className="grid aspect-square grid-cols-2 border-2 border-ink bg-paper"
      role="img"
      aria-label={`The four NU ACES pillars: ${PILLARS.join(", ")}`}
    >
      {PILLARS.map((p, i) => (
        <span
          key={p}
          className={`pillar grid place-items-center border-ink p-2 text-center font-display text-[1rem] leading-tight font-semibold ${
            i % 2 === 0 ? "border-r-2" : ""
          } ${i < 2 ? "border-b-2" : ""}`}
          style={{ "--d": `${i * 1.5}s` }}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export default function Interests() {
  return (
    <div className="grid gap-8 text-ink sm:grid-cols-2 lg:grid-cols-4">
      <Poster word="Chess" tone="bg-brand text-on-brand" foot={MOVES.map((s) => `R${square(s)}`).join("  ")}>
        <ChessArt />
      </Poster>
      <Poster word="Hiking" tone="bg-paper" foot={HIKE}>
        <TrailArt />
      </Poster>
      <Poster word="Design" tone="bg-brand text-on-brand" foot="Illustrator, Photoshop">
        <DesignArt />
      </Poster>
      <Poster word="Volunteer" tone="bg-paper" foot="NU ACES, Boston">
        <ServiceArt />
      </Poster>
    </div>
  );
}
