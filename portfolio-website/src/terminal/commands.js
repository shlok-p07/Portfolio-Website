import { PROJECTS, EXPERIENCE, RESEARCH, TOOLKIT, PROFILE, CONTACT } from "./content";

const para = (...lines) => ({ kind: "para", lines });
const defs = (items) => ({ kind: "defs", items });
const refs = (items) => ({ kind: "refs", items });
const links = (items) => ({ kind: "links", items: items.filter(Boolean) });

const select = (arg, list, noun) => {
  const given = (arg || "").trim();
  const i = Number(given);
  if (given && Number.isInteger(i) && i >= 1 && i <= list.length) {
    return { chosen: [list[i - 1]], index: i, single: true, warning: null };
  }
  return {
    chosen: list,
    index: null,
    single: false,
    warning: given
      ? `There is no ${noun} ${given}. Showing all ${list.length} \u2014 the numbers run 1 to ${list.length}.`
      : null,
  };
};

const ALL = ["about", "projects", "experience", "research", "skills", "contact", "resume"];

export const THEMES = ["one-dark", "dracula", "gruvbox", "nord", "solarized"];

export const SUMMARIES = {
  help: "list the available commands",
  about: "who I am",
  projects: "things I have built",
  experience: "roles I have held",
  research: "work in the Intelligent Automation group",
  skills: "languages, libraries and tooling",
  contact: "how to reach me",
  resume: "open my resume as a PDF",
  theme: "change the colour scheme",
  clear: "clear the screen",
};

export const COMMANDS = {
  help: {
    run: () => ({
      man: {
        name: "help — list the available commands",
        synopsis: [["help", ""]],
        description: [
          para(
            "Prints every command with a one-line summary. Each name below is a",
            "cross-reference: click it, or type it, to open its page."
          ),
        ],
        commands: defs(
          Object.keys(SUMMARIES).map((c) => [c, SUMMARIES[c], c])
        ),
        notes: [
          para(
            "Commands are always listed in the sidebar, so this page is a",
            "convenience rather than something you need to keep returning to."
          ),
        ],
        seeAlso: refs(["about", "projects", "contact"]),
      },
      next: ALL,
    }),
  },

  about: {
    run: () => ({
      man: {
        name: `about — ${SUMMARIES.about}`,
        synopsis: [["about", ""]],
        description: PROFILE.about.map((p) => para(p)),
        fields: defs([
          ["NAME", PROFILE.name],
          ["DEGREE", PROFILE.degree],
          ["SCHOOL", PROFILE.school],
          ["GPA", PROFILE.gpa],
          ["GRADUATION", PROFILE.graduation],
          ["AVAILABLE", PROFILE.availability],
          ["HONORS", PROFILE.honors],
          [
            "RESEARCH",
            `${RESEARCH[0].role} in the ${RESEARCH[0].group.split(",")[0]}, advised by ${RESEARCH[0].advisor} — ${RESEARCH.length} studies`,
            "research",
          ],
          ["SOCIETIES", PROFILE.societies],
          ["COURSEWORK", PROFILE.coursework],
          ["CERTIFICATIONS", PROFILE.certifications],
          ["LOCATION", PROFILE.location],
        ]),
        seeAlso: refs(["projects", "experience", "research", "contact"]),
      },
      next: ["projects", "experience", "contact"],
    }),
  },

  projects: {
    run: (arg) => {
      const { chosen, index: i, single, warning } = select(arg, PROJECTS, "project");

      return {
        man: {
          name: single
            ? `${chosen[0].title.toLowerCase().replace(/\s+/g, "-")} — project ${i} of ${PROJECTS.length}`
            : `projects — ${SUMMARIES.projects}`,
          synopsis: [["projects", "[n]"]],
          description: [
            warning && para(warning),
            para(
              single
                ? "Run projects with no argument to see all of them."
                : `All ${PROJECTS.length} projects in full. Pass a number to open just one.`
            ),
          ].filter(Boolean),
          entries: chosen.map((p, n) => ({
            heading: `${single ? i : n + 1}. ${p.title}`,
            sub: p.client ? `Client: ${p.client}${p.context ? ` — ${p.context}` : ""}` : null,
            meta: p.period ?? null,
            command: `projects ${single ? i : n + 1}`,
            paras: [p.description],
            fields: [
              p.stack && ["STACK", p.stack],
              p.skills && ["SKILLS", p.skills],
            ].filter(Boolean),
            links: [
              p.github && { label: "Source code", href: p.github },
              p.demo && { label: "Live demo", href: p.demo },
            ].filter(Boolean),
            note: p.note ?? (p.github ? null : "The repository for this project is private."),
          })),
          seeAlso: refs(["experience", "research", "skills", "contact"]),
        },
        next: single ? ["projects", "experience", "contact"] : ["experience", "research", "contact"],
      };
    },
  },

  experience: {
    run: (arg) => {
      const { chosen, index: i, single, warning } = select(arg, EXPERIENCE, "role");

      return {
        man: {
          name: single
            ? `${chosen[0].role.toLowerCase().replace(/\s+/g, "-")} — ${chosen[0].org}`
            : `experience — ${SUMMARIES.experience}`,
          synopsis: [["experience", "[n]"]],
          description: [
            warning && para(warning),
            para(
              single
                ? "Run experience with no argument to see every role."
                : `All ${EXPERIENCE.length} roles, most recent first. Pass a number to open just one.`
            ),
          ].filter(Boolean),
          entries: chosen.map((j, n) => ({
            heading: `${single ? i : n + 1}. ${j.role}`,
            sub: `${j.org}${j.context ? ` — ${j.context}` : ""}`,
            meta: `${j.period}   ${j.location}`,
            command: `experience ${single ? i : n + 1}`,
            bullets: j.points,
            fields: j.stack ? [["STACK", j.stack]] : [],
          })),
          seeAlso: refs(["projects", "research", "skills", "contact"]),
        },
        next: single ? ["experience", "projects", "contact"] : ["projects", "research", "contact"],
      };
    },
  },

  research: {
    run: (arg) => {
      const { chosen, index: i, single, warning } = select(arg, RESEARCH, "study");

      return {
        man: {
          name: single
            ? `${chosen[0].title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} — study ${i} of ${RESEARCH.length}`
            : `research — ${SUMMARIES.research}`,
          synopsis: [["research", "[n]"]],
          description: [
            warning && para(warning),
            para(
              single
                ? "Run research with no argument to see both studies."
                : "Both studies in full, each advised by Prof. Sarita Singh."
            ),
          ].filter(Boolean),
          entries: chosen.map((r, n) => ({
            heading: `${single ? i : n + 1}. ${r.title}`,
            sub: `${r.role}, ${r.group}`,
            meta: `Advised by ${r.advisor}   ${r.period}`,
            command: `research ${single ? i : n + 1}`,
            bullets: r.work,
            fields: [["STACK", r.stack]],
          })),
          seeAlso: refs(["projects", "experience", "skills", "contact"]),
        },
        next: single ? ["research", "projects", "contact"] : ["projects", "experience", "contact"],
      };
    },
  },

  skills: {
    run: () => ({
      man: {
        name: `skills — ${SUMMARIES.skills}`,
        synopsis: [["skills", ""]],
        description: [
          para("Grouped by what the tool is for rather than by vendor."),
        ],
        fields: defs(TOOLKIT.map((g) => [g.label.toUpperCase(), g.items.join(", ")])),
        seeAlso: refs(["projects", "experience", "research"]),
      },
      next: ["projects", "experience", "research"],
    }),
  },

  contact: {
    run: () => ({
      man: {
        name: `contact — ${SUMMARIES.contact}`,
        synopsis: [["contact", ""]],
        description: [para("Email is the surest way to reach me.")],
        links: links(CONTACT.map((c) => ({ label: `${c.label.padEnd(9)} ${c.value}`, href: c.href }))),
        seeAlso: refs(["about", "resume", "projects"]),
      },
      next: ["about", "resume", "projects"],
    }),
  },

  resume: {
    run: () => {
      const href = CONTACT.find((c) => c.label === "Resume").href;
      return {
        man: {
          name: `resume — ${SUMMARIES.resume}`,
          synopsis: [["resume", ""]],
          description: [para("Opening in a new tab.")],
          links: links([{ label: "Resume (PDF)", href }]),
          seeAlso: refs(["contact", "experience"]),
        },
        open: href,
        next: ["contact", "experience", "projects"],
      };
    },
  },

  theme: {
    run: (arg) => {
      const pick = (arg || "").trim().toLowerCase();
      if (THEMES.includes(pick)) {
        return {
          setTheme: pick,
          man: {
            name: `theme — switched to ${pick}`,
            synopsis: [["theme", "[name]"]],
            description: [para(`Now using ${pick}. The choice is remembered on this device.`)],
            options: defs(THEMES.map((n) => [n, n === pick ? "active" : "switch to this", `theme ${n}`])),
            seeAlso: refs(["help", "about"]),
          },
          next: THEMES.filter((n) => n !== pick).map((n) => `theme ${n}`),
        };
      }
      return {
        man: {
          name: `theme — ${SUMMARIES.theme}`,
          synopsis: [["theme", "[name]"]],
          description: [
            pick && para(`There is no theme called "${pick}". The five below are the choices.`),
            para(
              "Five palettes, each taken from a real editor theme. Every colour",
              "was checked for contrast against its own background, so all of",
              "them stay readable."
            ),
          ].filter(Boolean),
          options: defs(THEMES.map((n) => [n, "switch to this", `theme ${n}`])),
          seeAlso: refs(["help", "about"]),
        },
        next: THEMES.map((n) => `theme ${n}`),
      };
    },
  },

  clear: { run: () => ({ clear: true, next: ALL }) },
};

const ALIASES = {
  man: "help", ls: "help", dir: "help", "?": "help", commands: "help", menu: "help",
  start: "help", h: "help",
  me: "about", bio: "about", who: "about", whoami: "about", home: "about", info: "about",
  work: "projects", project: "projects", portfolio: "projects", built: "projects", p: "projects",
  jobs: "experience", job: "experience", exp: "experience", x: "experience",
  cv: "resume", download: "resume", r: "resume",
  email: "contact", reach: "contact", hire: "contact", c: "contact",
  stack: "skills", tech: "skills", tools: "skills", skill: "skills", s: "skills",
  cls: "clear", reset: "clear",
  colors: "theme", colours: "theme", themes: "theme", t: "theme",
};

export const GREETING = {
  man: {
    header: true,
    name: `${PROFILE.name.toLowerCase().replace(/\s+/g, "-")} — ${PROFILE.role}`,
    synopsis: [["<command>", "[n]"]],
    description: [
      para(PROFILE.intro),
      para(
        "This portfolio reads as a set of man pages. ",
      ),
    ],
    notes: [
      para(
        "Click a command, or type it. Inside a list, type its number.",
        "Arrow keys walk your history; Tab completes."
      ),
    ],
    seeAlso: refs(["about", "projects", "experience", "contact"]),
  },
  next: ALL,
};

export const SUGGESTIONS = ALL;
export const ALL_COMMANDS = Object.keys(SUMMARIES);

export function resolve(input) {
  const raw = input.trim().toLowerCase().replace(/[.!?,]+$/, "");
  if (!raw) return null;

  const wasMan = /^man(\s|$)/.test(raw);
  const demanned = raw.replace(/^man\s+/, "");
  if (wasMan && demanned === raw) return { name: "help", arg: "" }; // bare `man`

  const direct = wasMan ? demanned : ALIASES[demanned] ?? demanned;
  let [head, ...rest] = direct.split(/\s+/);
  let arg = rest.join(" ");
  if (!COMMANDS[head] && ALIASES[head]) {
    const [aliasHead, ...aliasRest] = ALIASES[head].split(/\s+/);
    head = aliasHead;
    arg = [...aliasRest, ...rest].join(" ").trim();
  }

  if (COMMANDS[head]) return { name: head, arg };
  if (/^\d+$/.test(raw)) return { name: "__number", arg: raw };

  if (wasMan) return { name: "__unknown", arg: demanned };

  const words = demanned.split(/[^a-z0-9.+#-]+/).filter(Boolean);
  const mentioned = Object.keys(COMMANDS).find((c) => words.includes(c));
  if (mentioned) return { name: mentioned, arg: "" };

  const aliased = Object.keys(ALIASES).find((a) => words.includes(a));
  if (aliased) {
    const [h, ...r] = ALIASES[aliased].split(/\s+/);
    return { name: h, arg: r.join(" ") };
  }

  return { name: "__unknown", arg: raw };
}

export function complete(input) {
  const raw = input.trim().toLowerCase();
  if (!raw) return null;
  const hit = ALL_COMMANDS.find((c) => c.startsWith(raw) && c !== raw);
  return hit ?? null;
}

export function unknown(input) {
  return {
    man: {
      name: `${input} — no manual entry`,
      synopsis: [["help", ""]],
      description: [
        para(
          `There is no page for "${input}". The commands below are everything`,
          "this portfolio knows."
        ),
      ],
      commands: defs(Object.keys(SUMMARIES).map((c) => [c, SUMMARIES[c], c])),
      seeAlso: refs(["help", "about", "projects"]),
    },
    error: true,
    next: SUGGESTIONS,
  };
}
