import { cn } from "@/lib/cn"
import { ButtonHTMLAttributes, forwardRef } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline"
  size?: "sm" | "md"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,221,212,0.45)] disabled:pointer-events-none disabled:opacity-40",
          {
            /* Primary — full cyan, black text. The one vivid color moment, matching NexiumLabs CTA */
            "bg-[#00DDD4] text-[#090B0C] font-semibold hover:bg-[#00F0E6] hover:shadow-[0_0_22px_rgba(0,221,212,0.40)]":
              variant === "default",
            /* Ghost — white text, barely there bg on hover */
            "text-white/45 hover:text-white hover:bg-white/[0.05]":
              variant === "ghost",
            /* Outline — white border, white text. Clean, no cyan unless hovered */
            "border border-white/[0.10] bg-white/[0.03] text-white/55 hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white":
              variant === "outline",
          },
          {
            "h-7 px-3 text-xs": size === "sm",
            "h-9 px-5 text-sm": size === "md",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
