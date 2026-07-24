import { useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaFilePdf, FaEnvelope } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "./BorderGlow";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  {
    label: "Email Me",
    value: "patel.s15@northeastern.edu",
    href: "mailto:patel.s15@northeastern.edu",
    Icon: FaEnvelope,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "@-shlokpatel",
    href: "https://www.linkedin.com/in/-shlokpatel",
    Icon: FaLinkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "@shlok-p07",
    href: "https://github.com/shlok-p07",
    Icon: FaGithub,
    external: true,
  },
  {
    label: "Resume",
    href: "/Shlok_Resume.pdf",
    Icon: FaFilePdf,
    external: true,
  },
];

export const Contact = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = containerRef.current?.querySelector("h1");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0.8, y: -15 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
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
      id="contact"
      ref={containerRef}
      className="relative w-full flex justify-center py-20 sm:py-28"
    >
      <div className="w-full max-w-6xl px-4 sm:px-6 flex flex-col gap-8 sm:gap-12 items-center relative z-10">

        <SectionHeading>Let's Connect</SectionHeading>

        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-5">
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              aria-label={l.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="no-underline group block h-full"
            >
              <BorderGlow
                borderRadius={16}
                colors={["#3b82f6", "#6366f1", "#0ea5e9"]}
                glowColor="217 91 60"
                glowIntensity={0.9}
                className="w-full h-full"
              >
                <div className="flex items-center gap-4 bg-white/2 rounded-2xl border border-white/[0.07] px-5 sm:px-6 py-5 h-full transition-colors duration-300 group-hover:border-blue-500/30">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors duration-300">
                    <l.Icon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-white font-semibold text-lg leading-tight">
                      {l.label}
                    </span>
                    <span className="text-neutral-400 text-sm truncate">
                      {l.value}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="ml-auto shrink-0 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>
              </BorderGlow>
            </a>
          ))}
        </div>

        <p className="text-neutral-600 text-xs sm:text-sm text-center">
          © 2026 Shlok Patel. All rights reserved.
        </p>

      </div>
    </div>
  );
};
