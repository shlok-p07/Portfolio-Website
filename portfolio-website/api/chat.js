import { generateReply } from "./_gemini.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: { message: "Method not allowed" } });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in the server environment.");
    res.status(500).json({ error: { message: "Assistant is not configured on the server." } });
    return;
  }

  let contents = [];
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    contents = Array.isArray(body.contents) ? body.contents : [];
  } catch {
    res.status(400).json({ error: { message: "Invalid request body" } });
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
