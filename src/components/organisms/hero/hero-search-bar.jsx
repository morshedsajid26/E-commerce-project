"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { motion } from "framer-motion";
import { useAppStore } from "@/store";

export function HeroSearchBar() {
  const setSearchOpen = useAppStore((state) => state.setSearchOpen);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="relative w-full max-w-lg mt-8 group"
      onClick={() => setSearchOpen(true)}
    >
      <div
        className={`absolute -inset-0.5 rounded-full blur transition duration-500 opacity-0 ${
          isFocused ? "opacity-100 bg-gradient-to-r from-primary to-secondary" : "group-hover:opacity-50 group-hover:bg-primary/50"
        }`}
      />
      <div className="relative flex items-center bg-background rounded-full border shadow-sm px-2 py-2">
        <Search className="ml-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for premium products..."
          className="border-0 shadow-none focus-visible:ring-0 text-base flex-1 bg-transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly // Opens modal instead
        />
        <Button className="rounded-full px-6 shadow-premium transition-transform hover:scale-105" size="sm">
          Search
        </Button>
      </div>
    </motion.div>
  );
}
