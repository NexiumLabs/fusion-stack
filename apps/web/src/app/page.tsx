import Link from "next/link"
import { ArrowRight, Terminal, Layers, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden px-4 py-28 text-center">
        {/* Whisper of cyan at the very top — matches nexiumlabs.io ambient */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(0,221,212,0.06) 0%, transparent 70%)", filter: "blur(50px)" }}
          aria-hidden
        />

        {/* Badge — white glass, cyan only on the pulse dot */}
        <div
          className="flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-1.5 font-mono text-xs text-white/35"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00DDD4]" />
          early access · v0.1 · from the lab @ NexiumLabs
        </div>

        {/* Hero — white-first, cyan bleeds in at the tail end only */}
        <div className="max-w-2xl space-y-5">
          <h1 className="font-mono text-5xl font-bold tracking-tight sm:text-6xl">
            <span
              style={{
                background: "linear-gradient(145deg, #FFFFFF 50%, #00DDD4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &gt;_ fusion-stack
            </span>
          </h1>
          {/* Body copy: pure white/gray — no teal whatsoever */}
          <p className="text-base leading-relaxed text-white/50">
            Pick your stack. Get a pre-configured, TypeScript-ready project in one command.
            No boilerplate hunting. No wiring from scratch.
          </p>
        </div>

        {/* CLI block — black glass, white text */}
        <div
          className="rounded-2xl border border-white/[0.07] px-6 py-3.5 font-mono text-sm text-white/50"
          style={{
            background: "rgba(0,0,0,0.50)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Cyan only on the $ prompt character */}
          <span className="text-[rgba(0,221,212,0.50)]">$ </span>
          pnpm create fusion-stack@latest my-app
        </div>

        {/* CTAs — primary is full cyan (NexiumLabs CTA pattern), secondary is white/neutral */}
        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00DDD4] px-6 py-2.5 text-sm font-semibold text-[#090B0C] transition-all duration-200 hover:bg-[#00F0E6] hover:shadow-[0_0_22px_rgba(0,221,212,0.38)]"
          >
            Open Builder <ArrowRight size={14} />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] px-6 py-2.5 text-sm font-medium text-white/55 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-white"
          >
            Docs
          </Link>
        </div>
      </section>

      {/* Feature cards — black/white glass, cyan only on icons */}
      <section className="border-t border-white/[0.05] px-4 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <FeatureCard icon={<Terminal size={16} />} title="One command" description="Run a single CLI command and get a fully wired project — dependencies, config, and structure all set." />
          <FeatureCard icon={<Layers size={16} />} title="Composable stacks" description="Mix and match frontend, backend, auth, and email providers. Only what you choose ends up in your project." />
          <FeatureCard icon={<Zap size={16} />} title="Ready to ship" description="TypeScript throughout, sensible defaults, and no lock-in. Start building features on day one." />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div
      className="rounded-2xl border border-white/[0.07] p-6 space-y-3 transition-all duration-200 hover:border-white/[0.12]"
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 2px 14px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Icons get the cyan — small, precise, intentional */}
      <div className="text-[#00DDD4]">{icon}</div>
      <h3 className="font-medium text-sm text-white/85">{title}</h3>
      <p className="text-xs text-white/40 leading-relaxed">{description}</p>
    </div>
  )
}
