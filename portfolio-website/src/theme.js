import { useState } from "react";

/* Light or dark. Every visit starts dark, whatever the system setting,
   until the visitor picks a theme with the toggle; that choice is saved
   and used from then on. index.html sets data-theme on <html> before
   first paint; this keeps it in step afterwards. */

const KEY = "theme";
const BAR = { light: "#ffffff", dark: "#0d1219" }; // browser chrome, matches --paper

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const bar = document.querySelector('meta[name="theme-color"]');
  if (bar) bar.content = BAR[theme];
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => document.documentElement.dataset.theme || "dark");

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
