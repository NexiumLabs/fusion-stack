import type { Selections } from "./types.js"

/**
 * Generates a selection-aware .gitignore for the scaffolded project.
 * This runs after all slices are copied and overwrites any template .gitignore,
 * ensuring the final file always matches exactly what the user selected.
 */
export function buildGitignore(s: Selections): string {
  const sections: string[] = []

  // ── Dependencies ────────────────────────────────────────────────────────────
  sections.push(
    "# Dependencies\n" +
    "node_modules/\n" +
    ".pnp\n" +
    ".pnp.js"
  )

  // ── Environment ─────────────────────────────────────────────────────────────
  const envLines: string[] = [
    "# Environment — secrets and local overrides, never commit these",
    ".env",
    ".env.local",
    ".env.*.local",
    ".env.production",
  ]

  // Contextual reminder: which keys belong in .env.local for this stack
  const keyHints: string[] = []

  if (s.auth === "clerk") {
    const pub = s.fe === "nextjs" ? "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" : "VITE_CLERK_PUBLISHABLE_KEY"
    keyHints.push(`# ${pub}=pk_...`, "# CLERK_SECRET_KEY=sk_...")
  }
  if (s.auth === "better-auth") {
    keyHints.push("# AUTH_SECRET=  # openssl rand -base64 32")
    if (s.fe !== "nextjs") {
      const url = s.fe === "tanstack-start" ? "http://localhost:3000" : "http://localhost:5173"
      keyHints.push(`# VITE_APP_URL=${url}`)
    }
  }
  if (s.auth === "workos") {
    keyHints.push("# WORKOS_API_KEY=sk_...", "# WORKOS_CLIENT_ID=client_...")
    if (s.fe === "nextjs") {
      keyHints.push("# WORKOS_COOKIE_PASSWORD=  # openssl rand -base64 32")
    } else {
      keyHints.push("# WORKOS_SESSION_SECRET=  # openssl rand -base64 32")
    }
    if (s.fe !== "nextjs") {
      keyHints.push("# VITE_WORKOS_CLIENT_ID=client_...")
    }
  }
  if (s.orm === "drizzle" || s.orm === "prisma") {
    const example =
      s.db === "mysql"  ? "mysql://user:password@localhost:3306/mydb" :
      s.db === "sqlite" ? "file:./local.db" :
      "postgresql://user:password@localhost:5432/mydb"
    keyHints.push(`# DATABASE_URL=${example}`)
  }
  if (s.orm === "mongoose") {
    keyHints.push("# MONGODB_URI=mongodb+srv://...")
  }
  if (s.dbProvider === "supabase") {
    const prefix = s.fe === "nextjs" ? "NEXT_PUBLIC" : "VITE"
    keyHints.push(`# ${prefix}_SUPABASE_URL=https://<project>.supabase.co`, `# ${prefix}_SUPABASE_ANON_KEY=eyJ...`)
  }
  if (s.email === "resend") {
    keyHints.push("# RESEND_API_KEY=re_...")
  }
  if (s.addons.includes("pwa")) {
    const pub = s.fe === "nextjs" ? "NEXT_PUBLIC_VAPID_PUBLIC_KEY" : "VITE_VAPID_PUBLIC_KEY"
    keyHints.push(`# ${pub}=`, "# VAPID_PRIVATE_KEY=")
  }

  if (keyHints.length > 0) {
    envLines.push("", "# Keys for this stack — copy .env.example → .env.local and fill these in:")
    envLines.push(...keyHints)
  }

  sections.push(envLines.join("\n"))

  // ── Build output ─────────────────────────────────────────────────────────────
  sections.push(
    "# Build output\n" +
    "dist/\n" +
    "build/\n" +
    "out/"
  )

  // ── TypeScript ────────────────────────────────────────────────────────────────
  sections.push("# TypeScript\n*.tsbuildinfo")

  // ── System ────────────────────────────────────────────────────────────────────
  sections.push("# System\n.DS_Store\nThumbs.db")

  // ── Framework-specific ────────────────────────────────────────────────────────
  if (s.fe === "nextjs") {
    sections.push("# Next.js\n.next/\nnext-env.d.ts")
  }

  if (s.fe === "tanstack-start") {
    sections.push("# TanStack Start / Vinxi\n.vinxi/\napp/routeTree.gen.ts")
  }

  // ── Backend ───────────────────────────────────────────────────────────────────
  if (s.be === "convex" || s.db === "convex") {
    sections.push("# Convex\nconvex/_generated/")
  }

  // ── Addons ────────────────────────────────────────────────────────────────────
  if (s.addons.includes("pwa")) {
    sections.push("# PWA — local push subscription store (dev only)\n.push-subscriptions.json")
  }

  return sections.join("\n\n") + "\n"
}
