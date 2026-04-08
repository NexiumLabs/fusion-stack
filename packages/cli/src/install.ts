import { execa } from "execa"
import * as clack from "@clack/prompts"

export async function runInstall(targetDir: string, pm: "pnpm" | "npm"): Promise<void> {
  const spinner = clack.spinner()
  spinner.start(`Installing dependencies with ${pm}...`)

  try {
    await execa(pm, ["install"], {
      cwd: targetDir,
      stdio: "pipe",
    })
    spinner.stop("Dependencies installed.")
  } catch (err) {
    spinner.stop("Install failed.")
    throw err
  }
}
