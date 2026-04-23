import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink } from "lucide-react";
import BorderGlow from "./BorderGlow";
import dining from "../assets/Dining.png";
import rainfall from "../assets/rainfall.webp";
import project3 from "../assets/project3.png";
import sgacms from "../assets/sgacms.png";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    index: "01",
    category: "Full Stack · Web",
    date: "Sep 2025",
    title: "NU Dining",
    description:
      "A full-stack web application delivering real-time dining hall menus and student ratings at Northeastern University. Built with a team of five developers using React, Node.js, and Supabase, the platform integrates live menu updates via a PostgreSQL backend, secure JWT-based authentication, and personalized calorie tracking with macro-level nutritional breakdowns. The REST API layer handles concurrent voting and menu synchronization across multiple dining locations, ensuring data consistency and sub-second response times under real student load.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Python", "Supabase", "Node.js", "PostgreSQL"],
    image: dining,
    imageFit: "cover",
    github: "https://github.com/Oasis-NEU/f25-group-7?files=1",
    demo: "https://nu-dining.vercel.app/home",
  },
  {
    index: "02",
    category: "ML · Quantitative Finance",
    date: "Dec 2025",
    title: "RL Derivative Hedging",
    description:
      "A research-grade reinforcement learning platform training PPO and SAC agents to hedge SPY options positions more effectively than classical Black-Scholes delta hedging. The environment models 1,200 historical market windows with full Greeks computation, transaction cost penalties, and regime-aware reward shaping. After 500,000 training steps on PPO and 300,000 on SAC, the agents achieved a mean P&L shift from negative 0.162 to positive 0.064 and a Sharpe ratio improvement of three times the Black-Scholes baseline, evaluated across 4,000 out-of-sample episodes.",
    tech: ["Python", "Stable-Baselines3", "PyTorch", "Streamlit", "NumPy", "SciPy", "yfinance", "TensorBoard"],
    image: project3,
    imageFit: "contain",
    github: "https://github.com/shlok-p07/Reinforcement-Learning---Derivative-Hedging",
    demo: "https://reinforcementlearning-terminal.streamlit.app/",
  },
  {
    index: "03",
    category: "Full Stack · CMS",
    date: "Jan 2026",
    title: "SGA Website CMS",
    description:
      "A production content management system built for Northeastern's Student Government Association, serving over 5,000 students. The platform enables non-technical staff to create, edit, and publish pages through a drag-and-drop interface without writing code. Built with Next.js, TypeScript, and Prisma on a Supabase-backed PostgreSQL database, it supports full version history with rollback, role-based access control across editor and admin tiers, soft-delete archiving, and Prisma-validated API endpoints that enforce schema integrity on every mutation.",
    tech: ["Next.js", "TypeScript", "React", "Prisma", "PostgreSQL", "Supabase", "Tailwind CSS"],
    image: sgacms,
    imageFit: "contain",
    github: "https://github.com/SGAOperations/website-development",
  },
  {
    index: "04",
    category: "EdTech · Platform",
    date: "Nov 2025",
    title: "Rainfall Learning",
    description:
      "A startup platform making Python education accessible to middle and high school students through affordable one-on-one tutoring. As part of a fifteen-engineer team, the platform features a real-time collaborative IDE powered by CRDT-based Yjs synchronization that reduces edit conflicts to under two percent, integrated video chat, automated session scheduling, and per-student progress tracking. The React and TypeScript frontend is containerized via Docker, cutting environment failures by fifteen percent and enabling consistent deployments across local and production environments.",
    tech: ["React", "TypeScript", "Docker", "PostgreSQL", "Prisma", "Express", "Tailwind CSS", "Material UI"],
    image: rainfall,
    imageFit: "cover",
    github: "",
  },
];


export const Projects = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
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
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full flex justify-center py-16 sm:py-20"
    >
      <div className="w-full max-w-6xl px-4 sm:px-6 flex flex-col gap-10">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center text-blue-500 font-extrabold tracking-wider">
          Projects
        </h1>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <BorderGlow
                borderRadius={16}
                colors={["#3b82f6", "#6366f1", "#0ea5e9"]}
                glowColor="217 91 60"
                glowIntensity={0.9}
                fillOpacity={0.35}
                className="w-full"
              >
                <div
                  className={`flex flex-col ${
                    i % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row"
                  } bg-white/2 rounded-2xl border border-white/[0.07] transition-colors duration-300 overflow-hidden`}
                >
                  {/* Image */}
                  <div className="sm:w-[45%] h-56 sm:h-auto relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-center transition-transform duration-500 hover:scale-[1.03]"
                      style={{ objectFit: p.imageFit || "cover" }}
                    />
                    <div
                      className={`absolute inset-0 bg-linear-to-r ${
                        i % 2 === 1
                          ? "from-neutral-950/60 to-transparent"
                          : "from-transparent to-neutral-950/60"
                      } hidden sm:block`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center gap-4 px-6 sm:px-8 py-6 sm:py-8">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase">
                        {p.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span className="font-mono text-[10px] text-neutral-600">
                        {p.date}
                      </span>
                    </div>

                    <div className="relative">
                      <span className="absolute -top-4 -left-1 text-8xl font-extrabold text-white/3 leading-none select-none pointer-events-none">
                        {p.index}
                      </span>
                      <h2 className="relative text-2xl sm:text-3xl font-bold text-white leading-tight">
                        {p.title}
                      </h2>
                    </div>

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

                    <div className="flex items-center gap-3 flex-wrap">
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
          ))}
        </div>


      </div>
    </section>
  );
};
