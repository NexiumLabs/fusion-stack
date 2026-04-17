import type { Selections } from "./types.js"

type Rule = {
  /** "category:optionId" — when this combo is active… */
  when: string
  /** "category:optionId" — …this other combo is incompatible */
  clear: string
}

const RULES: Rule[] = [
  // Existing rules
  { when: "be:hono",   clear: "db:convex" },
  { when: "be:nextjs", clear: "db:convex" },
  { when: "be:none",   clear: "db:convex" },
  { when: "fe:none",   clear: "ui:shadcn" },

  // Convex backend is incompatible with external databases
  { when: "be:convex", clear: "db:postgresql" },
  { when: "be:convex", clear: "db:mysql" },
  { when: "be:convex", clear: "db:mongodb" },
  { when: "be:convex", clear: "db:sqlite" },

  // API layer rules
  { when: "be:convex", clear: "api:trpc" },
  { when: "be:convex", clear: "api:orpc" },
  { when: "be:none",   clear: "api:trpc" },
  { when: "be:none",   clear: "api:orpc" },

  // ORM incompatibilities
  { when: "db:none",       clear: "orm:drizzle" },
  { when: "db:none",       clear: "orm:prisma" },
  { when: "db:none",       clear: "orm:mongoose" },
  { when: "db:convex",     clear: "orm:drizzle" },
  { when: "db:convex",     clear: "orm:prisma" },
  { when: "db:convex",     clear: "orm:mongoose" },
  { when: "db:mongodb",    clear: "orm:drizzle" },      // Drizzle doesn't support MongoDB
  { when: "db:postgresql", clear: "orm:mongoose" },     // Mongoose is MongoDB-only
  { when: "db:mysql",      clear: "orm:mongoose" },
  { when: "db:sqlite",     clear: "orm:mongoose" },

  // New frontends: block framework-specific backends on the wrong FE
  { when: "fe:tanstack-start",  clear: "be:nextjs" },
  { when: "fe:tanstack-start",  clear: "be:vite" },
  { when: "fe:vite-react",      clear: "be:nextjs" },
  { when: "fe:vite-react",      clear: "be:tanstack-start" },
  { when: "fe:nextjs",          clear: "be:tanstack-start" },
  { when: "fe:nextjs",          clear: "be:vite" },
  { when: "fe:none",            clear: "be:tanstack-start" },
  { when: "fe:none",            clear: "be:vite" },
  // be:tanstack-start cannot use Convex DB (no Convex backend)
  { when: "be:tanstack-start",  clear: "db:convex" },
  // be:vite cannot use Convex DB (Convex requires its own backend)
  { when: "be:vite",            clear: "db:convex" },

  // Provider incompatibilities
  { when: "db:none",       clear: "dbProvider:supabase" },
  { when: "db:none",       clear: "dbProvider:neon" },
  { when: "db:none",       clear: "dbProvider:planetscale" },
  { when: "db:convex",     clear: "dbProvider:supabase" },
  { when: "db:convex",     clear: "dbProvider:neon" },
  { when: "db:convex",     clear: "dbProvider:planetscale" },
  { when: "db:sqlite",     clear: "dbProvider:supabase" },
  { when: "db:sqlite",     clear: "dbProvider:neon" },
  { when: "db:sqlite",     clear: "dbProvider:planetscale" },
  { when: "db:mongodb",    clear: "dbProvider:supabase" },
  { when: "db:mongodb",    clear: "dbProvider:neon" },
  { when: "db:mongodb",    clear: "dbProvider:planetscale" },
  { when: "db:mysql",      clear: "dbProvider:supabase" },
  { when: "db:mysql",      clear: "dbProvider:neon" },
  { when: "db:postgresql", clear: "dbProvider:planetscale" },
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
      // Map rule category back to the Selections key name
      const selKey = catToKey(clearCat)
      if (selKey) {
        ;(result as Record<string, unknown>)[selKey] = "none"
      }
      active[clearCat] = "none"
    }
  }

  // Addon validation — PWA requires a web frontend
  if (result.fe === "none") {
    result.addons = result.addons.filter((a) => a !== "pwa")
  }

  return result
}

function toMap(s: Selections): Record<string, string> {
  return {
    fe:         s.fe,
    be:         s.be,
    db:         s.db,
    orm:        s.orm,
    dbProvider: s.dbProvider,
    auth:       s.auth,
    ui:         s.ui,
    email:      s.email,
    pm:         s.pm,
    api:        s.apiLayer,
  }
}

function flag(cat: string): string {
  const map: Record<string, string> = {
    fe:         "frontend",
    be:         "backend",
    db:         "database",
    orm:        "orm",
    dbProvider: "db-provider",
    auth:       "auth",
    ui:         "ui",
    email:      "email",
    pm:         "package-manager",
    api:        "api-layer",
  }
  return map[cat] ?? cat
}

/** Maps a rule category key (used in toMap) back to the Selections property name */
function catToKey(cat: string): keyof Selections | null {
  const map: Record<string, keyof Selections> = {
    fe:         "fe",
    be:         "be",
    db:         "db",
    orm:        "orm",
    dbProvider: "dbProvider",
    auth:       "auth",
    ui:         "ui",
    email:      "email",
    pm:         "pm",
    api:        "apiLayer",
  }
  return map[cat] ?? null
}
