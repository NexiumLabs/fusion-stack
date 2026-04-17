import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import type { AppRouter } from "@/server/routers/index"

const link = new RPCLink({ url: "/api/orpc" })

export const orpc = createORPCClient<AppRouter>(link)
