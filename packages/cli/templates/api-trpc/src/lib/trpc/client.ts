import { createTRPCClient, httpBatchLink } from "@trpc/client"
import superjson from "superjson"
import type { AppRouter } from "@/server/routers/index"

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
    }),
  ],
})
