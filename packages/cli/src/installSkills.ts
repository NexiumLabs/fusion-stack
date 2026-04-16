import * as clack from "@clack/prompts"
import { execa } from "execa"

export async function installSkills(skills: string[], targetDir: string): Promise<void> {
  if (skills.length === 0) return

  clack.log.step("Installing skills from skills.sh…")

  for (const skill of skills) {
    const spin = clack.spinner()
    spin.start(`Installing ${skill}`)
    try {
      await execa("npx", ["skillsadd", skill], { cwd: targetDir })
      spin.stop(`Installed ${skill}`)
    } catch {
      spin.stop(`Could not install ${skill} — run manually: npx skillsadd ${skill}`)
    }
  }
}
