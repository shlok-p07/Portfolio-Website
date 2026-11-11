/* The logo links back to the opening section. The opening section has no
   hash of its own, so instead of following "#top" the link scrolls to the
   top and clears the hash from the address bar. Without script the link
   still works as a plain link to the page. */
export function scrollToTop(e) {
  e.preventDefault();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  history.replaceState(null, "", location.pathname + location.search);
}
