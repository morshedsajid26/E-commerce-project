"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Chip } from "@/components/atoms/chip";
import Link from "next/link";

const categories = [
  { name: "Audio", href: "/category/audio" },
  { name: "Wearables", href: "/category/wearables" },
  { name: "Accessories", href: "/category/accessories" },
  { name: "New Arrivals", href: "/category/new" },
];

export function CategoriesShortcut() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="flex items-center gap-3 mt-6 flex-wrap"
    >
      <span className="text-sm text-muted-foreground font-medium mr-2">Trending:</span>
      {categories.map((cat, i) => (
        <motion.div
          key={cat.name}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={cat.href}>
            <Chip className="bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-xs font-semibold px-4 py-1.5 border-transparent">
              {cat.name}
            </Chip>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
