import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stack from "./Stack";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";
import rateon from "../assets/rateon.png";
import rainfall from "../assets/rainfall.webp";

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const containerRef = useRef(null);
  const [currentProject, setCurrentProject] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      }
    );

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
        className="relative w-full flex justify-center py-16 sm:py-20 border-b border-neutral-800/40 bg-black/10"
      >
        <div className="w-full px-4 sm:px-6 flex flex-col gap-14 items-center relative z-10 max-w-6xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center text-blue-500 font-extrabold tracking-wider">
            Projects
          </h1>

          <div className="w-full max-w-5xl flex flex-col gap-14 sm:gap-20">
            {/* Project Card */}
            <div key={project.id} className="flex flex-col gap-6">
              {/* Stack Container - Clickable */}
              <div
                onClick={handleNext}
                className="w-full max-w-3xl aspect-[4/3] sm:aspect-[16/9] rounded-3xl hover:border-blue-500/30 transition-all duration-300 shadow-xl mx-auto cursor-pointer hover:shadow-2xl hover:scale-105"
              >
                <Stack
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={true}
                  cards={[
                    <img
                      key={0}
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "1.5rem",
                      }}
                    />,
                  ]}
                />
              </div>

              <div className="text-center">
                <p 
                  onClick={handleNext}
                  className="text-sm text-neutral-500 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                >
                  Click to view next project
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-8">
                <h2 className="text-3xl font-bold text-white">
                  {project.title}
                </h2>
                <p className="text-neutral-300 leading-relaxed text-base sm:text-lg">
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
