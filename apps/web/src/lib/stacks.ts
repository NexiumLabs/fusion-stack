export type StackOption = {
  id: string
  label: string
  description: string
  icon: string
  default?: boolean
  isNew?: boolean
  /** Format: "categoryId:optionId" — e.g. "be:hono" means incompatible when backend is Hono */
  incompatibleWith?: string[]
}

export type StackCategory = {
  id: string
  label: string
  options: StackOption[]
}

export const STACKS: StackCategory[] = [
  {
    id: "fe",
    label: "Web Frontend",
    options: [
      {
        id: "nextjs",
        label: "Next.js",
        description: "React framework with hybrid rendering",
        icon: "nextjs",
        default: true,
      },
      {
        id: "none",
        label: "No Frontend",
        description: "API or backend-only project",
        icon: "none",
      },
    ],
  },
  {
    id: "be",
    label: "Backend",
    options: [
      {
        id: "convex",
        label: "Convex",
        description: "Reactive backend-as-a-service with built-in database",
        icon: "convex",
        default: true,
      },
      {
        id: "hono",
        label: "Hono",
        description: "Ultrafast web framework for Node.js",
        icon: "hono",
      },
      {
        id: "none",
        label: "No Backend",
        description: "Frontend-only or external API",
        icon: "none",
      },
    ],
  },
  {
    id: "db",
    label: "Database",
    options: [
      {
        id: "convex",
        label: "Convex",
        description: "Built into Convex backend — reactive queries, zero config",
        icon: "convex",
        default: true,
        // Convex DB only makes sense when Convex is the backend
        incompatibleWith: ["be:hono", "be:none"],
      },
      {
        id: "none",
        label: "None for now",
        description: "No database — Drizzle & Prisma support coming soon",
        icon: "none",
      },
    ],
  },
  {
    id: "auth",
    label: "Authentication",
    options: [
      {
        id: "clerk",
        label: "Clerk",
        description: "Complete user management platform",
        icon: "clerk",
        default: true,
      },
      {
        id: "workos",
        label: "WorkOS AuthKit",
        description: "Enterprise SSO, magic links, and a hosted auth UI — zero custom sign-in pages needed",
        icon: "workos",
        isNew: true,
      },
      {
        id: "better-auth",
        label: "Better Auth",
        description: "TypeScript-first auth framework",
        icon: "better-auth",
      },
      {
        id: "none",
        label: "No Auth",
        description: "Handle authentication yourself",
        icon: "none",
      },
    ],
  },
  {
    id: "ui",
    label: "UI Library",
    options: [
      {
        id: "none",
        label: "Tailwind only",
        description: "Utility-first CSS — no component library",
        icon: "tailwind",
        default: true,
      },
      {
        id: "shadcn",
        label: "shadcn/ui",
        description: "Copy-paste components built on Radix UI and Tailwind",
        icon: "shadcn",
        // shadcn/ui requires a React frontend
        incompatibleWith: ["fe:none"],
      },
    ],
  },
  {
    id: "email",
    label: "Email",
    options: [
      {
        id: "resend",
        label: "Resend",
        description: "Email API built for developers",
        icon: "resend",
        default: true,
      },
      {
        id: "none",
        label: "No Email",
        description: "No transactional email needed",
        icon: "none",
      },
    ],
  },
  {
    id: "pm",
    label: "Package Manager",
    options: [
      {
        id: "pnpm",
        label: "pnpm",
        description: "Fast, disk-efficient package manager",
        icon: "pnpm",
        default: true,
      },
      {
        id: "npm",
        label: "npm",
        description: "The original Node.js package manager",
        icon: "npm",
      },
    ],
  },
]

/**
 * Returns a human-readable incompatibility reason for a given option,
 * given the current selections. Returns null if no conflict.
 *
 * incompatibleWith uses "categoryId:optionId" format, e.g. "be:hono"
 */
export function getIncompatible(
  optionId: string,
  categoryId: string,
  selections: Record<string, string>
): string | null {
  const category = STACKS.find((c) => c.id === categoryId)
  if (!category) return null
  const thisOption = category.options.find((o) => o.id === optionId)
  if (!thisOption) return null

  // Forward check: does this option declare itself incompatible with something selected?
  if (thisOption.incompatibleWith) {
    for (const rule of thisOption.incompatibleWith) {
      const [rCat, rOpt] = rule.split(":")
      if (rCat && rOpt && selections[rCat] === rOpt) {
        const conflictCat = STACKS.find((c) => c.id === rCat)
        const conflictOpt = conflictCat?.options.find((o) => o.id === rOpt)
        return `Not compatible with ${conflictOpt?.label ?? rOpt}`
      }
    }
  }

  // Reverse check: does something already selected declare itself incompatible with this?
  for (const [selCatId, selOptId] of Object.entries(selections)) {
    if (selCatId === categoryId) continue
    const selCat = STACKS.find((c) => c.id === selCatId)
    const selOpt = selCat?.options.find((o) => o.id === selOptId)
    if (!selOpt?.incompatibleWith) continue

    for (const rule of selOpt.incompatibleWith) {
      const [rCat, rOpt] = rule.split(":")
      if (rCat === categoryId && rOpt === optionId) {
        return `Not compatible with ${selOpt.label}`
      }
    }
  }

  return null
}
