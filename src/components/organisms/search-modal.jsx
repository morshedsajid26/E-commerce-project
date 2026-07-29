"use client";

import * as React from "react";
import { useAppStore } from "@/store";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/atoms/command";
import { Search, ShoppingBag, Star, User } from "lucide-react";

export function SearchModal() {
  const isSearchOpen = useAppStore((state) => state.isSearchOpen);
  const setSearchOpen = useAppStore((state) => state.setSearchOpen);

  // Keyboard shortcut support
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setSearchOpen]);

  return (
    <CommandDialog open={isSearchOpen} onOpenChange={setSearchOpen}>
      <CommandInput placeholder="Type a command or search for products..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>New Arrivals</span>
          </CommandItem>
          <CommandItem>
            <Star className="mr-2 h-4 w-4" />
            <span>Bestsellers</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Recent Searches">
          <CommandItem>
            <Search className="mr-2 h-4 w-4" />
            <span>Men's Jackets</span>
          </CommandItem>
          <CommandItem>
            <Search className="mr-2 h-4 w-4" />
            <span>Wireless Headphones</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
