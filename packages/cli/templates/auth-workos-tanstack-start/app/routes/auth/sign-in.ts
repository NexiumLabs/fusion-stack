import { createAPIFileRoute } from "@tanstack/start/api"
import { getAuthorizationUrl } from "../../lib/auth"

export const APIRoute = createAPIFileRoute("/auth/sign-in")({
  GET: async ({ request }) => {
    const url = new URL(request.url)
    const redirectUri = `${url.origin}/auth/callback`
    const authUrl = await getAuthorizationUrl(redirectUri)
    return Response.redirect(authUrl)
  },
})
