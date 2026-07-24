import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink } from "lucide-react";
import BorderGlow from "./BorderGlow";
import SectionHeading from "./SectionHeading";
import dining from "../assets/Dining.png";
import rainfall from "../assets/rainfall.webp";
import project3 from "../assets/project3.png";
import sgacms from "../assets/sgacms.png";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
   {
    index: "01",
    category: "EdTech · Platform",
    date: "Nov 2025",
    title: "Rainfall Learning",
    description:
      "Built a real-time collaborative coding platform with a 15-engineer team, engineering a CRDT-based (Yjs) live IDE that cut edit conflicts to under 2%. Containerized the React/TypeScript stack with Docker, reducing environment failures by 15% across local and production deployments.",
    tech: ["React", "TypeScript", "Docker", "PostgreSQL", "Prisma", "Express", "Tailwind CSS", "Material UI"],
    image: rainfall,
    imageFit: "cover",
    github: "https://github.com/Aryan0102/Rainfall-Learning",
  },
  {
    index: "02",
    category: "Full Stack · Web",
    date: "Sep 2025",
    title: "NU Dining",
    description:
      "Led 5 developers to ship a full-stack dining platform delivering live menus and student ratings at Northeastern. Built JWT-secured REST APIs on a PostgreSQL/Supabase backend that sustain sub-second responses under concurrent voting across multiple dining halls.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Python", "Supabase", "Node.js", "PostgreSQL"],
    image: dining,
    imageFit: "cover",
    github: "https://github.com/Oasis-NEU/f25-group-7?files=1",
    demo: "https://nu-dining.vercel.app/home",
  },
  {
    index: "03",
    category: "ML · Quantitative Finance",
    date: "Dec 2025",
    title: "RL Derivative Hedging",
    description:
      "Trained PPO and SAC agents to hedge SPY options across 1,200 market windows with full Greeks and transaction-cost modeling. Improved mean P&L from −0.162 to +0.064 and tripled the Sharpe ratio over the Black-Scholes delta-hedging baseline across 4,000 out-of-sample episodes.",
    tech: ["Python", "Stable-Baselines3", "PyTorch", "Streamlit", "NumPy", "SciPy", "yfinance", "TensorBoard"],
    image: project3,
    imageFit: "contain",
    github: "https://github.com/shlok-p07/Reinforcement-Learning---Derivative-Hedging",
    demo: "https://reinforcementlearning-terminal.streamlit.app/",
  },
  {
    index: "04",
    category: "Full Stack · CMS",
    date: "Jan 2026",
    title: "SGA Website CMS",
    description:
      "Engineered a production CMS serving 5,000+ students, letting non-technical staff publish pages via a drag-and-drop interface. Built on Next.js, TypeScript, and Prisma with full version history, role-based access control, and schema-validated APIs on every mutation.",
    tech: ["Next.js", "TypeScript", "React", "Prisma", "PostgreSQL", "Supabase", "Tailwind CSS"],
    image: sgacms,
    imageFit: "contain",
    github: "https://github.com/SGAOperations/website-development",
  },
];

export const Projects = () => {
  const timelineRef = useRef(null);
  const fillRef = useRef(null);
  const cardsRef = useRef([]);
  const nodesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reactive progress line — fills as the section scrolls through the viewport
      if (fillRef.current) {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 55%",
              end: "bottom 65%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Cards reveal + node activation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        const node = nodesRef.current[i];
        if (node) {
          gsap.fromTo(
            node,
            { scale: 0.4, opacity: 0.3 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, timelineRef);

    // Recompute trigger positions once images/fonts settle so the line stays in sync
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full flex justify-center py-20 sm:py-28"
    >
      <div className="w-full max-w-6xl px-4 sm:px-6 flex flex-col gap-12 sm:gap-16">

        <SectionHeading>Projects</SectionHeading>

        {/* Timeline */}
        <div ref={timelineRef} className="relative flex flex-col gap-14 sm:gap-20">

          {/* Spine + reactive fill */}
          <div className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-px bg-white/10 overflow-hidden rounded-full">
            <div
              ref={fillRef}
              className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-linear-to-b from-sky-400 via-indigo-500 to-blue-500"
            />
          </div>

          {PROJECTS.map((p, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative pl-14 md:pl-0"
              >
                {/* Node */}
                <span
                  ref={(el) => { nodesRef.current[i] = el; }}
                  className="absolute top-5 left-5 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
                >
                  <span className="absolute w-8 h-8 rounded-full bg-blue-500/15 animate-pulse" />
                  <span className="relative w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20 shadow-[0_0_14px_rgba(59,130,246,0.75)]" />
                </span>

                {/* Card column (alternates sides on desktop) */}
                <div className="md:grid md:grid-cols-2 md:items-start">
                  <div className={isLeft ? "md:col-start-1 md:pr-14" : "md:col-start-2 md:pl-14"}>
                    <BorderGlow
                      borderRadius={16}
                      colors={["#3b82f6", "#6366f1", "#0ea5e9"]}
                      glowColor="217 91 60"
                      glowIntensity={0.9}
                      className="w-full"
                    >
                      <div className="flex flex-col bg-white/2 rounded-2xl border border-white/[0.07] overflow-hidden">
                        {/* Image */}
                        <div className="h-44 sm:h-52 relative overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-center transition-transform duration-500 hover:scale-[1.04]"
                            style={{ objectFit: p.imageFit || "cover" }}
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
                          <span className="absolute top-2 right-4 text-6xl font-extrabold text-white/10 leading-none select-none pointer-events-none">
                            {p.index}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-3.5 px-5 sm:px-6 py-5 sm:py-6">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase">
                              {p.category}
                            </span>
                          </div>

                          <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                            {p.title}
                          </h2>

                          <p className="text-neutral-400 text-sm leading-relaxed">
                            {p.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {p.tech.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 text-xs font-mono rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-3 flex-wrap pt-1">
                            {p.github ? (
                              <a
                                href={p.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 w-fit px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-neutral-300 hover:text-white hover:border-blue-500/40 hover:bg-white/10 transition-all duration-200 no-underline"
                              >
                                <Github size={14} />
                                View on GitHub
                              </a>
                            ) : (
                              <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-neutral-500 cursor-not-allowed select-none">
                                <Github size={14} className="opacity-50" />
                                Ongoing Project
                              </div>
                            )}
                            {p.demo && (
                              <a
                                href={p.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 w-fit px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/25 text-sm font-mono text-blue-400 hover:text-blue-300 hover:border-blue-400/50 hover:bg-blue-500/15 transition-all duration-200 no-underline"
                              >
                                <ExternalLink size={14} />
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </BorderGlow>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Terminal node — the timeline line ends here */}
          <div className="relative h-4">
            <span className="absolute top-0 left-5 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
              <span className="absolute w-9 h-9 rounded-full bg-blue-500/10 animate-pulse" />
              <span className="relative w-4 h-4 rounded-full border-2 border-blue-400 bg-neutral-950 shadow-[0_0_16px_rgba(59,130,246,0.65)]" />
            </span>
          </div>
        </div>

        {/* Label sits below the timeline terminus, outside the line */}
        <p className="pl-14 md:pl-0 md:text-center font-mono text-sm sm:text-base text-blue-300 tracking-wide -mt-8 sm:-mt-10">
          More on the way!
        </p>

      </div>
    </section>
  );
};
