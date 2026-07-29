"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { motion } from "framer-motion";

export function NotificationDropdown() {
  const [hasUnread, setHasUnread] = React.useState(true);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full" onClick={() => setHasUnread(false)}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Bell className="h-5 w-5" />
            {hasUnread && (
              <span className="absolute top-1.5 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
              </span>
            )}
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72">
          <div className="flex flex-col gap-1 p-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <DropdownMenuItem key={i} className="flex flex-col items-start p-3 cursor-pointer">
                <span className="font-semibold text-sm">Order Shipped!</span>
                <span className="text-xs text-muted-foreground mt-1">Your order #100{i} has been shipped and is on the way.</span>
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
