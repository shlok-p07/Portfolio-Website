import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import { Preloader } from "./components/Preloader";
import { Intro } from "./components/intro";
import { About } from "./components/about";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { Research } from "./components/research";
import { Contact } from "./components/contact";
import { Assistant } from "./components/Assistant";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = ["main", "about", "skills", "projects", "research", "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    let ticking = false;
    const updateHash = () => {
      ticking = false;
      const viewportCenter = window.innerHeight * 0.35;
      let bestId = null;
      let bestDistance = Infinity;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportCenter);
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (isVisible && distance < bestDistance) {
          bestDistance = distance;
          bestId = el.id;
        }
      });

      if (bestId && window.location.hash !== `#${bestId}`) {
        window.history.replaceState(null, "", `#${bestId}`);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateHash);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHash();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ["#about", "#skills", "#projects", "#research", "#contact"].forEach((id) => {
        gsap.fromTo(
          id,
          { opacity: 0, y: 52 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: id,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <Assistant />
      <div className="w-full flex flex-col relative z-10 min-h-screen px-4 sm:px-6 pb-4 sm:pb-6">
        <section id="main" className="w-full min-h-svh flex items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Intro ready={!loading} />
        </section>
        <div>
          <About />
          <Skills />
          <Projects/>
          <Research />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
