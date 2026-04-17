import { createServerFn } from "@tanstack/start"

/**
 * Example server function — runs on the server only.
 * Call it from any component or route loader: await getServerMessage()
 */
export const getServerMessage = createServerFn().handler(async () => {
  return { message: "Hello from the server" }
})
