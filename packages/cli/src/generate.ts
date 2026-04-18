import path from "node:path"
import { fileURLToPath } from "node:url"
import fse from "fs-extra"
import * as clack from "@clack/prompts"
import pc from "picocolors"
import { mergePackageJsons } from "./merge.js"
import { runInstall } from "./install.js"
import { printNextSteps } from "./postSteps.js"
import { installSkills } from "./installSkills.js"
import { buildGitignore } from "./gitignore.js"
import { initGit } from "./git.js"
import type { Selections } from "./types.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Root of the templates/ directory, works both from src/ (dev) and dist/ (built) */
const TEMPLATES_DIR = path.resolve(__dirname, "..", "templates")

/** Text file extensions to apply token substitution on */
const TEXT_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".mjs", ".cjs",
  ".json", ".md", ".mdx", ".css", ".html",
  ".env", ".example", ".gitignore", ".txt", ".prisma",
])

function resolveSlices(s: Selections): string[] {
  const slices: string[] = ["base"]

  // Frontend
  if (s.fe === "nextjs")         slices.push("fe-nextjs")
  if (s.fe === "tanstack-start") slices.push("fe-tanstack-start")
  if (s.fe === "vite-react")     slices.push("fe-vite-react")

  // Backend
  if (s.be === "convex")          slices.push("be-convex")
  if (s.be === "hono")            slices.push("be-hono")
  if (s.be === "nextjs")          slices.push("be-nextjs")
  if (s.be === "tanstack-start")  slices.push("be-tanstack-start")
  if (s.be === "vite")            slices.push("be-vite")

  // API layer — FE-aware slice selection
  if (s.apiLayer === "trpc") {
    if (s.fe === "tanstack-start") slices.push("api-trpc-tanstack-start")
    else if (s.fe === "vite-react") slices.push("api-trpc-vite")
    else                            slices.push("api-trpc")
  }
  if (s.apiLayer === "orpc") {
    if (s.fe === "tanstack-start") slices.push("api-orpc-tanstack-start")
    else if (s.fe === "vite-react") slices.push("api-orpc-vite")
    else                            slices.push("api-orpc")
  }

  // Database
  if (s.db === "convex") slices.push("db-convex")

  // ORM slices (Drizzle is dialect-specific, Prisma/Mongoose are universal)
  if (s.db === "postgresql" && s.orm === "drizzle") slices.push("orm-drizzle-pg")
  if (s.db === "mysql"      && s.orm === "drizzle") slices.push("orm-drizzle-mysql")
  if (s.db === "sqlite"     && s.orm === "drizzle") slices.push("orm-drizzle-sqlite")
  if (s.orm === "prisma")                           slices.push("orm-prisma")
  if (s.orm === "mongoose")                         slices.push("orm-mongoose")

  // Provider overlays (applied after ORM so they can add provider-specific clients)
  if (s.dbProvider === "supabase")    slices.push("provider-supabase")
  if (s.dbProvider === "neon")        slices.push("provider-neon")
  if (s.dbProvider === "planetscale") slices.push("provider-planetscale")

  // Auth — FE-aware slice selection
  if (s.auth === "clerk") {
    if (s.fe === "tanstack-start")      slices.push("auth-clerk-tanstack-start")
    else if (s.fe === "vite-react")     slices.push("auth-clerk-vite")
    else                                slices.push("auth-clerk")
  }
  if (s.auth === "better-auth") {
    if (s.fe === "tanstack-start")      slices.push("auth-better-auth-tanstack-start")
    else if (s.fe === "vite-react")     slices.push("auth-better-auth-vite")
    else                                slices.push("auth-better-auth")
  }
  if (s.auth === "workos") {
    if (s.fe === "tanstack-start")      slices.push("auth-workos-tanstack-start")
    else if (s.fe === "vite-react")     slices.push("auth-workos-vite")
    else                                slices.push("auth-workos")
  }

  // UI — FE-aware shadcn variant
  if (s.ui === "shadcn") {
    if (s.fe === "tanstack-start")      slices.push("ui-shadcn-tanstack-start")
    else if (s.fe === "vite-react")     slices.push("ui-shadcn-vite")
    else                                slices.push("ui-shadcn")
  }

  if (s.email === "resend") slices.push("email-resend")

  // Addons (last — can override config files)
  if (s.addons.includes("pwa")) {
    if (s.fe === "tanstack-start")      slices.push("addon-pwa-tanstack-start")
    else if (s.fe === "vite-react")     slices.push("addon-pwa-vite")
    else                                slices.push("addon-pwa")
  }

  return slices
}

function applyTokens(content: string, tokens: Record<string, string>): string {
  let result = content
  for (const [key, value] of Object.entries(tokens)) {
    result = result.replaceAll(`{{${key}}}`, value)
  }
  return result
}

function isTextFile(filePath: string): boolean {
  const ext = path.extname(filePath)
  if (ext === "") {
    const base = path.basename(filePath)
    return base.startsWith(".") || base === "Makefile"
  }
  return TEXT_EXTENSIONS.has(ext)
}

async function walkAndApplyTokens(dir: string, tokens: Record<string, string>): Promise<void> {
  const entries = await fse.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkAndApplyTokens(fullPath, tokens)
    } else if (entry.isFile() && isTextFile(fullPath)) {
      const content = await fse.readFile(fullPath, "utf-8")
      const replaced = applyTokens(content, tokens)
      if (replaced !== content) {
        await fse.writeFile(fullPath, replaced, "utf-8")
      }
    }
  }
}

async function collectEnvExamples(sliceDirs: string[]): Promise<string> {
  const parts: string[] = []
  for (const sliceDir of sliceDirs) {
    const envPath = path.join(sliceDir, ".env.example")
    if (await fse.pathExists(envPath)) {
      const sliceName = path.basename(sliceDir)
      const content = await fse.readFile(envPath, "utf-8")
      parts.push(`# --- ${sliceName} ---\n${content.trim()}`)
    }
  }
  return parts.join("\n\n")
}

/**
 * For Next.js root layout: move every file/dir from {targetDir}/src/ to {targetDir}/
 * and patch the tsconfig.json @/* path alias from ./src/* to ./*.
 */
async function flattenSrcDir(targetDir: string): Promise<void> {
  const srcDir = path.join(targetDir, "src")
  if (!(await fse.pathExists(srcDir))) return

  const entries = await fse.readdir(srcDir, { withFileTypes: true })
  for (const entry of entries) {
    const from = path.join(srcDir, entry.name)
    const to = path.join(targetDir, entry.name)
    await fse.move(from, to, { overwrite: true })
  }
  await fse.remove(srcDir)

  // Patch tsconfig.json: "@/*": ["./src/*"] → "@/*": ["./*"]
  const tsconfigPath = path.join(targetDir, "tsconfig.json")
  if (await fse.pathExists(tsconfigPath)) {
    const content = await fse.readFile(tsconfigPath, "utf-8")
    const patched = content.replace(/"\.\/src\/\*"/g, '"./*"')
    if (patched !== content) await fse.writeFile(tsconfigPath, patched, "utf-8")
  }
}

function stackConfigToken(s: Selections): string {
  const feMap:   Partial<Record<Selections["fe"],         string>> = { nextjs: "Next.js", "tanstack-start": "TanStack Start", "vite-react": "Vite + React" }
  const beMap:   Partial<Record<Selections["be"],         string>> = { convex: "Convex", hono: "Hono", nextjs: "Next.js API Routes", "tanstack-start": "TanStack Start", vite: "Vite (built-in)" }
  const authMap: Partial<Record<Selections["auth"],       string>> = { clerk: "Clerk", "better-auth": "Better Auth", workos: "WorkOS AuthKit" }
  const dbMap:   Partial<Record<Selections["db"],         string>> = { convex: "Convex DB", postgresql: "PostgreSQL", mongodb: "MongoDB", mysql: "MySQL", sqlite: "SQLite" }
  const ormMap:  Partial<Record<Selections["orm"],        string>> = { drizzle: "Drizzle", prisma: "Prisma", mongoose: "Mongoose" }
  const provMap: Partial<Record<Selections["dbProvider"], string>> = { supabase: "Supabase", neon: "Neon", planetscale: "PlanetScale" }
  const uiMap:   Partial<Record<Selections["ui"],         string>> = { shadcn: "shadcn/ui" }
  const apiMap:  Partial<Record<Selections["apiLayer"],   string>> = { trpc: "tRPC", orpc: "oRPC" }
  const emailMap:Partial<Record<Selections["email"],      string>> = { resend: "Resend" }

  const items: Array<{ label: string; value: string; icon: string }> = []
  if (feMap[s.fe])         items.push({ label: "Frontend",    value: feMap[s.fe]!,         icon: "⬡" })
  if (beMap[s.be])         items.push({ label: "Backend",     value: beMap[s.be]!,         icon: "⚙️" })
  if (authMap[s.auth])     items.push({ label: "Auth",        value: authMap[s.auth]!,     icon: "🔑" })
  if (dbMap[s.db])         items.push({ label: "Database",    value: dbMap[s.db]!,         icon: "🗄" })
  if (ormMap[s.orm])       items.push({ label: "ORM",         value: ormMap[s.orm]!,       icon: "📐" })
  if (provMap[s.dbProvider]) items.push({ label: "DB Provider", value: provMap[s.dbProvider]!, icon: "☁️" })
  if (uiMap[s.ui])         items.push({ label: "UI",          value: uiMap[s.ui]!,         icon: "🎨" })
  if (apiMap[s.apiLayer])  items.push({ label: "API Layer",   value: apiMap[s.apiLayer]!,  icon: "🔌" })
  if (emailMap[s.email])   items.push({ label: "Email",       value: emailMap[s.email]!,   icon: "✉️" })
  if (s.addons.includes("pwa")) items.push({ label: "Addon", value: "PWA",                 icon: "📱" })
  return JSON.stringify(items)
}

function prismaProvider(db: Selections["db"]): string {
  const map: Partial<Record<Selections["db"], string>> = {
    postgresql: "postgresql",
    mongodb:    "mongodb",
    mysql:      "mysql",
    sqlite:     "sqlite",
  }
  return map[db] ?? "postgresql"
}

export async function generate(s: Selections, targetDir: string): Promise<void> {
  // 1. Fail early if target exists
  if (await fse.pathExists(targetDir)) {
    clack.log.error(`Directory ${pc.bold(path.basename(targetDir))} already exists.`)
    process.exit(1)
  }

  // 2. Resolve slices
  const sliceNames = resolveSlices(s)
  const sliceDirs = sliceNames.map((name) => path.join(TEMPLATES_DIR, name))

  clack.log.step(`Composing ${sliceNames.length} slice(s): ${sliceNames.join(", ")}`)

  // 3. Load package.json fragments
  const pkgFragments: Record<string, unknown>[] = []
  for (const sliceDir of sliceDirs) {
    const pkgPath = path.join(sliceDir, "package.json")
    if (await fse.pathExists(pkgPath)) {
      const content = await fse.readJson(pkgPath) as Record<string, unknown>
      pkgFragments.push(content)
    }
  }

  // 4. Merge package.json fragments + inject project metadata
  const mergedPkg = mergePackageJsons(pkgFragments)
  mergedPkg["name"] = s.projectName
  mergedPkg["version"] = "0.1.0"
  mergedPkg["private"] = true

  // be:vite runs inside the Vite process — no combined dev script needed.
  // When standalone Hono is paired with Vite-based frontends, run both with concurrently.
  if (s.be === "hono" && (s.fe === "vite-react" || s.fe === "tanstack-start")) {
    const feCmd = s.fe === "tanstack-start" ? "vinxi dev" : "vite"
    const scripts = (mergedPkg["scripts"] ?? {}) as Record<string, string>
    scripts["dev"] = `concurrently "${feCmd}" "tsx watch src/server/index.ts"`
    scripts["dev:client"] = feCmd
    scripts["dev:server"] = "tsx watch src/server/index.ts"
    mergedPkg["scripts"] = scripts
  }

  // 5. Create target directory
  await fse.mkdirp(targetDir)

  // 6. Copy slices in order (later slices win on file conflicts)
  //    Skip: _manifest.json, package.json, .env.example (handled separately)
  for (const sliceDir of sliceDirs) {
    await fse.copy(sliceDir, targetDir, {
      overwrite: true,
      filter: (src) => {
        const base = path.basename(src)
        return base !== "_manifest.json" && base !== "package.json" && base !== ".env.example"
      },
    })
  }

  // 7. Merge .env.example files
  const mergedEnv = await collectEnvExamples(sliceDirs)
  if (mergedEnv) {
    const exampleHeader = "# Copy this file to .env.local and fill in your values\n\n"
    await fse.writeFile(path.join(targetDir, ".env.example"), exampleHeader + mergedEnv + "\n", "utf-8")
    // Also write .env.local as a ready-to-edit starting point (it's gitignored — safe to generate)
    const localHeader = "# Fill in your values — this file is gitignored and never committed\n\n"
    await fse.writeFile(path.join(targetDir, ".env.local"), localHeader + mergedEnv + "\n", "utf-8")
  }

  // 8. Write merged package.json
  await fse.writeFile(
    path.join(targetDir, "package.json"),
    JSON.stringify(mergedPkg, null, 2) + "\n",
    "utf-8"
  )

  // 9. Apply token substitution across all text files
  const tokens: Record<string, string> = {
    PROJECT_NAME:      s.projectName,
    PM:                s.pm,
    PM_RUN:            s.pm === "pnpm" ? "pnpm" : "npm run",
    PRISMA_PROVIDER:   prismaProvider(s.db),
    PUBLIC_VAR_PREFIX: s.fe === "nextjs" ? "NEXT_PUBLIC" : "VITE",
    STACK_CONFIG:      stackConfigToken(s),
  }
  await walkAndApplyTokens(targetDir, tokens)

  // 9a. Root layout — move src/* to project root and patch tsconfig paths
  if (s.fe === "nextjs" && !s.srcDir) {
    await flattenSrcDir(targetDir)
  }

  // 9b. Write final .gitignore — programmatic generation wins over any slice copy
  await fse.writeFile(path.join(targetDir, ".gitignore"), buildGitignore(s), "utf-8")

  clack.log.step("Project files written.")

  // 9c. Initialize git repository
  if (s.git) {
    await initGit(targetDir)
  }

  // 10. Install dependencies
  await runInstall(targetDir, s.pm)

  // 11. Print next steps
  printNextSteps(s)

  // 12. Install skills
  await installSkills(s.skills, targetDir, s.pm)

  clack.outro(`${pc.green("Done!")} Happy building. ${pc.dim("— NexiumLabs")}`)
}
