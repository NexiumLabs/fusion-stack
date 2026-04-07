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

export function StackCard({ icon, label, description, isSelected, isDefault, incompatibleReason, onSelect }: StackCardProps) {
  const isIncompatible = Boolean(incompatibleReason)

  return (
    <motion.button
      onClick={isIncompatible ? undefined : onSelect}
      whileHover={isIncompatible ? undefined : { y: -2 }}
      whileTap={isIncompatible ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.13, ease: "easeOut" }}
      aria-pressed={isSelected}
      aria-disabled={isIncompatible}
      className={cn(
        "relative flex w-full flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-200",
        isSelected
          /* Selected: cyan border + subtle cyan wash. This is where cyan appears on cards. */
          ? "border-[rgba(0,221,212,0.40)] shadow-[0_0_0_1px_rgba(0,221,212,0.10),0_0_18px_rgba(0,221,212,0.07)]"
          /* Default: pure white/neutral glass — no cyan at all */
          : "border-white/[0.07] hover:border-white/[0.13] hover:shadow-[0_4px_16px_rgba(0,0,0,0.30)]",
        isIncompatible && "cursor-not-allowed opacity-30"
      )}
      style={{
        background: isSelected
          ? "linear-gradient(145deg, rgba(0,221,212,0.06) 0%, rgba(9,11,12,0.90) 100%)"
          : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* White glass sheen — no teal in the sheen */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }}
        aria-hidden
      />

      {isDefault && !isSelected && (
        <span className="absolute right-3 top-3 rounded-full border border-white/[0.09] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/25">
          Default
        </span>
      )}
      {/* Cyan checkmark on selected — intentional, singular accent */}
      {isSelected && (
        <span className="absolute right-3 top-3 text-[#00DDD4]">
          <CheckCircle size={13} />
        </span>
      )}

      <span className="relative text-lg leading-none">{icon}</span>
      <span className="relative font-medium text-sm text-white/85">{label}</span>
      <span className="relative text-xs text-white/40 leading-relaxed">{description}</span>
      {incompatibleReason && (
        <span className="relative mt-0.5 text-xs text-amber-500/65">{incompatibleReason}</span>
      )}
    </motion.button>
  )
}
