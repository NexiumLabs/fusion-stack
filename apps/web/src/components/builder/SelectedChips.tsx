"use client"

import { Chip } from "@/components/ui/Chip"
import { STACKS } from "@/lib/stacks"

type SelectedChipsProps = {
  selections: Record<string, string>
  onRemove: (categoryId: string) => void
}

export function SelectedChips({ selections, onRemove }: SelectedChipsProps) {
  const chips = Object.entries(selections)
    .filter(([catId, optId]) => {
      if (catId === "name") return false
      if (optId === "none") return false
      return true
    })
    .map(([catId, optId]) => {
      const category = STACKS.find((c) => c.id === catId)
      const option = category?.options.find((o) => o.id === optId)
      if (!option) return null
      return { catId, label: option.label }
    })
    .filter(Boolean) as { catId: string; label: string }[]

  if (chips.length === 0) {
    return <p className="text-xs text-white/20">No selections yet</p>
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map(({ catId, label }) => (
        <Chip
          key={catId}
          label={label}
          onRemove={() => onRemove(catId)}
        />
      ))}
    </div>
  )
}
