/**
 * This file is only relevant when a Hono backend is present (be:hono or be:vite).
 * If you chose no backend, your Clerk auth is handled entirely client-side via
 * ClerkProvider in src/main.tsx — you can safely delete this file.
 *
 * Mount in src/server/index.ts:
 *   import { clerkAuth } from "./middleware/clerk"
 *   app.use("/api/protected/*", clerkAuth)
 */
import { createClerkClient } from "@clerk/backend"
import type { Context, Next } from "hono"

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
})

/**
 * Hono middleware that validates the Clerk session token sent in the
 * Authorization header (Bearer <token>) and attaches the userId to context.
 */
export async function clerkAuth(c: Context, next: Next) {
  const token = c.req.header("Authorization")?.replace("Bearer ", "")
  if (!token) return c.json({ error: "Unauthorized" }, 401)

  try {
    const { sub: userId } =
      await clerkClient.verifyToken(token)
    c.set("userId", userId)
    await next()
  } catch {
    return c.json({ error: "Invalid token" }, 401)
  }
}
