import Link from "next/link"

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? "/docs"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-7">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <span className="font-mono text-[11px] text-white/20">
          <span style={{ color: "rgba(0,221,212,0.35)" }}>&gt;_</span>&nbsp;fusion-stack
          &nbsp;·&nbsp;
          a <span className="text-white/30">NexiumLabs</span> experiment
        </span>

        <nav className="flex items-center gap-5">
          <a
            href={DOCS_URL}
            className="font-mono text-[11px] text-white/18 transition-colors duration-150 hover:text-white/45"
          >
            docs
          </a>
          <Link
            href="/builder"
            className="font-mono text-[11px] text-white/18 transition-colors duration-150 hover:text-white/45"
          >
            builder
          </Link>
          <a
            href="https://github.com/NexiumLabs/fusion-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-white/18 transition-colors duration-150 hover:text-white/45"
          >
            github
          </a>
        </nav>
      </div>
    </footer>
  )
}
