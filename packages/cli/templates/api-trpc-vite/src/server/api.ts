import { Hono } from "hono"
import { cors } from "hono/cors"
import { trpcHonoHandler } from "./trpc-hono"

/**
 * API app with tRPC mounted — used by be:vite's Vite plugin and serve.ts.
 * Overrides the base be-vite/src/server/api.ts when the tRPC API layer is selected.
 */
export function createApiApp(): Hono {
  const app = new Hono().basePath("/api")

  app.use("*", cors())

  app.get("/health", (c) => c.json({ status: "ok" }))
  app.use("/trpc/*", trpcHonoHandler)

  return app
}
