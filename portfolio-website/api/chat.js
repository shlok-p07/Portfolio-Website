import { generateReply } from "./_gemini.js";

// --- Abuse limits -----------------------------------------------------------
// Two sliding windows per client: a short one to stop bursts, a longer one to
// stop sustained draining. The per-instance cap is a backstop for traffic
// spread across many IPs.
//
// NOTE: this state lives in the serverless instance's memory, so it is
// per-instance and resets on cold start. That makes it a real deterrent against
// a single client hammering the endpoint, but not a distributed-abuse defence.
// The request-shape caps below are enforced unconditionally and are what
// actually bound the cost of any individual call. If this ever needs hard
// global limits, move the counters to a shared store (Upstash/Redis).
const LIMITS = {
  burst: { windowMs: 60_000, max: 8 },
  sustained: { windowMs: 15 * 60_000, max: 40 },
  instance: { windowMs: 60_000, max: 120 },
};

// Request-shape caps: bound what one accepted call can cost.
const MAX_TURNS = 30;
const MAX_CHARS_PER_PART = 2_000;
const MAX_CHARS_TOTAL = 12_000;

const hits = new Map(); // ip -> number[] (request timestamps, ascending)
let instanceHits = [];

const PRUNE_AFTER = LIMITS.sustained.windowMs;
const MAX_TRACKED_IPS = 5_000;

const withinWindow = (times, now, windowMs) => {
  let i = 0;
  while (i < times.length && now - times[i] > windowMs) i++;
  return i > 0 ? times.slice(i) : times;
};

// Drop IPs with no activity inside the longest window so the Map cannot grow
// without bound on a long-lived warm instance.
const prune = (now) => {
  for (const [ip, times] of hits) {
    const live = withinWindow(times, now, PRUNE_AFTER);
    if (live.length === 0) hits.delete(ip);
    else if (live.length !== times.length) hits.set(ip, live);
  }
};

const clientIp = (req) => {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  if (Array.isArray(fwd) && fwd.length) return String(fwd[0]).trim();
  return req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
};

// Returns null when allowed, or the seconds to wait when limited.
const rateLimit = (ip, now) => {
  instanceHits = withinWindow(instanceHits, now, LIMITS.instance.windowMs);
  if (instanceHits.length >= LIMITS.instance.max) {
    return Math.ceil((LIMITS.instance.windowMs - (now - instanceHits[0])) / 1000);
  }

  if (hits.size > MAX_TRACKED_IPS) prune(now);

  const times = withinWindow(hits.get(ip) ?? [], now, LIMITS.sustained.windowMs);

  const burst = withinWindow(times, now, LIMITS.burst.windowMs);
  if (burst.length >= LIMITS.burst.max) {
    hits.set(ip, times);
    return Math.ceil((LIMITS.burst.windowMs - (now - burst[0])) / 1000);
  }
  if (times.length >= LIMITS.sustained.max) {
    hits.set(ip, times);
    return Math.ceil((LIMITS.sustained.windowMs - (now - times[0])) / 1000);
  }

  times.push(now);
  hits.set(ip, times);
  instanceHits.push(now);
  return null;
};

// Accepts only the shape the Gemini call needs, and rejects anything oversized
// before it reaches the upstream API.
const validateContents = (contents) => {
  if (!Array.isArray(contents)) return "Invalid request body";
  if (contents.length === 0) return "No message provided";
  if (contents.length > MAX_TURNS) return "Conversation is too long";

  let total = 0;
  for (const turn of contents) {
    if (!turn || typeof turn !== "object") return "Invalid message format";
    if (turn.role !== "user" && turn.role !== "model") return "Invalid message role";
    if (!Array.isArray(turn.parts) || turn.parts.length === 0) return "Invalid message format";
    for (const part of turn.parts) {
      const text = part?.text;
      if (typeof text !== "string") return "Invalid message format";
      if (text.length > MAX_CHARS_PER_PART) return "Message is too long";
      total += text.length;
    }
  }
  if (total > MAX_CHARS_TOTAL) return "Conversation is too long";
  return null;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: { message: "Method not allowed" } });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in the server environment.");
    res.status(500).json({ error: { message: "Assistant is not configured on the server." } });
    return;
  }

  const retryAfter = rateLimit(clientIp(req), Date.now());
  if (retryAfter !== null) {
    res.setHeader("Retry-After", String(retryAfter));
    res.status(429).json({
      error: { message: "Too many requests. Please wait a moment and try again." },
    });
    return;
  }

  let contents = [];
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    contents = body.contents;
  } catch {
    res.status(400).json({ error: { message: "Invalid request body" } });
    return;
  }

  const invalid = validateContents(contents);
  if (invalid) {
    res.status(400).json({ error: { message: invalid } });
    return;
  }

  try {
    const { status, data } = await generateReply(contents, apiKey);
    res.status(status).json(data);
  } catch (err) {
    console.error("Gemini proxy error:", err);
    res.status(502).json({ error: { message: "Upstream request failed" } });
  }
}

// Exported for tests only.
export const __test = { rateLimit, validateContents, LIMITS, hits };
