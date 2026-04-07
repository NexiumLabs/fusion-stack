import Link from "next/link"
import { ArrowRight, Terminal, Layers, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden px-4 py-28 text-center">
        {/* Ambient glow orb */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,210,210,0.14) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden
        />

        {/* Badge */}
        <div
          className="flex items-center gap-2 rounded-full border border-[rgba(0,210,210,0.20)] px-4 py-1.5 font-mono text-xs text-[rgba(0,210,210,0.60)]"
          style={{
            background: "rgba(0,210,210,0.05)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D4D4]" />
          early access — v0.1 · from the lab @ NexiumLabs
        </div>

        {/* Heading */}
        <div className="max-w-2xl space-y-5">
          <h1 className="font-mono text-5xl font-bold tracking-tight sm:text-6xl">
            <span
              style={{
                background: "linear-gradient(135deg, #F0FAFA 35%, #00D4D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &gt;_ fusion-stack
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-[rgba(200,245,245,0.50)]">
            Pick your stack. Get a pre-configured, TypeScript-ready project in one command.
            No boilerplate hunting. No wiring from scratch.
          </p>
        </div>

        {/* CLI preview */}
        <div
          className="rounded-2xl border border-[rgba(0,210,210,0.14)] px-6 py-3.5 font-mono text-sm text-[rgba(0,220,220,0.65)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,210,210,0.06) 0%, rgba(0,0,0,0.25) 100%)",
            backdropFilter: "blur(20px) saturate(160%)",
            boxShadow:
              "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,220,220,0.07)",
          }}
        >
          <span className="text-[rgba(0,210,210,0.35)]">$ </span>
          pnpm create fusion-stack@latest my-app
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00D4D4] px-6 py-2.5 text-sm font-semibold text-[#020C0E] transition-all duration-200 hover:bg-[#00FFEE] hover:shadow-[0_0_24px_rgba(0,210,210,0.45)]"
          >
            Open Builder <ArrowRight size={15} />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-[rgba(0,210,210,0.20)] px-6 py-2.5 text-sm font-medium text-[rgba(0,210,210,0.70)] transition-all duration-200 hover:border-[rgba(0,210,210,0.38)] hover:bg-[rgba(0,210,210,0.06)] hover:text-[#00D4D4]"
            style={{ backdropFilter: "blur(12px)" }}
          >
            Docs
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="border-t border-[rgba(0,210,210,0.08)] px-4 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          <FeatureCard
            icon={<Terminal size={17} />}
            title="One command"
            description="Run a single CLI command and get a fully wired project — dependencies, config, and structure all set."
          />
          <FeatureCard
            icon={<Layers size={17} />}
            title="Composable stacks"
            description="Mix and match frontend, backend, auth, and email providers. Only what you choose ends up in your project."
          />
          <FeatureCard
            icon={<Zap size={17} />}
            title="Ready to ship"
            description="TypeScript throughout, sensible defaults, and no lock-in. Start building features on day one."
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div
      className="rounded-2xl border border-[rgba(0,210,210,0.10)] p-6 space-y-3 transition-all duration-200 hover:border-[rgba(0,210,210,0.20)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,210,210,0.05) 0%, rgba(0,0,0,0) 60%)",
        backdropFilter: "blur(16px) saturate(150%)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(0,220,220,0.06)",
      }}
    >
      <div className="text-[#00D4D4]">{icon}</div>
      <h3 className="font-medium text-sm text-[#F0FAFA]">{title}</h3>
      <p className="text-xs text-[rgba(180,230,230,0.45)] leading-relaxed">{description}</p>
    </div>
  )
}
