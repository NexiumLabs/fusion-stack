"use client"

import { Sidebar } from "@/components/builder/Sidebar"
import { StackSection } from "@/components/builder/StackSection"
import { FolderPreview } from "@/components/builder/FolderPreview"
import { useStackSelection } from "@/hooks/useStackSelection"
import { STACKS } from "@/lib/stacks"
import type { Selections } from "@/lib/command"

export function BuilderClient() {
  const [selections, setSelections] = useStackSelection()

  function handleSelect(categoryId: string, optionId: string) { setSelections({ [categoryId]: optionId }) }
  function handleChange(updates: Partial<Selections>) { setSelections(updates as Partial<typeof selections>) }

  return (
    <div className="flex flex-1 overflow-hidden">
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
