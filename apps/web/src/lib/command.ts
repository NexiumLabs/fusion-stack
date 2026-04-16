export type Selections = {
  name:        string
  fe:          string
  be:          string
  api_layer:   string
  db:          string
  orm:         string
  db_provider: string
  auth:        string
  ui:          string
  email:       string
  /** Comma-separated addon + skill IDs, e.g. "pwa,skill-careerops" */
  addons:      string
  pm:          string
}

/** Maps skill addon option IDs → npx skillsadd identifiers */
const SKILL_IDENTIFIERS: Record<string, string> = {
  "skill-careerops":        "careerops/career-ops",
  "skill-nextjs-patterns":  "nextjs-patterns/skills",
  "skill-react":            "react-skills/core",
  "skill-typescript":       "typescript-skills/mastery",
  "skill-postgresql":       "database-skills/postgresql",
  "skill-testing":          "testing-skills/vitest",
  "skill-tailwind":         "tailwind-skills/core",
}

export function buildCommand(selections: Selections): string {
  const pm = selections.pm === "npm" ? "npx" : "pnpm"
  const createCmd = `${pm} create fusion-stack@latest`

  const flags: string[] = []

  if (selections.fe !== "none")          flags.push(`--frontend ${selections.fe}`)
  if (selections.be !== "none")          flags.push(`--backend ${selections.be}`)
  if (selections.api_layer !== "none")   flags.push(`--api-layer ${selections.api_layer}`)
  if (selections.db !== "none")          flags.push(`--database ${selections.db}`)
  if (selections.orm !== "none")         flags.push(`--orm ${selections.orm}`)
  if (selections.db_provider !== "none") flags.push(`--db-provider ${selections.db_provider}`)
  if (selections.auth !== "none")        flags.push(`--auth ${selections.auth}`)
  if (selections.ui !== "none")          flags.push(`--ui ${selections.ui}`)
  if (selections.email !== "none")       flags.push(`--email ${selections.email}`)

  // Split addons into project addons (e.g. pwa) and skills (skill-*)
  const addonIds = selections.addons
    ? selections.addons.split(",").filter((v) => v && v !== "none")
    : []

  const projectAddons = addonIds.filter((id) => !id.startsWith("skill-"))
  const skillIds = addonIds
    .filter((id) => id.startsWith("skill-"))
    .map((id) => SKILL_IDENTIFIERS[id])
    .filter(Boolean) as string[]

  if (projectAddons.length > 0) flags.push(`--addons ${projectAddons.join(",")}`)
  if (skillIds.length > 0)      flags.push(`--skills ${skillIds.join(",")}`)

  flags.push(`--package-manager ${selections.pm}`)

  const allParts = [createCmd, selections.name, ...flags]
  return allParts.join(" \\\n  ")
}
