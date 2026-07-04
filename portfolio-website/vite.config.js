import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { generateReply } from './api/_gemini.js'

// Serves POST /api/chat during `npm run dev`, matching the Vercel function.
function devChatApi(env) {
  return {
    name: 'dev-chat-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: { message: 'Method not allowed' } }))
          return
        }
        const apiKey = env.GEMINI_API_KEY
        if (!apiKey) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: { message: 'GEMINI_API_KEY missing in .env.local' } }))
          return
        }
        let raw = ''
        for await (const chunk of req) raw += chunk
        let contents = []
        try {
          contents = JSON.parse(raw || '{}').contents || []
        } catch {
          res.statusCode = 400
          res.end(JSON.stringify({ error: { message: 'Invalid request body' } }))
          return
        }
        try {
          const { status, data } = await generateReply(contents, apiKey)
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        } catch {
          res.statusCode = 502
          res.end(JSON.stringify({ error: { message: 'Upstream request failed' } }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), devChatApi(env)],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
      },
    },
  }
})
