"use client";

import * as React from "react";
import Link from "next/link";
import { useAppStore } from "@/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/atoms/sheet";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { title: "Customers", href: "/dashboard/customers", icon: Users },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  const pathname = usePathname();

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-6 border-b text-left">
          <SheetTitle className="text-xl font-bold tracking-tight">AdminPanel</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 py-4 h-[calc(100vh-140px)]">
          <nav className="grid gap-1 px-4">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t mt-auto">
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-all hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
