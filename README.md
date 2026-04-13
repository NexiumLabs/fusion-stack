# Fusion Stack

A visual stack scaffolding tool — pick your frontend, backend, auth, email, and more, then run one command to get a fully configured project.

```bash
pnpm create fusion-stack@latest
```

---

## What It Is

Fusion Stack is a CLI + website that lets you compose a project starter from best-in-class tools. Choose your stack visually on the Builder page, copy the generated command, and run it. You get a pre-wired, TypeScript-ready project — no boilerplate hunting.

---

## Monorepo Structure

```
fusion-stack/
├── apps/
│   ├── web/               ← Next.js 15 (landing page + builder UI)
│   └── docs/              ← Fumadocs (documentation site)
├── packages/
│   ├── cli/               ← create-fusion-stack (the CLI scaffolder)
│   ├── tsconfig/          ← shared TypeScript base configs
│   └── eslint-config/     ← shared ESLint config
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## Build Plan

### Phase 1 — Monorepo Initialization ✅
- pnpm workspace root
- Turborepo pipeline (build, dev, lint, typecheck)
- Shared packages: `@fusion-stack/tsconfig`, `@fusion-stack/eslint-config`
- Git initialized

### Phase 2 — Next.js Web App (`apps/web`) ✅
Two pages: landing (`/`) and stack builder (`/builder`).

**Key design decisions:**
- All builder state lives in URL query params (via `nuqs`) — free shareable links, no backend
- `src/lib/stacks.ts` is the single source of truth for stack options + compatibility matrix
- `src/lib/command.ts` generates the CLI command string from current selections
- Terminal/dark aesthetic throughout (`>_` section prefixes, monospace CLI blocks)

**Stack for `apps/web`:**
- Next.js 15 (App Router)
- Tailwind CSS
- `nuqs` — URL search param state
- `framer-motion` — card selection transitions
- `lucide-react` — icons
- `clsx` + `tailwind-merge` — className utility

**Component structure:**
```
src/
  app/
    page.tsx              ← Landing page
    builder/
      page.tsx            ← Builder UI
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    builder/
      Sidebar.tsx         ← left panel (name input, CLI command, chips, actions)
      StackSection.tsx    ← one category + card grid
      StackCard.tsx       ← individual option card
      CommandPreview.tsx  ← monospace block with copy button
      SelectedChips.tsx   ← removable selection chips
    ui/
      Button.tsx
      Input.tsx
      Chip.tsx
  lib/
    cn.ts                 ← clsx + tailwind-merge helper
    stacks.ts             ← stack options + compatibility matrix
    command.ts            ← CLI command string builder
  hooks/
    useStackSelection.ts  ← nuqs URL state
```

### Phase 3 — Fumadocs Docs App (`apps/docs`) ✅
- Fumadocs v16 + Next.js 16, running on port 3001
- One MDX page per stack option (Next.js, Convex, Hono, Clerk, Better Auth, shadcn/ui, Resend)
- Linked from web navbar (`/docs`)

### Phase 4 — CLI Package (`packages/cli`) ✅
- Package name: `create-fusion-stack`
- `@clack/prompts` for interactive prompts
- Template slices per stack option, merged at generation time
- `deepmerge` for `package.json` composition

---

## Development

```bash
# Install dependencies
pnpm install

# Start all apps in dev mode
pnpm dev

# Build all apps
pnpm build

# Type check
pnpm typecheck
```

---

## URLs (local)

| App | URL |
|-----|-----|
| Web (landing + builder) | http://localhost:3000 |
| Docs | http://localhost:3001 |

---

## Stack Builder URL Pattern

Selections encode as query params — every link is a shareable stack config:

```
/builder?fe=nextjs&be=convex&auth=clerk&email=resend&pm=pnpm&name=my-app
```
