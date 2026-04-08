import path from "node:path"
import { fileURLToPath } from "node:url"
import fse from "fs-extra"
import * as clack from "@clack/prompts"
import pc from "picocolors"
import { mergePackageJsons } from "./merge.js"
import { runInstall } from "./install.js"
import { printNextSteps } from "./postSteps.js"
import type { Selections } from "./types.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Root of the templates/ directory, works both from src/ (dev) and dist/ (built) */
const TEMPLATES_DIR = path.resolve(__dirname, "..", "templates")

/** Text file extensions to apply token substitution on */
const TEXT_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".mjs", ".cjs",
  ".json", ".md", ".mdx", ".css", ".html",
  ".env", ".example", ".gitignore", ".txt",
])

function resolveSlices(s: Selections): string[] {
  const slices: string[] = ["base"]
  if (s.fe === "nextjs") slices.push("fe-nextjs")
  if (s.be === "convex") slices.push("be-convex")
  if (s.be === "hono") slices.push("be-hono")
  if (s.db === "convex") slices.push("db-convex")
  if (s.auth === "clerk") slices.push("auth-clerk")
  if (s.auth === "better-auth") slices.push("auth-better-auth")
  if (s.ui === "shadcn") slices.push("ui-shadcn")
  if (s.email === "resend") slices.push("email-resend")
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
    // Extensionless files like .gitignore, .env.example, .env
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
    await fse.writeFile(path.join(targetDir, ".env.example"), mergedEnv + "\n", "utf-8")
  }

  // 8. Write merged package.json
  await fse.writeFile(
    path.join(targetDir, "package.json"),
    JSON.stringify(mergedPkg, null, 2) + "\n",
    "utf-8"
  )

  // 9. Apply token substitution across all text files
  const tokens: Record<string, string> = {
    PROJECT_NAME: s.projectName,
    PM: s.pm,
    PM_RUN: s.pm === "pnpm" ? "pnpm" : "npm run",
  }
  await walkAndApplyTokens(targetDir, tokens)

  clack.log.step("Project files written.")

  // 10. Install dependencies
  await runInstall(targetDir, s.pm)

  // 11. Print next steps
  printNextSteps(s)

  clack.outro(`${pc.green("Done!")} Happy building. ${pc.dim("— NexiumLabs")}`)
}
