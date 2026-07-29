import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const Spinner = React.forwardRef(({ className, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }
  
  return (
    <Loader2
      ref={ref}
      className={cn(
        "animate-spin text-primary",
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    />
  )
})
Spinner.displayName = "Spinner"

export { Spinner }
