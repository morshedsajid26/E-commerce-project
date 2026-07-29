"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { useAppStore } from "@/store";
import { motion } from "framer-motion";

export function SearchButton() {
  const setSearchOpen = useAppStore((state) => state.setSearchOpen);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-full text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setSearchOpen(true)}
      >
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <span className="hidden lg:inline-flex">Search products...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    </motion.div>
  );
}
