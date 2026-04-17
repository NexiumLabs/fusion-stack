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
    // Next.js uses a hand-authored sw.js; Vite/TanStack auto-generate it via vite-plugin-pwa
    if (sel.fe === "nextjs" || !sel.fe) {
      publicChildren.push(f("sw.js", "addons"))
    }
    publicChildren.push(d("icons", [f("icon-192.png", "addons"), f("icon-512.png", "addons")], "addons"))
  }

  // ── TanStack Start tree ───────────────────────────────────────────────────
  if (sel.fe === "tanstack-start") {
    const appLibChildren: TreeNode[] = []
    if (sel.auth !== "none") appLibChildren.push(f("auth.ts", "auth"))
    if (sel.auth === "better-auth") appLibChildren.push(f("auth-client.ts", "auth"))
    if (sel.db !== "none" && sel.db !== "convex") appLibChildren.push(f("db.ts", "db"))
    if (sel.email === "resend") appLibChildren.push(f("email.ts", "email"))

    const appRoutesChildren: TreeNode[] = [f("__root.tsx"), f("index.tsx")]

    // API routes inside app/routes/api/
    const appApiRoutes: TreeNode[] = []
    if (sel.auth === "better-auth") {
      appApiRoutes.push(d("auth.$", [f("route.ts", "auth")], "auth"))
    }
    if (sel.be === "tanstack-start") {
      appApiRoutes.push(f("health.ts", "be"))
    }
    if (sel.api_layer === "trpc") {
      appApiRoutes.push(f("trpc.ts", "api_layer"))
    } else if (sel.api_layer === "orpc") {
      appApiRoutes.push(f("orpc.ts", "api_layer"))
    }
    if (appApiRoutes.length > 0) {
      appRoutesChildren.push(d("api", appApiRoutes, appApiRoutes[0]?.tag))
    }

    if (sel.auth === "workos") {
      appRoutesChildren.push(
        d("auth", [f("callback.ts", "auth"), f("sign-in.ts", "auth")], "auth"),
      )
    }

    // app/server/ — server functions and API layer server files
    const appServerChildren: TreeNode[] = []
    if (sel.be === "tanstack-start") {
      appServerChildren.push(f("functions.ts", "be"))
    }
    if (sel.api_layer === "trpc") {
      appServerChildren.push(f("trpc.ts", "api_layer"), d("routers", [f("index.ts", "api_layer")], "api_layer"))
    } else if (sel.api_layer === "orpc") {
      appServerChildren.push(f("orpc.ts", "api_layer"), d("routers", [f("index.ts", "api_layer")], "api_layer"))
    }

    // app/lib/trpc or app/lib/orpc client files
    if (sel.api_layer === "trpc") {
      appLibChildren.push(d("trpc", [f("client.ts", "api_layer"), f("provider.tsx", "api_layer"), f("react.ts", "api_layer")], "api_layer"))
    } else if (sel.api_layer === "orpc") {
      appLibChildren.push(d("orpc", [f("client.ts", "api_layer"), f("provider.tsx", "api_layer")], "api_layer"))
    }

    const appChildren: TreeNode[] = [
      d("routes", appRoutesChildren),
      f("client.tsx"),
      f("router.tsx"),
      f("ssr.tsx"),
      f("globals.css"),
    ]
    if (appServerChildren.length > 0) appChildren.push(d("server", appServerChildren, appServerChildren[0]?.tag))
    if (appLibChildren.length > 0) appChildren.push(d("lib", appLibChildren))
    if (sel.ui === "shadcn") {
      appChildren.push(
        d("components", [d("ui", [f("button.tsx", "ui"), f("card.tsx", "ui")], "ui")]),
      )
    }

    const tssRootChildren: TreeNode[] = [d("app", appChildren)]
    tssRootChildren.push(d("public", publicChildren))

    if (sel.be === "convex") {
      tssRootChildren.push(
        d("convex", [
          f("schema.ts", "be"), f("queries.ts", "be"), f("mutations.ts", "be"),
          d("_generated", [f("api.d.ts", "be"), f("server.d.ts", "be")], "be"),
        ], "be"),
      )
    }

    // src/ accumulator — merges hono server + ORM files into one directory node (BUG-1 fix)
    const tssSrcChildren: TreeNode[] = []
    if (sel.be === "hono") {
      tssSrcChildren.push(d("server", [f("index.ts", "be"), d("routes", [f("index.ts", "be")], "be")], "be"))
    }
    if (sel.orm === "drizzle") {
      tssSrcChildren.push(d("db", [f("schema.ts", "orm"), f("index.ts", "orm")], "orm"))
    }
    if (tssSrcChildren.length > 0) tssRootChildren.push(d("src", tssSrcChildren))

    if (sel.orm === "drizzle") {
      tssRootChildren.push(f("drizzle.config.ts", "orm"))
    } else if (sel.orm === "prisma") {
      tssRootChildren.push(d("prisma", [f("schema.prisma", "orm"), d("migrations", [], "orm")], "orm"))
    }

    if (sel.ui === "shadcn") tssRootChildren.push(f("components.json", "ui"))
    tssRootChildren.push(f("app.config.ts"), f("tsconfig.json"), f("package.json"), f(".env.local"), f(".gitignore"))

    return d(projectName, tssRootChildren)
  }

  // ── Vite React tree ───────────────────────────────────────────────────────
  if (sel.fe === "vite-react") {
    const viteLibChildren: TreeNode[] = []
    if (sel.auth !== "none") viteLibChildren.push(f("auth.ts", "auth"))
    if (sel.auth === "better-auth") viteLibChildren.push(f("auth-client.ts", "auth"))
    if (sel.db !== "none" && sel.db !== "convex") viteLibChildren.push(f("db.ts", "db"))
    if (sel.email === "resend") viteLibChildren.push(f("email.ts", "email"))
    if (sel.api_layer === "trpc") {
      viteLibChildren.push(d("trpc", [f("client.ts", "api_layer"), f("provider.tsx", "api_layer"), f("react.ts", "api_layer")], "api_layer"))
    }
    if (sel.api_layer === "orpc") {
      viteLibChildren.push(d("orpc", [f("client.ts", "api_layer"), f("provider.tsx", "api_layer")], "api_layer"))
    }
    if (sel.db_provider === "supabase") viteLibChildren.push(f("supabase.ts", "db_provider"))

    const viteSrcChildren: TreeNode[] = [f("main.tsx"), f("App.tsx"), f("index.css")]
    if (viteLibChildren.length > 0) viteSrcChildren.push(d("lib", viteLibChildren))
    if (sel.ui === "shadcn") {
      viteSrcChildren.push(
        d("components", [d("ui", [f("button.tsx", "ui"), f("card.tsx", "ui")], "ui")]),
      )
    }

    if (sel.be === "hono") {
      // Build routes and middleware arrays first so auth files merge in — no duplicate folders (BUG-3 fix)
      const routesChildren: TreeNode[] = [f("index.ts", "be"), f("users.ts", "be")]
      const middlewareChildren: TreeNode[] = [f("cors.ts", "be")]
      if (sel.auth === "clerk") middlewareChildren.push(f("clerk.ts", "auth"))
      if (sel.auth === "workos") routesChildren.push(f("auth.ts", "auth"))
      const hServerChildren: TreeNode[] = [
        f("index.ts", "be"),
        d("routes", routesChildren, "be"),
        d("middleware", middlewareChildren, "be"),
      ]
      if (sel.api_layer === "trpc") {
        hServerChildren.push(f("trpc.ts", "api_layer"), d("routers", [f("index.ts", "api_layer")], "api_layer"))
      } else if (sel.api_layer === "orpc") {
        hServerChildren.push(f("orpc.ts", "api_layer"), d("routers", [f("index.ts", "api_layer")], "api_layer"))
      }
      viteSrcChildren.push(d("server", hServerChildren, "be"))
    } else if (sel.be === "vite") {
      // be:vite — Hono mounted inside the Vite dev server via configureServer
      const viteServerChildren: TreeNode[] = [
        f("api.ts", "be"),
        f("plugin.ts", "be"),
        f("serve.ts", "be"),
      ]
      if (sel.api_layer === "trpc") {
        viteServerChildren.push(f("trpc-hono.ts", "api_layer"), d("routers", [f("index.ts", "api_layer")], "api_layer"))
      } else if (sel.api_layer === "orpc") {
        viteServerChildren.push(f("orpc.ts", "api_layer"), d("routers", [f("index.ts", "api_layer")], "api_layer"))
      }
      viteSrcChildren.push(d("server", viteServerChildren, "be"))
    }

    if (sel.email === "resend") {
      viteSrcChildren.push(d("emails", [f("welcome.tsx", "email"), f("reset-password.tsx", "email")], "email"))
    }

    // ORM db/ lives inside src/ — add before sealing viteSrcChildren (BUG-2 fix)
    if (sel.orm === "drizzle") {
      viteSrcChildren.push(d("db", [f("schema.ts", "orm"), f("index.ts", "orm")], "orm"))
    }

    const viteRootChildren: TreeNode[] = [d("src", viteSrcChildren), d("public", publicChildren)]

    if (sel.be === "convex") {
      viteRootChildren.push(
        d("convex", [
          f("schema.ts", "be"), f("queries.ts", "be"), f("mutations.ts", "be"),
          d("_generated", [f("api.d.ts", "be"), f("server.d.ts", "be")], "be"),
        ], "be"),
      )
    }

    if (sel.orm === "drizzle") {
      viteRootChildren.push(f("drizzle.config.ts", "orm"))
    } else if (sel.orm === "prisma") {
      viteRootChildren.push(d("prisma", [f("schema.prisma", "orm"), d("migrations", [], "orm")], "orm"))
    }

    if (sel.ui === "shadcn") viteRootChildren.push(f("components.json", "ui"))
    viteRootChildren.push(f("index.html"), f("vite.config.ts"), f("tsconfig.json"), f("package.json"), f(".env.local"), f(".gitignore"))

    return d(projectName, viteRootChildren)
  }

  // ── root ──────────────────────────────────────────────────────────────────
  const rootChildren: TreeNode[] = []

  if (sel.fe === "nextjs") {
    if (sel.src !== "no") {
      rootChildren.push(d("src", srcChildren))
    } else {
      rootChildren.push(...srcChildren)
    }
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
