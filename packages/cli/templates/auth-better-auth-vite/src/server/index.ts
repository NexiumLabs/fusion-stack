import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { cors } from "hono/cors"
import { auth } from "../lib/auth"

const app = new Hono()

app.use("*", cors({ origin: "http://localhost:5173", credentials: true }))

// Mount Better Auth handler — handles all /api/auth/* routes
app.on(["GET", "POST"], "/api/auth/**", (c) => auth.handler(c.req.raw))

app.get("/api/health", (c) => c.json({ status: "ok" }))

serve({ fetch: app.fetch, port: 3001 }, () => {
  console.log("Server running on http://localhost:3001")
})
