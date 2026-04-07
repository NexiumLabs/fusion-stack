export type StackOption = {
  id: string
  label: string
  description: string
  icon: string
  default?: boolean
  incompatibleWith?: string[]
}

export type StackCategory = {
  id: string
  label: string
  multiple?: boolean
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
        icon: "▲",
        default: true,
      },
      {
        id: "none",
        label: "No Frontend",
        description: "API or backend-only project",
        icon: "○",
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
        description: "Reactive backend-as-a-service",
        icon: "⚡",
        default: true,
      },
      {
        id: "hono",
        label: "Hono",
        description: "Ultrafast web framework",
        icon: "🔥",
      },
      {
        id: "none",
        label: "No Backend",
        description: "Frontend-only or BaaS project",
        icon: "○",
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
        icon: "🔐",
        default: true,
      },
      {
        id: "better-auth",
        label: "Better Auth",
        description: "TypeScript-first auth framework",
        icon: "🛡️",
      },
      {
        id: "none",
        label: "No Auth",
        description: "Handle authentication yourself",
        icon: "○",
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
        description: "Email API for developers",
        icon: "✉️",
        default: true,
      },
      {
        id: "none",
        label: "No Email",
        description: "No transactional email needed",
        icon: "○",
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
        icon: "📦",
        default: true,
      },
      {
        id: "bun",
        label: "Bun",
        description: "All-in-one JavaScript runtime",
        icon: "🍞",
      },
      {
        id: "npm",
        label: "npm",
        description: "The original Node.js package manager",
        icon: "📦",
      },
    ],
  },
]

export const COMPATIBILITY: Record<string, string[]> = {
  convex: [],
  hono: [],
  clerk: [],
  "better-auth": [],
  nextjs: [],
  resend: [],
}

export function getIncompatible(
  optionId: string,
  categoryId: string,
  selections: Record<string, string>
): string | null {
  const category = STACKS.find((c) => c.id === categoryId)
  if (!category) return null

  for (const [selCatId, selOptId] of Object.entries(selections)) {
    if (selCatId === categoryId) continue
    const selCategory = STACKS.find((c) => c.id === selCatId)
    if (!selCategory) continue
    const selOption = selCategory.options.find((o) => o.id === selOptId)
    if (!selOption) continue
    if (selOption.incompatibleWith?.includes(optionId)) {
      return `Not compatible with ${selOption.label}`
    }
    const thisOption = category.options.find((o) => o.id === optionId)
    if (thisOption?.incompatibleWith?.includes(selOptId)) {
      return `Not compatible with ${selOption.label}`
    }
  }

  return null
}
