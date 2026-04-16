import { RPCHandler } from "@orpc/server/fetch"
import { appRouter } from "@/server/routers/index"

const handler = new RPCHandler(appRouter)

async function handleRequest(req: Request) {
  const { matched, response } = await handler.handle(req, {
    prefix: "/api/orpc",
    context: {},
  })
  if (matched) return response
  return new Response("Not found", { status: 404 })
}

export { handleRequest as GET, handleRequest as POST }
