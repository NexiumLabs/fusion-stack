# Implementation Plan: Next.js Backend + tRPC / oRPC API Layer

## Overview

This plan adds two new categories to fusion-stack:

1. **`nextjs` as a backend option** — uses Next.js App Router route handlers (`src/app/api/...`) as the backend. No separate server process needed.
2. **`api_layer` as a new category** — lets users pick `tRPC` or `oRPC` as a type-safe RPC layer on top of their backend. Available when backend is `nextjs` or `hono`.

---

## New Selection Flow (After)

```
Project name  →  Frontend  →  Backend  →  API Layer*  →  Database  →  Auth  →  UI  →  Email  →  PM

* API Layer prompt only shown when Backend = nextjs or hono
```

### Backend options (updated)
| Value | Description |
|-------|-------------|
| `convex` | Reactive backend-as-a-service (existing) |
| `hono` | Ultrafast Node.js web framework (existing) |
| `nextjs` | **NEW** — Built-in App Router route handlers, no separate server |
| `none` | Skip backend (existing) |

### API Layer options (new category)
| Value | Description | Available when |
|-------|-------------|----------------|
| `trpc` | End-to-end type-safe RPC, no schema/codegen | backend = `nextjs` or `hono` |
| `orpc` | OpenAPI-compatible, Zod-first RPC | backend = `nextjs` or `hono` |
| `none` | Plain fetch or bring your own | always |

> Convex has its own RPC system (actions/queries/mutations) — API Layer is skipped when Convex is selected.

---

## Files to Modify

### `packages/cli/src/types.ts`
- Add `"nextjs"` to `Backend` union
- Add new `ApiLayer = "trpc" | "orpc" | "none"` type
- Add `apiLayer: ApiLayer` field to `Selections` interface

### `packages/cli/src/defaults.ts`
- Add `apiLayer: "none"` to `DEFAULT_SELECTIONS`

### `packages/cli/src/validate.ts`
- Extend `toMap()` — add `api: s.apiLayer` key so rules can reference it
- Extend `flag()` — add `api: "api-layer"` entry for human-readable error messages
- Add new conflict rules:
  ```
  be:nextjs  →  clears db:convex   (Next.js routes don't use Convex DB)
  be:none    →  clears api:trpc    (no backend = nothing to put tRPC on)
  be:none    →  clears api:orpc
  be:convex  →  clears api:trpc    (Convex has its own RPC)
  be:convex  →  clears api:orpc
  ```

### `packages/cli/src/interactive.ts`
- Add `nextjs` option to the Backend select prompt
- Insert a new **API Layer** select prompt after Backend, before Database:
  - Shown only when `be !== "convex"` and `be !== "none"`
  - Options: tRPC / oRPC / None
- Update final raw object: add `apiLayer` field

### `packages/cli/src/index.ts`
- Add `--api-layer <value>` Commander option (default `"none"`)
- Include `apiLayer` in the `hasFlags` check
- Map `opts["apiLayer"]` into the flag-mode `selections` object

### `packages/cli/src/generate.ts`
- Add three new slice pushes in `resolveSlices()`:
  ```typescript
  if (s.be === "nextjs")     slices.push("be-nextjs")
  if (s.apiLayer === "trpc") slices.push("api-trpc")
  if (s.apiLayer === "orpc") slices.push("api-orpc")
  ```

### `packages/cli/src/postSteps.ts`
- Add setup instructions for each new option:
  - **nextjs backend**: points to `src/app/api/`
  - **tRPC**: instructs wrapping layout with `TRPCProvider`; if Hono, adds Hono mount note
  - **oRPC**: instructs wrapping layout with `ORPCProvider`

### `apps/web/src/lib/stacks.ts`
- Add `nextjs` option to the `be` (Backend) category
- Update Convex DB `incompatibleWith` to also include `be:nextjs`
- Add new `api_layer` category (insert between Backend and Database):
  - tRPC option with `incompatibleWith: ["be:convex", "be:none"]`
  - oRPC option with `incompatibleWith: ["be:convex", "be:none"]`, `isNew: true`
  - None as default

### `apps/web/src/lib/command.ts`
- Add `apiLayer: string` to the `Selections` type
- Add `--api-layer` flag to the generated command string (when not `"none"`)

### `apps/web/src/hooks/useStackSelection.ts`
- Add `api_layer: parseAsString.withDefault("none")` to `useQueryStates`
- Add `api_layer: "none"` to `defaultSelections`

---

## New Template Slices to Create

### `packages/cli/templates/be-nextjs/`

| File | Purpose |
|------|---------|
| `_manifest.json` | Slice metadata |
| `package.json` | Empty fragment (Next.js already comes from `fe-nextjs`) |
| `src/app/api/health/route.ts` | Starter `GET /api/health` → `{ status: "ok" }` |

---

### `packages/cli/templates/api-trpc/`

**Dependencies added:**
- `@trpc/server ^11`
- `@trpc/client ^11`
- `@trpc/react-query ^11`
- `@tanstack/react-query ^5`
- `@hono/trpc-server ^0.3` (for Hono adapter)
- `zod ^3`
- `superjson ^2`

| File | Purpose |
|------|---------|
| `_manifest.json` | Slice metadata |
| `package.json` | Dependencies above |
| `src/server/trpc.ts` | `initTRPC` setup, exports `router` and `publicProcedure` |
| `src/server/routers/index.ts` | Root `appRouter` with a sample `hello` procedure; exports `AppRouter` type |
| `src/app/api/trpc/[trpc]/route.ts` | Next.js App Router handler using `fetchRequestHandler` |
| `src/server/trpc-hono.ts` | Hono adapter helper — mount with `app.use('/trpc/*', trpcHonoHandler)` |
| `src/lib/trpc/client.ts` | Vanilla `createTRPCClient` for server components |
| `src/lib/trpc/react.ts` | `createTRPCReact<AppRouter>()` hook factory |
| `src/lib/trpc/provider.tsx` | `TRPCProvider` client component wrapping `QueryClientProvider` |

> **Hono + tRPC note:** Both the Next.js handler and the Hono adapter file are always scaffolded. When backend is Hono, the post-step instructs mounting `trpcHonoHandler` in `src/server/index.ts`. The Next.js handler file is still included but unused in a pure Hono setup.

---

### `packages/cli/templates/api-orpc/`

**Dependencies added:**
- `@orpc/server`
- `@orpc/client`
- `@orpc/react-query`
- `@tanstack/react-query ^5`
- `zod ^3`

| File | Purpose |
|------|---------|
| `_manifest.json` | Slice metadata |
| `package.json` | Dependencies above |
| `src/server/orpc.ts` | Exports `pub = os` (base procedure builder) |
| `src/server/routers/index.ts` | Root `appRouter` with a sample `hello` handler; exports `AppRouter` type |
| `src/app/api/orpc/[...orpc]/route.ts` | Catch-all App Router handler using `RPCHandler` |
| `src/lib/orpc/client.ts` | `createORPCClient` with `RPCLink` |
| `src/lib/orpc/provider.tsx` | `ORPCProvider` client component wrapping `QueryClientProvider` |

---

## Compatibility Matrix (After)

| Backend | API Layer | Valid? | Notes |
|---------|-----------|--------|-------|
| `convex` | `none` | Yes | Convex uses its own RPC |
| `convex` | `trpc` | **No** | Blocked by validation |
| `convex` | `orpc` | **No** | Blocked by validation |
| `hono` | `none` | Yes | Plain HTTP/REST |
| `hono` | `trpc` | Yes | Mount via `trpc-hono.ts` |
| `hono` | `orpc` | Yes | Mount on Hono router |
| `nextjs` | `none` | Yes | Plain route handlers |
| `nextjs` | `trpc` | Yes | Handler at `/api/trpc` |
| `nextjs` | `orpc` | Yes | Handler at `/api/orpc` |
| `none` | `trpc` | **No** | Blocked by validation |
| `none` | `orpc` | **No** | Blocked by validation |

---

## Implementation Order

```
1.  packages/cli/src/types.ts               ← TypeScript errors surface all downstream gaps
2.  packages/cli/src/defaults.ts
3.  packages/cli/src/validate.ts
4.  packages/cli/src/interactive.ts
5.  packages/cli/src/index.ts
6.  packages/cli/src/generate.ts
7.  packages/cli/src/postSteps.ts
8.  packages/cli/templates/be-nextjs/        ← new directory + files
9.  packages/cli/templates/api-trpc/         ← new directory + files
10. packages/cli/templates/api-orpc/         ← new directory + files
11. apps/web/src/lib/stacks.ts
12. apps/web/src/lib/command.ts
13. apps/web/src/hooks/useStackSelection.ts
```

---

## Verification Checklist

- [ ] `pnpm --filter cli build` — no TypeScript errors
- [ ] Interactive mode: `nextjs` appears in Backend list; selecting it shows API Layer prompt; selecting Convex skips API Layer
- [ ] Flag: `--backend nextjs --api-layer trpc` → generates `src/app/api/trpc/[trpc]/route.ts`, `src/server/trpc.ts`, `src/lib/trpc/provider.tsx`
- [ ] Flag: `--backend nextjs --api-layer orpc` → generates `src/app/api/orpc/[...orpc]/route.ts`, `src/lib/orpc/client.ts`
- [ ] Flag: `--backend hono --api-layer trpc` → generates tRPC files + `src/server/trpc-hono.ts`; post-step mentions Hono mount
- [ ] Flag: `--backend convex --api-layer trpc` → exits with incompatibility error
- [ ] Flag: `--backend none --api-layer orpc` → exits with incompatibility error
- [ ] Web builder: "Next.js API Routes" backend card visible; "API Layer" section with tRPC/oRPC cards visible; Convex backend grays out tRPC/oRPC
