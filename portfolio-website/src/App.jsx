import { useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Intro } from "./components/intro";
import { About } from "./components/about";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { Contact } from "./components/contact";
import { Assistant } from "./components/Assistant";

function App() {
  useEffect(() => {
    const ids = ["main", "about", "skills", "projects", "contact"];
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

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Navbar />
      <Assistant />
      <div className="w-full flex flex-col relative z-10 min-h-screen px-4 sm:px-6">
        <section id="main" className="w-full flex justify-center mt-24 sm:mt-32 lg:mt-40 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Intro />
        </section>
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <About />
          <Skills />
          <Projects/>
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
