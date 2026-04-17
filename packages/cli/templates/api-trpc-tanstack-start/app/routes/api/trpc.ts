import { createAPIFileRoute } from "@tanstack/start/api"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "../../server/routers/index"

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: () => ({}),
  })

export const APIRoute = createAPIFileRoute("/api/trpc/$")({
  GET: ({ request }) => handler(request),
  POST: ({ request }) => handler(request),
})
