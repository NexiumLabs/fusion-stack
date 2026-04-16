import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "@/server/routers/index"

export const trpcReact = createTRPCReact<AppRouter>()
