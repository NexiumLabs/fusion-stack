import { WorkOS } from "@workos-inc/node"
import { getCookie, setCookie } from "@tanstack/start/server"

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientId = process.env.WORKOS_CLIENT_ID!

export { workos, clientId }

/** Get the current session from the session cookie. Returns null if not signed in. */
export async function getSession() {
  const token = getCookie("wos-session")
  if (!token) return null
  try {
    const { user } = await workos.userManagement.authenticateWithSessionCookie({
      clientId,
      sessionData: token,
    })
    return { user }
  } catch {
    return null
  }
}

/** Redirect URL for the WorkOS hosted auth UI. */
export function getAuthorizationUrl(redirectUri: string) {
  return workos.userManagement.getAuthorizationUrl({
    clientId,
    redirectUri,
    provider: "authkit",
  })
}

/** Exchange the code from the callback for a session and set the session cookie. */
export async function handleCallback(code: string, redirectUri: string) {
  const { user, sealedSession } =
    await workos.userManagement.authenticateWithCode({
      clientId,
      code,
      session: { sealedSession: true },
    })
  setCookie("wos-session", sealedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
  return { user }
}

export function signOut() {
  setCookie("wos-session", "", { maxAge: 0, path: "/" })
}
