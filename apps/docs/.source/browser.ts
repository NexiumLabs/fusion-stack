// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "auth/better-auth.mdx": () => import("../content/docs/auth/better-auth.mdx?collection=docs"), "auth/clerk.mdx": () => import("../content/docs/auth/clerk.mdx?collection=docs"), "backend/convex.mdx": () => import("../content/docs/backend/convex.mdx?collection=docs"), "backend/hono.mdx": () => import("../content/docs/backend/hono.mdx?collection=docs"), "database/convex.mdx": () => import("../content/docs/database/convex.mdx?collection=docs"), "email/resend.mdx": () => import("../content/docs/email/resend.mdx?collection=docs"), "frontend/nextjs.mdx": () => import("../content/docs/frontend/nextjs.mdx?collection=docs"), "ui/shadcn.mdx": () => import("../content/docs/ui/shadcn.mdx?collection=docs"), }),
};
export default browserCollections;