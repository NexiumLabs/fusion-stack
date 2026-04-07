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
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,210,210,0.50)] disabled:pointer-events-none disabled:opacity-40",
          {
            "bg-[#00D4D4] text-[#020C0E] font-semibold hover:bg-[#00FFEE] hover:shadow-[0_0_20px_rgba(0,210,210,0.40)]":
              variant === "default",
            "text-[rgba(0,210,210,0.70)] hover:text-[#00D4D4] hover:bg-[rgba(0,210,210,0.06)]":
              variant === "ghost",
            "border border-[rgba(0,210,210,0.20)] bg-[rgba(0,210,210,0.04)] text-[rgba(0,210,210,0.70)] hover:border-[rgba(0,210,210,0.38)] hover:bg-[rgba(0,210,210,0.08)] hover:text-[#00D4D4] hover:shadow-[0_0_14px_rgba(0,210,210,0.15)]":
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
