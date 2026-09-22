import { PROJECTS, EXPERIENCE, RESEARCH, TOOLKIT, PROFILE, CONTACT } from "../terminal/content";

const newTab = (href) =>
  /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

const num = (i) => String(i + 1).padStart(2, "0");

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-16 sm:mb-24 scroll-mt-20">
    <h2 className="m-0 mb-7 flex items-baseline gap-3 text-[26px] sm:text-[34px] font-bold tracking-tight text-fg-bright">
      <span className="select-none text-purple">##</span>
      {title}
    </h2>
    {children}
  </section>
);

const Card = ({ children }) => (
  <article className="rounded-xl border border-line bg-panel p-5 sm:p-7 transition-colors hover:border-purple/50">
    {children}
  </article>
);

const Tag = ({ children }) => (
  <span className="rounded-md border border-line bg-raised px-2 py-[3px] text-[12.5px] leading-5 text-cyan">
    {children}
  </span>
);

const Stack = ({ value }) => (
  <div className="mt-4 flex flex-wrap gap-1.5">
    {value.split(", ").map((tool) => (
      <Tag key={tool}>{tool}</Tag>
    ))}
  </div>
);

const Bullets = ({ items }) => (
  <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
    {items.map((t, i) => (
      <li key={i} className="flex gap-3 text-[15.5px] leading-[1.85] text-fg">
        <span className="shrink-0 select-none text-green">▸</span>
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

const Links = ({ items }) => (
  <div className="mt-6 flex flex-wrap gap-2.5">
    {items.map((l) => (
      <a
        key={l.href}
        href={l.href}
        {...newTab(l.href)}
        className="rounded-lg border border-line bg-raised px-3.5 py-2 text-[14px] text-pink no-underline transition-colors hover:border-pink hover:text-fg-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
      >
        {l.label} <span className="text-dim">↗</span>
      </a>
    ))}
  </div>
);

const Row = ({ label, children, first }) => (
  <div
    className={`grid grid-cols-1 gap-x-8 gap-y-1 px-5 py-4 sm:grid-cols-[13rem_1fr] sm:px-7 ${
      first ? "" : "border-t border-line"
    }`}
  >
    <dt className="text-[13px] font-bold uppercase tracking-[0.1em] text-purple">{label}</dt>
    <dd className="m-0 text-[15.5px] leading-[1.85] text-fg">{children}</dd>
  </div>
);

export const SimplePage = ({ onTerminal }) => (
  <div data-theme="dracula" className="h-full overflow-y-auto bg-bg">
    <header className="sticky top-0 z-10 border-b border-line bg-panel/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-5 sm:px-8">
        <span className="truncate text-[14px] text-green">
          shlok@portfolio<span className="text-dim">:~$</span>
        </span>
        <button
          type="button"
          onClick={onTerminal}
          className="ml-auto shrink-0 cursor-pointer rounded-lg border border-purple/60 bg-transparent px-3 py-1.5 text-[12.5px] text-purple transition-colors hover:bg-purple hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        >
          terminal version
        </button>
      </div>
    </header>

    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-20">
      <h1 className="m-0 text-[38px] leading-[1.1] font-bold tracking-tight text-fg-bright sm:text-[52px]">
        {PROFILE.name}
      </h1>
      <p className="m-0 mt-3 text-[16px] text-cyan sm:text-[18px]">{PROFILE.role}</p>
      <p className="m-0 mt-1 text-[14px] text-dim">{PROFILE.location}</p>
      <p className="m-0 mt-6 max-w-[68ch] text-[16.5px] leading-[1.9] text-fg">{PROFILE.intro}</p>
      <Links items={CONTACT.map((c) => ({ label: c.label, href: c.href }))} />

      <hr className="my-14 border-0 border-t border-line sm:my-20" />

      <Section id="about" title="about">
        {PROFILE.about.map((p, i) => (
          <p key={i} className="m-0 mb-5 max-w-[68ch] text-[16.5px] leading-[1.9] text-fg">
            {p}
          </p>
        ))}
        <dl className="m-0 mt-8 overflow-hidden rounded-xl border border-line bg-panel">
          {[
            ["Degree", PROFILE.degree],
            ["School", PROFILE.school],
            ["GPA", PROFILE.gpa],
            ["Graduation", PROFILE.graduation],
            ["Available", PROFILE.availability],
            ["Honors", PROFILE.honors],
            ["Societies", PROFILE.societies],
            ["Coursework", PROFILE.coursework],
            ["Certifications", PROFILE.certifications],
          ].map(([label, value], i) => (
            <Row key={label} label={label} first={i === 0}>
              {value}
            </Row>
          ))}
        </dl>
      </Section>

      <Section id="skills" title="tech stack">
        <div className="flex flex-col gap-4">
          {TOOLKIT.map((g) => (
            <div key={g.label} className="rounded-xl border border-line bg-panel p-5 sm:p-6">
              <h3 className="m-0 text-[14px] font-bold uppercase tracking-[0.1em] text-yellow">
                {g.label}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="projects">
        <div className="flex flex-col gap-5">
          {PROJECTS.map((p, i) => (
            <Card key={p.title}>
              <div className="flex items-baseline gap-3">
                <span className="shrink-0 select-none text-[14px] text-pink">[{num(i)}]</span>
                <h3 className="m-0 text-[19px] font-bold leading-snug text-green sm:text-[21px]">
                  {p.title}
                </h3>
              </div>
              {p.client && (
                <p className="m-0 mt-2 text-[15.5px] text-cyan">
                  Client: {p.client}
                  {p.context && <span className="text-dim"> — {p.context}</span>}
                </p>
              )}
              {p.period && <p className="m-0 mt-1 text-[13.5px] text-yellow">{p.period}</p>}
              <p className="m-0 mt-3 max-w-[68ch] text-[15.5px] leading-[1.85] text-fg">
                {p.description}
              </p>
              {p.stack && <Stack value={p.stack} />}
              {p.skills && <Stack value={p.skills} />}
              {(p.github || p.demo) && (
                <Links
                  items={[
                    p.github && { label: "Source code", href: p.github },
                    p.demo && { label: "Live demo", href: p.demo },
                  ].filter(Boolean)}
                />
              )}
              {(p.note || (!p.github && !p.demo)) && (
                <p className="m-0 mt-4 max-w-[68ch] text-[14px] text-dim">
                  {p.note ?? "Repository is private."}
                </p>
              )}
            </Card>
          ))}
        </div>
      </Section>

      <Section id="experience" title="experience">
        <div className="flex flex-col gap-5">
          {EXPERIENCE.map((j, i) => (
            <Card key={i}>
              <div className="flex items-baseline gap-3">
                <span className="shrink-0 select-none text-[14px] text-pink">[{num(i)}]</span>
                <h3 className="m-0 text-[19px] font-bold leading-snug text-purple sm:text-[21px]">
                  {j.role}
                </h3>
              </div>
              <p className="m-0 mt-2 text-[15.5px] text-cyan">{j.org}</p>
              {j.context && <p className="m-0 mt-0.5 text-[14px] text-dim">{j.context}</p>}
              <p className="m-0 mt-1 text-[13.5px] text-yellow">
                {j.period} <span className="text-dim">· {j.location}</span>
              </p>
              <Bullets items={j.points} />
              {j.stack && <Stack value={j.stack} />}
            </Card>
          ))}
        </div>
      </Section>

      <Section id="research" title="research">
        <div className="flex flex-col gap-5">
          {RESEARCH.map((r, i) => (
            <Card key={i}>
              <div className="flex items-baseline gap-3">
                <span className="shrink-0 select-none text-[14px] text-pink">[{num(i)}]</span>
                <h3 className="m-0 text-[19px] font-bold leading-snug text-orange sm:text-[21px]">
                  {r.title}
                </h3>
              </div>
              <p className="m-0 mt-2 text-[15.5px] text-cyan">
                {r.role}, {r.group}
              </p>
              <p className="m-0 mt-1 text-[13.5px] text-yellow">
                Advised by {r.advisor} <span className="text-dim">· {r.period}</span>
              </p>
              <Bullets items={r.work} />
              <Stack value={r.stack} />
            </Card>
          ))}
        </div>
      </Section>

      <Section id="contact" title="contact">
        <p className="m-0 mb-6 max-w-[68ch] text-[16.5px] leading-[1.9] text-fg">
          Email is the surest way to reach me.
        </p>
        <dl className="m-0 overflow-hidden rounded-xl border border-line bg-panel">
          {CONTACT.map((c, i) => (
            <Row key={c.href} label={c.label} first={i === 0}>
              <a
                href={c.href}
                {...newTab(c.href)}
                className="text-pink underline decoration-pink/40 underline-offset-4 transition-colors hover:decoration-pink hover:text-fg-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
              >
                {c.value} ↗
              </a>
            </Row>
          ))}
        </dl>
      </Section>

      <p className="m-0 border-t border-line pt-8 text-[13px] text-dim">
        <span className="text-green">shlok@portfolio</span>:~$ © 2026 {PROFILE.name}
      </p>
    </main>
  </div>
);

export default SimplePage;
