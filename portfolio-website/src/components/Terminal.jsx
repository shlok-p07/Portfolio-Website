import { useCallback, useEffect, useRef, useState } from "react";
import {
  COMMANDS, GREETING, SUGGESTIONS, SUMMARIES, ALL_COMMANDS, THEMES,
  resolve, complete, unknown,
} from "../terminal/commands";
import { PROFILE } from "../terminal/content";

const THEME_KEY = "shlok-terminal-theme";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Section = ({ label, children }) => (
  <section className="mb-5">
    <h2 className="m-0 mb-1.5 text-fg-bright font-bold tracking-[0.08em] text-[13px]">
      {label}
    </h2>
    <div className="man-body">{children}</div>
  </section>
);

const Para = ({ block }) => (
  <p className="m-0 mb-2 max-w-[80ch] man-just text-fg leading-[1.7]">{block.lines.join(" ")}</p>
);

const Defs = ({ block, onRun, term, value }) => (
  <dl className="m-0 flex flex-col gap-1.5 max-w-[86ch]">
    {block.items.map(([key, desc, command]) => (
      <div key={key} className="grid grid-cols-1 sm:grid-cols-[max-content_1fr] gap-x-4">
        <dt className={`${term} shrink-0`}>
          {command ? (
            <button
              type="button"
              onClick={() => onRun(command)}
              className="text-blue underline decoration-blue/40 underline-offset-2 hover:decoration-blue cursor-pointer bg-transparent border-0 p-0 font-[inherit] text-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              {key}
            </button>
          ) : (
            key
          )}
        </dt>
        <dd className={`m-0 man-just ${value} leading-[1.7]`}>{desc}</dd>
      </div>
    ))}
  </dl>
);

const Refs = ({ block, onRun }) => (
  <p className="m-0 flex flex-wrap gap-x-1 gap-y-1 max-w-[80ch]">
    {block.items.map((r, i) => (
      <span key={r}>
        <button
          type="button"
          onClick={() => onRun(r)}
          className="text-cyan underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan cursor-pointer bg-transparent border-0 p-0 font-[inherit] text-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          {r}
        </button>
        <span className="text-dim">(1)</span>
        {i < block.items.length - 1 && <span className="text-dim">,</span>}
      </span>
    ))}
  </p>
);

const newTab = (href) =>
  /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

const Links = ({ block }) => (
  <div className="flex flex-col gap-1">
    {block.items.map((l) => (
      <a
        key={l.href}
        href={l.href}
        {...newTab(l.href)}
        className="w-fit text-green underline decoration-green/40 underline-offset-2 hover:decoration-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green whitespace-pre"
      >
        {l.label} ↗
      </a>
    ))}
  </div>
);

const Entry = ({ e, onRun }) => (
  <div className="mb-6 last:mb-0">
    <h3 className="m-0 mb-0.5 text-fg-bright font-medium">
      <button
        type="button"
        onClick={() => onRun(e.command)}
        className="text-left cursor-pointer bg-transparent border-0 p-0 font-[inherit] text-[inherit] text-fg-bright hover:text-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
      >
        {e.heading}
      </button>
    </h3>
    {e.sub && <p className="m-0 text-cyan">{e.sub}</p>}
    {e.meta && <p className="m-0 mb-2 text-dim text-[13px] whitespace-pre-wrap">{e.meta}</p>}

    {e.paras?.map((t, i) => (
      <p key={i} className="m-0 mt-2 mb-2 max-w-[80ch] man-just text-fg leading-[1.7]">{t}</p>
    ))}

    {e.bullets?.length > 0 && (
      <ul className="list-none m-0 mt-2 mb-2 p-0 flex flex-col gap-1 max-w-[80ch]">
        {e.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-fg leading-[1.7]">
            <span className="text-dim shrink-0">•</span>
            <span className="man-just">{b}</span>
          </li>
        ))}
      </ul>
    )}

    {e.fields?.map(([k, v]) => (
      <div key={k} className="grid grid-cols-1 sm:grid-cols-[13ch_1fr] gap-x-3 mt-1">
        <span className="text-yellow">{k}</span>
        <span className="man-just text-green leading-[1.7]">{v}</span>
      </div>
    ))}

    {e.links?.length > 0 && (
      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
        {e.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            {...newTab(l.href)}
            className="text-green underline decoration-green/40 underline-offset-2 hover:decoration-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
          >
            {l.label} ↗
          </a>
        ))}
      </div>
    )}

    {e.note && <p className="m-0 mt-2 max-w-[80ch] man-just text-dim">{e.note}</p>}
  </div>
);

const ManPage = ({ man, onRun, error }) => (
  <article>
    <div className="flex items-baseline justify-between gap-4 text-dim text-[12px] mb-5 pb-1.5 border-b border-line">
      <span>SHLOK(1)</span>
      <span className="hidden sm:inline">Portfolio Manual</span>
      <span>SHLOK(1)</span>
    </div>

    <Section label="NAME">
      <p className={`m-0 max-w-[80ch] man-just ${error ? "text-red" : "text-fg"}`}>{man.name}</p>
    </Section>

    {man.synopsis && (
      <Section label="SYNOPSIS">
        {man.synopsis.map(([cmd, arg]) => (
          <p key={cmd} className="m-0">
            <span className="text-blue font-medium">{cmd}</span>
            {arg && <span className="text-orange"> {arg}</span>}
          </p>
        ))}
      </Section>
    )}

    {man.description?.length > 0 && (
      <Section label="DESCRIPTION">
        {man.description.map((b, i) => <Para key={i} block={b} />)}
      </Section>
    )}

    {man.entries?.length > 0 && (
      <Section label={man.entries.length > 1 ? "ENTRIES" : "DETAIL"}>
        {man.entries.map((e, i) => <Entry key={i} e={e} onRun={onRun} />)}
      </Section>
    )}

    {man.fields && (
      <Section label="FIELDS">
        <Defs block={man.fields} onRun={onRun} term="text-yellow" value="text-fg" />
      </Section>
    )}

    {man.options && (
      <Section label="OPTIONS">
        <Defs block={man.options} onRun={onRun} term="text-orange" value="text-fg" />
      </Section>
    )}

    {man.commands && (
      <Section label="COMMANDS">
        <Defs block={man.commands} onRun={onRun} term="text-blue" value="text-dim" />
      </Section>
    )}

    {man.stack && (
      <Section label="STACK">
        <Defs block={man.stack} onRun={onRun} term="text-yellow" value="text-green" />
      </Section>
    )}

    {man.links?.items?.length > 0 && (
      <Section label="LINKS">
        <Links block={man.links} />
      </Section>
    )}

    {man.notes?.length > 0 && (
      <Section label="NOTES">
        {man.notes.map((b, i) => <Para key={i} block={b} />)}
      </Section>
    )}

    {man.seeAlso && (
      <Section label="SEE ALSO">
        <Refs block={man.seeAlso} onRun={onRun} />
      </Section>
    )}
  </article>
);

export const Terminal = ({ onSimple }) => {
  const [entries, setEntries] = useState([{ id: 0, man: GREETING.man }]);
  const [next, setNext] = useState(GREETING.next);
  const [current, setCurrent] = useState(null);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [historyAt, setHistoryAt] = useState(-1);
  const lastList = useRef(null);
  const nextId = useRef(1);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const [printing, setPrinting] = useState(false);

  const run = useCallback((input) => {
    const text = input.trim();
    if (!text) return;

    setHistory((h) => [...h, text]);
    setHistoryAt(-1);

    let parsed = resolve(text);
    if (parsed?.name === "__number" && lastList.current) {
      parsed = { name: lastList.current, arg: parsed.arg };
    }

    const result =
      !parsed || parsed.name.startsWith("__")
        ? unknown(text)
        : COMMANDS[parsed.name].run(parsed.arg);

    if (result.clear) {
      setEntries([]);
      setNext(result.next ?? SUGGESTIONS);
      setCurrent(null);
      lastList.current = null;
      setValue("");
      return;
    }

    if (parsed && ["projects", "experience", "research"].includes(parsed.name)) {
      lastList.current = parsed.name;
    } else if (parsed && !parsed.name.startsWith("__")) {
      lastList.current = null;
    }

    setEntries((prev) => [
      ...prev,
      { id: nextId.current++, command: text, man: result.man, error: result.error },
    ]);
    setNext(result.next ?? SUGGESTIONS);
    setCurrent(parsed && !parsed.name.startsWith("__") ? parsed.name : null);
    setValue("");

    if (result.setTheme) {
      document.documentElement.setAttribute("data-theme", result.setTheme);
      try {
        localStorage.setItem(THEME_KEY, result.setTheme);
      } catch {}
    }

    if (!reduced()) {
      setPrinting(true);
      window.setTimeout(() => setPrinting(false), 260);
    }

    if (result.open) window.open(result.open, "_blank", "noopener,noreferrer");
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (THEMES.includes(saved)) document.documentElement.setAttribute("data-theme", saved);
    } catch {}
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "end",
    });
  }, [entries]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(value);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const hit = complete(value);
      if (hit) setValue(hit);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const at = historyAt < 0 ? history.length - 1 : Math.max(0, historyAt - 1);
      setHistoryAt(at);
      setValue(history[at]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyAt < 0) return;
      const at = historyAt + 1;
      if (at >= history.length) { setHistoryAt(-1); setValue(""); }
      else { setHistoryAt(at); setValue(history[at]); }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      run("clear");
    }
  };

  const ghost = complete(value);

  return (
    <div className="h-full flex flex-col bg-bg">
      <header className="shrink-0 flex items-center gap-3 h-9 px-3 bg-panel border-b border-line">
        <span className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="text-dim text-[12px] truncate">
          {PROFILE.name.toLowerCase().replace(/\s+/g, "-")} — man 1 {current ?? "shlok"}
        </span>
        <button
          type="button"
          onClick={onSimple}
          title="Switch to the plain, scrollable version"
          className="ml-auto shrink-0 text-[12px] px-2 py-0.5 rounded border border-line text-blue hover:bg-raised hover:text-fg-bright transition-colors cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          plain version
        </button>
      </header>

      <div className="flex-1 min-h-0 flex">
        <nav
          aria-label="Commands"
          className="hidden md:flex w-56 shrink-0 flex-col bg-panel border-r border-line overflow-y-auto"
        >
          <p className="m-0 px-4 pt-4 pb-2 text-dim text-[11px] tracking-[0.12em]">
            MANUAL PAGES
          </p>
          <ul className="list-none m-0 p-0 pb-4 flex flex-col">
            {ALL_COMMANDS.map((cmd) => {
              const on = current === cmd;
              return (
                <li key={cmd}>
                  <button
                    type="button"
                    onClick={() => run(cmd)}
                    aria-current={on ? "page" : undefined}
                    className={`w-full text-left px-4 py-1.5 cursor-pointer bg-transparent border-0 border-l-2 transition-colors ${
                      on
                        ? "border-blue bg-raised text-fg-bright"
                        : "border-transparent text-fg hover:bg-raised hover:text-fg-bright"
                    } focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue`}
                  >
                    <span className={on ? "text-blue" : "text-blue/80"}>{cmd}</span>
                    <span className="block text-dim text-[11px] leading-tight truncate">
                      {SUMMARIES[cmd]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <main
          className="flex-1 min-w-0 overflow-y-auto"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="px-4 sm:px-8 py-6 sm:py-8">
            {entries.map((entry, idx) => (
              <div
                key={entry.id}
                className={`mb-9 ${idx === entries.length - 1 ? "term-print" : ""}`}
              >
                {entry.command && (
                  <p className="m-0 mb-4 text-[13px]">
                    <span className="text-green">shlok@portfolio</span>
                    <span className="text-dim">:</span>
                    <span className="text-blue">~</span>
                    <span className="text-dim">$ man </span>
                    <span className="text-fg-bright">{entry.command}</span>
                  </p>
                )}
                <ManPage man={entry.man} onRun={run} error={entry.error} />
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </main>
      </div>

      <div className="shrink-0 border-t border-line bg-panel">
        <div className="md:hidden flex gap-1.5 overflow-x-auto px-3 pt-2.5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ALL_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => run(cmd)}
              className="shrink-0 px-2.5 py-1 rounded border border-line bg-raised text-blue text-[12px] cursor-pointer hover:text-fg-bright transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              {cmd}
            </button>
          ))}
        </div>

        {next.length > 0 && (
          <div className="hidden md:flex flex-wrap gap-1.5 px-4 sm:px-8 pt-2.5">
            <span className="text-dim text-[12px] pr-1">next:</span>
            {next.slice(0, 7).map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => run(cmd)}
                className="px-2 py-0.5 rounded border border-line bg-raised text-[12px] text-cyan cursor-pointer hover:text-fg-bright hover:border-cyan/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                {cmd}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); run(value); }}
          className="flex items-center gap-1.5 px-4 sm:px-8 py-3"
        >
          <span aria-hidden="true" className="shrink-0 text-[13px]">
            <span className="text-green">shlok@portfolio</span>
            <span className="text-dim">:</span>
            <span className="text-blue">~</span>
            <span className="text-dim">$</span>
          </span>
          <span className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Type a command"
              autoComplete="off"
              spellCheck={false}
              className="relative z-10 w-full bg-transparent border-0 outline-none text-fg-bright caret-fg-bright"
            />
            {!value && !printing && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[0.6em] h-[1.1em] bg-fg-bright term-caret"
              />
            )}
            {ghost && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center text-dim"
              >
                <span className="invisible">{value}</span>
                <span>{ghost.slice(value.trim().length)}</span>
                <span className="pl-3 text-[11px]">tab</span>
              </span>
            )}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
