export type Skill = {
  /** skills.sh identifier — owner/repo format, passed to `npx skillsadd` */
  id: string
  label: string
  description: string
}

export const SKILLS_CATALOG: Skill[] = [
  {
    id:          "careerops/career-ops",
    label:       "CareerOps",
    description: "Career management, job search automation, and interview prep",
  },
  {
    id:          "nextjs-patterns/skills",
    label:       "Next.js Patterns",
    description: "App Router patterns, server components, and best practices",
  },
  {
    id:          "react-skills/core",
    label:       "React Best Practices",
    description: "Component design, hooks, performance, and state patterns",
  },
  {
    id:          "typescript-skills/mastery",
    label:       "TypeScript Mastery",
    description: "Advanced types, generics, utility types, and tooling",
  },
  {
    id:          "database-skills/postgresql",
    label:       "PostgreSQL",
    description: "Query design, indexing, schema normalization, and performance",
  },
  {
    id:          "testing-skills/vitest",
    label:       "Testing (Vitest / Playwright)",
    description: "Unit, integration, and end-to-end testing patterns",
  },
  {
    id:          "tailwind-skills/core",
    label:       "Tailwind CSS",
    description: "Utility-first styling, design systems, and responsive layouts",
  },
]

/** Parse a comma-separated skills string back into an array of IDs */
export function parseSkills(raw: string): string[] {
  if (!raw || raw === "none") return []
  return raw.split(",").map((s) => s.trim()).filter(Boolean)
}

/** Serialize an array of skill IDs to a comma-separated string for URL state */
export function serializeSkills(skills: string[]): string {
  return skills.length > 0 ? skills.join(",") : "none"
}
