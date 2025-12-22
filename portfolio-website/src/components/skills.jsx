import LogoLoop from "./LogoLoop";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiPython,
  SiJavascript,
  SiNodedotjs,
  SiPytorch,
  SiScikitlearn,
  SiHtml5,
  SiPostgresql,
  SiGit,
  SiFlask,
  SiVite,
  SiDocker,
  SiExpress,
  SiJupyter,
} from "react-icons/si";

const MatlabIcon = () => (
  <img
    src="https://pemrogramanmatlab.com/wp-content/uploads/2023/07/pemrograman-matlab-adi-pamungkas-edited-1.jpg"
    alt="MATLAB"
    className="w-8 h-8 object-cover rounded"
    style={{ filter: "grayscale(1) brightness(0.95)" }}
  />
);

const JavaIcon = () => (
  <img
    src="https://education.oracle.com/file/general/p-80-java.png"
    alt="Java"
    className="w-8 h-8 object-cover"
    style={{ filter: "grayscale(1) brightness(0.95)" }}
  />
);

const PostgreSqlIcon = () => (
  <img
    src="https://download.logo.wine/logo/PostgreSQL/PostgreSQL-Logo.wine.png"
    alt="PostgreSQL"
    className="w-8 h-8 object-cover"
    style={{ filter: "grayscale(1) brightness(0.95)" }}
  />
);

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com/" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org/" },
  {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://devdocs.io/javascript/",
  },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org/en" },
  { node: <SiPytorch />, title: "Pytorch", href: "https://pytorch.org/" },
  {
    node: <SiScikitlearn />,
    title: "Scikit-learn",
    href: "https://www.python.org/",
  },
  { node: <SiHtml5 />, title: "HTML", href: "https://html.com/" },
  {
    node: <PostgreSqlIcon />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
  },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com/" },
  {
    node: <MatlabIcon />,
    title: "MATLAB",
    href: "https://www.mathworks.com/products/matlab.html",
  },
  { node: <JavaIcon />, title: "Java", href: "https://www.java.com/" },
  {
    node: <SiFlask />,
    title: "Flask",
    href: "https://pypi.org/project/Flask/",
  },
  {
    node: <SiVite />,
    title: "Vite",
    href: "https://vite.dev/",
  },
  {
    node: <SiDocker />,
    title: "Docker",
    href: "https://www.docker.com/solutions/docker-ai/",
  },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
  },
  {
    node: <SiExpress />,
    title: "Express",
    href: "https://expressjs.com/",
  },
  {
    node: <SiJupyter />,
    title: "Jupyter Notebook",
    href: "https://jupyter.org/",
  },
];

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 50%",
          scrub: 0.5,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      id="skills"
      ref={containerRef}
      className="relative w-full flex justify-center py-20 border-b border-neutral-800/40 bg-black/10"
    >
      <div className="w-full px-6 flex flex-col gap-10 items-center relative z-10">
        <h1 className="text-6xl text-center text-blue-500 font-extrabold tracking-wider">
          Skills
        </h1>
        <div className="w-full">
          <LogoLoop
            logos={techLogos}
            speed={140}
            gap={36}
            logoHeight={44}
            pauseOnHover
            ariaLabel="Technology stack logos"
            renderItem={(item) => (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-blue-100 text-lg shadow-sm shadow-black/30">
                <span className="text-3xl">{item.node}</span>
                <span className="font-semibold">{item.title}</span>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
