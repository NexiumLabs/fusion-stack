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
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const version = (require("../package.json") as { version: string }).version

const program = new Command()

program
  .name("create-fusion-stack")
  .description("Scaffold a TypeScript project from your fusion-stack selections")
  .version(version)
  .argument("[project-name]", "Name of the project to create")
  .option("--frontend <value>", "Frontend framework (nextjs | none)", "none")
  .option("--backend <value>", "Backend framework (convex | hono | none)", "none")
  .option("--database <value>", "Database (convex | none)", "none")
  .option("--auth <value>", "Authentication (clerk | better-auth | none)", "none")
  .option("--ui <value>", "UI library (shadcn | none)", "none")
  .option("--email <value>", "Email provider (resend | none)", "none")
  .option("--package-manager <value>", "Package manager (pnpm | npm)", DEFAULT_SELECTIONS.pm)
  .action(async (projectNameArg: string | undefined, opts: Record<string, string>) => {
    const hasFlags =
      opts["frontend"] !== "none" ||
      opts["backend"] !== "none" ||
      opts["database"] !== "none" ||
      opts["auth"] !== "none" ||
      opts["ui"] !== "none" ||
      opts["email"] !== "none"

    // No args and no meaningful flags → interactive mode
    if (!projectNameArg && !hasFlags) {
      await runInteractive()
      return
    }

    // Flag mode — parse selections from CLI args
    const selections: Selections = {
      projectName: projectNameArg ?? DEFAULT_SELECTIONS.projectName,
      fe: (opts["frontend"] as Selections["fe"]) ?? DEFAULT_SELECTIONS.fe,
      be: (opts["backend"] as Selections["be"]) ?? DEFAULT_SELECTIONS.be,
      db: (opts["database"] as Selections["db"]) ?? DEFAULT_SELECTIONS.db,
      auth: (opts["auth"] as Selections["auth"]) ?? DEFAULT_SELECTIONS.auth,
      ui: (opts["ui"] as Selections["ui"]) ?? DEFAULT_SELECTIONS.ui,
      email: (opts["email"] as Selections["email"]) ?? DEFAULT_SELECTIONS.email,
      pm: (opts["packageManager"] as Selections["pm"]) ?? DEFAULT_SELECTIONS.pm,
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
