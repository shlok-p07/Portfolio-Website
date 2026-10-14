import {
  siAmazonwebservices, siDocker, siExpress, siFigma, siFlask, siGit, siJavascript, siJupyter, siMongodb,
  siNextdotjs, siNodedotjs, siNumpy, siOpenjdk, siPandas, siPostgresql, siPrisma,
  siPuppeteer, siPython, siPytorch, siReact, siScikitlearn, siScipy, siStreamlit,
  siSupabase, siTailwindcss, siTensorflow, siTypescript, siVite, siVitest,
} from "simple-icons";

/* A tool as a pill: its official logo in its brand colour (Simple Icons,
   bundled rather than hot-linked) on a faint wash of the same colour.
   Black logos such as Next.js follow the text colour so they stay visible
   on dark palettes; anything without an official logo is a plain text pill. */

const ICONS = {
  Python: siPython, TypeScript: siTypescript, JavaScript: siJavascript, Java: siOpenjdk,
  PyTorch: siPytorch, "scikit-learn": siScikitlearn, TensorBoard: siTensorflow,
  NumPy: siNumpy, pandas: siPandas, SciPy: siScipy, Jupyter: siJupyter,
  React: siReact, "Next.js": siNextdotjs, "Tailwind CSS": siTailwindcss, Vite: siVite,
  "Node.js": siNodedotjs, Express: siExpress, Flask: siFlask,
  PostgreSQL: siPostgresql, Supabase: siSupabase, MongoDB: siMongodb, Prisma: siPrisma,
  Docker: siDocker, Git: siGit, Vitest: siVitest, Puppeteer: siPuppeteer,
  Streamlit: siStreamlit, Figma: siFigma, AWS: siAmazonwebservices,
};

const luminance = (hex) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export default function ToolPill({ name }) {
  const icon = ICONS[name];
  const hex = icon?.hex;
  const dark = hex && luminance(hex) < 0.25;
  const tint = hex && !dark ? `#${hex}1f` : "color-mix(in srgb, var(--color-ink) 7%, transparent)";

  return (
    <li
      className={`inline-flex items-center gap-2 rounded-full border border-ink/15 py-1 pr-3 text-[0.8125rem] font-medium ${icon ? "pl-2" : "pl-3"}`}
      style={{ background: tint }}
    >
      {icon && (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 shrink-0" style={{ fill: dark ? "currentColor" : `#${hex}` }}>
          <path d={icon.path} />
        </svg>
      )}
      {name}
    </li>
  );
}
