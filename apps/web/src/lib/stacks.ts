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
  /** If true, multiple options can be active simultaneously (stored as comma-separated string) */
  multi?: boolean
  /**
   * If true, the chip for this category is hidden when the default option is selected.
   * Use for boolean toggles (e.g. git) where the "yes" state is not worth showing.
   * The chip still appears when a non-default option is active.
   */
  hideChipWhenDefault?: boolean
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
        id: "tanstack-start",
        label: "TanStack Start",
        description: "Full-stack React with Vite, file-based routing, and server functions",
        icon: "tanstack",
        isNew: true,
      },
      {
        id: "vite-react",
        label: "Vite + React",
        description: "Fast React SPA — pair with any backend or use standalone",
        icon: "vite",
        isNew: true,
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
        id: "nextjs",
        label: "Next.js API Routes",
        description: "Built-in App Router route handlers — no separate server process",
        icon: "nextjs",
        isNew: true,
        incompatibleWith: ["db:convex", "fe:tanstack-start", "fe:vite-react", "fe:none"],
      },
      {
        id: "tanstack-start",
        label: "TanStack Start (built-in)",
        description: "Native API routes via createAPIFileRoute — no separate server process",
        icon: "tanstack",
        isNew: true,
        incompatibleWith: ["fe:nextjs", "fe:vite-react", "fe:none", "db:convex"],
      },
      {
        id: "vite",
        label: "Vite (built-in API)",
        description: "Hono API mounted inside the Vite dev server — single port, no concurrently",
        icon: "vite",
        isNew: true,
        incompatibleWith: ["fe:nextjs", "fe:tanstack-start", "fe:none", "db:convex"],
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
    id: "api_layer",
    label: "API Layer",
    options: [
      {
        id: "none",
        label: "None",
        description: "Plain fetch or bring your own API layer",
        icon: "none",
        default: true,
      },
      {
        id: "trpc",
        label: "tRPC",
        description: "End-to-end type-safe RPC — no schema, no code generation",
        icon: "trpc",
        isNew: true,
        incompatibleWith: ["be:convex", "be:none"],
      },
      {
        id: "orpc",
        label: "oRPC",
        description: "OpenAPI-compatible, Zod-first RPC with type inference",
        icon: "orpc",
        isNew: true,
        incompatibleWith: ["be:convex", "be:none"],
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
        incompatibleWith: ["be:hono", "be:nextjs", "be:tanstack-start", "be:vite", "be:none"],
      },
      {
        id: "postgresql",
        label: "PostgreSQL",
        description: "Powerful open-source relational database — pair with Drizzle or Prisma",
        icon: "postgresql",
        isNew: true,
        incompatibleWith: ["be:convex"],
      },
      {
        id: "mongodb",
        label: "MongoDB",
        description: "Flexible document database — pair with Mongoose or Prisma",
        icon: "mongodb",
        isNew: true,
        incompatibleWith: ["be:convex"],
      },
      {
        id: "mysql",
        label: "MySQL",
        description: "Popular open-source relational database — pair with Drizzle or Prisma",
        icon: "mysql",
        isNew: true,
        incompatibleWith: ["be:convex"],
      },
      {
        id: "sqlite",
        label: "SQLite",
        description: "Lightweight embedded database — perfect for local dev and edge runtimes",
        icon: "sqlite",
        isNew: true,
        incompatibleWith: ["be:convex"],
      },
      {
        id: "none",
        label: "None for now",
        description: "No database — add one later",
        icon: "none",
      },
    ],
  },
  {
    id: "orm",
    label: "ORM",
    options: [
      {
        id: "none",
        label: "None",
        description: "No ORM — query your database directly",
        icon: "none",
        default: true,
        incompatibleWith: ["db:mongodb"],
      },
      {
        id: "drizzle",
        label: "Drizzle",
        description: "Lightweight TypeScript ORM with a SQL-like query API",
        icon: "drizzle",
        isNew: true,
        incompatibleWith: ["db:convex", "db:none", "db:mongodb"],
      },
      {
        id: "prisma",
        label: "Prisma",
        description: "Type-safe ORM with schema-first migrations — supports all databases",
        icon: "prisma",
        isNew: true,
        incompatibleWith: ["db:convex", "db:none"],
      },
      {
        id: "mongoose",
        label: "Mongoose",
        description: "Elegant MongoDB object modeling for Node.js",
        icon: "mongoose",
        isNew: true,
        incompatibleWith: ["db:convex", "db:none", "db:postgresql", "db:mysql", "db:sqlite"],
      },
    ],
  },
  {
    id: "db_provider",
    label: "DB Provider",
    options: [
      {
        id: "none",
        label: "Self-hosted / Local",
        description: "Use your own connection string — Docker, local install, or any host",
        icon: "none",
        default: true,
      },
      {
        id: "neon",
        label: "Neon",
        description: "Serverless Postgres with a generous free tier and instant branching",
        icon: "neon",
        isNew: true,
        incompatibleWith: ["db:convex", "db:none", "db:mongodb", "db:mysql", "db:sqlite"],
      },
      {
        id: "supabase",
        label: "Supabase",
        description: "Postgres with auth, storage, realtime, and a dashboard included",
        icon: "supabase",
        isNew: true,
        incompatibleWith: ["db:convex", "db:none", "db:mongodb", "db:mysql", "db:sqlite"],
      },
      {
        id: "planetscale",
        label: "PlanetScale",
        description: "Serverless MySQL with a Git-like database branching workflow",
        icon: "planetscale",
        isNew: true,
        incompatibleWith: ["db:convex", "db:none", "db:mongodb", "db:postgresql", "db:sqlite"],
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
    id: "addons",
    label: "Addons",
    multi: true,
    options: [
      {
        id: "pwa",
        label: "PWA",
        description: "Service worker and web manifest — Next.js via next-pwa, Vite via vite-plugin-pwa",
        icon: "pwa",
        isNew: true,
        incompatibleWith: ["fe:none"],
      },
      {
        id: "skill-careerops",
        label: "CareerOps",
        description: "Career management, job search automation, and interview prep",
        icon: "skill",
        isNew: true,
      },
      {
        id: "skill-nextjs-patterns",
        label: "Next.js Patterns",
        description: "App Router patterns, server components, and best practices",
        icon: "skill",
        isNew: true,
      },
      {
        id: "skill-react",
        label: "React Best Practices",
        description: "Component design, hooks, performance, and state patterns",
        icon: "skill",
        isNew: true,
      },
      {
        id: "skill-typescript",
        label: "TypeScript Mastery",
        description: "Advanced types, generics, utility types, and tooling",
        icon: "skill",
        isNew: true,
      },
      {
        id: "skill-postgresql",
        label: "PostgreSQL Skills",
        description: "Query design, indexing, schema normalization, and performance",
        icon: "skill",
        isNew: true,
      },
      {
        id: "skill-testing",
        label: "Testing (Vitest / Playwright)",
        description: "Unit, integration, and end-to-end testing patterns",
        icon: "skill",
        isNew: true,
      },
      {
        id: "skill-tailwind",
        label: "Tailwind CSS Skills",
        description: "Utility-first styling, design systems, and responsive layouts",
        icon: "skill",
        isNew: true,
      },
    ],
  },
  {
    id: "git",
    label: "Git",
    hideChipWhenDefault: true,
    options: [
      {
        id: "yes",
        label: "Initialize Git",
        description: "Run git init + create an initial commit with all scaffolded files",
        icon: "git",
        default: true,
      },
      {
        id: "no",
        label: "Skip",
        description: "No git initialization — set it up yourself",
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
        // When the blocking option is "none", show a dependency hint instead of "Not compatible with None"
        if (rOpt === "none") {
          return `Requires a ${conflictCat?.label.toLowerCase() ?? rCat}`
        }
        return `Not compatible with ${conflictOpt?.label ?? rOpt}`
      }
    }
  }

  // Reverse check: does something already selected declare itself incompatible with this?
  for (const [selCatId, selOptId] of Object.entries(selections)) {
    if (selCatId === categoryId) continue
    // ORM is downstream of DB — don't let ORM default ("none") block DB selection.
    // The forward check already prevents picking orm:none after db:mongodb is chosen.
    if (categoryId === "db" && selCatId === "orm") continue
    const selCat = STACKS.find((c) => c.id === selCatId)
    const selOpt = selCat?.options.find((o) => o.id === selOptId)
    if (!selOpt?.incompatibleWith) continue

    for (const rule of selOpt.incompatibleWith) {
      const [rCat, rOpt] = rule.split(":")
      if (rCat === categoryId && rOpt === optionId) {
        // When the selected option is itself a "none" choice, give a dependency hint
        if (selOptId === "none") {
          return `Requires a ${selCat?.label.toLowerCase() ?? selCatId}`
        }
        return `Not compatible with ${selOpt.label}`
      }
    }
  }

  return null
}
