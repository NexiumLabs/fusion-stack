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

  const totalPicks = Object.entries(selections)
    .filter(([k, v]) => k !== "name" && v !== "none")
    .length

  return (
    <aside className="flex h-full flex-col gap-5 overflow-y-auto p-4">
      <div>
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-white/30">
          Project Name
        </p>
        <Input
          value={selections.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="my-app"
          spellCheck={false}
        />
      </div>

      <div>
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-white/30">
          CLI Command
        </p>
        <CommandPreview selections={selections} />
      </div>

      <div>
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-white/30">
          Selected Stack{" "}
          <span className="text-white/20">({totalPicks} picks)</span>
        </p>
        <SelectedChips selections={selections} onRemove={handleRemove} />
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={handleRandomize}>
            <Shuffle size={12} /> Randomize
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw size={12} /> Reset
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={handleShare} className="w-full">
          <Share2 size={12} /> {shareLabel}
        </Button>
      </div>
    </aside>
  )
}
