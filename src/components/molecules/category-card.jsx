"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typography } from "@/components/atoms/typography";

export function CategoryCard({ category }) {
  return (
    <Link href={`/shop?category=${encodeURIComponent(category.title.toLowerCase())}`}>
      <motion.div
        whileHover={{ scale: 0.98 }}
        className="group relative overflow-hidden rounded-3xl bg-muted aspect-[4/3] flex items-center justify-center isolate"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-90" />
        
        <motion.img 
          src={category.image} 
          alt={category.title} 
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />

        <div className="absolute bottom-6 left-6 z-20">
          <Typography variant="h3" className="text-white mb-1 drop-shadow-md">
            {category.title}
          </Typography>
          <Typography variant="small" className="text-white/80">
            {category.count} Products
          </Typography>
        </div>
      </motion.div>
    </Link>
  );
}
