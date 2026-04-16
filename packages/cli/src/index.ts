#!/usr/bin/env node
import { Command } from "commander"
import pc from "picocolors"
import path from "node:path"
import { createRequire } from "node:module"
import { runInteractive } from "./interactive.js"
import { generate } from "./generate.js"
import { validateSelections } from "./validate.js"
import { DEFAULT_SELECTIONS } from "./defaults.js"
import type { Selections } from "./types.js"

// Read version from package.json without bundling it
const require = createRequire(import.meta.url)

const version = (require("../package.json") as { version: string }).version

const program = new Command()

program
  .name("create-fusion-stack")
  .description("Scaffold a TypeScript project from your fusion-stack selections")
  .version(version)
  .argument("[project-name]", "Name of the project to create")
  .option("--frontend <value>",        "Frontend framework (nextjs | none)", "none")
  .option("--backend <value>",         "Backend framework (convex | hono | nextjs | none)", "none")
  .option("--database <value>",        "Database (convex | postgresql | mongodb | mysql | sqlite | none)", "none")
  .option("--orm <value>",             "ORM (drizzle | prisma | mongoose | none)", "none")
  .option("--db-provider <value>",     "DB provider (supabase | neon | planetscale | none)", "none")
  .option("--auth <value>",            "Authentication (clerk | better-auth | workos | none)", "none")
  .option("--ui <value>",              "UI library (shadcn | none)", "none")
  .option("--email <value>",           "Email provider (resend | none)", "none")
  .option("--addons <value>",          "Comma-separated addons (pwa)", "")
  .option("--skills <value>",          "Comma-separated skills.sh identifiers", "")
  .option("--api-layer <value>",       "API layer (trpc | orpc | none)", "none")
  .option("--package-manager <value>", "Package manager (pnpm | npm)", DEFAULT_SELECTIONS.pm)
  .action(async (projectNameArg: string | undefined, opts: Record<string, string>) => {
    const hasFlags =
      opts["frontend"] !== "none" ||
      opts["backend"] !== "none" ||
      opts["database"] !== "none" ||
      opts["orm"] !== "none" ||
      opts["dbProvider"] !== "none" ||
      opts["auth"] !== "none" ||
      opts["ui"] !== "none" ||
      opts["email"] !== "none" ||
      opts["addons"] !== "" ||
      opts["skills"] !== "" ||
      opts["apiLayer"] !== "none"

    // No args and no meaningful flags → interactive mode
    if (!projectNameArg && !hasFlags) {
      await runInteractive()
      return
    }

    // Validate project name (flag mode — interactive mode validates via prompt)
    const rawName = projectNameArg ?? DEFAULT_SELECTIONS.projectName
    if (!/^[a-z0-9-]+$/.test(rawName)) {
      console.error(pc.red(`Invalid project name "${rawName}" — use lowercase letters, numbers, and hyphens only`))
      process.exit(1)
    }

    // Parse comma-separated addons
    const addonsRaw = opts["addons"] ? opts["addons"].split(",").map((a) => a.trim()).filter(Boolean) : []
    const addons = addonsRaw.filter((a): a is "pwa" => a === "pwa")

    // Parse comma-separated skills
    const skills = opts["skills"] ? opts["skills"].split(",").map((s) => s.trim()).filter(Boolean) : []

    // Flag mode — parse selections from CLI args
    const selections: Selections = {
      projectName: rawName,
      fe:         (opts["frontend"]       as Selections["fe"])         ?? DEFAULT_SELECTIONS.fe,
      be:         (opts["backend"]        as Selections["be"])         ?? DEFAULT_SELECTIONS.be,
      db:         (opts["database"]       as Selections["db"])         ?? DEFAULT_SELECTIONS.db,
      orm:        (opts["orm"]            as Selections["orm"])        ?? DEFAULT_SELECTIONS.orm,
      dbProvider: (opts["dbProvider"]     as Selections["dbProvider"]) ?? DEFAULT_SELECTIONS.dbProvider,
      auth:       (opts["auth"]           as Selections["auth"])       ?? DEFAULT_SELECTIONS.auth,
      ui:         (opts["ui"]             as Selections["ui"])         ?? DEFAULT_SELECTIONS.ui,
      email:      (opts["email"]          as Selections["email"])      ?? DEFAULT_SELECTIONS.email,
      addons,
      skills,
      pm:         (opts["packageManager"] as Selections["pm"])         ?? DEFAULT_SELECTIONS.pm,
      apiLayer:   (opts["apiLayer"]       as Selections["apiLayer"])   ?? DEFAULT_SELECTIONS.apiLayer,
    }

    // Validate — fail fast on incompatible selections
    const errors = validateSelections(selections)
    if (errors.length > 0) {
      console.error(pc.red("Incompatible selections:"))
      for (const err of errors) {
        console.error(pc.red(`  ✕ ${err}`))
      }
      process.exit(1)
    }

    const targetDir = path.resolve(process.cwd(), selections.projectName)
    await generate(selections, targetDir)
  })

program.parseAsync(process.argv).catch((err: unknown) => {
  console.error(pc.red("Fatal error:"), err)
  process.exit(1)
})
