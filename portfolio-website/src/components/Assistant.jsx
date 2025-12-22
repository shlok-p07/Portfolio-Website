import { useMemo, useState, useRef, useEffect } from "react";

const FAQ = [
  {
    q: "What is your tech stack?",
    a: "Shlok builds production-grade systems with React, Next.js, Vite, and Tailwind, backed by robust TypeScript and JavaScript. He is fluent in Python and Node.js, with experience designing APIs using Express and Flask. On the data and ML side, he works with PyTorch, scikit-learn, and Jupyter to develop and evaluate models, and uses PostgreSQL and Supabase for reliable data storage. He ships with modern engineering practices using Git and Docker, and is comfortable moving between full-stack engineering, machine learning, and quantitative workflows.",
    keywords: ["stack", "tech", "technology", "skills", "frontend", "react", "javascript", "typescript", "tailwind", "gsap", "emailjs"],
  },
  {
    q: "Availability and location?",
    a: "Shlok is open to new opportunities and actively interviewing. He has experience collaborating effectively across time zones, thrives in async-first environments, and remains flexible in adapting to diverse team schedules and workflows.",
    keywords: ["availability", "available", "timezone", "time", "location", "remote", "onsite", "hybrid", "open", "interview"],
  },
  {
    q: "Top projects?",
    a: "Highlights: NU RATE-ON — real-time dining menus with Supabase/Postgres and React/Node; Rainfall Learning — an edtech platform with collaborative coding and modern React UI. Moreover, he is currently building ML/Quant related projects and once they are done; the portfolio will be updated.",
    keywords: ["project", "projects", "portfolio", "work", "rate-on", "rainfall", "edtech", "dining", "supabase", "postgres", "react", "node"],
  },
  {
    q: "How to contact you?",
    a: "You can reach Shlok via the contact form, LinkedIn, or GitHub on this page. He responds quickly to recruiter outreach. Also,his student email: patel.s15@northeastern.edu",
    keywords: ["contact", "reach", "email", "linkedin", "github", "form", "connect"],
  },
  {
    q: "Experience summary?",
    a: "Shlok is a software engineer with strong experience in TypeScript, Python, and modern JavaScript, building scalable, production-ready applications across the stack. He has delivered full-cycle projects involving API integrations, authentication, database design, and deployment, with an emphasis on performance, reliability, and clean system architecture. He has worked in fast-paced, startup-style teams, collaborating with 15+ contributors to ship real products. With interests in AI/ML, quantitative finance, and data-driven engineering, he brings a structured, analytical approach to problem-solving and focuses on writing maintainable code that scales beyond prototypes.",
    keywords: ["experience", "summary", "background", "ui", "frontend", "backend", "api", "database", "gsap"],
  },
];

const SUGGESTIONS = [
  "What is your tech stack?",
  "What projects have you built?",
  "How can I contact you?",
  "When are you available?",
];

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const scoreMatch = (messageTokens, entry) => {
  const keywordSet = new Set(entry.keywords);
  let score = 0;
  messageTokens.forEach((t) => {
    if (keywordSet.has(t)) score += 2;
  });
  return score;
};

export const Assistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! You're chatting with Shlok's portfolio assistant. Ask about his projects, tech stack, experience, availability, or how to contact him."
    },
  ]);
  const panelRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-assistant", onOpen);
    return () => window.removeEventListener("open-assistant", onOpen);
  }, []);

  const getSmallTalkResponse = (message) => {
    const m = message.toLowerCase();
    const tokens = tokenize(m);

    const has = (...words) => words.some((w) => m.includes(w) || tokens.includes(w));

    if (has("how are you", "how's it going", "hows it going", "how r u")) {
      return "He's doing well — thanks for asking! This assistant can help you explore Shlok's projects, skills, and availability. What would you like to know?";
    }
    if (has("hello", "hi", "hey", "yo", "good morning", "good evening", "good afternoon", "what's up", "whats up", "sup")) {
      return "Hey there! Great to meet you. I would be happy to share about his projects, tech stack, or experience. Any topic you want to start with?";
    }
    if (has("thank you", "thanks", "thx", "ty")) {
      return "You're welcome! If you're exploring next, his top projects and tech stack are a great place to start.";
    }
    if (has("cool", "awesome", "great", "nice", "amazing", "love it", "good job")) {
      return "Appreciate it! He focuses on simple, impactful builds. Want a quick tour of his highlights?";
    }
    return null;
  };

  const answerQuestion = (message) => {
    const smallTalk = getSmallTalkResponse(message);
    if (smallTalk) return smallTalk;

    const tokens = tokenize(message);
    let best = { score: 0, entry: null };
    FAQ.forEach((entry) => {
      const score = scoreMatch(tokens, entry);
      if (score > best.score) best = { score, entry };
    });
    if (best.entry && best.score > 1) return best.entry.a;
    return "Happy to chat! This assistant focuses on Shlok's work — try asking about his projects, tech stack, experience summary, availability, or contact options.";
  };

  const handleSend = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    const reply = answerQuestion(trimmed);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
    setInput("");
  };

  return (
    <div id="assistant" className="fixed bottom-6 right-6 z-40">
      {open && (
        <div
          ref={panelRef}
          className="mt-3 w-[320px] sm:w-90 rounded-2xl border border-white/20 bg-neutral-900/80 backdrop-blur-xl shadow-2xl text-white"
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Ask about this portfolio</p>
              <p className="text-xs text-neutral-300">Friendly and focused on his work.</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="text-neutral-300 hover:text-white text-lg cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="px-4 py-3 space-y-2">
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="h-52 overflow-y-auto space-y-2 pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`text-sm leading-snug ${
                    m.from === "bot"
                      ? "bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-neutral-100"
                      : "text-right px-1 text-blue-200"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Say hi or ask about projects, stack, contact..."
                className="flex-1 rounded-xl bg-white/5 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
