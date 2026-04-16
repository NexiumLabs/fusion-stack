import * as clack from "@clack/prompts"
import pc from "picocolors"
import type { Selections } from "./types.js"

export function printNextSteps(s: Selections): void {
  const steps: string[] = []
  const run = s.pm === "pnpm" ? "pnpm" : "npm run"

  steps.push(`${pc.cyan("cd")} ${s.projectName}`)
  steps.push(`${pc.cyan(run)} dev`)

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

  if (s.apiLayer === "trpc") {
    steps.push("")
    steps.push(pc.yellow("! tRPC setup:"))
    steps.push(`  Wrap your root layout with ${pc.cyan("TRPCProvider")} from ${pc.cyan("@/lib/trpc/provider")}`)
    if (s.be === "hono") {
      steps.push(`  ${pc.dim("→ For Hono: import trpcHonoHandler from '@/server/trpc-hono' and mount:")}`)
      steps.push(`  ${pc.dim("    app.use('/trpc/*', trpcHonoHandler)")}`)
    }
  }

  if (s.apiLayer === "orpc") {
    steps.push("")
    steps.push(pc.yellow("! oRPC setup:"))
    steps.push(`  Wrap your root layout with ${pc.cyan("ORPCProvider")} from ${pc.cyan("@/lib/orpc/provider")}`)
  }

  if (s.auth === "clerk") {
    steps.push("")
    steps.push(pc.yellow("! Clerk — add to .env.local:"))
    steps.push(`  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...`)
    steps.push(`  CLERK_SECRET_KEY=sk_...`)
    steps.push(`  ${pc.dim("→ dashboard.clerk.com")}`)
  }

  if (s.auth === "workos") {
    steps.push("")
    steps.push(pc.yellow("! WorkOS AuthKit — add to .env.local:"))
    steps.push(`  WORKOS_API_KEY=sk_...`)
    steps.push(`  WORKOS_CLIENT_ID=client_...`)
    steps.push(`  WORKOS_COOKIE_PASSWORD=$(openssl rand -base64 32)`)
    steps.push(`  WORKOS_REDIRECT_URI=http://localhost:3000/callback`)
    steps.push(`  ${pc.dim("→ dashboard.workos.com — set redirect URI under your app's configuration")}`)
  }

  if (s.auth === "better-auth") {
    steps.push("")
    steps.push(pc.yellow("! Better Auth — add to .env.local:"))
    steps.push(`  AUTH_SECRET=$(openssl rand -base64 32)`)
    steps.push(`  ${pc.dim("→ Configure your DB adapter in src/lib/auth.ts")}`)
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
    steps.push("")
    steps.push(pc.yellow("! Supabase — add to .env.local:"))
    steps.push(`  NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co`)
    steps.push(`  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`)
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
    steps.push(pc.yellow("! PWA — generate VAPID keys:"))
    steps.push(`  npx web-push generate-vapid-keys`)
    steps.push(`  ${pc.dim("→ Copy output to .env.local:")}`)
    steps.push(`  NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key`)
    steps.push(`  VAPID_PRIVATE_KEY=your_private_key`)
    steps.push(`  ${pc.dim("→ Test with HTTPS: next dev --experimental-https")}`)
  }

  clack.note(steps.join("\n"), "Next steps")
}
