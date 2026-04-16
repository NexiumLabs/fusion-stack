// @ts-nocheck
import { default as __fd_glob_30 } from "../content/docs/skills/meta.json?collection=meta"
import { default as __fd_glob_29 } from "../content/docs/ui/meta.json?collection=meta"
import { default as __fd_glob_28 } from "../content/docs/frontend/meta.json?collection=meta"
import { default as __fd_glob_27 } from "../content/docs/email/meta.json?collection=meta"
import { default as __fd_glob_26 } from "../content/docs/database/meta.json?collection=meta"
import { default as __fd_glob_25 } from "../content/docs/backend/meta.json?collection=meta"
import { default as __fd_glob_24 } from "../content/docs/auth/meta.json?collection=meta"
import { default as __fd_glob_23 } from "../content/docs/api-layer/meta.json?collection=meta"
import { default as __fd_glob_22 } from "../content/docs/addons/meta.json?collection=meta"
import { default as __fd_glob_21 } from "../content/docs/meta.json?collection=meta"
import * as __fd_glob_20 from "../content/docs/ui/shadcn.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/skills/index.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/email/resend.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/frontend/nextjs.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/database/sqlite.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/database/providers.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/database/postgresql.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/database/orm.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/database/mysql.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/database/mongodb.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/database/convex.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/auth/workos.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/auth/clerk.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/auth/better-auth.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/backend/nextjs.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/backend/hono.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/backend/convex.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/api-layer/trpc.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/api-layer/orpc.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/addons/pwa.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/docs", {"index.mdx": __fd_glob_0, "addons/pwa.mdx": __fd_glob_1, "api-layer/orpc.mdx": __fd_glob_2, "api-layer/trpc.mdx": __fd_glob_3, "backend/convex.mdx": __fd_glob_4, "backend/hono.mdx": __fd_glob_5, "backend/nextjs.mdx": __fd_glob_6, "auth/better-auth.mdx": __fd_glob_7, "auth/clerk.mdx": __fd_glob_8, "auth/workos.mdx": __fd_glob_9, "database/convex.mdx": __fd_glob_10, "database/mongodb.mdx": __fd_glob_11, "database/mysql.mdx": __fd_glob_12, "database/orm.mdx": __fd_glob_13, "database/postgresql.mdx": __fd_glob_14, "database/providers.mdx": __fd_glob_15, "database/sqlite.mdx": __fd_glob_16, "frontend/nextjs.mdx": __fd_glob_17, "email/resend.mdx": __fd_glob_18, "skills/index.mdx": __fd_glob_19, "ui/shadcn.mdx": __fd_glob_20, });

export const meta = await create.meta("meta", "content/docs", {"meta.json": __fd_glob_21, "addons/meta.json": __fd_glob_22, "api-layer/meta.json": __fd_glob_23, "auth/meta.json": __fd_glob_24, "backend/meta.json": __fd_glob_25, "database/meta.json": __fd_glob_26, "email/meta.json": __fd_glob_27, "frontend/meta.json": __fd_glob_28, "ui/meta.json": __fd_glob_29, "skills/meta.json": __fd_glob_30, });