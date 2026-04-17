import { getAuth } from "@clerk/tanstack-start/server"
import { getWebRequest } from "@tanstack/start/server"

/**
 * Helper to get the current session in a server function.
 *
 * Usage:
 *   const { userId } = await getServerAuth()
 *   if (!userId) throw new Error("Unauthorized")
 */
export async function getServerAuth() {
  const request = getWebRequest()
  return getAuth(request)
}
