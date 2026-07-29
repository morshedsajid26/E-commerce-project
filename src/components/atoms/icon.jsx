import * as React from "react"
import * as LucideIcons from "lucide-react"
import { cn } from "@/lib/utils"

const Icon = React.forwardRef(({ name, className, size = 24, ...props }, ref) => {
  // Convert standard kebab-case or generic names to Lucide PascalCase
  const IconName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  
  const LucideIcon = LucideIcons[IconName];

  if (!LucideIcon) {
    console.warn(`Icon '${name}' not found in lucide-react`);
    return null;
  }

  return (
    <LucideIcon
      ref={ref}
      size={size}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
})
Icon.displayName = "Icon"

export { Icon }
