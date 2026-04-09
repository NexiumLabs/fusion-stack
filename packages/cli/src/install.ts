import { execa } from "execa"
import * as clack from "@clack/prompts"
import pc from "picocolors"

export async function runInstall(targetDir: string, pm: "pnpm" | "npm"): Promise<void> {
  const spinner = clack.spinner()
  spinner.start(`Installing dependencies with ${pm}...`)

  try {
    // --ignore-workspace prevents pnpm from treating the generated project
    // as part of a parent workspace when the CLI is run from inside one.
    const args = pm === "pnpm" ? ["install", "--ignore-workspace"] : ["install"]
    await execa(pm, args, {
      cwd: targetDir,
      stdio: "pipe",
    })
    spinner.stop("Dependencies installed.")
  } catch (err) {
    spinner.stop("Install failed.")
    if (err instanceof Error && err.message) {
      console.error(pc.red(err.message))
    }
    throw err
  }
}
