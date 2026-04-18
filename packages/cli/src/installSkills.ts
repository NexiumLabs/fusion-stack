import * as clack from "@clack/prompts"
import pc from "picocolors"
import { execa } from "execa"

const SKILL_TIMEOUT_MS = 30_000 // 30 s per skill — kills hung processes

export async function installSkills(skills: string[], targetDir: string, pm: "pnpm" | "npm"): Promise<void> {
  if (skills.length === 0) return

  const [runner, ...runnerArgs] = pm === "pnpm"
    ? ["pnpm", "dlx", "skills", "add"]
    : ["npx", "--yes", "skills", "add"]

  const spin = clack.spinner()
  spin.start(`Installing ${skills.length} skill${skills.length > 1 ? "s" : ""} from skills.sh…`)

  const results = await Promise.allSettled(
    skills.map((skill) =>
      execa(runner, [...runnerArgs, skill, "--all-agents"], {
        cwd: targetDir,
        stdin: "ignore",   // prevent hanging on interactive prompts
        timeout: SKILL_TIMEOUT_MS,
      })
    )
  )

  spin.stop("Skills installation complete")

  skills.forEach((skill, i) => {
    const result = results[i]!
    if (result.status === "fulfilled") {
      clack.log.step(`${pc.green("✓")} ${skill}`)
    } else {
      clack.log.warn(`${skill} — run manually: npx skills add ${skill}`)
    }
  })
}
