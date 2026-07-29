"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Typography } from "@/components/atoms/typography";

const brands = ["Apple", "Sony", "Bose", "Sennheiser", "Bang & Olufsen", "Bowers & Wilkins"];

export function TrustedBrands() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="mt-24 pt-8 border-t border-border/50"
    >
      <Typography variant="muted" className="text-center text-xs font-semibold uppercase tracking-widest mb-6">
        Trusted by Audiophiles Worldwide
      </Typography>
      
      {/* Vercel-style fading edges for marquee */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <div className="flex w-max min-w-full justify-center gap-12 px-12 md:gap-24 md:px-24">
          {brands.map((brand, i) => (
            <div key={i} className="flex items-center justify-center">
              <span className="text-xl font-bold text-muted-foreground/60 select-none grayscale transition-all hover:grayscale-0 hover:text-foreground">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
