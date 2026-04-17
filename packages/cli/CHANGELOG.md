# create-fusion-stack

## 0.4.0

### Minor Changes

- Added TanStack Start frontend (`--frontend tanstack-start`) — Vinxi-based full-stack React with file-based routing, server functions, and Tailwind CSS v4
- Added Vite + React frontend (`--frontend vite-react`) — React SPA with optional Hono sidecar or in-process Vite plugin server
- Added auth slices for all new frontend × auth provider combinations: Clerk, Better Auth, and WorkOS × TanStack Start and Vite React (6 new templates)
- Added `ui-shadcn-vite` template slice with correct `src/` path aliases and `rsc: false`
- Added git initialisation — every generated project runs `git init` and creates a `chore: initial scaffold` commit; works on machines with no global git config
- Added `--no-git` flag to skip git initialisation
- Added selection-aware `.gitignore` generated programmatically from stack choices — correct framework entries (`.vinxi/`, `convex/_generated/`, etc.) and commented `.env.local` key hints per selection; `DATABASE_URL` format varies by database engine
- All auth providers now work with all frontends — no frontend choice blocks any auth option

### Bug Fixes

- Fixed duplicate `src/` node in folder preview when combining TanStack Start or Vite React with Hono and Drizzle
- Fixed WorkOS post-steps emitting wrong redirect URI for Vite React + Convex combinations
- Fixed CLI offering `vite` (built-in) backend when `--frontend none` is selected
- Fixed randomize button in web builder ignoring compatibility rules
- Fixed Vite React + shadcn/ui using the Next.js (RSC) slice instead of the correct Vite slice
- Fixed `sw.js` appearing in folder preview for non-Next.js PWA setups
- Fixed `VITE_APP_URL` missing from Better Auth `.env.example` templates

## 0.3.0

### Minor Changes

- 50cdf3d: added in workos support

## 0.2.0

### Minor Changes

- a34afd8: Fusion Stack — Open Source Launch Setup
