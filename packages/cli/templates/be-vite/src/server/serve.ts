/**
 * Production server — serves both the Vite build (dist/) and the API.
 * Run after `pnpm build`:  pnpm serve
 */
import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"
import { createApiApp } from "./api"

const app = new Hono()

// Mount API routes
app.route("/", createApiApp())

// Serve static assets from the Vite build output
app.use("*", serveStatic({ root: "./dist" }))

// SPA fallback — serve index.html for all non-API, non-asset routes
app.get("*", serveStatic({ path: "index.html", root: "./dist" }))

const port = Number(process.env.PORT ?? 4173)

serve({ fetch: app.fetch, port }, () => {
  console.log(`Server running at http://localhost:${port}`)
})
