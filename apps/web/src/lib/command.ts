export type Selections = {
  name: string
  fe: string
  be: string
  db: string
  auth: string
  ui: string
  email: string
  pm: string
}

export function buildCommand(selections: Selections): string {
  const pm = selections.pm === "npm" ? "npx" : "pnpm"
  const createCmd = `${pm} create fusion-stack@latest`

  const flags: string[] = []

  if (selections.fe !== "none") flags.push(`--frontend ${selections.fe}`)
  if (selections.be !== "none") flags.push(`--backend ${selections.be}`)
  if (selections.db !== "none") flags.push(`--database ${selections.db}`)
  if (selections.auth !== "none") flags.push(`--auth ${selections.auth}`)
  if (selections.ui !== "none") flags.push(`--ui ${selections.ui}`)
  if (selections.email !== "none") flags.push(`--email ${selections.email}`)
  flags.push(`--package-manager ${selections.pm}`)

  const allParts = [createCmd, selections.name, ...flags]
  return allParts.join(" \\\n  ")
}
