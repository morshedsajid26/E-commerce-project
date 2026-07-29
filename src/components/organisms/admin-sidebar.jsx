"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Truck,
  AlertTriangle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  CreditCard,
  Settings,
  PackageSearch,
  MessageSquareHeart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: ShoppingCart, label: "Sales (POS)", path: "/admin/sales" },
  { icon: ShoppingBag, label: "Online Orders", path: "/admin/orders" },
  { icon: MessageSquareHeart, label: "Pre-orders & Requests", path: "/admin/requests" },
  { icon: Truck, label: "Purchases", path: "/admin/purchases" },
  { icon: PackageSearch, label: "Products", path: "/admin/products" },
  { icon: Users, label: "Customers", path: "/admin/customers" },
  { icon: CreditCard, label: "Due Management", path: "/admin/dues" },
  { icon: AlertTriangle, label: "Low Stock", path: "/admin/low-stock" },
  { icon: BarChart3, label: "Reports", path: "/admin/reports" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export function AdminSidebar() {
  const {
    isSidebarOpen,
    setSidebarOpen,
    isSidebarCollapsed,
    toggleCollapse,
  } = useAppStore();
  const pathname = usePathname();

  // Mock user for now
  const user = { name: "Admin User", profilePicture: null };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-zinc-950/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-zinc-950 text-zinc-300 transition-all duration-300 z-50 flex flex-col pt-4 shadow-xl lg:translate-x-0 border-r border-white/10",
          isSidebarCollapsed ? "w-20" : "w-64",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:sticky lg:top-0"
        )}
      >
        {/* Header */}
        <div className="px-6 flex items-center justify-between mb-8 overflow-hidden h-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-xl text-white tracking-tight whitespace-nowrap">
                GADGETS<span className="text-primary text-sm mt-0.5 ml-0.5">BD</span>
              </span>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            className="lg:hidden p-1 hover:bg-zinc-800 rounded-lg text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "hover:bg-zinc-800 hover:text-white"
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    "shrink-0 transition-transform duration-200 group-hover:scale-110"
                  )}
                />
                {!isSidebarCollapsed && (
                  <span className="font-medium text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-primary text-white rounded-full items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-[60]"
        >
          {isSidebarCollapsed ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </button>

        {/* Footer / User Status */}
        <div className="p-4 mt-auto border-t border-white/10 overflow-hidden bg-zinc-950">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 border border-zinc-700 flex items-center justify-center text-white text-[10px] font-bold overflow-hidden">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0) || "U"
                )}
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.name || "Admin User"}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                      Online
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
