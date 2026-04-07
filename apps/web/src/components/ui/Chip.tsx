import { cn } from "@/lib/cn"
import { X } from "lucide-react"

type ChipProps = {
  label: string
  onRemove?: () => void
  className?: string
}

export function Chip({ label, onRemove, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/[0.10] bg-white/[0.05] px-2.5 py-1 text-xs text-white/65",
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="rounded-full text-white/25 hover:text-white transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X size={10} />
        </button>
      )}
    </span>
  )
}
