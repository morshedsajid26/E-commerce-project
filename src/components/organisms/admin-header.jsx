"use client";

import * as React from "react";
import { Search, Bell, Settings2, Menu } from "lucide-react";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { useAppStore } from "@/store";

export function AdminHeader() {
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-6 sticky top-0 z-40">
      
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden p-2 -ml-2 text-muted-foreground hover:bg-muted rounded-md"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="relative w-96 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search orders, products, or customers... (Press '/' to focus)" 
          className="pl-9 h-10 bg-muted/30 border-transparent focus:bg-background rounded-lg text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <Button variant="outline" size="sm" className="hidden sm:flex rounded-lg h-9">
          <Settings2 className="h-4 w-4 mr-2" /> Quick Actions
        </Button>
        
        <div className="h-6 w-px bg-border mx-2" />

        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
        </button>

      </div> 
      </div>

    </header>
  );
}
