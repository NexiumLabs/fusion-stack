"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

// Docs lives on a separate Next.js app — always use <a>, never <Link>
const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? "/docs"

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06]"
      style={{ background: "rgba(9,11,12,0.88)", backdropFilter: "blur(20px) saturate(140%)" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">

        {/* Brand + desktop nav */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm font-semibold text-white"
          >
            <span className="text-[#00DDD4] transition-opacity duration-150 group-hover:opacity-70">&gt;_</span>
            <span>fusion-stack</span>
            <span className="ml-1 rounded-full border border-white/[0.07] px-2 py-0.5 font-mono text-[9px] tracking-wider text-white/20 uppercase">
              beta
            </span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {/* Docs — always <a>, it's a separate app */}
            <a
              href={DOCS_URL}
              className="relative rounded-lg px-3 py-1.5 text-sm text-white/40 transition-colors duration-150 hover:bg-white/[0.04] hover:text-white"
            >
              Docs
            </a>

            {/* Builder — internal link with active state */}
            <Link
              href="/builder"
              className={[
                "relative rounded-lg px-3 py-1.5 text-sm transition-colors duration-150",
                pathname === "/builder"
                  ? "bg-white/[0.06] text-white"
                  : "text-white/40 hover:bg-white/[0.04] hover:text-white",
              ].join(" ")}
            >
              Builder
              {pathname === "/builder" && (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-[#00DDD4]/50" />
              )}
            </Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/NexiumLabs/fusion-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-white/25 transition-colors duration-150 hover:bg-white/[0.04] hover:text-white/70"
            aria-label="GitHub"
          >
            <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="sm:hidden rounded-lg p-2 text-white/35 transition-colors duration-150 hover:bg-white/[0.04] hover:text-white"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="sm:hidden border-t border-white/[0.05] px-5 py-4 space-y-1"
          style={{ background: "rgba(9,11,12,0.97)" }}
        >
          <a
            href={DOCS_URL}
            className="flex items-center rounded-lg px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            Docs
          </a>
          <Link
            href="/builder"
            onClick={() => setMobileOpen(false)}
            className={[
              "flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/[0.04] hover:text-white",
              pathname === "/builder" ? "text-white" : "text-white/50",
            ].join(" ")}
          >
            Builder
          </Link>
        </div>
      )}
    </header>
  )
}
