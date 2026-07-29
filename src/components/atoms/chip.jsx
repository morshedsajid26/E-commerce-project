import * as React from "react"
import { Badge } from "@/components/atoms/badge"
import { cn } from "@/lib/utils"

const Chip = React.forwardRef(({ className, variant = "default", children, onRemove, ...props }, ref) => {
  return (
    <Badge
      ref={ref}
      variant={variant}
      className={cn("px-3 py-1 rounded-full text-sm font-medium", className)}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          className="ml-2 hover:bg-muted/20 rounded-full inline-flex items-center justify-center p-0.5 outline-none focus:ring-2 focus:ring-ring"
          onClick={onRemove}
        >
          <span className="sr-only">Remove</span>
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </Badge>
  )
})
Chip.displayName = "Chip"

export { Chip }
