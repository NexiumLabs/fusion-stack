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

const SKILLS_CATALOG = [
  { value: "careerops/career-ops",        label: "CareerOps",                    hint: "Career management & job search automation" },
  { value: "nextjs-patterns/skills",      label: "Next.js Patterns",             hint: "App Router patterns and best practices" },
  { value: "react-skills/core",           label: "React Best Practices",         hint: "Component design, hooks, and performance" },
  { value: "typescript-skills/mastery",   label: "TypeScript Mastery",           hint: "Advanced types, generics, and tooling" },
  { value: "database-skills/postgresql",  label: "PostgreSQL",                   hint: "Queries, indexing, and schema design" },
  { value: "testing-skills/vitest",       label: "Testing (Vitest / Playwright)", hint: "Unit, integration, and e2e testing" },
  { value: "tailwind-skills/core",        label: "Tailwind CSS",                 hint: "Utility-first styling and design systems" },
]

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
      { value: "none",   label: "No Frontend", hint: "API or backend-only project" },
    ],
    initialValue: "nextjs",
  })
  if (isCancel(feRaw)) abort()
  const fe = feRaw as Selections["fe"]

  // Backend
  const beRaw = await clack.select({
    message: "Backend",
    options: [
      { value: "convex", label: "Convex",            hint: "Reactive backend-as-a-service" },
      { value: "hono",   label: "Hono",               hint: "Ultrafast web framework for Node.js" },
      { value: "nextjs", label: "Next.js API Routes", hint: "Built-in App Router route handlers" },
      { value: "none",   label: "No Backend",         hint: "Frontend-only or external API" },
    ],
    initialValue: "convex",
  })
  if (isCancel(beRaw)) abort()
  const be = beRaw as Selections["be"]

  // API Layer — shown when backend supports an RPC layer (not Convex or none)
  let apiLayer: Selections["apiLayer"] = "none"
  if (be !== "convex" && be !== "none") {
    const apiLayerRaw = await clack.select({
      message: "API Layer",
      options: [
        { value: "trpc", label: "tRPC", hint: "End-to-end type-safe APIs, no schema" },
        { value: "orpc", label: "oRPC", hint: "OpenAPI-compatible, Zod-first RPC" },
        { value: "none", label: "None", hint: "Plain fetch or bring your own layer" },
      ],
      initialValue: "none",
    })
    if (isCancel(apiLayerRaw)) abort()
    apiLayer = apiLayerRaw as Selections["apiLayer"]
  }

  // Database
  let db: Selections["db"]
  if (be === "convex") {
    const dbRaw = await clack.select({
      message: "Database",
      options: [
        { value: "convex", label: "Convex DB", hint: "Built-in reactive queries, zero config" },
        { value: "none",   label: "None for now", hint: "Add a database later" },
      ],
      initialValue: "convex",
    })
    if (isCancel(dbRaw)) abort()
    db = dbRaw as Selections["db"]
  } else {
    const dbRaw = await clack.select({
      message: "Database",
      options: [
        { value: "postgresql", label: "PostgreSQL", hint: "Powerful open-source relational database" },
        { value: "mongodb",    label: "MongoDB",    hint: "Flexible document database" },
        { value: "mysql",      label: "MySQL",      hint: "Popular open-source relational database" },
        { value: "sqlite",     label: "SQLite",     hint: "Lightweight embedded database" },
        { value: "none",       label: "None for now", hint: "Add a database later" },
      ],
      initialValue: "postgresql",
    })
    if (isCancel(dbRaw)) abort()
    db = dbRaw as Selections["db"]
  }

  // ORM — shown when a non-Convex database is selected
  let orm: Selections["orm"] = "none"
  if (db !== "convex" && db !== "none") {
    const ormOptions = db === "mongodb"
      ? [
          { value: "mongoose", label: "Mongoose", hint: "Elegant MongoDB object modeling" },
          { value: "prisma",   label: "Prisma",   hint: "Type-safe ORM with MongoDB support" },
        ]
      : [
          { value: "drizzle", label: "Drizzle", hint: "Lightweight TypeScript ORM" },
          { value: "prisma",  label: "Prisma",  hint: "Type-safe ORM with migrations" },
        ]

    const ormRaw = await clack.select({
      message: "ORM",
      options: ormOptions,
      initialValue: db === "mongodb" ? "mongoose" : "drizzle",
    })
    if (isCancel(ormRaw)) abort()
    orm = ormRaw as Selections["orm"]
  }

  // DB Provider — shown for PostgreSQL and MySQL only
  let dbProvider: Selections["dbProvider"] = "none"
  if (db === "postgresql") {
    const providerRaw = await clack.select({
      message: "DB Provider",
      options: [
        { value: "neon",     label: "Neon",     hint: "Serverless Postgres — generous free tier" },
        { value: "supabase", label: "Supabase", hint: "Postgres + auth, storage, realtime" },
        { value: "none",     label: "Self-hosted / local", hint: "Bring your own connection string" },
      ],
      initialValue: "neon",
    })
    if (isCancel(providerRaw)) abort()
    dbProvider = providerRaw as Selections["dbProvider"]
  } else if (db === "mysql") {
    const providerRaw = await clack.select({
      message: "DB Provider",
      options: [
        { value: "planetscale", label: "PlanetScale", hint: "Serverless MySQL — branching workflow" },
        { value: "none",        label: "Self-hosted / local", hint: "Bring your own connection string" },
      ],
      initialValue: "planetscale",
    })
    if (isCancel(providerRaw)) abort()
    dbProvider = providerRaw as Selections["dbProvider"]
  }

  // Auth
  const authRaw = await clack.select({
    message: "Authentication",
    options: [
      { value: "clerk",       label: "Clerk",           hint: "Complete user management platform" },
      { value: "workos",      label: "WorkOS AuthKit",  hint: "Enterprise SSO, magic links, hosted auth UI" },
      { value: "better-auth", label: "Better Auth",     hint: "TypeScript-first auth framework" },
      { value: "none",        label: "No Auth",         hint: "Handle authentication yourself" },
    ],
    initialValue: "clerk",
  })
  if (isCancel(authRaw)) abort()
  const auth = authRaw as Selections["auth"]

  // UI Library — filter if no frontend
  const uiOptions = [
    { value: "none", label: "Tailwind only", hint: "Utility-first CSS — no component library" },
  ]
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
      { value: "resend", label: "Resend",    hint: "Email API built for developers" },
      { value: "none",   label: "No Email",  hint: "No transactional email needed" },
    ],
    initialValue: "resend",
  })
  if (isCancel(emailRaw)) abort()
  const email = emailRaw as Selections["email"]

  // Addons — multi-select (only show if options are available)
  let addons: Selections["addons"] = []
  if (fe === "nextjs") {
    const addonsRaw = await clack.multiselect({
      message: "Addons",
      options: [
        { value: "pwa", label: "PWA", hint: "Service worker, web manifest, push notifications" },
      ],
      required: false,
    })
    if (isCancel(addonsRaw)) abort()
    addons = addonsRaw as Selections["addons"]
  }

  // Skills from skills.sh
  const skillsRaw = await clack.multiselect({
    message: "Skills  (skills.sh — enhances your AI coding agent)",
    options: SKILLS_CATALOG,
    required: false,
  })
  if (isCancel(skillsRaw)) abort()
  const skills = skillsRaw as string[]

  // Package manager
  const pmRaw = await clack.select({
    message: "Package Manager",
    options: [
      { value: "pnpm", label: "pnpm", hint: "Fast, disk-efficient" },
      { value: "npm",  label: "npm",  hint: "The original Node.js package manager" },
    ],
    initialValue: "pnpm",
  })
  if (isCancel(pmRaw)) abort()
  const pm = pmRaw as Selections["pm"]

  const raw: Selections = { projectName, fe, be, db, orm, dbProvider, auth, ui, email, addons, skills, pm, apiLayer }
  const selections = autoResolve(raw)

  const targetDir = path.resolve(process.cwd(), selections.projectName)
  await generate(selections, targetDir)
}
