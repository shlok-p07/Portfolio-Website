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
        opacity: 0.8,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate dome
    const dome = el.querySelector('[style*="perspective"]')?.closest('.bg-white');
    if (dome) {
      gsap.fromTo(
        dome,
        {
          opacity: 0.85,
          scale: 0.97,
          rotationY: 15,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: dome,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate text content
    const textContent = el.querySelector('.text-justify');
    if (textContent) {
      const paragraphs = textContent.querySelectorAll('p');
      gsap.fromTo(
        paragraphs,
        {
          opacity: 0.7,
          x: 15,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power1.out",
          scrollTrigger: {
            trigger: textContent,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <div
      id="about"
      ref={containerRef}
      className="relative w-full flex justify-center py-16 sm:py-20"
    >
      <div className="w-full px-4 sm:px-6 flex flex-col gap-8 sm:gap-10 relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center text-blue-500 font-extrabold tracking-wider">
          About Me
        </h1>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center">
          <div className="w-full lg:w-[40%] max-w-lg rounded-3xl p-3 backdrop-blur-sm bg-white/[0.02]">
            <div className="w-full aspect-video rounded-2xl overflow-hidden">
              <DomeGallery fit={0.32} minRadius={400} />
            </div>
          </div>
          <div className="w-full lg:w-[60%] text-blue-100 text-base sm:text-lg md:text-xl leading-relaxed space-y-4 text-justify">
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
