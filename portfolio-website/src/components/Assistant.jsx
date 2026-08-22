import { useState, useRef, useEffect, useCallback } from "react";
import { Minus, Plus, Maximize2, Minimize2, X, ExternalLink } from "lucide-react";

const INITIAL_SUGGESTIONS = [
  "What is your tech stack?",
  "What projects have you built?",
  "Tell me about your research",
  "When are you available?",
];

// Reading-size steps. The assistant can return a few dense sentences, so the
// smallest step stays legible rather than shrinking to a caption size.
const TEXT_STEPS = [
  { label: "Small", body: "text-[13px]", leading: "leading-relaxed" },
  { label: "Default", body: "text-sm", leading: "leading-relaxed" },
  { label: "Large", body: "text-base", leading: "leading-relaxed" },
  { label: "Largest", body: "text-lg", leading: "leading-relaxed" },
];
const DEFAULT_TEXT_STEP = 1;

// Panel footprints. `log` is the scrollable transcript height -- the main lever
// for how much of a long answer is visible without scrolling.
const PANEL_STEPS = [
  { label: "Compact", panel: "w-[300px] sm:w-[320px]", log: "h-44" },
  { label: "Regular", panel: "w-[330px] sm:w-[400px]", log: "h-64" },
  { label: "Expanded", panel: "w-[min(92vw,560px)]", log: "h-[46vh]" },
];
const DEFAULT_PANEL_STEP = 1;

const STORAGE_KEY = "assistant-view-prefs";

const readPrefs = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      text: Number.isInteger(parsed.text) ? parsed.text : DEFAULT_TEXT_STEP,
      panel: Number.isInteger(parsed.panel) ? parsed.panel : DEFAULT_PANEL_STEP,
    };
  } catch {
    return null;
  }
};

const clamp = (n, max) => Math.min(Math.max(n, 0), max);

// The model is instructed to return plain prose, but Gemini still slips in the
// occasional markdown token. Strip the common ones so the transcript never
// renders raw asterisks or heading marks as literal characters.
const stripMarkdown = (text) =>
  String(text)
    .replace(/```[a-z]*\n?/gi, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*\*([^*]+)\*\*\*/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|\s)\*([^*\n]+)\*(?=\s|[.,;:!?)]|$)/g, "$1$2")
    .replace(/(^|\s)_([^_\n]+)_(?=\s|[.,;:!?)]|$)/g, "$1$2")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const RESUME_PATTERN = /\b(resume|cv|curriculum vitae)\b/i;

export const Assistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I'm Shlok's portfolio assistant. Ask about his experience, research, projects, tech stack, availability, or how to reach him.",
    },
  ]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textStep, setTextStep] = useState(DEFAULT_TEXT_STEP);
  const [panelStep, setPanelStep] = useState(DEFAULT_PANEL_STEP);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Restore saved reading preferences on mount.
  useEffect(() => {
    const saved = readPrefs();
    if (!saved) return;
    setTextStep(clamp(saved.text, TEXT_STEPS.length - 1));
    setPanelStep(clamp(saved.panel, PANEL_STEPS.length - 1));
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ text: textStep, panel: panelStep })
      );
    } catch {
      // Storage unavailable (private mode, blocked site data) -- prefs simply
      // do not persist across reloads.
    }
  }, [textStep, panelStep]);

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

  // Keep the newest message in view. `block: "nearest"` scrolls the transcript
  // container only, instead of dragging the whole page to the panel.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading, panelStep, textStep]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSend = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setMessages((prev) => [...prev, { from: "user", text: trimmed }]);

      if (RESUME_PATTERN.test(trimmed)) {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "You can view Shlok's resume here. It opens in a new tab.",
            resumeLink: true,
          },
        ]);
        return;
      }

      setLoading(true);

      const newHistory = [...history, { role: "user", parts: [{ text: trimmed }] }];

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
              ? "I'm getting too many requests right now. Please wait a moment and try again."
              : "Sorry, I couldn't get a response. Please try again.";
          setMessages((prev) => [...prev, { from: "bot", text: msg }]);
          return;
        }

        const candidate = data.candidates?.[0];

        let reply;
        if (!candidate || candidate.finishReason === "SAFETY") {
          reply = "Let's keep this professional. I'm here for questions about Shlok's portfolio.";
        } else {
          const raw = candidate.content?.parts?.[0]?.text;
          reply = raw
            ? stripMarkdown(raw)
            : "Sorry, I couldn't get a response. Please try again.";
          if (raw) {
            setHistory([...newHistory, { role: "model", parts: [{ text: reply }] }]);
          }
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
    },
    [history, loading]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
    setInput("");
  };

  const text = TEXT_STEPS[textStep];
  const panel = PANEL_STEPS[panelStep];
  const atMinText = textStep === 0;
  const atMaxText = textStep === TEXT_STEPS.length - 1;
  const expanded = panelStep === PANEL_STEPS.length - 1;

  // Suggestions are only useful before the conversation starts; hiding them
  // afterwards returns that space to the transcript.
  const showSuggestions = messages.length === 1;

  const ctrlClass =
    "flex items-center justify-center h-7 w-7 rounded-lg border border-white/15 bg-white/5 text-neutral-300 transition hover:bg-white/15 hover:text-white disabled:opacity-35 disabled:hover:bg-white/5 disabled:hover:text-neutral-300 disabled:cursor-not-allowed cursor-pointer";

  return (
    <div id="assistant" className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-40">
      {open && (
        <div
          className={`${panel.panel} rounded-2xl border border-white/20 bg-neutral-900/80 backdrop-blur-xl shadow-2xl text-white transition-[width] duration-300`}
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight">Portfolio Assistant</p>
              <p className="text-xs text-neutral-400 leading-tight">Powered by Gemini</p>
            </div>

            <div className="ml-auto flex items-center gap-1.5">
              {/* Reading size */}
              <div
                className="flex items-center gap-1 pr-1.5 mr-0.5 border-r border-white/10"
                role="group"
                aria-label="Text size"
              >
                <button
                  type="button"
                  onClick={() => setTextStep((s) => clamp(s - 1, TEXT_STEPS.length - 1))}
                  disabled={atMinText}
                  aria-label="Decrease text size"
                  title={atMinText ? "Smallest text size" : "Decrease text size"}
                  className={ctrlClass}
                >
                  <Minus size={13} strokeWidth={2.4} />
                </button>
                <button
                  type="button"
                  onClick={() => setTextStep((s) => clamp(s + 1, TEXT_STEPS.length - 1))}
                  disabled={atMaxText}
                  aria-label="Increase text size"
                  title={atMaxText ? "Largest text size" : "Increase text size"}
                  className={ctrlClass}
                >
                  <Plus size={13} strokeWidth={2.4} />
                </button>
              </div>

              {/* Panel size */}
              <button
                type="button"
                onClick={() =>
                  setPanelStep((s) => (s === PANEL_STEPS.length - 1 ? 0 : s + 1))
                }
                aria-label={`Panel size: ${panel.label}. Click to resize.`}
                title={`Panel size: ${panel.label}`}
                className={ctrlClass}
              >
                {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                title="Close"
                className={ctrlClass}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="px-4 py-3 space-y-2">
            {showSuggestions && (
              <div className="flex flex-wrap gap-2">
                {INITIAL_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSend(s)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div
              className={`${panel.log} overflow-y-auto space-y-2 pr-1`}
              role="log"
              aria-live="polite"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`${text.body} ${text.leading} whitespace-pre-wrap ${
                    m.from === "bot"
                      ? "bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-neutral-100"
                      : "text-right px-1 text-blue-200"
                  }`}
                >
                  {m.text}
                  {m.resumeLink && (
                    <a
                      href="/Shlok_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-400/35 text-blue-200 hover:text-white hover:bg-blue-500/25 hover:border-blue-400/60 text-xs font-semibold transition no-underline select-none"
                    >
                      <ExternalLink size={13} />
                      View Resume (PDF)
                    </a>
                  )}
                </div>
              ))}
              {loading && (
                <div
                  className={`bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-neutral-400 ${text.body} animate-pulse`}
                >
                  Thinking...
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Shlok's work..."
                aria-label="Ask the portfolio assistant a question"
                disabled={loading}
                className="flex-1 min-w-0 rounded-xl bg-white/5 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:hover:bg-blue-500 disabled:cursor-not-allowed text-white text-sm font-semibold transition cursor-pointer"
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
