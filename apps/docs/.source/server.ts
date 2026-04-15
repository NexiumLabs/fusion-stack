// @ts-nocheck
import { default as __fd_glob_16 } from "../content/docs/ui/meta.json?collection=meta"
import { default as __fd_glob_15 } from "../content/docs/frontend/meta.json?collection=meta"
import { default as __fd_glob_14 } from "../content/docs/email/meta.json?collection=meta"
import { default as __fd_glob_13 } from "../content/docs/database/meta.json?collection=meta"
import { default as __fd_glob_12 } from "../content/docs/backend/meta.json?collection=meta"
import { default as __fd_glob_11 } from "../content/docs/auth/meta.json?collection=meta"
import { default as __fd_glob_10 } from "../content/docs/meta.json?collection=meta"
import * as __fd_glob_9 from "../content/docs/ui/shadcn.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/frontend/nextjs.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/email/resend.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/database/convex.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/backend/hono.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/backend/convex.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/auth/workos.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/auth/clerk.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/auth/better-auth.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/docs", {"index.mdx": __fd_glob_0, "auth/better-auth.mdx": __fd_glob_1, "auth/clerk.mdx": __fd_glob_2, "auth/workos.mdx": __fd_glob_3, "backend/convex.mdx": __fd_glob_4, "backend/hono.mdx": __fd_glob_5, "database/convex.mdx": __fd_glob_6, "email/resend.mdx": __fd_glob_7, "frontend/nextjs.mdx": __fd_glob_8, "ui/shadcn.mdx": __fd_glob_9, });

export const meta = await create.meta("meta", "content/docs", {"meta.json": __fd_glob_10, "auth/meta.json": __fd_glob_11, "backend/meta.json": __fd_glob_12, "database/meta.json": __fd_glob_13, "email/meta.json": __fd_glob_14, "frontend/meta.json": __fd_glob_15, "ui/meta.json": __fd_glob_16, });