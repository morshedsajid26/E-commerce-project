import * as React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 lg:text-4xl xl:text-5xl",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl",
      p: "leading-7 [&:not(:first-child)]:mt-6 text-base md:text-lg",
      blockquote: "mt-6 border-l-2 pl-6 italic text-base md:text-lg",
      large: "text-lg font-semibold md:text-xl",
      small: "text-sm font-medium leading-none md:text-base",
      muted: "text-sm text-muted-foreground md:text-base",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

const variantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  blockquote: "blockquote",
  large: "div",
  small: "small",
  muted: "p",
}

const Typography = React.forwardRef(({ variant, className, children, ...props }, ref) => {
  const Component = variantMapping[variant || "p"] || "p"

  return (
    <Component
      ref={ref}
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  )
})
Typography.displayName = "Typography"

export { Typography }
