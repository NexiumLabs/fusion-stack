import { Hono } from "hono"
import { cors } from "hono/cors"
import { RPCHandler } from "@orpc/server/fetch"
import { appRouter } from "./routers/index"

const handler = new RPCHandler(appRouter)

/**
 * API app with oRPC mounted — used by be:vite's Vite plugin and serve.ts.
 * Overrides the base be-vite/src/server/api.ts when the oRPC API layer is selected.
 */
export function createApiApp(): Hono {
  const app = new Hono().basePath("/api")

  app.use("*", cors())

  app.get("/health", (c) => c.json({ status: "ok" }))
  app.use("/orpc/*", async (c) => {
    const { matched, response } = await handler.handle(c.req.raw, {
      prefix: "/api/orpc",
      context: {},
    })
    return matched ? response! : c.notFound()
  })

  return app
}
