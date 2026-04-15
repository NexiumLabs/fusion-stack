export type Selections = {
  projectName: string
  fe: "nextjs" | "none"
  be: "convex" | "hono" | "none"
  db: "convex" | "none"
  auth: "clerk" | "better-auth" | "workos" | "none"
  ui: "none" | "shadcn"
  email: "resend" | "none"
  pm: "pnpm" | "npm"
}
