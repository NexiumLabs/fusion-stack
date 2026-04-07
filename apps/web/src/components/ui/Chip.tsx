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
        "inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,210,210,0.18)] bg-[rgba(0,210,210,0.06)] px-2.5 py-1 text-xs text-[rgba(0,210,210,0.80)] backdrop-blur-sm",
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="rounded-full text-[rgba(0,210,210,0.40)] hover:text-[#00D4D4] transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X size={10} />
        </button>
      )}
    </span>
  )
}
