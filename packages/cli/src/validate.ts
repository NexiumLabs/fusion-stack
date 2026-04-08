import type { Selections } from "./types.js"

type Rule = {
  /** "category:optionId" — when this combo is active… */
  when: string
  /** "category:optionId" — …this other combo is incompatible */
  clear: string
}

const RULES: Rule[] = [
  { when: "be:hono", clear: "db:convex" },
  { when: "be:none", clear: "db:convex" },
  { when: "fe:none", clear: "ui:shadcn" },
]

/** Returns human-readable conflict messages. Empty array = no conflicts. */
export function validateSelections(s: Selections): string[] {
  const errors: string[] = []
  const active = toMap(s)

  for (const rule of RULES) {
    const [whenCat, whenOpt] = rule.when.split(":")
    const [clearCat, clearOpt] = rule.clear.split(":")
    if (!whenCat || !whenOpt || !clearCat || !clearOpt) continue

    if (active[whenCat] === whenOpt && active[clearCat] === clearOpt) {
      errors.push(
        `--${flag(clearCat)} ${clearOpt} is not compatible with --${flag(whenCat)} ${whenOpt}`
      )
    }
  }

  return errors
}

/**
 * Returns a copy of selections with incompatible choices reset to "none".
 * Applied after each interactive prompt step.
 */
export function autoResolve(s: Selections): Selections {
  const result = { ...s }
  const active = toMap(result)

  for (const rule of RULES) {
    const [whenCat, whenOpt] = rule.when.split(":")
    const [clearCat, clearOpt] = rule.clear.split(":")
    if (!whenCat || !whenOpt || !clearCat || !clearOpt) continue

    if (active[whenCat] === whenOpt && active[clearCat] === clearOpt) {
      ;(result as Record<string, string>)[clearCat] = "none"
      active[clearCat] = "none"
    }
  }

  return result
}

function toMap(s: Selections): Record<string, string> {
  return {
    fe: s.fe,
    be: s.be,
    db: s.db,
    auth: s.auth,
    ui: s.ui,
    email: s.email,
    pm: s.pm,
  }
}

function flag(cat: string): string {
  const map: Record<string, string> = {
    fe: "frontend",
    be: "backend",
    db: "database",
    auth: "auth",
    ui: "ui",
    email: "email",
    pm: "package-manager",
  }
  return map[cat] ?? cat
}
