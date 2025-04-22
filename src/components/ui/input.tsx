
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[38px] w-full rounded-lg border border-neutral-100 bg-white px-3 py-2",
          "text-sm text-foreground font-inter placeholder:text-neutral-400",
          "hover:border-neutral-200",
          "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15",
          "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-100 disabled:border-neutral-100",
          "[&[aria-invalid='true']]:border-red-700 [&[aria-invalid='true']]:bg-red-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
