export type Selections = {
  projectName: string
  fe: "nextjs" | "tanstack-start" | "vite-react" | "none"
  be: "convex" | "hono" | "nextjs" | "tanstack-start" | "vite" | "none"
  db: "convex" | "postgresql" | "mongodb" | "mysql" | "sqlite" | "none"
  orm: "drizzle" | "prisma" | "mongoose" | "none"
  dbProvider: "supabase" | "neon" | "planetscale" | "none"
  auth: "clerk" | "better-auth" | "workos" | "none"
  ui: "none" | "shadcn"
  email: "resend" | "none"
  addons: Array<"pwa">
  skills: string[]
  pm: "pnpm" | "npm"
  apiLayer: "trpc" | "orpc" | "none"
  /** Next.js only — false means root layout (app/ at root), true means src/ layout */
  srcDir: boolean
}
