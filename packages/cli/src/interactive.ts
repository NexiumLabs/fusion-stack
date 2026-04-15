import * as clack from "@clack/prompts"
import pc from "picocolors"
import path from "node:path"
import { autoResolve } from "./validate.js"
import { generate } from "./generate.js"
import { DEFAULT_SELECTIONS } from "./defaults.js"
import type { Selections } from "./types.js"

function isCancel(value: unknown): value is symbol {
  return clack.isCancel(value)
}

function abort(): never {
  clack.cancel("Cancelled.")
  process.exit(0)
}

export async function runInteractive(): Promise<void> {
  clack.intro(`${pc.bgCyan(pc.black(" >_ fusion-stack "))}`)

  // Project name
  const projectNameRaw = await clack.text({
    message: "Project name",
    placeholder: DEFAULT_SELECTIONS.projectName,
    defaultValue: DEFAULT_SELECTIONS.projectName,
    validate(v) {
      if (!/^[a-z0-9-]+$/.test(v)) {
        return "Use lowercase letters, numbers, and hyphens only"
      }
    },
  })
  if (isCancel(projectNameRaw)) abort()
  const projectName = projectNameRaw as string

  // Frontend
  const feRaw = await clack.select({
    message: "Frontend",
    options: [
      { value: "nextjs", label: "Next.js", hint: "React framework with hybrid rendering" },
      { value: "none", label: "No Frontend", hint: "API or backend-only project" },
    ],
    initialValue: "nextjs",
  })
  if (isCancel(feRaw)) abort()
  const fe = feRaw as Selections["fe"]

  // Backend
  const beRaw = await clack.select({
    message: "Backend",
    options: [
      { value: "convex", label: "Convex", hint: "Reactive backend-as-a-service" },
      { value: "hono", label: "Hono", hint: "Ultrafast web framework for Node.js" },
      { value: "none", label: "No Backend", hint: "Frontend-only or external API" },
    ],
    initialValue: "convex",
  })
  if (isCancel(beRaw)) abort()
  const be = beRaw as Selections["be"]

  // Database — filter options based on backend
  const dbOptions = []
  if (be === "convex") {
    dbOptions.push({ value: "convex", label: "Convex DB", hint: "Built-in reactive queries, zero config" })
  }
  dbOptions.push({ value: "none", label: "None for now", hint: "Drizzle & Prisma support coming soon" })

  const dbRaw = await clack.select({
    message: "Database",
    options: dbOptions,
    initialValue: be === "convex" ? "convex" : "none",
  })
  if (isCancel(dbRaw)) abort()
  const db = dbRaw as Selections["db"]

  // Auth
  const authRaw = await clack.select({
    message: "Authentication",
    options: [
      { value: "clerk", label: "Clerk", hint: "Complete user management platform" },
      { value: "workos", label: "WorkOS AuthKit", hint: "Enterprise SSO, magic links, hosted auth UI" },
      { value: "better-auth", label: "Better Auth", hint: "TypeScript-first auth framework" },
      { value: "none", label: "No Auth", hint: "Handle authentication yourself" },
    ],
    initialValue: "clerk",
  })
  if (isCancel(authRaw)) abort()
  const auth = authRaw as Selections["auth"]

  // UI Library — filter if no frontend
  const uiOptions = []
  uiOptions.push({ value: "none", label: "Tailwind only", hint: "Utility-first CSS — no component library" })
  if (fe !== "none") {
    uiOptions.push({ value: "shadcn", label: "shadcn/ui", hint: "Copy-paste components built on Radix UI" })
  }

  const uiRaw = await clack.select({
    message: "UI Library",
    options: uiOptions,
    initialValue: "none",
  })
  if (isCancel(uiRaw)) abort()
  const ui = uiRaw as Selections["ui"]

  // Email
  const emailRaw = await clack.select({
    message: "Email",
    options: [
      { value: "resend", label: "Resend", hint: "Email API built for developers" },
      { value: "none", label: "No Email", hint: "No transactional email needed" },
    ],
    initialValue: "resend",
  })
  if (isCancel(emailRaw)) abort()
  const email = emailRaw as Selections["email"]

  // Package manager
  const pmRaw = await clack.select({
    message: "Package Manager",
    options: [
      { value: "pnpm", label: "pnpm", hint: "Fast, disk-efficient" },
      { value: "npm", label: "npm", hint: "The original Node.js package manager" },
    ],
    initialValue: "pnpm",
  })
  if (isCancel(pmRaw)) abort()
  const pm = pmRaw as Selections["pm"]

  const raw: Selections = { projectName, fe, be, db, auth, ui, email, pm }
  const selections = autoResolve(raw)

  const targetDir = path.resolve(process.cwd(), selections.projectName)
  await generate(selections, targetDir)
}
