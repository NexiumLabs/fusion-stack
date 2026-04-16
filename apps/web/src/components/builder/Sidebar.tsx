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

function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-lg px-2 py-1.5 font-mono text-[10px] transition-all duration-150"
      style={
        active
          ? { background: "rgba(0,221,212,0.12)", border: "1px solid rgba(0,221,212,0.35)", color: "#00DDD4" }
          : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }
      }
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="h-px bg-white/[0.05]" />
}

export function Sidebar({ selections, onChange }: { selections: Selections; onChange: (u: Partial<Selections>) => void }) {
  const [shareLabel, setShareLabel] = useState("Share")

  function handleReset() { onChange({ ...defaultSelections }) }

  function handleRandomize() {
    const pick = (id: string, multi?: boolean) => {
      const cat = STACKS.find((c) => c.id === id)
      if (!cat) return "none"
      if (multi) {
        // Pick 0–2 random options for multi-select categories
        const shuffled = [...cat.options].sort(() => Math.random() - 0.5)
        const count = Math.floor(Math.random() * 3)
        const picked = shuffled.slice(0, count).map((o) => o.id)
        return picked.length > 0 ? picked.join(",") : "none"
      }
      return cat.options[Math.floor(Math.random() * cat.options.length)]?.id ?? "none"
    }
    const updates = Object.fromEntries(STACKS.map((cat) => [cat.id, pick(cat.id, cat.multi)]))
    onChange(updates as Partial<Selections>)
  }

  function handleShare() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setShareLabel("Copied!")
        setTimeout(() => setShareLabel("Share"), 2000)
      })
      .catch(() => {
        setShareLabel("Copy failed")
        setTimeout(() => setShareLabel("Share"), 2000)
      })
  }

  function handleRemoveChip(categoryId: string, optionId?: string) {
    const cat = STACKS.find((c) => c.id === categoryId)
    if (cat?.multi && optionId) {
      // Remove one option from the comma-separated list
      const current = (selections[categoryId as keyof Selections] ?? "")
        .split(",")
        .filter((v) => v && v !== "none" && v !== optionId)
      onChange({ [categoryId]: current.length > 0 ? current.join(",") : "none" } as Partial<Selections>)
    } else {
      onChange({ [categoryId]: "none" } as Partial<Selections>)
    }
  }

  const totalPicks = STACKS.reduce((sum, cat) => {
    const val = selections[cat.id as keyof Selections] ?? ""
    if (cat.multi) {
      return sum + val.split(",").filter((v) => v && v !== "none").length
    }
    return sum + (val && val !== "none" ? 1 : 0)
  }, 0)

  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <Label>Project Name</Label>
        <Input value={selections.name} onChange={(e) => onChange({ name: e.target.value.replace(/\s/g, "-") })} placeholder="my-app" spellCheck={false} />
      </div>

      {selections.fe === "nextjs" && (
        <>
          <Divider />
          <div>
            <Label>Project Layout</Label>
            <div className="flex gap-1.5">
              <ToggleBtn active={selections.src !== "no"} onClick={() => onChange({ src: "yes" })}>src/ dir</ToggleBtn>
              <ToggleBtn active={selections.src === "no"}  onClick={() => onChange({ src: "no"  })}>root dir</ToggleBtn>
            </div>
          </div>
        </>
      )}

      <Divider />

      <div>
        <Label>CLI Command</Label>
        <CommandPreview selections={selections} />
      </div>

      <Divider />

      <div>
        <Label>Selected Stack <span className="text-white/15">({totalPicks})</span></Label>
        <SelectedChips
          selections={selections as Record<string, string>}
          onRemove={handleRemoveChip}
        />
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
