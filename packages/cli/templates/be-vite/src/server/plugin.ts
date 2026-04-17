import type { Plugin } from "vite"
import type { IncomingMessage, ServerResponse } from "node:http"
import { createApiApp } from "./api"

const app = createApiApp()

async function nodeToWebRequest(req: IncomingMessage, base: string): Promise<Request> {
  const url = new URL(req.url ?? "/", base)
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  return new Request(url.toString(), {
    method: req.method ?? "GET",
    headers: req.headers as HeadersInit,
    body: ["GET", "HEAD"].includes(req.method ?? "") ? undefined : Buffer.concat(chunks),
  })
}

async function sendWebResponse(res: ServerResponse, webRes: Response): Promise<void> {
  res.statusCode = webRes.status
  webRes.headers.forEach((val, key) => res.setHeader(key, val))
  res.end(Buffer.from(await webRes.arrayBuffer()))
}

/**
 * Vite plugin that intercepts /api/* requests and forwards them to the Hono app.
 * Only active during development — production uses src/server/serve.ts.
 */
export function apiPlugin(): Plugin {
  return {
    name: "vite-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api")) return next()
        try {
          const webReq = await nodeToWebRequest(req, "http://localhost")
          const webRes = await app.fetch(webReq)
          await sendWebResponse(res, webRes)
        } catch (err) {
          next(err)
        }
      })
    },
  }
}
