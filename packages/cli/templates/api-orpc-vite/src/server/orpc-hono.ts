/**
 * oRPC adapter for Hono.
 * Import this in src/server/index.ts and mount it:
 *
 *   import { orpcHonoHandler } from "./orpc-hono"
 *   app.use("/api/orpc/*", orpcHonoHandler)
 */
import { RPCHandler } from "@orpc/server/fetch"
import { appRouter } from "./routers/index"

const handler = new RPCHandler(appRouter)

export async function orpcHonoHandler(c: { req: { raw: Request } }) {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/api/orpc",
    context: {},
  })
  if (matched) return response
  return new Response("Not found", { status: 404 })
}
