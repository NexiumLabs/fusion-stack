import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,210,210,0.10)] bg-[rgba(2,12,14,0.75)] backdrop-blur-xl">
      <div className="mx-auto flex h-13 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-semibold text-[#F0FAFA]"
          >
            <span className="text-[#00D4D4]">&gt;_</span>
            <span>fusion-stack</span>
            <span className="ml-1 rounded-full border border-[rgba(0,210,210,0.22)] bg-[rgba(0,210,210,0.08)] px-2 py-0.5 font-mono text-[9px] tracking-wider text-[rgba(0,210,210,0.60)] uppercase">
              by nexiumlabs
            </span>
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            <Link
              href="/docs"
              className="text-sm text-[rgba(200,245,245,0.45)] hover:text-[#00D4D4] transition-colors duration-200"
            >
              Docs
            </Link>
            <Link
              href="/builder"
              className="text-sm text-[rgba(200,245,245,0.45)] hover:text-[#00D4D4] transition-colors duration-200"
            >
              Builder
            </Link>
          </nav>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[rgba(0,210,210,0.35)] hover:text-[#00D4D4] transition-colors duration-200"
          aria-label="GitHub"
        >
          <svg height="17" width="17" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
    </header>
  )
}
