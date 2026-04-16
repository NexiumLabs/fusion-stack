// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "addons/pwa.mdx": () => import("../content/docs/addons/pwa.mdx?collection=docs"), "api-layer/orpc.mdx": () => import("../content/docs/api-layer/orpc.mdx?collection=docs"), "api-layer/trpc.mdx": () => import("../content/docs/api-layer/trpc.mdx?collection=docs"), "backend/convex.mdx": () => import("../content/docs/backend/convex.mdx?collection=docs"), "backend/hono.mdx": () => import("../content/docs/backend/hono.mdx?collection=docs"), "backend/nextjs.mdx": () => import("../content/docs/backend/nextjs.mdx?collection=docs"), "auth/better-auth.mdx": () => import("../content/docs/auth/better-auth.mdx?collection=docs"), "auth/clerk.mdx": () => import("../content/docs/auth/clerk.mdx?collection=docs"), "auth/workos.mdx": () => import("../content/docs/auth/workos.mdx?collection=docs"), "database/convex.mdx": () => import("../content/docs/database/convex.mdx?collection=docs"), "database/mongodb.mdx": () => import("../content/docs/database/mongodb.mdx?collection=docs"), "database/mysql.mdx": () => import("../content/docs/database/mysql.mdx?collection=docs"), "database/orm.mdx": () => import("../content/docs/database/orm.mdx?collection=docs"), "database/postgresql.mdx": () => import("../content/docs/database/postgresql.mdx?collection=docs"), "database/providers.mdx": () => import("../content/docs/database/providers.mdx?collection=docs"), "database/sqlite.mdx": () => import("../content/docs/database/sqlite.mdx?collection=docs"), "frontend/nextjs.mdx": () => import("../content/docs/frontend/nextjs.mdx?collection=docs"), "email/resend.mdx": () => import("../content/docs/email/resend.mdx?collection=docs"), "skills/index.mdx": () => import("../content/docs/skills/index.mdx?collection=docs"), "ui/shadcn.mdx": () => import("../content/docs/ui/shadcn.mdx?collection=docs"), }),
};
export default browserCollections;