# create-fusion-stack

## 0.4.0

### Minor Changes

- ef06afb: Add TanStack Start and Vite React frontend support - New `--frontend tanstack-start` option: Vinxi-based full-stack React with file-based routing, server functions, and `app/routes/` structure - New `--frontend vite-react` option: React SPA with optional Hono sidecar or in-process Vite plugin server - Auth slices for both new frontends: Clerk, Better Auth, and WorkOS × TanStack Start and Vite React (6 new templates) - `ui-shadcn-vite` template slice with correct `src/` path aliases and `rsc: false` - All auth × frontend combinations are now supported — no frontend blocks any auth provider - Fix: Hono + Drizzle no longer emit duplicate `src/` node in folder preview - Fix: WorkOS env template now emits correct redirect URI for all frontend × backend combinations - Fix: CLI no longer offers `vite` backend when `--frontend none` is selected - Fix: Randomize button in web builder now respects compatibility rules

## 0.3.0

### Minor Changes

- 50cdf3d: added in workos support

## 0.2.0

### Minor Changes

- a34afd8: Fusion Stack — Open Source Launch Setup
