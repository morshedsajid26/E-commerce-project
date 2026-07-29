"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  ShoppingBag,
  MessageSquareHeart,
  Heart,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const profileLinks = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/profile/orders", label: "Order History", icon: ShoppingBag },
  { href: "/profile/pre-orders", label: "Pre-orders", icon: MessageSquareHeart },
  { href: "/profile/wishlist", label: "Wishlist", icon: Heart },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        {/* User Info Header */}
        <div className="p-6 border-b border-zinc-100 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-md shadow-primary/20">
            JD
          </div>
          <h2 className="font-bold text-lg text-zinc-900">John Doe</h2>
          <p className="text-zinc-500 text-sm">john.doe@example.com</p>
        </div>

        {/* Links */}
        <nav className="p-3 space-y-1">
          {profileLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/profile" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <link.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-zinc-400")} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-zinc-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 text-red-500" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
