import { useEffect, useState } from "react";

/* Light or dark. index.html sets data-theme on <html> before first paint;
   this keeps it in step afterwards. Until the visitor picks one the page
   follows their system setting, live; once they pick, the choice is saved
   and the system setting no longer moves it. */

const KEY = "theme";
const BAR = { light: "#ffffff", dark: "#0d1219" }; // browser chrome, matches --paper
const system = () => window.matchMedia("(prefers-color-scheme: dark)");

const saved = () => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
};

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const bar = document.querySelector('meta[name="theme-color"]');
  if (bar) bar.content = BAR[theme];
}

export function useTheme() {
  const [theme, setThemeState] = useState(
    () => document.documentElement.dataset.theme || (system().matches ? "dark" : "light"),
  );

  useEffect(() => {
    const mq = system();
    const onChange = () => {
      if (saved()) return;
      const next = mq.matches ? "dark" : "light";
      applyTheme(next);
      setThemeState(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = (next) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
    applyTheme(next);
    setThemeState(next);
  };

  return [theme, setTheme];
}
