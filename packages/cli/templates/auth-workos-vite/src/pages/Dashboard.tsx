import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface WorkOSUser {
  sub: string
  email: string
  firstName?: string
}

export function Dashboard() {
  const [user, setUser] = useState<WorkOSUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data: { user: WorkOSUser | null }) => {
        if (!data.user) {
          window.location.href = "/api/auth/sign-in"
        } else {
          setUser(data.user)
          setLoading(false)
        }
      })
      .catch(() => {
        window.location.href = "/api/auth/sign-in"
      })
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-teal" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-bg px-6 text-center">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-brand-text/60">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
        {{PROJECT_NAME}}
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-brand-text">Dashboard</h1>
      <p className="max-w-xs text-sm leading-relaxed text-brand-text/50">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""}. Auth is working.
      </p>
      <a
        href="/api/auth/sign-out"
        className="rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-brand-text/60 transition-colors hover:border-white/40 hover:text-brand-text"
      >
        Sign out
      </a>
      <Link
        to="/"
        className="mt-1 text-xs text-brand-teal/60 transition-colors hover:text-brand-teal"
      >
        ← Back home
      </Link>
    </div>
  )
}
