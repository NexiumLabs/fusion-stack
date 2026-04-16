# create-fusion-stack — Feature Plan

> Database support, PWA addon, and skills.sh integration

---

## Overview

This document outlines the planned additions to the `create-fusion-stack` CLI:

1. **Database + ORM + Provider** — full database setup when Convex is not selected
2. **PWA Addon** — pre-configured Progressive Web App following the official Next.js docs
3. **Skills** — curated skill selection from skills.sh, installed into the generated project

---

## 1. Database Support

When the user does **not** select Convex as their backend, a real database selection becomes available.

### Database Type

| Option       | Value          |
|--------------|----------------|
| PostgreSQL   | `postgresql`   |
| MongoDB      | `mongodb`      |
| MySQL        | `mysql`        |
| SQLite       | `sqlite`       |
| None for now | `none`         |

### ORM (shown after database is selected)

| ORM      | Supported Databases              |
|----------|----------------------------------|
| Drizzle  | PostgreSQL, MySQL, SQLite        |
| Prisma   | PostgreSQL, MongoDB, MySQL, SQLite |
| Mongoose | MongoDB only                     |
| None     | —                                |

### DB Provider / Hosting (shown for PostgreSQL and MySQL)

| Provider   | Database    | Notes                    |
|------------|-------------|--------------------------|
| Supabase   | PostgreSQL  | Managed Postgres + extras |
| Neon       | PostgreSQL  | Serverless Postgres      |
| PlanetScale| MySQL       | Serverless MySQL         |
| None       | —           | Self-hosted / local      |

SQLite and MongoDB have no hosted provider option in this flow.

### Compatibility Rules

- Drizzle does not support MongoDB → auto-cleared
- Mongoose only works with MongoDB → auto-cleared for all other databases
- Supabase and Neon are PostgreSQL-only → auto-cleared for MySQL/SQLite/MongoDB
- PlanetScale is MySQL-only → auto-cleared for all other databases
- SQLite has no remote provider → all provider options auto-cleared

---

## 2. PWA Addon

Available when **Next.js** is selected as the frontend. Configured exactly per the [Next.js PWA Guide](https://nextjs.org/docs/app/guides/pwa).

### What gets generated

| File | Purpose |
|------|---------|
| `src/app/manifest.ts` | Web app manifest (name, icons, display, theme color) |
| `src/app/actions.ts` | Server actions: `subscribeUser`, `unsubscribeUser`, `sendNotification` |
| `public/sw.js` | Service worker handling push events and notification clicks |
| `public/icon-192x192.png` | App icon placeholder (replace with your brand icon) |
| `public/icon-512x512.png` | App icon placeholder (replace with your brand icon) |
| `public/badge.png` | Notification badge placeholder |
| `next.config.ts` | Security headers for all routes + service worker-specific headers |
| `.env.example` | `NEXT_PUBLIC_VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY` |

### Dependencies added

```json
{
  "dependencies": {
    "web-push": "^3.6.7"
  },
  "devDependencies": {
    "@types/web-push": "^3.6.3"
  }
}
```

### Security headers configured

**All routes:**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

**Service worker (`/sw.js`):**
- `Content-Type: application/javascript; charset=utf-8`
- `Cache-Control: no-cache, no-store, must-revalidate`
- `Content-Security-Policy: default-src 'self'; script-src 'self'`

### Post-generation steps

```bash
# 1. Generate VAPID keys
npx web-push generate-vapid-keys

# 2. Copy output into .env.local
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here

# 3. Test with HTTPS locally
next dev --experimental-https
```

---

## 3. Skills Integration

During scaffolding, users can select skills from [skills.sh](https://skills.sh/) to install into their project. Skills enhance AI coding agents (Claude Code, Cursor, GitHub Copilot, etc.) with procedural knowledge.

Skills are installed via:
```bash
npx skillsadd <owner/repo>
```

### Curated skill list (multi-select)

| Label | Identifier |
|-------|-----------|
| CareerOps | `careerops/career-ops` |
| Next.js Patterns | *(skills.sh owner/repo)* |
| React Best Practices | *(skills.sh owner/repo)* |
| TypeScript Mastery | *(skills.sh owner/repo)* |
| PostgreSQL | *(skills.sh owner/repo)* |
| Testing (Vitest / Playwright) | *(skills.sh owner/repo)* |
| Tailwind CSS | *(skills.sh owner/repo)* |

> Exact identifiers confirmed from skills.sh at implementation time.

### Behavior

- After project files are generated and dependencies installed, the CLI runs `npx skillsadd <skill>` in the target directory for each selected skill
- If a skill fails to install, the error is shown but scaffolding continues
- Users can also install any skill manually later: `npx skillsadd <owner/repo>`

---

## Implementation Plan

### Phase 1 — Type System & Defaults

**`src/types.ts`** — add four new fields to `Selections`:

```typescript
orm:        "drizzle" | "prisma" | "mongoose" | "none"
dbProvider: "supabase" | "neon" | "planetscale" | "none"
addons:     Array<"pwa">
skills:     string[]
```

Update `db` type to include: `"postgresql" | "mongodb" | "mysql" | "sqlite"`

**`src/defaults.ts`** — add `orm: "none"`, `dbProvider: "none"`, `addons: []`, `skills: []`

---

### Phase 2 — Validation Rules

**`src/validate.ts`** — extend `toMap()` with `orm` and `dbProvider`; add 15 new compatibility rules; handle `addons` array separately in `autoResolve()`.

---

### Phase 3 — Interactive Prompts

**`src/interactive.ts`** — updated prompt order:

1. Project name
2. Frontend
3. Backend
4. **Database** (updated: shows PG/MongoDB/MySQL/SQLite/None when not Convex)
5. **ORM** (new: conditional on database != convex/none)
6. **DB Provider** (new: conditional on database = postgresql or mysql)
7. Auth
8. UI Library
9. Email
10. **Addons** (new: multi-select — PWA shown when Next.js selected)
11. **Skills** (new: multi-select from curated list)
12. Package Manager

---

### Phase 4 — Template Slices

New directories under `packages/cli/templates/`:

| Directory | Contents |
|-----------|---------|
| `orm-drizzle-pg/` | drizzle.config.ts (postgresql dialect), src/db/index.ts, src/db/schema.ts, package.json, .env.example |
| `orm-drizzle-mysql/` | drizzle.config.ts (mysql dialect), src/db/index.ts, src/db/schema.ts, package.json, .env.example |
| `orm-drizzle-sqlite/` | drizzle.config.ts (sqlite dialect), src/db/index.ts, src/db/schema.ts, package.json |
| `orm-prisma/` | prisma/schema.prisma (with `{{PRISMA_PROVIDER}}` token), src/db/index.ts, package.json, .env.example |
| `orm-mongoose/` | src/db/index.ts, src/db/models/index.ts, package.json, .env.example |
| `provider-supabase/` | src/lib/supabase.ts, package.json, .env.example |
| `provider-neon/` | package.json, .env.example |
| `provider-planetscale/` | package.json, .env.example |
| `addon-pwa/` | All PWA files listed above |

**Drizzle scripts** added to `package.json` of each drizzle template:
```json
"db:push": "drizzle-kit push",
"db:studio": "drizzle-kit studio"
```

**Prisma scripts:**
```json
"db:push": "prisma db push",
"db:studio": "prisma studio",
"postinstall": "prisma generate"
```

---

### Phase 5 — Slice Resolution

**`src/generate.ts`** — `resolveSlices()` updated to include new slices:

```
orm-drizzle-pg      when db=postgresql + orm=drizzle
orm-drizzle-mysql   when db=mysql + orm=drizzle
orm-drizzle-sqlite  when db=sqlite + orm=drizzle
orm-prisma          when orm=prisma
orm-mongoose        when orm=mongoose
provider-supabase   when dbProvider=supabase
provider-neon       when dbProvider=neon
provider-planetscale when dbProvider=planetscale
addon-pwa           when addons includes "pwa"
```

New token added: `PRISMA_PROVIDER` → derived from `db` selection.

---

### Phase 6 — Skills Installer

**New `src/installSkills.ts`** — runs `npx skillsadd <skill>` for each selected skill in the generated project directory after all other generation steps complete.

---

### Phase 7 — Post Steps & CLI Flags

**`src/postSteps.ts`** — new next-step blocks for Drizzle, Prisma, Mongoose, each provider, and PWA.

**`src/index.ts`** — new CLI flags for headless/flag mode:
```
--orm <value>          drizzle | prisma | mongoose | none
--db-provider <value>  supabase | neon | planetscale | none
--addons <value>       comma-separated (e.g. pwa)
--skills <value>       comma-separated skill identifiers
```

---

## Verification Checklist

- [ ] `db:postgresql + orm:mongoose` → validation error (Mongoose is MongoDB-only)
- [ ] `db:sqlite + dbProvider:supabase` → auto-cleared to `none`
- [ ] PostgreSQL + Drizzle + Neon → `DATABASE_URL` in `.env.example`, `@neondatabase/serverless` in `package.json`, `dialect: "postgresql"` in `drizzle.config.ts`
- [ ] MongoDB + Prisma → `provider = "mongodb"` in `prisma/schema.prisma`
- [ ] Next.js + PWA → `src/app/manifest.ts`, `public/sw.js`, `src/app/actions.ts`, security headers in `next.config.ts`, VAPID vars in `.env.example`
- [ ] Skills selected → `npx skillsadd <skill>` runs in target directory
- [ ] Flag mode: `--frontend nextjs --database postgresql --orm drizzle --db-provider neon` → generates without interactive prompt
- [ ] Default Convex stack unchanged: `be:convex + db:convex` still generates identically to before
