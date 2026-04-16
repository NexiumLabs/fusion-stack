import type { Selections } from "./command"

export type TreeNode = {
  name: string
  type: "file" | "folder"
  children?: TreeNode[]
  /** Which stack category added this node — used for color-coding */
  tag?: string
}

const f = (name: string, tag?: string): TreeNode => ({ name, type: "file", tag })
const d = (name: string, children: TreeNode[], tag?: string): TreeNode => ({
  name,
  type: "folder",
  children,
  tag,
})

export function buildFolderTree(sel: Selections): TreeNode {
  const projectName = sel.name || "my-app"

  // ── src/app ────────────────────────────────────────────────────────────────
  const appChildren: TreeNode[] = [
    f("layout.tsx"),
    f("page.tsx"),
    f("globals.css"),
  ]

  // Auth-specific routes
  if (sel.auth === "clerk") {
    appChildren.push(
      d(
        "(auth)",
        [
          d("sign-in", [d("[[...sign-in]]", [f("page.tsx", "auth")], "auth")], "auth"),
          d("sign-up", [d("[[...sign-up]]", [f("page.tsx", "auth")], "auth")], "auth"),
        ],
        "auth",
      ),
    )
  } else if (sel.auth === "workos") {
    appChildren.push(
      d("auth", [d("callback", [f("route.ts", "auth")], "auth")], "auth"),
    )
  }

  // API routes — merge into a single "api" folder if multiple things need it
  const apiRoutes: TreeNode[] = []

  if (sel.auth === "better-auth") {
    apiRoutes.push(d("auth", [d("[...all]", [f("route.ts", "auth")], "auth")], "auth"))
  }

  if (sel.api_layer === "trpc") {
    apiRoutes.push(d("trpc", [d("[trpc]", [f("route.ts", "api_layer")], "api_layer")], "api_layer"))
  } else if (sel.api_layer === "orpc") {
    apiRoutes.push(d("orpc", [d("[...orpc]", [f("route.ts", "api_layer")], "api_layer")], "api_layer"))
  } else if (sel.be === "nextjs" && apiRoutes.length === 0) {
    apiRoutes.push(d("example", [f("route.ts", "be")], "be"))
  }

  if (apiRoutes.length > 0) {
    appChildren.push(d("api", apiRoutes, apiRoutes[0]?.tag))
  }

  // ── src/lib ────────────────────────────────────────────────────────────────
  const libChildren: TreeNode[] = []

  if (sel.auth !== "none") libChildren.push(f("auth.ts", "auth"))
  if (sel.db !== "none" && sel.db !== "convex") libChildren.push(f("db.ts", "db"))
  if (sel.email === "resend") libChildren.push(f("email.ts", "email"))
  if (sel.api_layer === "trpc") {
    libChildren.push(d("trpc", [f("client.ts", "api_layer"), f("provider.tsx", "api_layer"), f("react.ts", "api_layer")], "api_layer"))
  }
  if (sel.api_layer === "orpc") {
    libChildren.push(d("orpc", [f("client.ts", "api_layer"), f("provider.tsx", "api_layer")], "api_layer"))
  }
  if (sel.db_provider === "supabase") libChildren.push(f("supabase.ts", "db_provider"))

  // ── src/components ────────────────────────────────────────────────────────
  const componentsChildren: TreeNode[] = []
  if (sel.ui === "shadcn") {
    componentsChildren.push(
      d(
        "ui",
        [f("button.tsx", "ui"), f("card.tsx", "ui"), f("dialog.tsx", "ui"), f("input.tsx", "ui")],
        "ui",
      ),
    )
  }

  // ── src/db ────────────────────────────────────────────────────────────────
  const dbSrcChildren: TreeNode[] = []
  if (sel.orm === "drizzle") {
    dbSrcChildren.push(f("schema.ts", "orm"), f("index.ts", "orm"))
  } else if (sel.orm === "prisma") {
    dbSrcChildren.push(f("index.ts", "orm"))
  } else if (sel.orm === "mongoose") {
    dbSrcChildren.push(
      d("models", [f("index.ts", "orm")], "orm"),
      f("index.ts", "orm"),
    )
  }

  // ── src/server ────────────────────────────────────────────────────────────
  const serverChildren: TreeNode[] = []

  if (sel.be === "hono") {
    serverChildren.push(
      f("index.ts", "be"),
      d("routes", [f("index.ts", "be"), f("users.ts", "be")], "be"),
      d("middleware", [f("cors.ts", "be")], "be"),
    )
  }

  if (sel.api_layer === "trpc") {
    serverChildren.push(
      f("trpc.ts", "api_layer"),
      d("routers", [f("index.ts", "api_layer")], "api_layer"),
    )
  } else if (sel.api_layer === "orpc") {
    serverChildren.push(
      f("orpc.ts", "api_layer"),
      d("routers", [f("index.ts", "api_layer")], "api_layer"),
    )
  }

  // ── src ───────────────────────────────────────────────────────────────────
  const srcChildren: TreeNode[] = [d("app", appChildren)]

  if (componentsChildren.length > 0) srcChildren.push(d("components", componentsChildren))
  if (libChildren.length > 0) srcChildren.push(d("lib", libChildren))
  if (dbSrcChildren.length > 0) srcChildren.push(d("db", dbSrcChildren, "orm"))
  if (serverChildren.length > 0) {
    srcChildren.push(d("server", serverChildren, sel.be === "hono" ? "be" : "api_layer"))
  }
  if (sel.email === "resend") {
    srcChildren.push(
      d("emails", [f("welcome.tsx", "email"), f("reset-password.tsx", "email")], "email"),
    )
  }
  if (sel.auth === "clerk" || sel.auth === "workos") {
    srcChildren.push(f("middleware.ts", "auth"))
  }

  // ── public ────────────────────────────────────────────────────────────────
  const publicChildren: TreeNode[] = [f("favicon.ico")]
  if (sel.addons?.split(",").includes("pwa")) {
    publicChildren.push(
      f("manifest.json", "addons"),
      f("sw.js", "addons"),
      d("icons", [f("icon-192.png", "addons"), f("icon-512.png", "addons")], "addons"),
    )
  }

  // ── root ──────────────────────────────────────────────────────────────────
  const rootChildren: TreeNode[] = []

  if (sel.fe === "nextjs") {
    rootChildren.push(d("src", srcChildren))
  }

  rootChildren.push(d("public", publicChildren))

  if (sel.be === "convex") {
    rootChildren.push(
      d(
        "convex",
        [
          f("schema.ts", "be"),
          f("queries.ts", "be"),
          f("mutations.ts", "be"),
          d("_generated", [f("api.d.ts", "be"), f("server.d.ts", "be")], "be"),
        ],
        "be",
      ),
    )
  }

  if (sel.orm === "prisma") {
    rootChildren.push(d("prisma", [f("schema.prisma", "orm"), d("migrations", [], "orm")], "orm"))
  }

  // Root config files
  if (sel.fe === "nextjs") {
    rootChildren.push(f("next.config.ts"), f("tailwind.config.ts"))
  }
  if (sel.orm === "drizzle") rootChildren.push(f("drizzle.config.ts", "orm"))
  if (sel.ui === "shadcn") rootChildren.push(f("components.json", "ui"))
  rootChildren.push(f("tsconfig.json"), f("package.json"), f(".env.local"), f(".gitignore"))

  return d(projectName, rootChildren)
}

/** Tag → display color (Tailwind text class) */
export const TAG_COLORS: Record<string, string> = {
  be: "text-purple-400",
  api_layer: "text-blue-400",
  db: "text-amber-400",
  orm: "text-orange-400",
  auth: "text-pink-400",
  ui: "text-violet-400",
  email: "text-emerald-400",
  addons: "text-green-400",
  db_provider: "text-[#00DDD4]",
}

/** Tag → human label for the legend */
export const TAG_LABELS: Record<string, string> = {
  be: "Backend",
  api_layer: "API Layer",
  db: "Database",
  orm: "ORM",
  auth: "Auth",
  ui: "UI Library",
  email: "Email",
  addons: "Addons",
  db_provider: "DB Provider",
}
