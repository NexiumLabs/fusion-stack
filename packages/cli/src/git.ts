import { execSync } from "node:child_process"
import * as clack from "@clack/prompts"

/**
 * Runs `git init`, stages all files, and creates an initial commit.
 * Fails silently if git is not on PATH or the directory is already inside a repo.
 */
export async function initGit(targetDir: string): Promise<void> {
  const s = clack.spinner()
  s.start("Initialising git repository…")
  try {
    execSync("git init", { cwd: targetDir, stdio: "pipe" })
    // Set a local identity in case the machine has no global git config
    execSync('git config user.email "scaffold@fusion-stack.local"', { cwd: targetDir, stdio: "pipe" })
    execSync('git config user.name "Fusion Stack"', { cwd: targetDir, stdio: "pipe" })
    execSync("git add -A", { cwd: targetDir, stdio: "pipe" })
    execSync('git commit -m "chore: initial scaffold"', { cwd: targetDir, stdio: "pipe" })
    s.stop("Git repository initialised.")
  } catch {
    s.stop("Git init skipped — git not available or already inside a repo.")
  }
}
