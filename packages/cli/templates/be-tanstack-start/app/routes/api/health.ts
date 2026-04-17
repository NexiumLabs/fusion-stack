import { createAPIFileRoute } from "@tanstack/start/api"

export const APIRoute = createAPIFileRoute("/api/health")({
  GET: () => Response.json({ status: "ok" }),
})
