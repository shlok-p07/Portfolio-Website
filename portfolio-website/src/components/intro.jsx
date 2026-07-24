import TextType from "./text";
import BorderGlow from "./BorderGlow";
import headshotpic from "../assets/headshotpic.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CODE_SNIPPETS = [
  { top: "8%",  left: "2%",  text: "const sharpe = pnl / std(returns);", delay: "0s" },
  { top: "22%", left: "0%",  text: "agent.learn(total_timesteps=500_000)", delay: "0.4s" },
  { top: "38%", left: "1%",  text: "SELECT menu, votes FROM dining_hall", delay: "0.8s" },
  { top: "55%", left: "0%",  text: "await supabase.from('menus').select()", delay: "1.2s" },
  { top: "70%", left: "2%",  text: "docker build -t rainfall-ide .", delay: "1.6s" },
  { top: "84%", left: "1%",  text: "git push origin feature/crdt-sync", delay: "2.0s" },
  { top: "12%", right: "1%", text: "model = PPO('MlpPolicy', env)", delay: "0.2s" },
  { top: "27%", right: "0%", text: "prisma.page.create({ data: dto })", delay: "0.6s" },
  { top: "44%", right: "1%", text: "Y.Doc() // CRDT conflict-free sync", delay: "1.0s" },
  { top: "60%", right: "0%", text: "np.std(returns) * np.sqrt(252)", delay: "1.4s" },
  { top: "76%", right: "1%", text: "ScrollTrigger.create({ start: 'top 80%' })", delay: "1.8s" },
];

export const Intro = ({ ready = true }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0.85, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0.85, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0.85, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div id="main" ref={containerRef} className="text-blue-200 w-full py-12 flex items-center justify-center font-mono relative">

      {/* floating code snippets */}
      {CODE_SNIPPETS.map((s, i) => (
        <span
          key={i}
          className="absolute font-mono text-[10px] sm:text-[11px] text-blue-500/20 whitespace-nowrap pointer-events-none select-none hidden lg:block"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            animationDelay: s.delay,
            animation: `fadeInCode 1.2s ease-out ${s.delay} both`,
          }}
        >
          {s.text}
        </span>
      ))}

      <div className="w-full max-w-6xl px-1 sm:px-0 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Text side */}
          <div ref={textRef} className="flex flex-col gap-6 items-start text-left">
            <div className="pb-2 text-2xl sm:text-3xl lg:text-4xl leading-tight">
              {ready ? (
                <TextType
                  text={["Hi, I am Shlok Patel."]}
                  typingSpeed={75}
                  showCursor={true}
                  loop={false}
                  cursorCharacter="|"
                  hideCursorWhenDone={true}
                />
              ) : (
                <span className="invisible">Hi, I am Shlok Patel.</span>
              )}
              <div className="flex flex-wrap items-baseline justify-start gap-2 text-blue-500 text-shadow-white w-full">
               <p className="text-sm sm:text-sm lg:text-sm font-semibold tracking-wide">
                CS and FinTech Student at Northeastern University
                </p>
              </div>
            </div>

            <p className="max-w-2xl font-normal tracking-tight text-lg sm:text-xl leading-relaxed">
              Passion for working with system designs, numbers, and innovating software to solve problems through creativity across the globe.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm font-mono font-semibold transition-colors duration-200 no-underline"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 hover:border-blue-500/30 text-neutral-300 hover:text-white text-sm font-mono font-semibold transition-all duration-200 no-underline"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Image side */}
          <div className="w-full flex justify-center lg:justify-end lg:pl-6 items-center" ref={imageRef}>
            <BorderGlow
              borderRadius={9999}
              colors={["#3b82f6", "#6366f1", "#0ea5e9"]}
              glowColor="217 91 60"
              glowIntensity={0.9}
              glowRadius={30}
              className="w-72 sm:w-80 md:w-96 lg:w-104 max-w-full aspect-square rounded-full"
            >
              <div className="w-full h-full aspect-square rounded-full overflow-hidden ring-1 ring-white/10 outline-none select-none">
                <img
                  src={headshotpic}
                  alt="Shlok Patel"
                  className="block w-full h-full object-cover object-center scale-105 select-none focus:outline-none"
                />
              </div>
            </BorderGlow>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInCode {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
