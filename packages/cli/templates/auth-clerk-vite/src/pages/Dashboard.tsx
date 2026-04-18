import { useUser, SignInButton } from "@clerk/react"
import { Link } from "react-router-dom"

export function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-teal" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-bg px-6 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-brand-text/60">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
          {{PROJECT_NAME}}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-text">Dashboard</h1>
        <p className="max-w-xs text-sm leading-relaxed text-brand-text/50">
          Sign in to access your dashboard.
        </p>
        <SignInButton mode="modal">
          <button className="rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-85">
            Sign In
          </button>
        </SignInButton>
        <Link
          to="/"
          className="mt-2 text-xs text-brand-teal/60 transition-colors hover:text-brand-teal"
        >
          ← Back home
        </Link>
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
        Welcome back{user.firstName ? `, ${user.firstName}` : ""}. Auth is working.
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
