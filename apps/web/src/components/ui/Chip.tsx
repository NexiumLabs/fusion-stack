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
        "inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-white/70",
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 rounded-sm text-white/40 hover:text-white transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X size={10} />
        </button>
      )}
    </span>
  )
}
