import { useEffect, useRef } from "react";

/* Animated topographic map: a drifting noise field traced with marching
   squares. The cursor raises a hill, so the lines bend around it. Pauses when
   off-screen, when the tab is hidden or when the visitor pauses motion, and
   draws one still frame when they prefer reduced motion. */

const CELL = 14;
const LEVELS = [0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78];

// Small, fast value noise — enough for smooth terrain without a dependency.
const hash = (x, y) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const smooth = (t) => t * t * (3 - 2 * t);
const noise = (x, y) => {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = smooth(x - xi), yf = smooth(y - yi);
  const a = hash(xi, yi), b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
};
const field = (x, y, t) =>
  0.65 * noise(x * 0.0042 + t, y * 0.0042 - t * 0.6) +
  0.35 * noise(x * 0.011 - t * 0.8, y * 0.011 + 40);

// Line colours come from the palette (--contour, --contour-index).
export default function Contours({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999, k: 0 };
    let w = 0, h = 0, raf = 0, visible = true, t = Math.random() * 100, last = 0;
    const colors = {};
    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors.stroke = css.getPropertyValue("--contour").trim();
      colors.accent = css.getPropertyValue("--contour-index").trim();
    };
    readColors();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const cols = Math.ceil(w / CELL) + 1, rows = Math.ceil(h / CELL) + 1;
      const v = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          const x = i * CELL, y = j * CELL;
          const dx = x - mouse.x, dy = y - mouse.y;
          v[j * cols + i] = field(x, y, t) + mouse.k * 0.32 * Math.exp(-(dx * dx + dy * dy) / 26000);
        }

      ctx.clearRect(0, 0, w, h);
      LEVELS.forEach((lv, li) => {
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++)
          for (let i = 0; i < cols - 1; i++) {
            const a = v[j * cols + i], b = v[j * cols + i + 1];
            const c = v[(j + 1) * cols + i + 1], d = v[(j + 1) * cols + i];
            const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (d > lv ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x = i * CELL, y = j * CELL;
            const top = [x + CELL * ((lv - a) / (b - a)), y];
            const right = [x + CELL, y + CELL * ((lv - b) / (c - b))];
            const bottom = [x + CELL * ((lv - d) / (c - d)), y + CELL];
            const left = [x, y + CELL * ((lv - a) / (d - a))];
            const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
            switch (idx) {
              case 1: case 14: seg(left, bottom); break;
              case 2: case 13: seg(bottom, right); break;
              case 3: case 12: seg(left, right); break;
              case 4: case 11: seg(top, right); break;
              case 6: case 9: seg(top, bottom); break;
              case 7: case 8: seg(left, top); break;
              case 5: seg(left, top); seg(bottom, right); break;
              case 10: seg(top, right); seg(left, bottom); break;
            }
          }
        // One index line, like the thicker contour on a survey map.
        const index = li === 4;
        ctx.strokeStyle = index ? colors.accent : colors.stroke;
        ctx.lineWidth = index ? 2 : 1.25;
        ctx.stroke();
      });
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      // The page-wide "Pause motion" control sets data-motion on <html>.
      const paused = document.documentElement.dataset.motion === "paused";
      if (!visible || paused || now - last < 33) return; // ~30fps is plenty for drift
      last = now;
      t += 0.0035;
      mouse.k += ((mouse.x > -999 ? 1 : 0) - mouse.k) * 0.06;
      draw();
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    draw();
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);

    let io;
    if (!still) {
      io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(canvas);
      const host = canvas.parentElement;
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      const onVis = () => { visible = !document.hidden; };
      document.addEventListener("visibilitychange", onVis);
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVis);
      };
    }
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
