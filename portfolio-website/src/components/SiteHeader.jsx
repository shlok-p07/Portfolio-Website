import { useEffect, useRef, useState } from "react";
import { scrollToTop } from "../scrollToTop";

/* Sticky site header spanning the full window: logo pinned to the left
   corner, section links centred, actions pinned to the right corner. The
   link for the section in view is highlighted as you scroll. Section links
   sit inline from 1024px up; below that they move into a menu panel. The panel moves focus to its first link,
   closes on Escape, on an outside tap, on choosing a link, or when the
   window widens past the breakpoint, and hands focus back to the button. */

const Bars = ({ open }) => (
  <span aria-hidden="true" className="relative block h-3.5 w-5">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-200 ${
          ["top-0", "top-1.5", "top-3"][i]
        } ${open && i === 0 ? "translate-y-1.5 rotate-45" : ""} ${open && i === 1 ? "scale-x-0" : ""} ${
          open && i === 2 ? "-translate-y-1.5 -rotate-45" : ""
        }`}
      />
    ))}
  </span>
);

/* Which section is in view: the last one whose top has passed a line 40%
   down the window, or none while the opening section fills the view. At
   the very bottom of the page the last section counts, even if it is too
   short to reach that line. As it changes, the address bar follows with
   replaceState: "#education" while reading Education, and a plain URL with
   no hash on the opening section. Scrolling never adds history entries,
   so Back still leaves the page. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && window.scrollY > 0) current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  useEffect(() => {
    const hash = active ? `#${active}` : "";
    if (location.hash === hash) return;
    history.replaceState(null, "", location.pathname + location.search + hash);
  }, [active]);

  return active;
}

export default function SiteHeader({ name, nav, resume }) {
  const [open, setOpen] = useState(false);
  const [ids] = useState(() => nav.map(([id]) => id));
  const active = useActiveSection(ids);
  const header = useRef(null);
  const button = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector("a")?.focus();

    const close = (refocus) => {
      setOpen(false);
      if (refocus) button.current?.focus();
    };
    const onKey = (e) => e.key === "Escape" && close(true);
    const onDown = (e) => !header.current?.contains(e.target) && close(false);
    const wide = window.matchMedia("(min-width: 64rem)");
    const onWide = () => wide.matches && close(false);

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <header ref={header} className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a
          href="/"
          onClick={scrollToTop}
          className="flex min-w-0 items-center gap-3 justify-self-start font-display text-[1.125rem] font-semibold text-ink no-underline"
        >
          <img src="/sp.svg" alt="" className="size-9 shrink-0 border-2 border-ink bg-[#fff]" />
          <span className="truncate max-[22rem]:sr-only lg:max-xl:sr-only">{name}</span>
        </a>

        <nav aria-label="Sections" className="hidden justify-self-center lg:block">
          <ul className="m-0 flex list-none gap-6 p-0 font-medium xl:gap-8">
            {nav.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className="nav-link text-ink no-underline transition-colors aria-[current]:text-cta"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 justify-self-end">

          <a
            href={resume}
            className="border-2 border-ink bg-cta px-4 py-2 text-[0.9375rem] font-bold text-on-cta no-underline transition-colors hover:bg-ink hover:text-paper"
          >
            Resume<span className="sr-only"> (PDF)</span>
          </a>

          <button
            ref={button}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
            className="flex min-h-11 cursor-pointer items-center gap-2.5 border-2 border-ink bg-paper px-3 font-bold text-ink lg:hidden"
          >
            <Bars open={open} />
            {/* A fixed name; aria-expanded tells assistive tech whether it's open. */}
            <span className="max-sm:sr-only">Menu</span>
          </button>
        </div>
      </div>

      <nav
        id="site-menu"
        ref={panel}
        aria-label="Sections"
        hidden={!open}
        className="border-t-2 border-ink bg-paper shadow-hard lg:hidden"
      >
        <ul className="m-0 list-none p-0">
          {nav.map(([id, label]) => (
            <li key={id} className="border-b-2 border-ink last:border-b-0">
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-between px-4 py-4 font-display text-[1.5rem] font-semibold text-ink no-underline hover:bg-haze aria-[current]:text-cta sm:px-6"
              >
                {label}
                <span aria-hidden="true" className="font-mono text-[1rem]">
                  #
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span
        aria-hidden="true"
        className="scroll-progress pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-cta"
        style={{ transform: "scaleX(0)" }}
      />
    </header>
  );
}
