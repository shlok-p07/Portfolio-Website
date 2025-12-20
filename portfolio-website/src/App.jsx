import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Intro } from "./components/intro";
import { About } from "./components/about";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Navbar />
      <div className="w-full flex flex-col">
        <section className="w-full flex justify-center mt-40 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Intro />
        </section>
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <About />
        </div>
      </div>
    </>
  );
}

export default App;
