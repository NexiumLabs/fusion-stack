import { Suspense } from "react"
import { BuilderClient } from "./BuilderClient"

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderSkeleton />}>
      <BuilderClient />
    </Suspense>
  )
}

function BuilderSkeleton() {
  return (
    <div className="flex flex-1 animate-pulse">
      <div className="hidden w-64 shrink-0 border-r border-white/10 lg:block" />
      <div className="flex flex-1 flex-col gap-8 px-6 py-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-3 w-32 rounded bg-white/10" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-20 rounded-lg bg-white/5" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
