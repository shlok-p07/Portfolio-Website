import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiMongodb,
  SiFigma,
  SiPython,
  SiJavascript,
  SiNodedotjs,
  SiPytorch,
  SiScikitlearn,
  SiHtml5,
  SiGit,
  SiFlask,
  SiVite,
  SiDocker,
  SiExpress,
  SiJupyter,
} from "react-icons/si";
import BorderGlow from "./BorderGlow";
import SectionHeading from "./SectionHeading";

const MatlabIcon = () => (
  <img
    src="https://pemrogramanmatlab.com/wp-content/uploads/2023/07/pemrograman-matlab-adi-pamungkas-edited-1.jpg"
    alt="MATLAB"
    className="w-5 h-5 object-cover rounded-sm"
    style={{ filter: "grayscale(1) brightness(1.4)" }}
  />
);

const JavaIcon = () => (
  <img
    src="https://education.oracle.com/file/general/p-80-java.png"
    alt="Java"
    className="w-5 h-5 object-cover"
    style={{ filter: "grayscale(1) brightness(1.4)" }}
  />
);

const PostgreSqlIcon = () => (
  <img
    src="https://download.logo.wine/logo/PostgreSQL/PostgreSQL-Logo.wine.png"
    alt="PostgreSQL"
    className="w-5 h-5 object-cover"
    style={{ filter: "grayscale(1) brightness(1.4)" }}
  />
);

const SKILL_CATEGORIES = [
  {
    label: "Languages",
    skills: [
      { node: <SiPython />, title: "Python" },
      { node: <SiTypescript />, title: "TypeScript" },
      { node: <SiJavascript />, title: "JavaScript" },
      { node: <JavaIcon />, title: "Java" },
      { node: <SiHtml5 />, title: "HTML" },
      { node: <MatlabIcon />, title: "MATLAB" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      { node: <SiReact />, title: "React" },
      { node: <SiNextdotjs />, title: "Next.js" },
      { node: <SiNodedotjs />, title: "Node.js" },
      { node: <SiExpress />, title: "Express" },
      { node: <SiFlask />, title: "Flask" },
      { node: <SiTailwindcss />, title: "Tailwind CSS" },
      { node: <SiPytorch />, title: "PyTorch" },
      { node: <SiScikitlearn />, title: "Scikit-learn" },
    ],
  },
  {
    label: "Databases & Cloud",
    skills: [
      { node: <PostgreSqlIcon />, title: "PostgreSQL" },
      { node: <SiSupabase />, title: "Supabase" },
      { node: <SiMongodb />, title: "MongoDB" },
    ],
  },
  {
    label: "Developer Tools",
    skills: [
      { node: <SiGit />, title: "Git & GitHub" },
      { node: <SiDocker />, title: "Docker" },
      { node: <SiVite />, title: "Vite" },
      { node: <SiJupyter />, title: "Jupyter Notebook" },
      { node: <SiFigma />, title: "Figma" },
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const containerRef = useRef(null);
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="skills"
      ref={containerRef}
      className="relative w-full flex justify-center py-20 sm:py-28"
    >
      <div className="w-full max-w-6xl px-4 sm:px-6 flex flex-col gap-10 relative z-10">
        <SectionHeading>Tech Stack</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={cat.label} ref={(el) => { cardsRef.current[i] = el; }}>
              <BorderGlow
                borderRadius={16}
                colors={["#3b82f6", "#6366f1", "#0ea5e9"]}
                glowColor="217 91 60"
                glowIntensity={0.9}
                className="w-full h-full"
              >
                <div className="flex flex-col h-full bg-white/2 rounded-2xl border border-white/[0.07] px-6 sm:px-7 py-6 sm:py-7 gap-5">
                  <span className="font-mono text-[11px] text-blue-400 tracking-widest uppercase">
                    {cat.label}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span
                        key={s.title}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 text-sm font-mono"
                      >
                        <span className="text-base text-blue-100">{s.node}</span>
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
