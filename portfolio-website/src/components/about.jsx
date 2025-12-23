import DomeGallery from "./dome";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 50,
      },
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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <div
      id="about"
      ref={containerRef}
      className="relative w-full flex justify-center py-16 sm:py-20 border-b border-neutral-800/40 bg-black/10"
    >
      <div className="w-full px-4 sm:px-6 flex flex-col gap-8 sm:gap-10 relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center text-blue-500 font-extrabold tracking-wider">
          About Me
        </h1>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-start">
          <div className="w-full lg:w-[55%] bg-white/5 rounded-3xl p-4 shadow-lg shadow-black/30">
            <div className="w-full aspect-[4/3] sm:aspect-[5/3] rounded-2xl overflow-hidden">
              <DomeGallery />
            </div>
            <p className="mt-3 text-sm text-blue-200 font-bold">
              Rotate around.
            </p>
          </div>
          <div className="w-full lg:w-[45%] text-blue-100 text-base sm:text-lg md:text-xl leading-relaxed space-y-4">
            <p>
              I am a student at Northeastern University’s Khoury College of
              Computer Sciences and D’Amore-McKim School of Business, pursuing a
              Bachelor of Science in Computer Science and Business
              Administration with a concentration in Financial Technology
              (FinTech). I am passionate about the intersection of technology,
              finance, and analytical problem-solving, with a strong interest in
              building scalable software, data-driven financial systems, and
              intelligent models. My goal is to develop innovative solutions
              that bridge business strategy with technical execution.
            </p>
            <p>
               Beyond my academic and professional interests, I enjoy playing chess, working with Adobe Creative Cloud (Illustrator and Photoshop), and exploring iconic cityscapes and skylines. These interests strengthen my strategic thinking, visual design skills, and global perspective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
