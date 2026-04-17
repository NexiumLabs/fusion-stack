import * as clack from "@clack/prompts"
import pc from "picocolors"
import type { Selections } from "./types.js"

export function printNextSteps(s: Selections): void {
  const steps: string[] = []
  const run = s.pm === "pnpm" ? "pnpm" : "npm run"

  steps.push(`${pc.cyan("cd")} ${s.projectName}`)
  steps.push(`${pc.cyan(run)} dev`)

  if (s.fe === "tanstack-start") {
    steps.push("")
    steps.push(pc.yellow("! TanStack Start:"))
    steps.push(`  Routes live in ${pc.cyan("app/routes/")} — file-based routing`)
    steps.push(`  Add a route: ${pc.cyan("app/routes/about.tsx")}`)
    steps.push(`  ${pc.dim("→ tanstack.com/router/latest/docs/framework/react/start/overview")}`)
    if (s.be === "hono") {
      steps.push("")
      steps.push(pc.yellow("! TanStack Start + Hono:"))
      steps.push(`  TanStack Start on ${pc.cyan(":3000")}  ·  Hono on ${pc.cyan(":3001")}`)
      steps.push(`  ${pc.dim("→ pnpm dev starts both via concurrently")}`)
    }
  }

  if (s.fe === "vite-react") {
    steps.push("")
    steps.push(pc.yellow("! Vite React:"))
    steps.push(`  Entry: ${pc.cyan("src/main.tsx")}  ·  ${pc.cyan("@")} alias maps to ${pc.cyan("src/")}`)
    if (s.be === "hono") {
      steps.push(`  Vite on ${pc.cyan(":5173")}  ·  Hono on ${pc.cyan(":3001")}`)
      steps.push(`  ${pc.dim("→ pnpm dev starts both via concurrently")}`)
    } else if (s.be === "vite") {
      steps.push(`  API runs inside the Vite dev server — single port ${pc.cyan(":5173")}`)
      steps.push(`  API routes defined in ${pc.cyan("src/server/api.ts")} via Hono`)
      steps.push(`  ${pc.dim("→ For production: pnpm build && pnpm serve")}`)
    }
  }

  if (s.ui === "shadcn") {
    steps.push("")
    steps.push(pc.yellow("! shadcn/ui setup (run once):"))
    steps.push(`  npx shadcn@latest init`)
    steps.push(`  ${pc.dim("→ Then add components: npx shadcn@latest add button input ...")}`)
  }

  if (s.be === "convex") {
    steps.push("")
    steps.push(pc.yellow("! Convex setup (run once):"))
    steps.push(`  npx convex dev`)
    steps.push(`  ${pc.dim("→ Opens browser to log in to Convex Cloud & deploy your schema")}`)
  }

  if (s.be === "nextjs") {
    steps.push("")
    steps.push(pc.yellow("! Next.js API Routes:"))
    steps.push(`  API handlers live in ${pc.cyan("src/app/api/")}`)
    steps.push(`  ${pc.dim("→ nextjs.org/docs/app/building-your-application/routing/route-handlers")}`)
  }

  if (s.be === "tanstack-start") {
    steps.push("")
    steps.push(pc.yellow("! TanStack Start API routes:"))
    steps.push(`  API handlers live in ${pc.cyan("app/routes/api/")} via ${pc.cyan("createAPIFileRoute")}`)
    steps.push(`  Server functions live in ${pc.cyan("app/server/functions.ts")} via ${pc.cyan("createServerFn")}`)
    steps.push(`  ${pc.dim("→ tanstack.com/router/latest/docs/framework/react/start/server-functions")}`)
  }

  if (s.apiLayer === "trpc") {
    steps.push("")
    steps.push(pc.yellow("! tRPC setup:"))
    if (s.fe === "tanstack-start") {
      steps.push(`  Wrap ${pc.cyan("app/routes/__root.tsx")} with ${pc.cyan("TRPCProvider")} from ${pc.cyan("@/lib/trpc/provider")}`)
      steps.push(`  Routers live in ${pc.cyan("app/server/routers/")} — API route at ${pc.cyan("app/routes/api/trpc.ts")}`)
    } else if (s.fe === "vite-react") {
      steps.push(`  Wrap ${pc.cyan("src/main.tsx")} with ${pc.cyan("TRPCProvider")} from ${pc.cyan("@/lib/trpc/provider")}`)
      if (s.be === "hono") {
        steps.push(`  ${pc.dim("→ For Hono: import trpcHonoHandler from '@/server/trpc-hono' and mount:")}`)
        steps.push(`  ${pc.dim("    app.use('/trpc/*', trpcHonoHandler)")}`)
      } else if (s.be === "vite") {
        steps.push(`  ${pc.dim("→ tRPC handler is auto-mounted at /api/trpc via src/server/api.ts")}`)
      }
    } else {
      steps.push(`  Wrap your root layout with ${pc.cyan("TRPCProvider")} from ${pc.cyan("@/lib/trpc/provider")}`)
      if (s.be === "hono") {
        steps.push(`  ${pc.dim("→ For Hono: import trpcHonoHandler from '@/server/trpc-hono' and mount:")}`)
        steps.push(`  ${pc.dim("    app.use('/trpc/*', trpcHonoHandler)")}`)
      }
    }
  }

  if (s.apiLayer === "orpc") {
    steps.push("")
    steps.push(pc.yellow("! oRPC setup:"))
    if (s.fe === "tanstack-start") {
      steps.push(`  Wrap ${pc.cyan("app/routes/__root.tsx")} with ${pc.cyan("ORPCProvider")} from ${pc.cyan("@/lib/orpc/provider")}`)
      steps.push(`  Routers live in ${pc.cyan("app/server/routers/")} — API route at ${pc.cyan("app/routes/api/orpc.ts")}`)
    } else if (s.fe === "vite-react") {
      steps.push(`  Wrap ${pc.cyan("src/main.tsx")} with ${pc.cyan("ORPCProvider")} from ${pc.cyan("@/lib/orpc/provider")}`)
      if (s.be === "hono") {
        steps.push(`  ${pc.dim("→ import orpcHonoHandler from '@/server/orpc-hono' and mount:")}`)
        steps.push(`  ${pc.dim("    app.use('/api/orpc/*', (c) => orpcHonoHandler(c))")}`)
      } else if (s.be === "vite") {
        steps.push(`  ${pc.dim("→ oRPC handler is auto-mounted at /api/orpc via src/server/api.ts")}`)
      }
    } else {
      steps.push(`  Wrap your root layout with ${pc.cyan("ORPCProvider")} from ${pc.cyan("@/lib/orpc/provider")}`)
    }
  }

  if (s.auth === "clerk") {
    steps.push("")
    steps.push(pc.yellow("! Clerk — add to .env.local:"))
    if (s.fe === "nextjs") {
      steps.push(`  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...`)
    } else {
      steps.push(`  VITE_CLERK_PUBLISHABLE_KEY=pk_...`)
    }
    steps.push(`  CLERK_SECRET_KEY=sk_...`)
    steps.push(`  ${pc.dim("→ dashboard.clerk.com")}`)
  }

  if (s.auth === "workos") {
    steps.push("")
    steps.push(pc.yellow("! WorkOS AuthKit — add to .env.local:"))
    steps.push(`  WORKOS_API_KEY=sk_...`)
    steps.push(`  WORKOS_CLIENT_ID=client_...`)
    if (s.fe === "vite-react") {
      steps.push(`  VITE_WORKOS_CLIENT_ID=client_...`)
    }
    if (s.fe === "nextjs") {
      steps.push(`  WORKOS_COOKIE_PASSWORD=$(openssl rand -base64 32)`)
      steps.push(`  WORKOS_REDIRECT_URI=http://localhost:3000/callback`)
    } else if (s.fe === "tanstack-start") {
      steps.push(`  WORKOS_REDIRECT_URI=http://localhost:3000/auth/callback`)
    } else if (s.be === "hono" || s.be === "vite") {
      // Separate backend process handles the OAuth callback
      steps.push(`  WORKOS_SESSION_SECRET=$(openssl rand -base64 32)`)
      steps.push(`  WORKOS_REDIRECT_URI=http://localhost:3001/api/auth/callback`)
    } else {
      // Convex or no backend — Vite itself serves the callback route
      steps.push(`  WORKOS_SESSION_SECRET=$(openssl rand -base64 32)`)
      steps.push(`  WORKOS_REDIRECT_URI=http://localhost:5173/auth/callback`)
    }
    steps.push(`  ${pc.dim("→ dashboard.workos.com — set redirect URI under your app's configuration")}`)
  }

  if (s.auth === "better-auth") {
    steps.push("")
    steps.push(pc.yellow("! Better Auth — add to .env.local:"))
    steps.push(`  AUTH_SECRET=$(openssl rand -base64 32)`)
    const authPath = s.fe === "tanstack-start" ? "app/lib/auth.ts" : "src/lib/auth.ts"
    steps.push(`  ${pc.dim(`→ Configure your DB adapter in ${authPath}`)}`)
  }

  if (s.email === "resend") {
    steps.push("")
    steps.push(pc.yellow("! Resend — add to .env.local:"))
    steps.push(`  RESEND_API_KEY=re_...`)
    steps.push(`  ${pc.dim("→ resend.com/api-keys")}`)
  }

  // Database / ORM steps
  if (s.orm === "drizzle") {
    steps.push("")
    steps.push(pc.yellow("! Drizzle ORM — sync your schema:"))
    steps.push(`  ${run} db:push`)
    steps.push(`  ${pc.dim("→ Or open Drizzle Studio: " + run + " db:studio")}`)
  }

  if (s.orm === "prisma") {
    steps.push("")
    steps.push(pc.yellow("! Prisma — generate client & push schema:"))
    steps.push(`  npx prisma generate`)
    steps.push(`  npx prisma db push`)
    steps.push(`  ${pc.dim("→ Or open Prisma Studio: npx prisma studio")}`)
  }

  if (s.orm === "mongoose") {
    steps.push("")
    steps.push(pc.yellow("! Mongoose — add to .env.local:"))
    steps.push(`  MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<db>`)
    steps.push(`  ${pc.dim("→ cloud.mongodb.com")}`)
  }

  // Provider steps
  if (s.dbProvider === "supabase") {
    const pub = s.fe === "nextjs" ? "NEXT_PUBLIC" : "VITE"
    steps.push("")
    steps.push(pc.yellow("! Supabase — add to .env.local:"))
    steps.push(`  ${pub}_SUPABASE_URL=https://<project>.supabase.co`)
    steps.push(`  ${pub}_SUPABASE_ANON_KEY=eyJ...`)
    steps.push(`  DATABASE_URL=postgresql://postgres:<password>@<host>:5432/postgres`)
    steps.push(`  ${pc.dim("→ supabase.com/dashboard")}`)
  }

  if (s.dbProvider === "neon") {
    steps.push("")
    steps.push(pc.yellow("! Neon — add to .env.local:"))
    steps.push(`  DATABASE_URL=postgresql://<user>:<password>@<host>.neon.tech/<db>?sslmode=require`)
    steps.push(`  ${pc.dim("→ console.neon.tech")}`)
  }

  if (s.dbProvider === "planetscale") {
    steps.push("")
    steps.push(pc.yellow("! PlanetScale — add to .env.local:"))
    steps.push(`  DATABASE_URL=mysql://<user>:<password>@<host>.connect.psdb.cloud/<db>?ssl={"rejectUnauthorized":true}`)
    steps.push(`  ${pc.dim("→ app.planetscale.com")}`)
  }

  // PWA steps
  if (s.addons.includes("pwa")) {
    steps.push("")
    steps.push(pc.yellow("! PWA:"))
    if (s.fe === "nextjs") {
      steps.push(`  npx web-push generate-vapid-keys`)
      steps.push(`  ${pc.dim("→ Copy output to .env.local:")}`)
      steps.push(`  NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key`)
      steps.push(`  VAPID_PRIVATE_KEY=your_private_key`)
      steps.push(`  ${pc.dim("→ Test with HTTPS: next dev --experimental-https")}`)
    } else {
      steps.push(`  Service worker auto-registered via vite-plugin-pwa`)
      steps.push(`  Add icons to ${pc.cyan("public/icons/")} — icon-192.png and icon-512.png`)
      steps.push(`  ${pc.dim("→ vite-pwa-org.netlify.app")}`)
    }
  }

  clack.note(steps.join("\n"), "Next steps")
}
