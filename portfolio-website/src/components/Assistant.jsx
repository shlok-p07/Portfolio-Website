import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are a portfolio assistant for Shlok Patel. Your sole purpose is to answer questions about Shlok and his portfolio. If asked about anything unrelated, politely decline and redirect to portfolio topics.

About Shlok:
- Student at Northeastern University, Boston, MA
- B.S. in Computer Science and Business Administration (Financial Technology)
- GPA: 3.84/4.00 | Expected Graduation: May 2029
- U.S. Citizen
- Interests: Full Stack, Quantitative Finance, Data Science, Financial Modeling, Machine Learning, System Design
- Societies: Honors College, Disrupt (Northeastern Fintech Club), Student Government Association, NU ACES, NU Oasis
- Certifications: AKUNA Options 101, Bloomberg Market Concepts, Bloomberg Finance Fundamentals, Bloomberg Spreadsheet Analysis, CFI Financial Analysis and Modeling, AmplifyMe Finance Accelerator, Markets Quantitative Analysis (MQA)

Technical Skills:
- Languages: Python, Java, SQL, JavaScript, TypeScript, TailwindCSS, HTML, C++, MATLAB, Bloomberg Query Language (BQL)
- Libraries: Pandas, NumPy, SciPy, scikit-learn, PyTorch, yfinance, Matplotlib, Stable-Baselines3, TensorBoard
- Frameworks/Tools: React, Node.js, Next.js, Docker, Prisma, Git, MySQL, Figma, Supabase, Streamlit, DataGrip, Excel

Experience:
1. Software Engineer @ Rainfall Learning – Live Tutoring (Nov 2025 – Present, Boston, MA)
   - Leading core UI development with 15+ engineers for real-time collaborative coding platform
   - Implemented CRDT-based collaboration for a live coding IDE, reducing edit conflicts to 2%
   - Built scalable UI with React and TypeScript for up to 20% faster rendering
   - Dockerized builds, reducing environment failures by 15%

2. Teaching Assistant @ Rutgers University (Jun–Aug 2024 & Jun–Aug 2025, New Brunswick, NJ)
   - Coordinated logistics for 100+ camp participants using Excel
   - Contributed to 10% improvement in math scores over 6–8 week program

Personal Projects:
1. Derivative Hedging System via Reinforcement Learning (Dec 2025 – Present)
   - Designed an RL environment simulating hedging with 1,200+ SPY windows, greeks computation, and transaction cost modeling
   - Trained PPO (500K steps) and SAC (300K steps) agents; benchmarked against Black-Scholes delta across 4,000 episodes
   - Improved mean P&L from -0.162 to +0.064; increased Sharpe ratio by 3x relative to Black-Scholes delta hedging

2. Northeastern Dining (Sep–Dec 2025)
   - Led a team of 5+ developers to build a web app using React, TailwindCSS, and Node.js
   - Built REST API endpoints and integrated Supabase for real-time dining hall menu updates with live voting and authentication

Organization Projects (in progress):
- Rainfall Learning platform: real-time collaborative coding IDE with CRDT-based sync (via his Software Engineer role)
- Student Government Association website: resource hub for 5,000+ Northeastern students using TypeScript, React, and Next.js (via his SGA Software Engineer role)

Activities & Leadership:
1. Quantitative Analyst @ Disrupt – Northeastern Fintech Club (Jan 2026 – Present)
   - Developing quant trading strategies (pairs trading, mean reversion, momentum) using $50K simulated capital
   - Building Python backtesting pipelines across 10M+ historical equity data points

2. Software Engineer @ Student Government Association, Northeastern (Jan 2026 – Present)
   - Building a website for 5,000+ students using TypeScript, React, and Next.js
   - Engineering error handling for API endpoints with Prisma

3. Project-Series Mentor @ NU Oasis (Jan 2026 – Present)
   - Mentoring teams of 4+ on software solutions using JavaScript, React, Node.js, Next.js, and TypeScript

Contact & Availability:
- Email: patel.s15@northeastern.edu
- LinkedIn: linkedin.com/in/-shlokpatel
- GitHub: github.com/shlok-p07
- Contact form on the portfolio page
- Actively seeking co-op and internship opportunities in software engineering, quantitative finance, or data science
- Available for co-op: Spring 2027 and Spring 2028
- Available for internship: Summer 2027 and Summer 2028
- Resume available on request via email or the contact form on this page

Tone and formatting rules (strictly follow these):
- Write in a formal, polished, recruiter-facing tone — this assistant reflects Shlok's professionalism
- Responses should be concise (2-5 sentences), well-structured, and compelling
- Never use markdown (no **, *, #, -, or any symbols for formatting) — plain prose only
- Use precise, accurate language — never exaggerate or invent details not listed above
- When listing multiple items, write them as natural prose or a clean comma-separated list, not bullet points
- Never answer questions unrelated to Shlok's portfolio — politely redirect instead`;

const INITIAL_SUGGESTIONS = [
  "What is your tech stack?",
  "What projects have you built?",
  "How can I contact you?",
  "When are you available?",
];

export const Assistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm Shlok's AI portfolio assistant. Ask me anything about his projects, tech stack, experience, availability, or how to get in touch.",
    },
  ]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);

    const isResumeRequest = /resume|cv|curriculum vitae/i.test(trimmed);
    if (isResumeRequest) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Here is Shlok's resume — feel free to download it.",
          resumeLink: true,
        },
      ]);
      return;
    }

    setLoading(true);

    const newHistory = [
      ...history,
      { role: "user", parts: [{ text: trimmed }] },
    ];

    const callAPI = () =>
      fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: newHistory,
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            ],
          }),
        }
      );

    try {
      let res = await callAPI();

      // Auto-retry up to 2 times on 503 (server overload)
      for (let i = 0; i < 2 && res.status === 503; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        res = await callAPI();
      }

      const data = await res.json();

      if (!res.ok || data.error) {
        console.error("Gemini error:", res.status, JSON.stringify(data?.error ?? data));
        const msg =
          res.status === 429
            ? "I'm getting too many requests right now — please wait a moment and try again."
            : "Sorry, I couldn't get a response. Please try again.";
        setMessages((prev) => [...prev, { from: "bot", text: msg }]);
        setLoading(false);
        return;
      }

      const candidate = data.candidates?.[0];

      let reply;
      if (!candidate || candidate.finishReason === "SAFETY") {
        reply = "Let's keep it professional! I'm here to help with questions about Shlok's portfolio.";
      } else {
        reply =
          candidate.content?.parts?.[0]?.text ??
          "Sorry, I couldn't get a response. Please try again.";
        setHistory([...newHistory, { role: "model", parts: [{ text: reply }] }]);
      }
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
    setInput("");
  };

  return (
    <div id="assistant" className="fixed bottom-6 right-6 z-40">
      {open && (
        <div className="mt-3 w-[320px] sm:w-90 rounded-2xl border border-white/20 bg-neutral-900/80 backdrop-blur-xl shadow-2xl text-white">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Portfolio Assistant</p>
              <p className="text-xs text-neutral-300">Powered by Gemini</p>
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
              {INITIAL_SUGGESTIONS.map((s, idx) => (
                <button
                  key={`${s}-${idx}`}
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
                  {m.resumeLink && (
                    <a
                      href="/Shlok_Patel_Resume.pdf"
                      download
                      className="mt-2 flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold transition"
                    >
                      Download Resume
                    </a>
                  )}
                </div>
              ))}
              {loading && (
                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-neutral-400 text-sm animate-pulse">
                  Thinking...
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Shlok's work..."
                disabled={loading}
                className="flex-1 rounded-xl bg-white/5 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white text-sm font-semibold transition"
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
