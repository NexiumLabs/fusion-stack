/**
 * Brand SVG icons sourced from Simple Icons (simpleicons.org) — 24×24 viewBox.
 * Dark-colored brands (Next.js, Resend, shadcn) are rendered in white on our dark UI.
 * WorkOS is not in Simple Icons; a custom W-mark is used with their brand color.
 */
import type { ReactNode } from "react"

function I({
  size = 20,
  children,
  title,
}: {
  size?: number
  children: ReactNode
  title?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label={title}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      style={{ display: "block", flexShrink: 0 }}
    >
      {children}
    </svg>
  )
}

// ── Frontend ──────────────────────────────────────────────────────────────────

/** Next.js — Simple Icons path, white on dark (brand color is #000) */
function NextjsIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Next.js">
      <path
        fill="white"
        d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"
      />
    </I>
  )
}

// ── Backend ───────────────────────────────────────────────────────────────────

/**
 * Convex — actual brand symbol extracted from convex.dev/brand.
 * Three overlapping teardrop/leaf shapes: amber (#F3B01C) at bottom,
 * purple (#8D2676) on the left, red (#EE342F) on the right.
 * Their overlap produces the orange-red appearance.
 * viewBox cropped to the symbol only (square, centered).
 */
function ConvexIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="46 41 64 64"
      fill="none"
      aria-label="Convex"
      role="img"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Bottom leaf — amber/yellow */}
      <path
        fill="#F3B01C"
        d="M82.2808 87.6516C89.652 86.8381 96.6012 82.9352 100.427 76.421C98.6156 92.533 80.8853 102.717 66.413 96.4643C65.0795 95.8897 63.9316 94.9339 63.1438 93.705C59.8915 88.6302 58.8224 82.1729 60.3585 76.3129C64.7475 83.8398 73.6717 88.4538 82.2808 87.6516Z"
      />
      {/* Left leaf — purple */}
      <path
        fill="#8D2676"
        d="M60.0895 71.5852C57.1016 78.4465 56.9722 86.4797 60.6353 93.0906C47.7442 83.453 47.8848 62.8294 60.4778 53.2885C61.6425 52.4067 63.0267 51.8833 64.4785 51.8036C70.4486 51.4907 76.5144 53.7835 80.7683 58.0561C72.1254 58.1415 63.7076 63.643 60.0895 71.5852Z"
      />
      {/* Right leaf — red */}
      <path
        fill="#EE342F"
        d="M84.9366 60.1673C80.5757 54.1253 73.7503 50.0119 66.2722 49.8868C80.7277 43.3669 98.5086 53.9375 100.444 69.5659C100.624 71.0167 100.388 72.4959 99.7409 73.8044C97.04 79.2547 92.032 83.4819 86.1801 85.0464C90.4678 77.144 89.9388 67.4893 84.9366 60.1673Z"
      />
    </svg>
  )
}

/** Hono — Simple Icons path, brand color #E36002 */
function HonoIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Hono">
      <path
        fill="#E36002"
        d="M12.445.002a45.529 45.529 0 0 0-5.252 8.146 8.595 8.595 0 0 1-.555-.53 27.796 27.796 0 0 0-1.205-1.542 8.762 8.762 0 0 0-1.251 2.12 20.743 20.743 0 0 0-1.448 5.88 8.867 8.867 0 0 0 .338 3.468c1.312 3.48 3.794 5.593 7.445 6.337 3.055.438 5.755-.333 8.097-2.312 2.677-2.59 3.359-5.634 2.047-9.132a33.287 33.287 0 0 0-2.988-5.59A91.34 91.34 0 0 0 12.615.053a.216.216 0 0 0-.17-.051Zm-.336 3.906a50.93 50.93 0 0 1 4.794 6.552c.448.767.817 1.57 1.108 2.41.606 2.386-.044 4.354-1.951 5.904-1.845 1.298-3.87 1.683-6.072 1.156-2.376-.737-3.75-2.335-4.121-4.794a5.107 5.107 0 0 1 .242-2.266c.358-.908.79-1.774 1.3-2.601l1.446-2.121a397.33 397.33 0 0 0 3.254-4.24Z"
      />
    </I>
  )
}

// ── Auth ──────────────────────────────────────────────────────────────────────

/** Clerk — Simple Icons path, brand color #6C47FF */
function ClerkIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Clerk">
      <path
        fill="#6C47FF"
        d="m21.47 20.829-2.881-2.881a.572.572 0 0 0-.7-.084 6.854 6.854 0 0 1-7.081 0 .576.576 0 0 0-.7.084l-2.881 2.881a.576.576 0 0 0-.103.69.57.57 0 0 0 .166.186 12 12 0 0 0 14.113 0 .58.58 0 0 0 .239-.423.576.576 0 0 0-.172-.453Zm.002-17.668-2.88 2.88a.569.569 0 0 1-.701.084A6.857 6.857 0 0 0 8.724 8.08a6.862 6.862 0 0 0-1.222 3.692 6.86 6.86 0 0 0 .978 3.764.573.573 0 0 1-.083.699l-2.881 2.88a.567.567 0 0 1-.864-.063A11.993 11.993 0 0 1 6.771 2.7a11.99 11.99 0 0 1 14.637-.405.566.566 0 0 1 .232.418.57.57 0 0 1-.168.448Zm-7.118 12.261a3.427 3.427 0 1 0 0-6.854 3.427 3.427 0 0 0 0 6.854Z"
      />
    </I>
  )
}

/**
 * WorkOS — actual brandmark extracted from workos.com.
 * Two interlocking chevron shapes, both filled #6363F1 (brand indigo).
 * Uses the original 124×124 viewBox so the paths render without any recalculation.
 */
function WorkOSIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 124 124"
      fill="none"
      aria-label="WorkOS"
      role="img"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Left chevron */}
      <path
        d="M2 60.8894C2 63.1207 2.58718 65.352 3.72241 67.2701L24.313 102.932C26.4269 106.572 29.6368 109.547 33.6297 110.878C41.498 113.501 49.6403 110.135 53.5157 103.402L58.4872 94.7895L38.8752 60.8894L64.5548 16.3807C66.0423 13.7971 68.0387 11.6833 70.3875 10H38.4446C32.8468 10 27.6796 12.9751 24.9002 17.8291L3.72241 54.5086C2.58718 56.4268 2 58.6581 2 60.8894Z"
        fill="#6363F1"
      />
      {/* Right chevron */}
      <path
        d="M119.437 60.8892C119.437 58.6579 118.85 56.4266 117.715 54.5084L96.8499 18.377C92.9745 11.6831 84.8322 8.31655 76.9639 10.9002C72.971 12.2311 69.7611 15.2062 67.6472 18.8467L62.9497 26.9499L82.5617 60.8892L56.8822 105.398C55.3946 107.942 53.3982 110.095 51.0495 111.779H82.9923C88.5902 111.779 93.7574 108.803 96.5367 103.949L117.715 67.2699C118.85 65.3518 119.437 63.1205 119.437 60.8892Z"
        fill="#6363F1"
      />
    </svg>
  )
}

/** Better Auth — Simple Icons path (slug: betterauth), white on dark (brand is #000) */
function BetterAuthIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Better Auth">
      <path
        fill="white"
        d="M0 3.39v17.22h5.783V15.06h6.434V8.939H5.783V3.39ZM12.217 8.94h5.638v6.122h-5.638v5.548H24V3.391H12.217Z"
      />
    </I>
  )
}

// ── UI ────────────────────────────────────────────────────────────────────────

/** Tailwind CSS — Simple Icons path, brand color #06B6D4 */
function TailwindIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Tailwind CSS">
      <path
        fill="#06B6D4"
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C12.337,13.382,10.976,12,6.001,12z"
      />
    </I>
  )
}

/** shadcn/ui — Simple Icons path, white on dark (brand color is #000) */
function ShadcnIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="shadcn/ui">
      <path
        fill="white"
        d="M22.219 11.784 11.784 22.219c-.407.407-.407 1.068 0 1.476.407.407 1.068.407 1.476 0L23.695 13.26c.407-.408.407-1.069 0-1.476-.408-.407-1.069-.407-1.476 0ZM20.132.305.305 20.132c-.407.407-.407 1.068 0 1.476.408.407 1.069.407 1.476 0L21.608 1.781c.407-.407.407-1.068 0-1.476-.408-.407-1.069-.407-1.476 0Z"
      />
    </I>
  )
}

// ── Email ─────────────────────────────────────────────────────────────────────

/** Resend — Simple Icons path, white on dark (brand color is #000) */
function ResendIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Resend">
      <path
        fill="white"
        d="M14.679 0c4.648 0 7.413 2.765 7.413 6.434s-2.765 6.434-7.413 6.434H12.33L24 24h-8.245l-8.88-8.44c-.636-.588-.93-1.273-.93-1.86 0-.831.587-1.565 1.713-1.883l4.574-1.224c1.737-.465 2.936-1.81 2.936-3.572 0-2.153-1.761-3.4-3.939-3.4H0V0z"
      />
    </I>
  )
}

// ── Package managers ──────────────────────────────────────────────────────────

/** pnpm — Simple Icons path, brand orange #F69220 */
function PnpmIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="pnpm">
      <path
        fill="#F69220"
        d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM2 2h3.5v3.5H2zm8.25 0h3.498v3.5H10.25zm8.25 0H22v3.5h-3.5zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zm2 2H22v3.5h-3.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"
      />
    </I>
  )
}

/** npm — Simple Icons path, brand color #CB3837 */
function NpmIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="npm">
      <path
        fill="#CB3837"
        d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
      />
    </I>
  )
}

// ── API Layer ─────────────────────────────────────────────────────────────────

/** tRPC — Simple Icons path, brand color #398CCB */
function TrpcIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="tRPC">
      <path
        fill="#398CCB"
        d="M0 13.136V10.86h2.787V0h2.276v10.848h2.787v2.288H0zm9.367 0V0h2.276v4.52h4.075V0h2.276v13.136H15.72V6.82h-4.075v6.316H9.367zm11.357 0V0H24v2.288h-1V10.8H24v2.288l-3.276.048z"
      />
    </I>
  )
}

/**
 * oRPC — custom icon (no Simple Icons entry).
 * A circle ring representing the "O" in oRPC with three connection nodes
 * symbolising type-safe RPC calls. Brand-adjacent orange #F97316.
 */
function OrpcIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="oRPC">
      <circle cx="12" cy="12" r="8.75" stroke="#F97316" strokeWidth="1.5" />
      <circle cx="12" cy="7"  r="1.75" fill="#F97316" />
      <circle cx="7"  cy="15" r="1.75" fill="#F97316" />
      <circle cx="17" cy="15" r="1.75" fill="#F97316" />
      <path
        d="M12 8.75 7.8 13.5M12 8.75l4.2 4.75"
        stroke="#F97316"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </I>
  )
}

// ── Database ──────────────────────────────────────────────────────────────────

/** PostgreSQL — simplified database cylinder, PostgreSQL blue */
function PostgreSQLIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="PostgreSQL">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#4a8fbf" />
      <path fill="#336791" d="M4 6v12c0 1.657 3.582 3 8 3s8-1.343 8-3V6c0 1.657-3.582 3-8 3S4 7.657 4 6z" />
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#4a8fbf" />
    </I>
  )
}

/** MongoDB — leaf silhouette, brand green #47A248 */
function MongoDBIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="MongoDB">
      <path fill="#47A248" d="M12 2C10.5 6.5 7 9.5 7 14a5 5 0 0010 0c0-4.5-3.5-7.5-5-12z" />
      <rect x="11.25" y="16" width="1.5" height="6" rx="0.75" fill="#47A248" opacity="0.6" />
    </I>
  )
}

/** MySQL — stacked arcs, MySQL blue #4479A1 */
function MySQLIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="MySQL">
      <ellipse cx="12" cy="5.5" rx="8" ry="2.5" fill="#4479A1" />
      <path fill="#4479A1" d="M4 5.5v4c0 1.38 3.582 2.5 8 2.5s8-1.12 8-2.5v-4c0 1.38-3.582 2.5-8 2.5S4 6.88 4 5.5z" />
      <path fill="#4479A1" d="M4 11v4c0 1.38 3.582 2.5 8 2.5s8-1.12 8-2.5v-4c0 1.38-3.582 2.5-8 2.5S4 12.38 4 11z" />
      <path fill="#3a6a91" d="M4 17v1.5C4 19.88 7.582 21 12 21s8-1.12 8-2.5V17c0 1.38-3.582 2.5-8 2.5S4 18.38 4 17z" />
    </I>
  )
}

/** SQLite — compact dark-blue cylinder */
function SQLiteIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="SQLite">
      <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="#0078a0" />
      <path fill="#003B57" d="M5 5v14c0 1.38 3.134 2.5 7 2.5S19 20.38 19 19V5c0 1.38-3.134 2.5-7 2.5S5 6.38 5 5z" />
      <path stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" d="M5 10c0 1.38 3.134 2.5 7 2.5S19 11.38 19 10" />
      <path stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" d="M5 15c0 1.38 3.134 2.5 7 2.5S19 16.38 19 15" />
    </I>
  )
}

// ── ORM ───────────────────────────────────────────────────────────────────────

/** Drizzle ORM — two horizontal bars, lime brand color #C5F74F */
function DrizzleIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Drizzle ORM">
      <rect x="2" y="7.5" width="20" height="3.5" rx="1.75" fill="#C5F74F" />
      <rect x="2" y="13" width="13" height="3.5" rx="1.75" fill="#C5F74F" opacity="0.65" />
    </I>
  )
}

/** Prisma — prism / triangle silhouette, white on dark */
function PrismaIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Prisma">
      <path fill="white" opacity="0.9" d="M4.5 20.5L12 3l7.5 17.5-7.5-4-7.5 4z" />
      <path fill="#1a202c" d="M12 7l5 11.5-5-2.7V7z" />
    </I>
  )
}

/** Mongoose — warm red M shape */
function MongooseIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Mongoose">
      <path fill="#880000" d="M3 19V9l4.5 6.5L12 5l4.5 10.5L21 9v10H3z" />
    </I>
  )
}

// ── DB Providers ──────────────────────────────────────────────────────────────

/** Supabase — lightning bolt, brand green #3ECF8E */
function SupabaseIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Supabase">
      <path fill="#3ECF8E" d="M13.2 2.6c-.4-.8-1.5-.8-1.8 0L4.6 16.5c-.3.7.2 1.5 1 1.5h6.4V22l7.4-10.1c.5-.7 0-1.7-.9-1.7h-5.9L13.2 2.6z" />
    </I>
  )
}

/** Neon — hex-node branching, cyan brand #00E5BF */
function NeonIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Neon">
      <path stroke="#00E5BF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none"
        d="M12 3v5M8.5 6.5l3.5 1.5 3.5-1.5M6 12l6 3 6-3M6 12v5l6 3 6-3v-5" />
    </I>
  )
}

/** PlanetScale — orbit ring + planet dot, purple #8B5CF6 */
function PlanetScaleIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="PlanetScale">
      <circle cx="12" cy="12" r="3.5" fill="#8B5CF6" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" stroke="#8B5CF6" strokeWidth="1.5" fill="none"
        transform="rotate(-35 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" stroke="#8B5CF6" strokeWidth="1.5" fill="none"
        transform="rotate(35 12 12)" opacity="0.4" />
    </I>
  )
}

// ── Addons ────────────────────────────────────────────────────────────────────

/** PWA — browser frame with download arrow, accent cyan #00DDD4 */
function PWAIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="PWA">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#00DDD4" strokeWidth="1.5" fill="none" />
      <path stroke="#00DDD4" strokeWidth="1.5" fill="none" d="M2 8h20" />
      <path stroke="#00DDD4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none"
        d="M12 11v6M9 14.5l3 3 3-3" />
    </I>
  )
}

// ── Skill ─────────────────────────────────────────────────────────────────────

function SkillIcon({ size }: { size?: number }) {
  return (
    <I size={size} title="Skill">
      {/* graduation cap */}
      <path d="M12 3L2 8l10 5 10-5-10-5z" stroke="rgba(0,221,212,0.70)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M6 10.5V16c0 1.657 2.686 3 6 3s6-1.343 6-3v-5.5" stroke="rgba(0,221,212,0.70)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M20 8v5" stroke="rgba(0,221,212,0.50)" strokeWidth="1.5" strokeLinecap="round" />
    </I>
  )
}

// ── None / generic ────────────────────────────────────────────────────────────

function NoneIcon({ size }: { size?: number }) {
  return (
    <I size={size}>
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <path d="M8.5 12h7" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinecap="round" />
    </I>
  )
}

// ── Registry ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, (props: { size?: number }) => ReactNode> = {
  // Frontend
  nextjs:        NextjsIcon,
  // Backend
  convex:        ConvexIcon,
  hono:          HonoIcon,
  // API Layer
  trpc:          TrpcIcon,
  orpc:          OrpcIcon,
  // Database
  postgresql:    PostgreSQLIcon,
  mongodb:       MongoDBIcon,
  mysql:         MySQLIcon,
  sqlite:        SQLiteIcon,
  // ORM
  drizzle:       DrizzleIcon,
  prisma:        PrismaIcon,
  mongoose:      MongooseIcon,
  // DB Providers
  supabase:      SupabaseIcon,
  neon:          NeonIcon,
  planetscale:   PlanetScaleIcon,
  // Auth
  clerk:         ClerkIcon,
  workos:        WorkOSIcon,
  "better-auth": BetterAuthIcon,
  // UI
  tailwind:      TailwindIcon,
  shadcn:        ShadcnIcon,
  // Email
  resend:        ResendIcon,
  // Addons
  pwa:           PWAIcon,
  skill:         SkillIcon,
  // Package managers
  pnpm:          PnpmIcon,
  npm:           NpmIcon,
  // Fallback
  none:          NoneIcon,
}

export function getStackIcon(key: string, size?: number): ReactNode {
  const Component = ICON_MAP[key] ?? NoneIcon
  return <Component size={size} />
}
