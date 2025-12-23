import TextType from "./text";
import RotatingText from "./textr";
import headshotpic from "../assets/headshotpic.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Intro = () => {
  const scrollIconRef = useRef(null);

  useEffect(() => {
    if (scrollIconRef.current) {
      gsap.to(scrollIconRef.current, {
        y: 15,
        duration: 0.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);
  return (
    <div id="main" className="text-blue-200 w-full min-h-[90vh] flex items-center justify-center font-mono">
      <div className="w-full max-w-6xl px-1 sm:px-0 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="flex flex-col gap-4 items-start text-left">
          <div className="pb-2 text-xl sm:text-2xl lg:text-4xl leading-tight">
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
                mainClassName="justify-start text-left rounded-lg shadow-lg text-3xl"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3200}
              />
              <span className="text-3xl">
                  Developer
              </span>
            </div>
          </div>
          <p className="my-2 max-w-2xl py-2 sm:py-4 font-light tracking-tight text-base sm:text-lg md:text-xl leading-relaxed">
          Passion for working with system designs, numbers, and innovating softwares to solve problems through creativity across the globe.   
          </p>
        </div>
        <div className="w-full flex justify-center lg:justify-end lg:pl-6">
          <img
            src={headshotpic}
            alt="Shlok Patel"
            className="object-cover opacity-100 w-60 sm:w-72 md:w-80 lg:w-[22rem] max-w-full rounded-3xl shadow-2xl shadow-black/40"
          />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <a href="#about">
          <div
            ref={scrollIconRef}
            className="text-orange-400 text-6xl cursor-pointer hover:text-blue-300 transition"
          >
            ↓
          </div>
        </a>
      </div>
      </div>
    </div>
  );
};
