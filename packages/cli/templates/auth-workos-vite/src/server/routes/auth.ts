/**
 * This file is only relevant when a Hono backend is present (be:hono or be:vite).
 * If you chose no backend, your WorkOS auth is handled entirely client-side via
 * AuthKitProvider in src/main.tsx — you can safely delete this file.
 *
 * Mount in src/server/index.ts:
 *   import { authRoutes } from "./routes/auth"
 *   app.route("/api/auth", authRoutes)
 *
 * And set WORKOS_REDIRECT_URI=http://localhost:3001/api/auth/callback in .env.local
 * (or whatever port your Hono server runs on).
 */
import { Hono } from "hono"
import { sign, verify } from "hono/jwt"
import { setCookie, deleteCookie, getCookie } from "hono/cookie"
import { WorkOS } from "@workos-inc/node"

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientId = process.env.WORKOS_CLIENT_ID!
const redirectUri = process.env.WORKOS_REDIRECT_URI!
const sessionSecret = process.env.WORKOS_SESSION_SECRET!

const SESSION_COOKIE = "session"
const SESSION_TTL_DAYS = 7

export const authRoutes = new Hono()

/** Redirect to WorkOS hosted auth UI */
authRoutes.get("/sign-in", async (c) => {
  const authUrl = await workos.userManagement.getAuthorizationUrl({
    clientId,
    redirectUri,
    provider: "authkit",
  })
  return c.redirect(authUrl)
})

/** Exchange the OAuth code for a session cookie, then redirect to the app */
authRoutes.get("/callback", async (c) => {
  const code = c.req.query("code")
  if (!code) return c.json({ error: "Missing code" }, 400)

  const { user, accessToken } =
    await workos.userManagement.authenticateWithCode({
      clientId,
      code,
      redirectUri,
    })

  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * SESSION_TTL_DAYS

  const token = await sign(
    { sub: user.id, email: user.email, firstName: user.firstName, exp: expiresAt },
    sessionSecret,
  )

  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * SESSION_TTL_DAYS,
  })

  return c.redirect("/")
})

/** Clear the session cookie */
authRoutes.get("/sign-out", (c) => {
  deleteCookie(c, SESSION_COOKIE, { path: "/" })
  return c.redirect("/")
})

/** Return the current user from the session cookie (null if not signed in) */
authRoutes.get("/me", async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token) return c.json({ user: null })

  try {
    const payload = await verify(token, sessionSecret)
    return c.json({ user: payload })
  } catch {
    return c.json({ user: null })
  }
})
