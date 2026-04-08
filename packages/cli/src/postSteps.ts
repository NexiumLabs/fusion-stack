import * as clack from "@clack/prompts"
import pc from "picocolors"
import type { Selections } from "./types.js"

export function printNextSteps(s: Selections): void {
  const steps: string[] = []
  const run = s.pm === "pnpm" ? "pnpm" : "npm run"

  steps.push(`${pc.cyan("cd")} ${s.projectName}`)
  steps.push(`${pc.cyan(run)} dev`)

  if (s.be === "convex") {
    steps.push("")
    steps.push(pc.yellow("! Convex setup (run once):"))
    steps.push(`  npx convex dev`)
    steps.push(`  ${pc.dim("→ Opens browser to log in to Convex Cloud & deploy your schema")}`)
  }

  if (s.auth === "clerk") {
    steps.push("")
    steps.push(pc.yellow("! Clerk — add to .env.local:"))
    steps.push(`  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...`)
    steps.push(`  CLERK_SECRET_KEY=sk_...`)
    steps.push(`  ${pc.dim("→ dashboard.clerk.com")}`)
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

  clack.note(steps.join("\n"), "Next steps")
}
