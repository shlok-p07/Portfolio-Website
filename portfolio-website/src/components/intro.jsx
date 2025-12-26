import TextType from "./text";
import RotatingText from "./textr";
import headshotpic from "../assets/headshotpic.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Intro = () => {
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
    <div id="main" ref={containerRef} className="text-blue-200 w-full py-12 flex items-center justify-center font-mono">
      <div className="w-full max-w-6xl px-1 sm:px-0 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div ref={textRef} className="flex flex-col gap-6 items-start text-left">
          <div className="pb-2 text-2xl sm:text-3xl lg:text-4xl leading-tight">
            <TextType
              text={["Hi, I am Shlok Patel"]}
              typingSpeed={75}
              showCursor={true}
              loop={false}
              cursorCharacter="|"
            />
            <div className="flex flex-wrap items-baseline justify-start gap-2 text-blue-500 text-shadow-white w-full">
              <RotatingText
                texts={["Software", "Quant", "AI/ML"]}
                mainClassName="justify-start text-left text-4xl"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3200}
              />
              <span className="text-4xl">
                  Developer
              </span>
            </div>
          </div>
          <p className="max-w-2xl font-normal tracking-tight text-lg sm:text-xl leading-relaxed">
          Passion for working with system designs, numbers, and innovating softwares to solve problems through creativity across the globe.   
          </p>
        </div>
        <div className="w-full flex justify-center lg:justify-end lg:pl-6">
          <img
            src={headshotpic}
            alt="Shlok Patel"
            ref={imageRef}
            className=" opacity-100 md:w-96 lg:w-[28rem] max-w-full rounded-3xl  "
          />
        </div>
      </div>
      </div>
    </div>
  );
};
