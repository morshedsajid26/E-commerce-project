import { cn } from "@/lib/utils";

export function AdminCard({ className, title, subtitle, footer, children, ...props }) {
  return (
    <div
      className={cn(
        'bg-background rounded-xl shadow-sm border border-border flex flex-col',
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-border">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-4 flex-1">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-muted/50 border-t border-border rounded-b-xl text-sm">
          {footer}
        </div>
      )}
    </div>
  );
}
