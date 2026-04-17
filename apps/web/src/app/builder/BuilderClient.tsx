"use client"

import { Sidebar } from "@/components/builder/Sidebar"
import { StackSection } from "@/components/builder/StackSection"
import { FolderPreview } from "@/components/builder/FolderPreview"
import { useStackSelection } from "@/hooks/useStackSelection"
import { STACKS, getIncompatible } from "@/lib/stacks"
import type { Selections } from "@/lib/command"
import { toast } from "sonner"
import { AlertTriangle } from "lucide-react"

export function BuilderClient() {
  const [selections, setSelections] = useStackSelection()

  function handleSelect(categoryId: string, optionId: string) {
    const next = { ...selections, [categoryId]: optionId } as Record<string, string>
    const current = selections as Record<string, string>

    // Find currently-selected options that become incompatible after this change
    const nowBlocked: string[] = []
    for (const cat of STACKS) {
      if (cat.id === categoryId) continue
      const selOptId = current[cat.id]
      if (!selOptId || selOptId === "none") continue

      // Multi-select: check each selected value
      const ids = cat.multi
        ? selOptId.split(",").filter((v) => v && v !== "none")
        : [selOptId]

      for (const id of ids) {
        const wasFine = !getIncompatible(id, cat.id, current)
        const nowBad  = getIncompatible(id, cat.id, next)
        if (wasFine && nowBad) {
          const opt = cat.options.find((o) => o.id === id)
          if (opt) nowBlocked.push(opt.label)
        }
      }
    }

    if (nowBlocked.length > 0) {
      const pickedLabel =
        STACKS.find((c) => c.id === categoryId)?.options.find((o) => o.id === optionId)?.label
        ?? optionId

      toast.warning(
        nowBlocked.length === 1
          ? `${nowBlocked[0]} is not available with ${pickedLabel}`
          : `${nowBlocked.join(", ")} are not available with ${pickedLabel}`,
        {
          description: nowBlocked.length === 1
            ? "This option is grayed out in your current setup."
            : "These options are grayed out in your current setup.",
          icon: <AlertTriangle size={15} className="text-amber-400" />,
          duration: 5000,
        }
      )
    }

    setSelections({ [categoryId]: optionId })
  }

  function handleChange(updates: Partial<Selections>) { setSelections(updates as Partial<typeof selections>) }

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] overflow-hidden">
      {/* Left sidebar — project controls */}
      <div
        className="hidden w-64 shrink-0 border-r border-white/[0.05] lg:flex lg:flex-col"
        style={{ background: "rgba(0,0,0,0.30)", backdropFilter: "blur(14px)" }}
      >
        <Sidebar selections={selections as Selections} onChange={handleChange} />
      </div>

      {/* Main stack selector */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="border-b border-white/[0.05] px-6 py-3.5">
          <h1 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
            <span className="text-[rgba(0,221,212,0.40)]">&gt;_</span> Stack Builder
          </h1>
        </div>
        <div className="flex flex-1 flex-col gap-12 px-6 py-8">
          {STACKS.map((category) => (
            <StackSection
              key={category.id}
              category={category}
              selections={selections as Record<string, string>}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Right panel — live folder structure preview */}
      <div
        className="hidden w-72 shrink-0 border-l border-white/[0.05] xl:flex xl:flex-col"
        style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(14px)" }}
      >
        <FolderPreview selections={selections as Selections} />
      </div>
    </div>
  )
}
