export type Selections = {
  projectName: string
  fe: "nextjs" | "none"
  be: "convex" | "hono" | "nextjs" | "none"
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
}
