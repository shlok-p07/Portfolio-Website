import { useEffect, useState } from "react";
import Terminal from "./components/Terminal";
import SimplePage from "./components/SimplePage";

const SIMPLE = "#simple";
const TERMINAL = "#terminal";

const prefersSimple = () =>
  window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

const initialMode = () => {
  const hash = window.location.hash;
  if (hash === SIMPLE) return "simple";
  if (hash === TERMINAL) return "terminal";
  return prefersSimple() ? "simple" : "terminal";
};

function App() {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      if (hash === SIMPLE) setMode("simple");
      else if (hash === TERMINAL) setMode("terminal");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (to) => {
    window.location.hash = to === "simple" ? SIMPLE : TERMINAL;
    setMode(to);
  };

  return mode === "simple" ? (
    <SimplePage onTerminal={() => go("terminal")} />
  ) : (
    <Terminal onSimple={() => go("simple")} />
  );
}

export default App;
