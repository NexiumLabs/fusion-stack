const FEATURES = [
  {
    icon: "⚡",
    title: "Dev Server",
    description: "Run pnpm dev to start the development server with hot reload and Turbopack.",
  },
  {
    icon: "🔑",
    title: "Environment",
    description: "Copy .env.example → .env.local and fill in your API keys to connect services.",
  },
  {
    icon: "📁",
    title: "Project Structure",
    description: "Files live in src/app/ with a clean separation of routes, components, and lib.",
  },
  {
    icon: "🚀",
    title: "Deploy",
    description: "Build for production with pnpm build — deploy to Vercel, Railway, or anywhere.",
  },
]

const STACK_CONFIG = {{STACK_CONFIG}} as Array<{ label: string; value: string; icon: string }>

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <span className="font-semibold tracking-tight text-brand-text">
          {{PROJECT_NAME}}
        </span>
        <a
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal px-4 py-1.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-85"
        >
          Dashboard <span aria-hidden="true">→</span>
        </a>
      </nav>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-brand-text/60">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
          Built with fusion-stack · NexiumLabs
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight text-brand-text sm:text-6xl">
          Welcome to {{PROJECT_NAME}}
        </h1>
        <p className="mb-10 max-w-md text-base leading-relaxed text-brand-text/50">
          Your project is scaffolded and ready. Configure your environment,
          build your features, and ship with confidence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/dashboard"
            className="rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-85"
          >
            /dashboard
          </a>
          <a
            href="https://github.com/nexiumlabs/fusion-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-brand-text/80 transition-colors hover:border-white/40 hover:text-brand-text"
          >
            View Docs
          </a>
        </div>
      </main>

      {/* Stack config cards — only shown when selections were made */}
      {STACK_CONFIG.length > 0 && (
        <section className="mx-auto w-full max-w-3xl px-6 pb-12">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-brand-text/30">
            Your Stack
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {STACK_CONFIG.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2"
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-xs text-brand-text/50">{item.label}</span>
                <span className="text-xs font-medium text-brand-text/80">{item.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Feature cards */}
      <section
        id="features"
        className="mx-auto w-full max-w-3xl px-6 pb-24"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-white/[0.16]"
            >
              <div className="mb-3 text-2xl">{card.icon}</div>
              <h3 className="mb-1.5 text-sm font-semibold text-brand-text">{card.title}</h3>
              <p className="text-xs leading-relaxed text-brand-text/45">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-5 text-center text-xs text-brand-text/30">
        Built with{" "}
        <a
          href="https://github.com/nexiumlabs/fusion-stack"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-teal/70 transition-colors hover:text-brand-teal"
        >
          fusion-stack
        </a>
        {" · "}
        <a
          href="https://nexiumlabs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-brand-text/60"
        >
          NexiumLabs
        </a>
      </footer>
    </div>
  )
}
