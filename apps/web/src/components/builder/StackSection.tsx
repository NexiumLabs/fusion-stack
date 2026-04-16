"use client"

import { StackCategory, getIncompatible } from "@/lib/stacks"
import { StackCard } from "./StackCard"
import { SkillGroupCard } from "./SkillGroupCard"

type StackSectionProps = {
  category: StackCategory
  selections: Record<string, string>
  onSelect: (categoryId: string, optionId: string) => void
}

export function StackSection({ category, selections, onSelect }: StackSectionProps) {
  const rawValue = selections[category.id] ?? ""

  // Multi-select: value is a comma-separated string; "none" treated as empty
  const selectedSet = category.multi
    ? new Set(rawValue.split(",").filter((v) => v && v !== "none"))
    : null

  const currentValue = category.multi
    ? ""
    : (rawValue || category.options.find((o) => o.default)?.id || "none")

  function handleSelect(optionId: string) {
    if (!category.multi) {
      onSelect(category.id, optionId)
      return
    }
    const next = new Set(selectedSet)
    if (next.has(optionId)) {
      next.delete(optionId)
    } else {
      next.add(optionId)
    }
    onSelect(category.id, next.size > 0 ? [...next].join(",") : "none")
  }

  // For multi-select categories, split skill options into a collapsible group
  const skillOptions = category.multi
    ? category.options.filter((o) => o.id.startsWith("skill-"))
    : []
  const regularOptions = category.multi
    ? category.options.filter((o) => !o.id.startsWith("skill-"))
    : category.options

  return (
    <section>
      <h2 className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
        <span className="text-[rgba(0,221,212,0.40)]">&gt;_</span>{" "}{category.label}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {regularOptions.map((option) => {
          const incompatibleReason = getIncompatible(option.id, category.id, selections)
          const isSelected = category.multi
            ? (selectedSet?.has(option.id) ?? false)
            : currentValue === option.id
          return (
            <StackCard
              key={option.id}
              id={option.id}
              icon={option.icon}
              label={option.label}
              description={option.description}
              isSelected={isSelected}
              isDefault={option.default}
              isNew={option.isNew}
              incompatibleReason={incompatibleReason}
              onSelect={() => handleSelect(option.id)}
            />
          )
        })}

        {/* Skills group — collapsible card that reveals skill options on click */}
        {skillOptions.length > 0 && selectedSet && (
          <SkillGroupCard
            skills={skillOptions}
            selectedSet={selectedSet}
            onToggle={(skillId) => handleSelect(skillId)}
          />
        )}
      </div>
    </section>
  )
}
