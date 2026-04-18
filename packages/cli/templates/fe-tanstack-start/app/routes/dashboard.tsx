import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-bg px-6 text-center">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-brand-text/60">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
        {{PROJECT_NAME}}
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-brand-text">Dashboard</h1>
      <p className="max-w-xs text-sm leading-relaxed text-brand-text/50">
        You&apos;re in. Start building your features here.
      </p>
      <Link
        to="/"
        className="mt-2 text-xs text-brand-teal/60 transition-colors hover:text-brand-teal"
      >
        ← Back home
      </Link>
    </div>
  )
}
