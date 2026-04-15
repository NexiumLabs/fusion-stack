import Link from "next/link"
import { ArrowRight, Terminal, Layers, Zap } from "lucide-react"
import { STACKS } from "@/lib/stacks"
import { getStackIcon } from "@/lib/stack-icons"

// Docs is a separate app — use <a>, never <Link>
const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? "https://fusion-stack-docs.vercel.app"

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center gap-10 overflow-hidden px-4 pb-28 pt-32 text-center">

        {/* Ambient top glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[700px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse, rgba(0,221,212,0.07) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
          aria-hidden
        />

        {/* Dot grid — fades out toward bottom */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 100% 70% at 50% 0%, black 10%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 100% 70% at 50% 0%, black 10%, transparent 100%)",
          }}
          aria-hidden
        />

        {/* Status badge */}
        <div
          className="animate-fade-in relative flex items-center gap-2.5 rounded-full border border-white/[0.08] px-4 py-1.5 font-mono text-xs text-white/28"
          style={{ background: "rgba(255,255,255,0.03)", animationDelay: "0ms" }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00DDD4]" />
          early access · v0.1 · from the lab @ NexiumLabs
        </div>

        {/* Main headline */}
        <div
          className="animate-fade-up relative space-y-5"
          style={{ animationDelay: "80ms" }}
        >
          <h1
            className="font-mono font-bold leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 9vw, 5.75rem)" }}
          >
            <span
              style={{
                background: "linear-gradient(150deg, #FFFFFF 35%, rgba(0,221,212,0.90) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &gt;_ fusion-stack
            </span>
          </h1>
          <p className="mx-auto max-w-md text-[0.95rem] leading-relaxed text-white/42">
            Pick your frontend, backend, auth, and email.
            Get a pre-wired TypeScript project in one command.
          </p>
        </div>

        {/* CLI command */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          <div
            className="rounded-2xl border border-white/[0.07] px-8 py-4 font-mono text-sm text-white/48"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(0,221,212,0.03)",
            }}
          >
            <span className="text-[rgba(0,221,212,0.55)]">$ </span>
            pnpm create fusion-stack@latest my-app
          </div>
        </div>

        {/* CTA buttons */}
        <div
          className="animate-fade-up flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00DDD4] px-7 py-2.5 text-sm font-semibold text-[#090B0C] transition-all duration-200 hover:bg-[#00F0E6] hover:shadow-[0_0_30px_rgba(0,221,212,0.42)] active:scale-[0.98]"
          >
            Open Builder <ArrowRight size={14} />
          </Link>
          <a
            href={DOCS_URL}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] px-7 py-2.5 text-sm font-medium text-white/48 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white"
          >
            Read the docs
          </a>
        </div>
      </section>

      {/* ── Composable stacks showcase ───────────────────────────── */}
      <section className="border-t border-white/[0.04] px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/22">
            <span style={{ color: "rgba(0,221,212,0.38)" }}>&gt;_</span>&nbsp; what you can compose
          </h2>

          <div className="flex flex-col gap-3.5">
            {STACKS.map((category, i) => (
              <div
                key={category.id}
                className="animate-fade-in flex flex-wrap items-center gap-3"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                {/* Category label */}
                <span className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-wider text-white/18">
                  {category.label}
                </span>

                {/* Option pills */}
                <div className="flex flex-wrap gap-2">
                  {category.options.map((option) => (
                    <span
                      key={option.id}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] px-3 py-1.5 font-mono text-xs text-white/40 transition-colors duration-150 hover:border-white/[0.13] hover:text-white/60"
                      style={{ background: "rgba(255,255,255,0.022)" }}
                    >
                      {getStackIcon(option.icon, 14)}
                      {option.label}
                      {option.isNew && (
                        <span className="rounded-full border border-[rgba(0,221,212,0.28)] px-1.5 py-px font-mono text-[8px] uppercase tracking-wider text-[#00DDD4]/60"
                          style={{ background: "rgba(0,221,212,0.05)" }}
                        >
                          new
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Builder nudge */}
          <div className="mt-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.04]" />
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 font-mono text-xs text-white/25 transition-colors duration-150 hover:text-[#00DDD4]/70"
            >
              mix &amp; match interactively <ArrowRight size={11} />
            </Link>
            <div className="h-px flex-1 bg-white/[0.04]" />
          </div>
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────────────── */}
      <section className="border-t border-white/[0.04] px-4 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <FeatureCard
            number="01"
            icon={<Terminal size={14} />}
            title="One command"
            description="Run a single CLI prompt and get a fully wired project — dependencies, config, and folder structure all set."
          />
          <FeatureCard
            number="02"
            icon={<Layers size={14} />}
            title="Composable"
            description="Mix and match frontend, backend, auth, email providers. Only what you choose ends up in your project."
          />
          <FeatureCard
            number="03"
            icon={<Zap size={14} />}
            title="Ready to ship"
            description="TypeScript throughout, sensible defaults, zero lock-in. Start building features on day one."
          />
        </div>
      </section>

    </div>
  )
}

function FeatureCard({
  number,
  icon,
  title,
  description,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div
      className="group relative rounded-2xl border border-white/[0.07] p-6 transition-all duration-300 hover:border-white/[0.12]"
      style={{
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Hover shimmer line */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,221,212,0.25), transparent)" }}
        aria-hidden
      />

      <div className="mb-5 flex items-start justify-between">
        <div className="rounded-lg border border-white/[0.07] p-2 text-[#00DDD4]"
          style={{ background: "rgba(0,221,212,0.06)" }}
        >
          {icon}
        </div>
        <span className="font-mono text-[10px] text-white/[0.10]">{number}</span>
      </div>

      <h3 className="mb-2 text-sm font-medium text-white/85">{title}</h3>
      <p className="text-xs leading-relaxed text-white/35">{description}</p>
    </div>
  )
}
