import { useEffect, useState } from "react";
import sp_logo from "../assets/sp_logo.png";

const navItems = [
  { name: "Home", href: "#main" },
  { name: "About Me", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact Me", href: "#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const handleAssistant = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event("open-assistant"));
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full py-3 backdrop-blur-xl bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
      <div className="w-full px-4 sm:px-6 relative text-sm flex items-center gap-4">
        <a
          href="#main"
          className="flex items-center shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => setOpen(false)}
        >
          <img className="h-12 w-12 object-contain mr-2" src={sp_logo} alt="sp_logo" />
        </a>

        <div className="flex-1 flex justify-center">
          <ul className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  className="text-white text-lg hover:text-blue-400 transition"
                  href={item.href}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex">
          <a
            href="#assistant"
            onClick={handleAssistant}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white border border-white/20 backdrop-blur-md hover:bg-white/25 transition"
          >
            AI Assistant
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white p-2 hover:bg-white/20 transition"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-4 sm:px-6 pt-3 pb-4">
          <div className="rounded-2xl border border-white/15 bg-black/70 backdrop-blur-xl shadow-2xl">
            <ul className="flex flex-col divide-y divide-white/10">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-white text-base hover:text-blue-300 transition"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-4 py-3">
              <button
                className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white border border-white/20 hover:bg-white/25 transition"
                onClick={handleAssistant}
              >
                AI Assistant
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
