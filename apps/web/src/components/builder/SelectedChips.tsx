"use client"

import { Chip } from "@/components/ui/Chip"
import { STACKS } from "@/lib/stacks"

type SelectedChipsProps = {
  selections: Record<string, string>
  onRemove: (categoryId: string, optionId?: string) => void
}

export function SelectedChips({ selections, onRemove }: SelectedChipsProps) {
  const chips: { key: string; label: string; onRemove: () => void }[] = []

  for (const category of STACKS) {
    const value = selections[category.id] ?? ""

    if (category.multi) {
      // Multi-select: expand comma-separated values into individual chips
      const selected = value.split(",").filter((v) => v && v !== "none")
      for (const optId of selected) {
        const option = category.options.find((o) => o.id === optId)
        if (!option) continue
        chips.push({
          key: `${category.id}:${optId}`,
          label: option.label,
          onRemove: () => onRemove(category.id, optId),
        })
      }
    } else {
      // Single-select
      if (!value || value === "none") continue
      const option = category.options.find((o) => o.id === value)
      if (!option) continue
      // For boolean-toggle categories (hideChipWhenDefault): skip the chip when the
      // default option is active — only show it when the non-default value is chosen.
      if (category.hideChipWhenDefault && option.default) continue
      chips.push({
        key: category.id,
        label: option.label,
        onRemove: () => onRemove(category.id),
      })
    }
  }

  if (chips.length === 0) {
    return <p className="text-xs text-white/20">No selections yet</p>
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map(({ key, label, onRemove: remove }) => (
        <Chip key={key} label={label} onRemove={remove} />
      ))}
    </div>
  )
}
