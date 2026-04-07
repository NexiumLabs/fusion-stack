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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="h-px bg-white/[0.05]" />
}

export function Sidebar({ selections, onChange }: { selections: Selections; onChange: (u: Partial<Selections>) => void }) {
  const [shareLabel, setShareLabel] = useState("Share")

  function handleReset() { onChange({ ...defaultSelections }) }

  function handleRandomize() {
    const pick = (id: string) => {
      const cat = STACKS.find((c) => c.id === id)
      if (!cat) return "none"
      return cat.options[Math.floor(Math.random() * cat.options.length)]?.id ?? "none"
    }
    onChange({ fe: pick("fe"), be: pick("be"), auth: pick("auth"), email: pick("email"), pm: pick("pm") })
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareLabel("Copied!")
      setTimeout(() => setShareLabel("Share"), 2000)
    })
  }

  const totalPicks = Object.entries(selections).filter(([k, v]) => k !== "name" && v !== "none").length

  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <Label>Project Name</Label>
        <Input value={selections.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="my-app" spellCheck={false} />
      </div>

      <Divider />

      <div>
        <Label>CLI Command</Label>
        <CommandPreview selections={selections} />
      </div>

      <Divider />

      <div>
        <Label>Selected Stack <span className="text-white/15">({totalPicks})</span></Label>
        <SelectedChips selections={selections} onRemove={(id) => onChange({ [id]: "none" } as Partial<Selections>)} />
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <Divider />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={handleRandomize}><Shuffle size={11} /> Randomize</Button>
          <Button variant="outline" size="sm" onClick={handleReset}><RotateCcw size={11} /> Reset</Button>
        </div>
        <Button variant="ghost" size="sm" onClick={handleShare} className="w-full">
          <Share2 size={11} /> {shareLabel}
        </Button>
      </div>
    </aside>
  )
}
