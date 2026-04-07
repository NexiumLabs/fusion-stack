import { cn } from "@/lib/cn"
import { InputHTMLAttributes, forwardRef } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/25 transition-all duration-200 focus:outline-none focus:border-[rgba(0,221,212,0.40)] focus:ring-1 focus:ring-[rgba(0,221,212,0.10)]",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
