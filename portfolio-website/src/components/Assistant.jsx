import { useState, useRef, useEffect } from "react";

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
      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: newHistory }),
      });

    try {
      let res = await callAPI();

      // Auto-retry up to 2 times on 503 (server overload)
      for (let i = 0; i < 2 && res.status === 503; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        res = await callAPI();
      }

      const data = await res.json();

      if (!res.ok || data.error) {
        console.error("Assistant error:", res.status, JSON.stringify(data?.error ?? data));
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
                      href="/Shlok_Resume.pdf"
                      download="Shlok_Patel_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white text-xs font-semibold transition select-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
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
