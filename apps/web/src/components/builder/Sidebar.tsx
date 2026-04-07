"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { CommandPreview } from "./CommandPreview"
import { SelectedChips } from "./SelectedChips"
import type { Selections } from "@/lib/command"
import { STACKS } from "@/lib/stacks"
import { defaultSelections } from "@/hooks/useStackSelection"
import { Shuffle, RotateCcw, Share2 } from "lucide-react"
import { useState } from "react"

type SidebarProps = {
  selections: Selections
  onChange: (updates: Partial<Selections>) => void
}

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[rgba(0,210,210,0.35)]">
      {children}
    </p>
  )
}

function SidebarDivider() {
  return <div className="h-px bg-[rgba(0,210,210,0.07)]" />
}

export function Sidebar({ selections, onChange }: SidebarProps) {
  const [shareLabel, setShareLabel] = useState("Share")

  function handleReset() {
    onChange({ ...defaultSelections })
  }

  function handleRandomize() {
    const pick = (catId: string) => {
      const category = STACKS.find((c) => c.id === catId)
      if (!category) return "none"
      const opts = category.options
      return opts[Math.floor(Math.random() * opts.length)]?.id ?? "none"
    }
    onChange({
      fe: pick("fe"),
      be: pick("be"),
      auth: pick("auth"),
      email: pick("email"),
      pm: pick("pm"),
    })
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareLabel("Copied!")
      setTimeout(() => setShareLabel("Share"), 2000)
    })
  }

  function handleRemove(categoryId: string) {
    onChange({ [categoryId]: "none" } as Partial<Selections>)
  }

  const totalPicks = Object.entries(selections).filter(
    ([k, v]) => k !== "name" && v !== "none"
  ).length

  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <SidebarLabel>Project Name</SidebarLabel>
        <Input
          value={selections.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="my-app"
          spellCheck={false}
        />
      </div>

      <SidebarDivider />

      <div>
        <SidebarLabel>CLI Command</SidebarLabel>
        <CommandPreview selections={selections} />
      </div>

      <SidebarDivider />

      <div>
        <SidebarLabel>
          Selected Stack{" "}
          <span className="text-[rgba(0,210,210,0.20)]">({totalPicks} picks)</span>
        </SidebarLabel>
        <SelectedChips selections={selections} onRemove={handleRemove} />
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <SidebarDivider />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={handleRandomize}>
            <Shuffle size={11} /> Randomize
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw size={11} /> Reset
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={handleShare} className="w-full">
          <Share2 size={11} /> {shareLabel}
        </Button>
      </div>
    </aside>
  )
}
