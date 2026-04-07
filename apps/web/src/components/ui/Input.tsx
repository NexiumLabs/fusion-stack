import { cn } from "@/lib/cn"
import { InputHTMLAttributes, forwardRef } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-xl border border-[rgba(0,210,210,0.12)] bg-[rgba(0,210,210,0.04)] px-3 text-sm text-[#F0FAFA] placeholder:text-[rgba(180,230,230,0.25)] transition-all duration-200 focus:outline-none focus:border-[rgba(0,210,210,0.38)] focus:ring-2 focus:ring-[rgba(0,210,210,0.15)] focus:bg-[rgba(0,210,210,0.06)]",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
