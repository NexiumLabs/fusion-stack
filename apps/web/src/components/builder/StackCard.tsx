"use client"

import { cn } from "@/lib/cn"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

type StackCardProps = {
  id: string
  icon: string
  label: string
  description: string
  isSelected: boolean
  isDefault?: boolean
  incompatibleReason?: string | null
  onSelect: () => void
}

export function StackCard({
  icon,
  label,
  description,
  isSelected,
  isDefault,
  incompatibleReason,
  onSelect,
}: StackCardProps) {
  const isIncompatible = Boolean(incompatibleReason)

  return (
    <motion.button
      onClick={isIncompatible ? undefined : onSelect}
      whileTap={isIncompatible ? undefined : { scale: 0.98 }}
      aria-pressed={isSelected}
      aria-disabled={isIncompatible}
      className={cn(
        "relative flex w-full flex-col items-start gap-1 rounded-lg border p-4 text-left transition-all duration-150",
        isSelected
          ? "border-white/40 bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
        isIncompatible && "cursor-not-allowed opacity-40"
      )}
    >
      {isDefault && !isSelected && (
        <span className="absolute right-3 top-3 rounded-sm border border-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/40">
          Default
        </span>
      )}
      {isSelected && (
        <span className="absolute right-3 top-3 text-white/60">
          <CheckCircle size={14} />
        </span>
      )}
      <span className="text-base">{icon}</span>
      <span className="font-medium text-sm text-white">{label}</span>
      <span className="text-xs text-white/40 leading-relaxed">{description}</span>
      {incompatibleReason && (
        <span className="mt-1 text-xs text-amber-400/80">{incompatibleReason}</span>
      )}
    </motion.button>
  )
}
