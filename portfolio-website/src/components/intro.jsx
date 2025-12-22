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
      <div className="w-11/12 max-w-6xl">
        <div className="flex flex-wrap lg:items-center">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <div className="pb-2 text-4xl">
            <TextType
              text={["Hi, I am Shlok Patel"]}
              typingSpeed={75}
              showCursor={true}
              loop={false}
              cursorCharacter="|"
            />
            <div className="flex items-baseline gap-2 text-blue-500 text-shadow-white -ml-2">
              <RotatingText
                texts={["Software", "Quant", "AI/ML"]}
                mainClassName="px-1.5 sm:px-2 md:px-2 justify-center rounded-lg shadow-lg text-sm sm:text-base md:text-4xl"
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
          <p className="my-2 max-w-xl py-6 font-light tracking-tighter text-2xl">
          Passion for working with system designs, numbers, and innovating softwares to solve problems through creativity across the globe.   
          </p>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8 flex justify-center lg:justify-center lg:items-start lg:-mt-24 lg:-mr-20">
          <img
            src={headshotpic}
            alt="Shlok Patel"
            className="object-cover opacity-100"
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
