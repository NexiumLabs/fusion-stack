import { Hono } from "hono"
import { cors } from "hono/cors"

/**
 * API application factory.
 * Mounted at /api by the Vite dev plugin and the production serve script.
 * API layer slices (tRPC, oRPC) override this file to add their handlers.
 */
export function createApiApp(): Hono {
  const app = new Hono().basePath("/api")

  app.use("*", cors())

  app.get("/health", (c) => c.json({ status: "ok" }))

  return app
}
