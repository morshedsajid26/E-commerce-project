"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  Bell, 
  Settings, 
  LogOut,
  Star
} from "lucide-react";

export function AccountSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/account", icon: LayoutDashboard },
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Reviews", href: "/account/reviews", icon: Star },
    { name: "Notifications", href: "/account/notifications", icon: Bell },
    { name: "Settings", href: "/account/settings", icon: Settings },
  ];

  return (
    <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
      <div className="p-4 bg-muted/20 border rounded-2xl mb-4 hidden lg:block">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg">
            JD
          </div>
          <div>
            <div className="font-semibold block">John Doe</div>
            <div className="text-xs text-muted-foreground">john.doe@example.com</div>
          </div>
        </div>
      </div>

      <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/account" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap",
                isActive 
                  ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-all mt-auto hidden lg:flex">
        <LogOut className="h-5 w-5" />
        <span>Log Out</span>
      </button>
    </div>
  );
}
