/**
 * tRPC adapter for Hono.
 * Import this in src/server/index.ts and mount it:
 *
 *   import { trpcHonoHandler } from "./trpc-hono"
 *   app.use("/trpc/*", trpcHonoHandler)
 */
import { trpcServer } from "@hono/trpc-server"
import { appRouter } from "./routers/index"

export const trpcHonoHandler = trpcServer({
  router: appRouter,
  createContext: () => ({}),
})
