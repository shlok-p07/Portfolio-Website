import { useId, useRef, useState } from "react";
import LogoHeader, { LogoPlate } from "./Cover";
import ToolPill from "./ToolPill";

/* A switch and a master-detail view, shared by Experience and Projects. The
   switch flips between two groups, its ink block sliding to the chosen side.
   Below it the group's entries form a list (a column on wide screens, a
   scrolling row on phones) and the chosen entry fills the panel beside it:
   its logo, a short overview and its links, with "Read more" opening the
   highlights and tools for anyone who wants the detail.

   Both the switch and the list are tab lists, so arrow keys, Home and End
   move between entries and Tab moves on to the panel. Each group remembers
   which entry was open.

   Items arrive already shaped: { key, group, title, org, period, where,
   fact?, overview, numbers, points, tools, logo?, mark, repo?, links }.
   Groups are [key, full label, short label for phones]; with a single
   group the switch is left out. The overview tells
   the story; Read more adds what it leaves out: the figures, set large,
   then the bullets under the explorer's own heading. */

const newTab = (href) =>
  /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

// Arrow keys in either direction, so the list works as a column or a row.
const KEYS = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
function useRoving(count, onPick) {
  const refs = useRef([]);
  const onKeyDown = (i) => (e) => {
    let next = null;
    if (e.key in KEYS) next = (i + KEYS[e.key] + count) % count;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = count - 1;
    if (next === null) return;
    e.preventDefault();
    onPick(next);
    refs.current[next]?.focus();
  };
  return { refs, onKeyDown };
}

const Action = ({ href, primary, children }) => (
  <a
    href={href}
    {...newTab(href)}
    className={`press inline-flex items-center border-2 border-ink px-5 py-3 text-[0.9375rem] font-bold no-underline ${
      primary ? "bg-ink text-paper" : "bg-paper text-ink"
    }`}
  >
    {children}
    {newTab(href).target && (
      <span className="sr-only"> (opens in a new tab)</span>
    )}
  </a>
);

const Numbers = ({ items }) => (
  <dl className="m-0 mt-8 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-3">
    {items.map(([value, label], i) => (
      <div
        key={label}
        className="swap min-w-0 border-2 border-ink bg-haze p-3 sm:p-4"
        style={{ "--i": i }}
      >
        <dt className="sr-only">{label}</dt>
        <dd className="m-0">
          <span className="block font-display text-[1.375rem] leading-none font-semibold tracking-[-0.02em] break-words sm:text-[1.75rem]">
            {value}
          </span>
          <span className="mt-2 block text-[0.8125rem] leading-snug text-ink/75">
            {label}
          </span>
        </dd>
      </div>
    ))}
  </dl>
);

const Detail = ({ item, pointsLabel }) => {
  const [open, setOpen] = useState(false);
  const moreId = useId();
  const hasMore =
    item.numbers.length > 0 || item.points.length > 0 || item.tools.length > 0;
  return (
    <article className="overflow-hidden border-2 border-ink bg-paper shadow-hard">
      <LogoHeader mark={item.mark} logo={item.logo} repo={item.repo} />
      <div className="swap p-6 sm:p-8">
        <p className="m-0 font-mono text-[0.75rem] text-ink/65">
          {item.period}
        </p>
        <h3 className="m-0 mt-2 text-balance font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.015em]">
          {item.title}
        </h3>
        <p className="m-0 mt-2 text-[0.9375rem] font-medium text-ink/75">
          {item.where}
        </p>
        {item.fact && item.numbers.length === 0 && (
          <p className="m-0 mt-3 text-[0.9375rem] text-ink/75">
            <strong className="font-semibold text-ink">
              {item.fact.value}
            </strong>{" "}
            {item.fact.label}
          </p>
        )}
        <p className="m-0 mt-5 max-w-[56ch] text-ink/85">{item.overview}</p>

        {open && (
          <div id={moreId}>
            {item.numbers.length > 0 && <Numbers items={item.numbers} />}

            {item.points.length > 0 && (
              <div className="swap">
                <h4 className="m-0 mt-8 mb-3 font-mono text-[0.75rem] font-bold text-ink/65">
                  {pointsLabel}
                </h4>
                <ul className="m-0 max-w-[58ch] list-none p-0">
                  {item.points.map((t) => (
                    <li key={t} className="mt-3 flex gap-3 first:mt-0">
                      <span
                        aria-hidden="true"
                        className="mt-[0.65em] size-1.5 shrink-0 bg-brand"
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.tools.length > 0 && (
              <>
                <h4 className="m-0 mt-8 mb-3 font-mono text-[0.75rem] font-bold text-ink/65">
                  Skills and tools
                </h4>
                <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {item.tools.map((t) => (
                    <ToolPill key={t} name={t} />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {(hasMore || item.links.length > 0) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/15 pt-5">
            {hasMore && (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={moreId}
                onClick={() => setOpen((o) => !o)}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-[1rem] font-bold text-ink underline decoration-2 underline-offset-[6px] hover:decoration-cta"
              >
                {open ? "Show less" : "Read more"}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                  <path
                    d="M3 6l5 5 5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            )}
            {item.links.length > 0 && (
              <span className="ml-auto flex flex-wrap gap-3">
                {item.links.map((l) => (
                  <Action key={l.href} href={l.href} primary={l.primary}>
                    {l.label}
                  </Action>
                ))}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default function Explorer({
  id,
  label,
  groups,
  items,
  pointsLabel = "Highlights",
}) {
  const [group, setGroup] = useState(groups[0][0]);
  const [picked, setPicked] = useState(() =>
    Object.fromEntries(groups.map(([g]) => [g, 0])),
  );

  const groupIndex = groups.findIndex(([g]) => g === group);
  const shown = items.filter((it) => it.group === group);
  const current = Math.min(picked[group], shown.length - 1);
  const pick = (i) => setPicked((p) => ({ ...p, [group]: i }));

  const switcher = useRoving(groups.length, (i) => setGroup(groups[i][0]));
  const roster = useRoving(shown.length, pick);

  return (
    <div>
      {groups.length > 1 && (
        <div
          role="tablist"
          aria-label={label}
          className="relative grid max-w-[36rem] grid-cols-2 border-2 border-ink bg-paper shadow-hard"
        >
          <span
            aria-hidden="true"
            className="switch-thumb absolute inset-y-0 left-0 w-1/2 bg-ink"
            style={{ transform: `translateX(${groupIndex * 100}%)` }}
          />
          {groups.map(([g, full, short], i) => {
            const on = g === group;
            const count = items.filter((it) => it.group === g).length;
            return (
              <button
                key={g}
                ref={(el) => (switcher.refs.current[i] = el)}
                type="button"
                role="tab"
                id={`${id}-group-${g}`}
                aria-selected={on}
                aria-controls={`${id}-list`}
                tabIndex={on ? 0 : -1}
                onClick={() => setGroup(g)}
                onKeyDown={switcher.onKeyDown(i)}
                className={`relative z-10 flex min-h-12 cursor-pointer items-center justify-center gap-2 px-3 py-3 text-center text-[0.9375rem] leading-tight font-bold sm:text-[1rem] ${
                  on ? "text-paper" : "text-ink hover:bg-haze"
                }`}
              >
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{full}</span>
                <span
                  className={`font-mono text-[0.75rem] ${on ? "text-paper/75" : "text-ink/60"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div
        id={`${id}-list`}
        {...(groups.length > 1 && {
          role: "tabpanel",
          "aria-labelledby": `${id}-group-${group}`,
        })}
        className={`grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-10 ${groups.length > 1 ? "mt-10" : ""}`}
      >
        <div
          role="tablist"
          aria-label={groups[groupIndex][1]}
          aria-orientation="vertical"
          className="rail -mx-5 flex gap-3 overflow-x-auto px-5 pt-1 pb-4 sm:-mx-8 sm:px-8 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:self-start lg:overflow-visible lg:p-0"
        >
          {shown.map((it, i) => {
            const on = i === current;
            return (
              <button
                key={it.key}
                ref={(el) => (roster.refs.current[i] = el)}
                type="button"
                role="tab"
                id={`${id}-item-${group}-${i}`}
                aria-selected={on}
                aria-controls={`${id}-detail`}
                tabIndex={on ? 0 : -1}
                onClick={() => pick(i)}
                onKeyDown={roster.onKeyDown(i)}
                className={`role-item flex w-[16.5rem] shrink-0 cursor-pointer items-center gap-3 border-2 border-ink p-2.5 text-left lg:w-full ${
                  on
                    ? "is-on bg-brand text-on-brand"
                    : "bg-paper text-ink hover:bg-haze"
                }`}
              >
                <LogoPlate logo={it.logo} mark={it.mark} />
                <span className="min-w-0">
                  <span className="line-clamp-2 font-display text-[1rem] leading-tight font-semibold">
                    {it.title}
                  </span>
                  <span
                    className={`block truncate text-[0.8125rem] leading-5 ${on ? "text-on-brand/80" : "text-ink/70"}`}
                  >
                    {it.org}
                  </span>
                  <span
                    className={`block truncate font-mono text-[0.6875rem] leading-5 ${on ? "text-on-brand/80" : "text-ink/65"}`}
                  >
                    {it.period}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`${id}-detail`}
          role="tabpanel"
          aria-labelledby={`${id}-item-${group}-${current}`}
          tabIndex={0}
          className="min-w-0 focus-visible:outline-offset-4"
        >
          <Detail
            key={`${group}-${current}`}
            item={shown[current]}
            pointsLabel={pointsLabel}
          />
        </div>
      </div>
    </div>
  );
}
