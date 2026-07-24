import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { User, Wrench, FolderGit2, FlaskConical, Mail, Sparkles } from "lucide-react";
import sp_logo from "../assets/sp_logo.png";

const navItems = [
  { name: "About Me", href: "#about", id: "about", Icon: User },
  { name: "Tech Stack", href: "#skills", id: "skills", Icon: Wrench },
  { name: "Projects", href: "#projects", id: "projects", Icon: FolderGit2 },
  { name: "Research", href: "#research", id: "research", Icon: FlaskConical },
  { name: "Contact Me", href: "#contact", id: "contact", Icon: Mail },
];

// Distance (px) from cursor at which magnification starts to fall off
const MAG_RANGE = 130;

const useResponsiveSizes = () => {
  const [sizes, setSizes] = useState({ base: 44, max: 78 });
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 640;
      setSizes(mobile ? { base: 38, max: 56 } : { base: 44, max: 78 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return sizes;
};

// Tracks which section is currently centered in the viewport
const useActiveSection = () => {
  const [active, setActive] = useState("main");
  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    let ticking = false;
    const update = () => {
      ticking = false;
      const center = window.innerHeight * 0.35;
      let best = null;
      let bestDist = Infinity;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const visible = rect.bottom > 0 && rect.top < window.innerHeight;
        const dist = Math.abs(rect.top - center);
        if (visible && dist < bestDist) {
          bestDist = dist;
          best = id;
        }
      });
      if (best) setActive(best);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
};

const DockTile = ({ mouseX, base, max, label, active, accent, onClick, href, children }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-MAG_RANGE, 0, MAG_RANGE], [base, max, base]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 170, damping: 14 });

  const content = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-2xl cursor-pointer border transition-colors duration-300 ${
        accent
          ? "bg-linear-to-br from-blue-500/40 to-indigo-500/30 border-blue-300/40 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
          : active
          ? "bg-white/20 border-white/30 text-white"
          : "bg-white/8 border-white/15 text-white/85 hover:bg-white/15"
      }`}
    >
      {children}

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10 shadow-lg"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Active indicator dot */}
      {active && !accent && (
        <motion.span
          layoutId="dock-active-dot"
          className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-blue-400"
        />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} aria-label={label} className="flex items-end">
        {content}
      </a>
    );
  }
  return (
    <button type="button" aria-label={label} className="flex items-end">
      {content}
    </button>
  );
};

export const Navbar = () => {
  const mouseX = useMotionValue(Infinity);
  const { base, max } = useResponsiveSizes();
  const active = useActiveSection();

  const handleAssistant = () => {
    window.dispatchEvent(new Event("open-assistant"));
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex justify-center px-3">
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 sm:gap-3 rounded-[26px] border border-white/15 bg-white/6 px-3 sm:px-4 py-2.5 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
      >
        {/* Logo tile */}
        <DockTile
          mouseX={mouseX}
          base={base}
          max={max}
          label="Shlok Patel"
          href="#main"
          active={false}
        >
          <img
            src={sp_logo}
            alt="sp_logo"
            className="h-1/2 w-1/2 object-contain"
            draggable={false}
          />
        </DockTile>

        <span className="mx-0.5 h-8 w-px self-center bg-white/15" />

        {/* Nav tiles */}
        {navItems.map(({ name, href, id, Icon }) => (
          <DockTile
            key={id}
            mouseX={mouseX}
            base={base}
            max={max}
            label={name}
            href={href}
            active={active === id}
          >
            <Icon className="h-1/2 w-1/2" strokeWidth={1.8} />
          </DockTile>
        ))}

        <span className="mx-0.5 h-8 w-px self-center bg-white/15" />

        {/* AI Assistant tile */}
        <DockTile
          mouseX={mouseX}
          base={base}
          max={max}
          label="AI Assistant"
          onClick={handleAssistant}
          accent
          active={false}
        >
          <Sparkles className="h-1/2 w-1/2" strokeWidth={1.8} />
        </DockTile>
      </motion.nav>
    </div>
  );
};
