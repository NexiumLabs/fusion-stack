import Link from "next/link"
import { ArrowRight, Terminal, Layers, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-24 text-center">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-white/50">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          early access — v0.1
        </div>

        <div className="max-w-2xl space-y-4">
          <h1 className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <span className="text-white/30">&gt;_</span> fusion-stack
          </h1>
          <p className="text-lg text-white/50 leading-relaxed">
            Pick your stack. Get a pre-configured, TypeScript-ready project in one command.
            No boilerplate hunting, no wiring things together from scratch.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/40 px-6 py-3 font-mono text-sm text-white/60">
          <span className="text-white/30">$ </span>
          pnpm create fusion-stack@latest my-app
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
          >
            Open Builder <ArrowRight size={15} />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            Docs
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          <FeatureCard
            icon={<Terminal size={18} />}
            title="One command"
            description="Run a single CLI command and get a fully wired project — dependencies, config, and structure all set."
          />
          <FeatureCard
            icon={<Layers size={18} />}
            title="Composable stacks"
            description="Mix and match frontend, backend, auth, and email providers. Only what you choose ends up in your project."
          />
          <FeatureCard
            icon={<Zap size={18} />}
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
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 space-y-3">
      <div className="text-white/40">{icon}</div>
      <h3 className="font-medium text-white text-sm">{title}</h3>
      <p className="text-xs text-white/40 leading-relaxed">{description}</p>
    </div>
  )
}
