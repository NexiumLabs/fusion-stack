"use client"

import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, ChevronDown } from "lucide-react"
import { useState } from "react"
import { getStackIcon } from "@/lib/stack-icons"
import { StackCard } from "./StackCard"
import type { StackOption } from "@/lib/stacks"
import { cn } from "@/lib/cn"

type SkillGroupCardProps = {
  skills: StackOption[]
  selectedSet: Set<string>
  onToggle: (skillId: string) => void
}

export function SkillGroupCard({ skills, selectedSet, onToggle }: SkillGroupCardProps) {
  const [open, setOpen] = useState(false)
  const selectedCount = skills.filter((s) => selectedSet.has(s.id)).length
  const hasSelected = selectedCount > 0

  return (
    <div className="col-span-full flex flex-col gap-3">
      {/* Trigger card */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.13, ease: "easeOut" }}
        aria-expanded={open}
        className={cn(
          "relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
          hasSelected
            ? "border-[rgba(0,221,212,0.40)] shadow-[0_0_0_1px_rgba(0,221,212,0.10),0_0_18px_rgba(0,221,212,0.07)]"
            : "border-white/[0.07] hover:border-white/[0.13] hover:shadow-[0_4px_16px_rgba(0,0,0,0.30)]",
        )}
        style={{
          background: hasSelected
            ? "linear-gradient(145deg, rgba(0,221,212,0.06) 0%, rgba(9,11,12,0.90) 100%)"
            : "rgba(255,255,255,0.03)",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Glass sheen */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }}
          aria-hidden
        />

        {/* Icon */}
        <span className="relative shrink-0">{getStackIcon("skill", 22)}</span>

        {/* Text */}
        <span className="relative flex flex-1 flex-col gap-0.5">
          <span className="font-medium text-sm text-white/85">Skills</span>
          <span className="text-xs text-white/40 leading-relaxed">
            {hasSelected
              ? `${selectedCount} skill${selectedCount > 1 ? "s" : ""} selected — installed via npx skillsadd`
              : "Add AI-powered learning skills to your project — installed via npx skillsadd"}
          </span>
        </span>

        {/* Right side: count badge + check + chevron */}
        <span className="relative flex shrink-0 items-center gap-2">
          {hasSelected && (
            <span
              className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[10px] font-semibold text-[#00DDD4]"
              style={{ background: "rgba(0,221,212,0.12)", border: "1px solid rgba(0,221,212,0.25)" }}
            >
              {selectedCount}
            </span>
          )}
          {hasSelected && <CheckCircle size={13} className="text-[#00DDD4]" />}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/30"
          >
            <ChevronDown size={14} />
          </motion.span>
        </span>
      </motion.button>

      {/* Expandable skill grid */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="skill-grid"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 pb-1">
              {skills.map((skill) => (
                <StackCard
                  key={skill.id}
                  id={skill.id}
                  icon={skill.icon}
                  label={skill.label}
                  description={skill.description}
                  isSelected={selectedSet.has(skill.id)}
                  isNew={skill.isNew}
                  onSelect={() => onToggle(skill.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
