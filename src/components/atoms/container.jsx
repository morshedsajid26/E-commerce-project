import * as React from "react"
import { cn } from "@/lib/utils"

const Container = React.forwardRef(({ className, as: Component = "div", children, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        "mx-auto w-full max-w-[1536px] px-4 sm:px-6 md:px-8 lg:px-12",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
})
Container.displayName = "Container"

export { Container }
