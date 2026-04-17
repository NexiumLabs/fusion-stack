import { createAPIFileRoute } from "@tanstack/start/api"
import { redirect } from "@tanstack/react-router"
import { handleCallback } from "../../lib/auth"

export const APIRoute = createAPIFileRoute("/auth/callback")({
  GET: async ({ request }) => {
    const url = new URL(request.url)
    const code = url.searchParams.get("code")
    if (!code) return new Response("Missing code", { status: 400 })

    const redirectUri = `${url.origin}/auth/callback`
    await handleCallback(code, redirectUri)

    return redirect({ to: "/" })
  },
})
