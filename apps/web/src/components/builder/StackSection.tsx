"use client"

import { StackCategory, getIncompatible } from "@/lib/stacks"
import { StackCard } from "./StackCard"

type StackSectionProps = {
  category: StackCategory
  selections: Record<string, string>
  onSelect: (categoryId: string, optionId: string) => void
}

export function StackSection({ category, selections, onSelect }: StackSectionProps) {
  const currentValue = selections[category.id] ?? category.options.find((o) => o.default)?.id ?? "none"

  return (
    <section>
      <h2 className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
        {/* Tiny cyan on the prompt only — label text stays white/neutral */}
        <span className="text-[rgba(0,221,212,0.40)]">&gt;_</span>{" "}{category.label}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {category.options.map((option) => {
          const incompatibleReason = getIncompatible(option.id, category.id, selections)
          return (
            <StackCard
              key={option.id}
              id={option.id}
              icon={option.icon}
              label={option.label}
              description={option.description}
              isSelected={currentValue === option.id}
              isDefault={option.default}
              incompatibleReason={incompatibleReason}
              onSelect={() => onSelect(category.id, option.id)}
            />
          )
        })}
      </div>
    </section>
  )
}
