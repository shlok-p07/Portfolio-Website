import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stack from "./Stack";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";
import rateon from "../assets/rateon.png";
import rainfall from "../assets/rainfall.webp";
import project3 from "../assets/project3.png";
import sgacms from "../assets/sgacms.png";
gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const containerRef = useRef(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(coarse);

    gsap.fromTo(
      el,
      {
        opacity: 0.8,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          markers: false,
        },
      }
    );

    // Animate title
    const title = el.querySelector('h1');
    if (title) {
      gsap.fromTo(
        title,
        {
          opacity: 0.8,
          y: -15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate project card on scroll
    const projectCard = el.querySelector('.bg-white\\/5');
    if (projectCard) {
      gsap.fromTo(
        projectCard,
        {
          opacity: 0.85,
          scale: 0.99,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: projectCard,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "NU RATE-ON",
      description:
        "A full-stack web application that delivers real-time dining hall menus and student ratings to help students make faster, more informed dining decisions. The platform integrates directly with the university’s dining database via API, ensuring accurate and up-to-date menu information across all dining halls. The application features secure email–password authentication and an accessible, user-friendly interface designed with a welcoming aesthetic tailored to the Northeastern community. By allowing users to compare menus and popularity across dining locations, the product streamlines meal planning and enhances the overall campus dining experience.",
      tech: [
        "React",
        "Javascript",
        "Tailwind CSS",
        "Python",
        "Git",
        "Supabase",
        "Node.js",
        "PostgreSQL",
      ],
      image: rateon,
      github: "https://github.com/Oasis-NEU/f25-group-7?files=1",
    },
    {
      id: 2,
      title: "Rainfall Learning (EdTech Python Tutoring Platform)",
      description:
        "An startup project developing a web-based platform that makes Python education accessible to middle and high school students through affordable 1-on-1 tutoring at $40/hour. The platform’s main interface, which I am contributing to, is designed with an intuitive, student-friendly UI/UX, providing a seamless and engaging entry point to the platform. It features a custom web-based IDE with real-time collaborative coding (Yjs), integrated video chat, automated scheduling, progress tracking, and secure payment processing. Working alongside a 15+ person engineering team, I focus on usability, visual clarity, and interactive design to deliver a project-based, personalized learning experience that balances structured curriculum with hands-on coding practice, enabling students and families to engage with high-quality Python education in an approachable and effective way.",
      tech: [
        "Docker",
        "React",
        "PostgreSQL",
        "Git",
        "Github",
        "Express",
        "Tailwind CSS",
        "TypeScript",
        "Material UI",
        "Prisma",
      ],
      image: rainfall,
      github: "",
    },
    {
  id: 3,
  title: "RL Derivative Hedging Research Platform",
  description:
    "A full-stack research platform that trains PPO and SAC reinforcement learning agents to outperform classical Black-Scholes delta hedging on real SPY market data. The RL agents learn cost-aware, regime-adaptive hedge ratios across 1,200+ distinct 30-day windows drawn from 5 years of SPY history — including the 2020 COVID crash and 2022 rate shock. Performance is benchmarked across four scenarios (base, high transaction costs, volatility mismatch, and regime switching) using Sharpe ratio, 95% VaR/CVaR, and P&L distribution metrics. RL agents significantly outperform delta hedging in high-TC and vol-mismatch regimes by learning to rebalance only when the hedge benefit exceeds the cost — an emergent property requiring no explicit programming. The platform ships with a Streamlit research dashboard featuring live training, a frame-by-frame episode demo, scenario lab, and a live SPY options chain with implied volatility surface.",
  tech: [
    "Python",
    "Stable-Baselines3 (PPO, SAC)",
    "PyTorch",
    "Gymnasium",
    "Streamlit",
    "Plotly",
    "NumPy",
    "SciPy",
    "yfinance",
    "TensorBoard",
    "Git",
  ],
  image: project3,
  imageFit: "contain",
  github: "https://github.com/shlok-p07/Reinforcement-Learning---Derivative-Hedging",
},
    {
  id: 4,
  title: "SGA Website Internal CMS",
  description:
    "A full-stack content management system built for Northeastern's Student Government Association Webmaster Team, enabling non-technical staff to visually create, edit, and publish website content without touching source code. The platform features a drag-and-drop page editor powered by React Puck, a custom block library (containers, columns, grids, rich text, media), and a full versioning system where every save creates a new version and publishing is explicit — so drafts never accidentally go live. The data model maps documents to URL routes, allowing flexible multi-route publishing. Built with Next.js 16 Server Actions, Prisma, and a Supabase-managed PostgreSQL database, with S3-compatible media storage. A soft-delete archive system and role-based access protect against accidental data loss.",
  tech: [
    "Next.js",
    "TypeScript",
    "React",
    "Prisma",
    "PostgreSQL",
    "Supabase",
    "Tailwind CSS",
    "Puck Editor",
    "Vercel",
  ],
  image: sgacms,
  imageFit: "contain",
  github: "https://github.com/SGAOperations/website-development",
},
  ];

  const handlePrev = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const project = projects[currentProject];

  return (
      <div
        id="projects"
        ref={containerRef}
        className="relative w-full flex justify-center py-16 sm:py-20"
      >
        <div className="w-full px-4 sm:px-6 flex flex-col gap-14 items-center relative z-10 max-w-6xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center text-blue-500 font-extrabold tracking-wider">
            Projects
          </h1>

          <div className="w-full max-w-5xl flex flex-col gap-14 sm:gap-20">
            <div key={project.id} className="flex flex-col gap-6 items-center">
              <div
                onClick={handleNext}
                className={`w-full max-w-3xl aspect-[4/3] sm:aspect-[16/9] rounded-3xl transition-all duration-300 ${
                  isTouch ? "" : "hover:border-blue-500/30 cursor-pointer hover:scale-105"
                }`}
              >
                <Stack
                  randomRotation={false}
                  sensitivity={0}
                  sendToBackOnClick={false}
                  cards={[
                    <img
                      key={0}
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: project.imageFit || "cover",
                        objectPosition: "center",
                        borderRadius: "1.5rem",
                      }}
                    />,
                  ]}
                />
              </div>

              <p
                onClick={handleNext}
                className="text-sm text-neutral-500 hover:text-blue-400 transition-colors duration-200 cursor-pointer text-center max-w-3xl w-full"
              >
                Click to view next project
              </p>

              <div className="flex flex-col gap-4 pt-8">
                <h2 className="text-3xl font-bold text-white">
                  {project.title}
                </h2>
                <p className="text-neutral-300 leading-relaxed text-base sm:text-lg text-justify">
                  {project.description}
                </p>

                <div className="bg-neutral-900/60 border border-neutral-700/60 rounded-xl p-4 backdrop-blur">
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-xs font-medium hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900/80 border border-neutral-700/60 rounded-xl hover:bg-neutral-800/80 hover:border-blue-500/50 transition-all duration-200 text-neutral-300 hover:text-blue-400 font-medium no-underline"
                  >
                    <Github size={20} />
                    View on GitHub
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900/80 border border-neutral-700/60 rounded-xl text-neutral-400 font-medium cursor-not-allowed select-none no-underline">
                    <Github size={20} className="opacity-60" />
                    Ongoing Project
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
