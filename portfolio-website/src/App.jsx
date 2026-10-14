import { PROJECTS, EXPERIENCE, RESEARCH, TOOLKIT, PROFILE, CONTACT } from "./content";
import Contours from "./components/Contours";
import Ticker from "./components/Ticker";
import Interests from "./components/Interests";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ToolPill from "./components/ToolPill";
import Rail, { RailCard } from "./components/Rail";
import Details from "./components/Details";

const NAV = [
  ["education", "Education"],
  ["toolkit", "Toolkit"],
  ["work", "Projects"],
  ["research", "Research"],
  ["experience", "Experience"],
  ["interests", "Interests"],
  ["contact", "Contact"],
];

const link = (label) => CONTACT.find((c) => c.label === label).href;
const EMAIL = link("Email");
const RESUME = link("Resume");

/* Every figure here comes straight from the content below, including the
   result that didn't clear significance. */
const TICKER = [
  { sym: "SGA CMS", value: "5,000+ students", dir: "up" },
  { sym: "Backtesting", value: "10M+ data points", dir: "up" },
  { sym: "Parkinson's research", value: "AUROC 0.720 → 0.774", dir: "up" },
  { sym: "RL hedging", value: "no significant edge", dir: "flat" },
  { sym: "Whalley-Wilmott", value: "80% fewer trades", dir: "up" },
  { sym: "Teaching", value: "100+ students", dir: "up" },
  { sym: "SIGCSE 2027", value: "2 posters", dir: "up" },
  { sym: "GPA", value: PROFILE.gpa, dir: "up" },
];



// Featured work leads the rail; the rest follow in their original order.
const PROJECT_RAIL = [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured)];
const list = (v) => (v ? v.split(", ") : []);

const newTab = (href) =>
  /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

/* One container for every band of the page, so all left edges line up. */
const Wrap = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-[76rem] px-5 sm:px-8 ${className}`}>{children}</div>
);

const TONES = {
  accent: "bg-cta text-on-cta",
  primary: "bg-ink text-paper",
  plain: "bg-paper text-ink",
};

const Button = ({ href, tone = "plain", children }) => (
  <a
    href={href}
    {...newTab(href)}
    className={`press inline-flex items-center border-2 border-ink px-5 py-3 text-[0.9375rem] font-bold no-underline ${TONES[tone]}`}
  >
    {children}
    {/\.pdf$/i.test(href) && <span className="sr-only"> (PDF)</span>}
    {newTab(href).target && <span className="sr-only"> (opens in a new tab)</span>}
  </a>
);

const Section = ({ id, title, tone = "bg-paper", dark, children }) => (
  <section id={id} className={`scroll-mt-16 border-b-2 border-ink py-20 sm:py-24 ${tone}`}>
    <Wrap>
      <h2
        className={`m-0 mb-12 border-b-2 pb-6 font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.95] font-semibold tracking-[-0.02em] ${
          dark ? "border-white" : "border-ink"
        }`}
      >
        {title}
      </h2>
      {children}
    </Wrap>
  </section>
);

/* The card's key figure as one line, the figure set in bold. */
const Fact = ({ m }) => (
  <p className="m-0 mt-2 text-[0.9375rem] text-ink/70">
    <strong className="font-semibold text-ink">{m.value}</strong> {m.label}
  </p>
);

const Points = ({ items }) => (
  <ul className="m-0 list-none p-0">
    {items.map((t, i) => (
      <li key={i} className="mt-3 flex gap-3 first:mt-0">
        <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 bg-brand" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

/* Small text links inside a card. Each carries its project's name for
   screen readers, since several cards share the same labels. */
const TextLink = ({ href, children, name }) => (
  <a
    href={href}
    {...newTab(href)}
    className="text-[0.875rem] font-medium text-ink/70 underline decoration-ink/30 underline-offset-4 hover:text-ink hover:decoration-ink"
  >
    {children}
    <span className="sr-only">
      {" "}
      for {name}
      {newTab(href).target && " (opens in a new tab)"}
    </span>
  </a>
);

/* The one card used by both rails. Every card carries the same lines in the
   same order, each with a fixed height, so lines sit level across cards:
   dates, title (up to two lines), organisation (one line; two on phones,
   where cards are narrow), summary (up to three lines), and a footer with
   "View details" and any links. */
const MiniCard = ({ kind, date, title, org, summary, links, children }) => (
  <>
    <p className="m-0 truncate font-mono text-[0.75rem] leading-5 text-ink/60">{date}</p>
    <h3 className="m-0 mt-2 line-clamp-2 min-h-[2.3em] font-display text-[1.25rem] leading-[1.15] font-semibold">
      {title}
    </h3>
    <p className="m-0 mt-1 line-clamp-2 min-h-12 text-[0.875rem] leading-6 font-medium text-ink/70 sm:line-clamp-1 sm:min-h-6" title={org}>
      {org}
    </p>
    <p className="m-0 mt-3 line-clamp-3 min-h-[4.8em] text-[0.9375rem] leading-[1.6] text-ink/80">{summary}</p>
    <div className="mt-5 flex min-h-11 flex-nowrap items-center gap-x-4 overflow-hidden border-t border-ink/15 pt-4 whitespace-nowrap">
      <Details title={title} meta={kind}>
        {children}
      </Details>
      {links}
    </div>
  </>
);

/* The single layout every details panel uses, top to bottom and always in
   this order: Organization and Dates, Overview, Highlights, Skills and tools,
   then any actions. Blocks are divided by hairlines. */
const Block = ({ title, children }) => (
  <section className="border-t border-ink/15 pt-5">
    <h4 className="m-0 mb-3 font-mono text-[0.75rem] font-bold text-ink/60">{title}</h4>
    {children}
  </section>
);

const KeyFacts = ({ rows }) => (
  <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-4">
    {rows.map(([k, v]) => (
      <div key={k} className="min-w-0">
        <dt className="font-mono text-[0.6875rem] text-ink/55">{k}</dt>
        <dd className="m-0 mt-0.5 leading-snug font-medium">{v}</dd>
      </div>
    ))}
  </dl>
);

const Panel = ({ org, dates, overview, highlights, tools, actions }) => (
  <div className="flex flex-col gap-5">
    <KeyFacts
      rows={[
        ["Organization", org],
        ["Dates", dates],
      ]}
    />
    <Block title="Overview">
      <p className="m-0">{overview}</p>
    </Block>
    <Block title="Highlights">
      <Points items={highlights} />
    </Block>
    <Block title="Skills and tools">
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {tools.map((t) => (
          <ToolPill key={t} name={t} />
        ))}
      </ul>
    </Block>
    {actions}
  </div>
);

const ProjectButtons = ({ p }) =>
  (p.demo || p.github) && (
    <p className="m-0 flex flex-wrap gap-3 border-t border-ink/15 pt-5">
      {p.demo && <Button href={p.demo}>Live demo</Button>}
      {p.github && (
        <Button href={p.github} tone="primary">
          Source code
        </Button>
      )}
    </p>
  );


/* The second study's design as a matrix of conditions: four assistants by
   four languages, each cell holding the three tasks. Setup, not results. */
const STUDY = {
  tools: ["Claude Code", "Copilot", "Cursor", "ChatGPT"],
  langs: ["Python", "Java", "Prolog", "TypeScript"],
  tasks: ["G", "D", "R"],
};
const StudyMatrix = () => (
  <figure
    className="m-0 w-full"
    role="img"
    aria-label="Study design: four AI assistants across four programming languages, each tested on generation, debugging and refactoring"
  >
    <div aria-hidden="true" className="grid grid-cols-[4.75rem_repeat(4,minmax(0,1fr))] gap-1.5 font-mono text-[0.6875rem]">
      <span />
      {STUDY.tools.map((t) => (
        <span key={t} className="truncate pb-1 text-center font-bold">
          {t}
        </span>
      ))}
      {STUDY.langs.map((l) => (
        <div key={l} className="contents">
          <span className="self-center font-bold">{l}</span>
          {STUDY.tools.map((t) => (
            <span key={t} className="flex justify-center gap-1 border border-ink/20 bg-paper py-1.5">
              {STUDY.tasks.map((k) => (
                <span key={k} className="grid size-[1.125rem] place-items-center bg-brand text-[0.5625rem] font-bold text-on-brand">
                  {k}
                </span>
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
    <figcaption aria-hidden="true" className="mt-3 font-mono text-[0.6875rem] text-ink/60">
      G generation, D debugging, R refactoring
    </figcaption>
  </figure>
);

/* AUROC on a fixed 0.65–0.80 axis, with the p-value printed beside it rather
   than hidden: the gain is suggestive, not significant. */
const AurocChart = () => {
  const x = (v) => ((v - 0.65) / 0.15) * 100;
  return (
    <figure className="m-0 w-full">
      <div className="relative mx-3 h-16">
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 bg-brand"
          style={{ left: `${x(0.72)}%`, width: `${x(0.774) - x(0.72)}%` }}
        />
        {[
          [0.72, "bg-paper", "Baseline 0.720", "-top-1"],
          [0.774, "bg-brand", "Fused 0.774", "top-11"],
        ].map(([v, tone, label, at]) => (
          <div key={v} className="absolute top-1/2" style={{ left: `${x(v)}%` }}>
            <span className={`absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink ${tone}`} />
            <span className={`absolute -translate-x-1/2 -translate-y-8 font-mono text-[0.75rem] font-bold whitespace-nowrap ${at}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-2 flex justify-between font-mono text-[0.6875rem] text-ink/60">
        <span>0.65</span>
        <span>AUROC</span>
        <span>0.80</span>
      </div>
    </figure>
  );
};

function App() {
  return (
    <>
      <a
        href="#education"
        className="sr-only z-50 bg-cta px-4 py-2 font-bold text-on-cta focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <SiteHeader name={PROFILE.name} nav={NAV} resume={RESUME} />

      <main id="top">
        <section className="relative overflow-hidden border-b-2 border-ink bg-paper text-ink">
          <Contours className="absolute inset-0 size-full" />
          <Wrap className="pointer-events-none relative grid items-center gap-14 py-16 sm:py-20 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10 lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14">
            <div className="pointer-events-auto">
              <p
                className="rise m-0 inline-block border-2 border-ink bg-paper px-3 py-1 text-[0.9375rem] font-bold text-ink shadow-[3px_3px_0_0_var(--color-brand)]"
                style={{ "--i": 0 }}
              >
                Computer Science and FinTech, Northeastern University
              </p>
              <h1
                className="rise m-0 mt-6 font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.03em]"
                style={{ "--i": 1 }}
              >
                {PROFILE.name}
              </h1>
              <p className="rise m-0 mt-6 max-w-[36rem] text-[1.25rem] leading-[1.5] font-medium text-ink/80 sm:text-[1.4375rem]" style={{ "--i": 2 }}>
                Software engineer and machine learning researcher. I build systems that hold up in
                real use, and I report results exactly as they come out.
              </p>
              <div className="rise mt-9 flex flex-wrap gap-4" style={{ "--i": 3 }}>
                <Button href={EMAIL} tone="accent">
                  Email me
                </Button>
                <Button href={RESUME}>Download resume</Button>
                <Button href={link("LinkedIn")}>LinkedIn</Button>
              </div>
            </div>

            <div className="drop pointer-events-auto relative mx-auto w-full max-w-[21rem] md:mx-0">
              <figure className="m-0 border-2 border-ink bg-[#fff] p-3 text-black shadow-[10px_10px_0_0_var(--color-brand)]">
                <img
                  src="/headshot.webp"
                  alt="Shlok Patel in a dark suit and tie"
                  width="740"
                  height="740"
                  className="block aspect-square w-full border-2 border-ink object-cover object-center"
                />
                <figcaption className="mt-3 flex justify-between font-mono text-[0.75rem] font-bold">
                  <span>Boston, MA</span>
                  <span>42.34° N, 71.09° W</span>
                </figcaption>
              </figure>
            </div>
          </Wrap>
        </section>

        <Ticker items={TICKER} />

        <Section id="education" title="Education">
          <article className="grid grid-cols-2 gap-4 border-2 border-ink bg-paper p-6 shadow-hard sm:gap-6 sm:p-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.75fr)_minmax(0,0.75fr)] lg:items-center">
            <div className="col-span-2 lg:col-span-1">
              <h3 className="m-0 font-display text-[1.25rem] leading-[1.25] font-semibold">{PROFILE.degree}</h3>
              <p className="m-0 mt-1 text-[0.9375rem] text-ink/65">{PROFILE.school}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="m-0 text-[0.9375rem] font-medium">{PROFILE.honors}</p>
                <Details title="Coursework and certifications" meta="Education">
                  <div className="flex flex-col gap-5">
                    <KeyFacts
                      rows={[
                        ["Degree", "B.S. Computer Science and Business Administration"],
                        ["Concentration", "Financial Technology"],
                        ["Graduating", PROFILE.graduation],
                      ]}
                    />
                    {Object.entries(PROFILE.coursework).map(([group, courses]) => (
                      <Block key={group} title={group}>
                        <Points items={courses} />
                      </Block>
                    ))}
                    <Block title="Certifications">
                      <Points items={PROFILE.certifications.split(", ")} />
                    </Block>
                  </div>
                </Details>
              </div>
            </div>
            {[
              ["GPA", PROFILE.gpa],
              ["Graduating", PROFILE.graduation],
            ].map(([k, v]) => (
              <dl key={k} className="m-0 bg-haze p-4">
                <dt className="font-mono text-[0.75rem] text-ink/65">{k}</dt>
                <dd className="m-0 mt-1 font-display text-[1.25rem] font-semibold whitespace-nowrap sm:text-[1.5rem]">{v}</dd>
              </dl>
            ))}
          </article>
        </Section>

        <Section id="toolkit" title="Toolkit" tone="bg-haze">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLKIT.map((g) => (
              <section key={g.label} className="border-2 border-ink bg-paper p-4" aria-label={g.label}>
                <h3 className="m-0 mb-3 font-mono text-[0.75rem] font-bold text-ink/65">{g.label}</h3>
                <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {g.items.map((t) => (
                    <ToolPill key={t} name={t} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Section>

        <Section id="work" title="Projects">
          <Rail label="Projects">
            {PROJECT_RAIL.map((p) => (
              <RailCard key={p.title}>
                <MiniCard
                  kind="Project"
                  date={p.period}
                  title={p.title}
                  org={p.org}
                  summary={p.summary}
                  links={
                    <>
                      {p.demo && (
                        <TextLink href={p.demo} name={p.title}>
                          Demo
                        </TextLink>
                      )}
                      {p.github && (
                        <TextLink href={p.github} name={p.title}>
                          Code
                        </TextLink>
                      )}
                    </>
                  }
                >
                  <Panel
                    org={p.org}
                    dates={p.period}
                    overview={p.overview}
                    highlights={p.highlights}
                    tools={[...list(p.stack), ...list(p.skills)]}
                    actions={<ProjectButtons p={p} />}
                  />
                </MiniCard>
              </RailCard>
            ))}
          </Rail>
        </Section>

        <Section id="research" title="Research" tone="bg-haze">
          <div className="flex flex-col gap-8">
            {RESEARCH.map((r, i) => (
              <article
                key={r.title}
                className="grid border-2 border-ink bg-paper shadow-hard lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
              >
                <div className="flex items-center border-b-2 border-ink bg-haze p-6 sm:p-8 lg:border-r-2 lg:border-b-0">
                  {i === 0 ? <AurocChart /> : <StudyMatrix />}
                </div>
                <div className="flex flex-col p-6 sm:p-8">
                  <p className="m-0 font-mono text-[0.75rem] text-ink/60">{r.period}</p>
                  <h3 className="m-0 mt-3 font-display text-[1.5rem] leading-[1.15] font-semibold">{r.title}</h3>
                  <p className="m-0 mt-2 text-[0.9375rem] text-ink/65">
                    {r.group}. Advised by {r.advisor}.
                  </p>
                  <Fact m={r.metric} />
                  <div className="mt-auto pt-6">
                    <Details title={r.title} meta="Research">
                      <Panel
                        org={r.group}
                        dates={r.period}
                        overview={r.summary}
                        highlights={r.work}
                        tools={list(r.stack)}
                      />
                    </Details>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <Rail label="Roles">
            {EXPERIENCE.map((j) => (
              <RailCard key={`${j.role}-${j.org}`}>
                <MiniCard kind="Experience" date={j.period} title={j.role} org={j.org} summary={j.points[0]}>
                  <Panel
                    org={j.context ? `${j.org}, ${j.context}` : j.org}
                    dates={j.period}
                    overview={j.overview}
                    highlights={j.points}
                    tools={list(j.stack)}
                  />
                </MiniCard>
              </RailCard>
            ))}
          </Rail>
        </Section>

        <Section
          id="interests"
          title="Interests"
          tone="bg-haze"
        >
          <Interests />
        </Section>

        <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t-2 border-ink bg-paper py-24 text-ink sm:py-28">
          <Contours className="absolute inset-0 size-full" />
          <Wrap className="pointer-events-none relative">
            <h2 className="m-0 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.03em]">
              Get in touch.
            </h2>
            <p className="m-0 mt-6 max-w-[36rem] text-[1.25rem] leading-[1.5] font-medium text-ink/80">
              I'm looking for co-op roles from {PROFILE.availability}. Email is the fastest way to
              reach me.
            </p>
            <div className="pointer-events-auto mt-9 flex flex-wrap gap-4">
              <Button href={EMAIL} tone="accent">
                {CONTACT[0].value}
              </Button>
              <Button href={link("LinkedIn")}>LinkedIn</Button>
              <Button href={link("GitHub")}>GitHub</Button>
            </div>
          </Wrap>
        </section>
      </main>

      <SiteFooter
        name={PROFILE.name}
        github={link("GitHub")}
        linkedin={link("LinkedIn")}
        email={EMAIL}
        resume={RESUME}
      />
    </>
  );
}

export default App;
