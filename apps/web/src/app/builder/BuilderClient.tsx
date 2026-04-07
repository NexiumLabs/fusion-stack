"use client"

import { Sidebar } from "@/components/builder/Sidebar"
import { StackSection } from "@/components/builder/StackSection"
import { useStackSelection } from "@/hooks/useStackSelection"
import { STACKS } from "@/lib/stacks"
import type { Selections } from "@/lib/command"

export function BuilderClient() {
  const [selections, setSelections] = useStackSelection()

  function handleSelect(categoryId: string, optionId: string) {
    setSelections({ [categoryId]: optionId })
  }

  function handleChange(updates: Partial<Selections>) {
    setSelections(updates as Partial<typeof selections>)
  }

  const selectionsAsRecord = selections as Record<string, string>

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="hidden w-64 shrink-0 border-r border-white/10 lg:flex lg:flex-col">
        <Sidebar selections={selections as Selections} onChange={handleChange} />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="border-b border-white/10 px-6 py-3">
          <h1 className="font-mono text-xs uppercase tracking-widest text-white/40">
            <span className="text-white/20">&gt;_</span> Stack Builder
          </h1>
        </div>

        <div className="flex flex-1 flex-col gap-10 px-6 py-8">
          {STACKS.map((category) => (
            <StackSection
              key={category.id}
              category={category}
              selections={selectionsAsRecord}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
