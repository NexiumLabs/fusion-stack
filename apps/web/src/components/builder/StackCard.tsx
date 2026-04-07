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
      whileHover={isIncompatible ? undefined : { y: -2 }}
      whileTap={isIncompatible ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      aria-pressed={isSelected}
      aria-disabled={isIncompatible}
      className={cn(
        "relative flex w-full flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-200",
        isSelected
          ? [
              "border-[rgba(0,210,210,0.40)]",
              "bg-[rgba(0,210,210,0.07)]",
              "shadow-[0_0_0_1px_rgba(0,210,210,0.18),0_0_24px_rgba(0,210,210,0.10)]",
            ]
          : [
              "border-[rgba(0,210,210,0.10)]",
              "bg-[rgba(0,210,210,0.03)]",
              "hover:border-[rgba(0,210,210,0.22)]",
              "hover:bg-[rgba(0,210,210,0.055)]",
              "hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
            ],
        isIncompatible && "cursor-not-allowed opacity-35"
      )}
      style={{
        backdropFilter: "blur(16px) saturate(150%)",
        background: isSelected
          ? "linear-gradient(135deg, rgba(0,210,210,0.09) 0%, rgba(0,210,210,0.04) 100%)"
          : undefined,
      }}
    >
      {/* Glass sheen overlay */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,220,220,0.06) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      {isDefault && !isSelected && (
        <span className="absolute right-3 top-3 rounded-full border border-[rgba(0,210,210,0.18)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[rgba(0,210,210,0.45)]">
          Default
        </span>
      )}
      {isSelected && (
        <span className="absolute right-3 top-3 text-[#00D4D4]">
          <CheckCircle size={14} />
        </span>
      )}

      <span className="relative text-lg leading-none">{icon}</span>
      <span className="relative font-medium text-sm text-[#F0FAFA]">{label}</span>
      <span className="relative text-xs text-[rgba(180,230,230,0.45)] leading-relaxed">
        {description}
      </span>
      {incompatibleReason && (
        <span className="relative mt-0.5 text-xs text-amber-400/75">{incompatibleReason}</span>
      )}
    </motion.button>
  )
}
