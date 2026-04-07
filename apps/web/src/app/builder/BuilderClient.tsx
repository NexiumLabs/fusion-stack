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
      {/* Sidebar */}
      <div
        className="hidden w-64 shrink-0 border-r border-[rgba(0,210,210,0.08)] lg:flex lg:flex-col"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,210,210,0.03) 0%, rgba(2,12,14,0.6) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Sidebar selections={selections as Selections} onChange={handleChange} />
      </div>

      {/* Main panel */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="border-b border-[rgba(0,210,210,0.08)] px-6 py-3.5">
          <h1 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgba(0,210,210,0.38)]">
            <span className="text-[rgba(0,210,210,0.22)]">&gt;_</span>{" "}
            Stack Builder
          </h1>
        </div>

        <div className="flex flex-1 flex-col gap-12 px-6 py-8">
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
