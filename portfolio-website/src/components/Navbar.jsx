import sp_logo from "../assets/sp_logo.png";
const navItems = [
  {
    name: "Home",
    href: "#main",
  },
  {
    name: "About Me",
    href: "#about",
  },
  {
    name: "Skills",
    href: "#skills",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Contact Me",
    href: "#contact",
  },
];

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full py-3 backdrop-blur-xl bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <div className="w-full px-6 relative text-sm flex items-center gap-4">
        <a href="#main" className="flex items-center shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300">
          <img className="h-15s w-15 mr-2" src={sp_logo} alt="sp_logo" />
        </a>
        <div className="flex-1 flex justify-center">
          <ul className="hidden lg:flex space-x-12">
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
            className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white border border-white/30 backdrop-blur-md hover:bg-white/30 transition"
          >
            AI Assistant
          </a>
        </div>
      </div>
    </nav>
  );
};
