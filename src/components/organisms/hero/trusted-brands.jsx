"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Typography } from "@/components/atoms/typography";
import { SiApple, SiSony, SiBose, SiSennheiser, SiJbl, SiSamsung, SiLogitech } from "react-icons/si";

const brands = [
  { name: "Apple", Icon: SiApple },
  { name: "Sony", Icon: SiSony },
  { name: "Bose", Icon: SiBose },
  { name: "Sennheiser", Icon: SiSennheiser },
  { name: "JBL", Icon: SiJbl },
  { name: "Samsung", Icon: SiSamsung },
  { name: "Logitech", Icon: SiLogitech },
];

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
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4">
        <motion.div 
          className="flex w-max gap-16 md:gap-32 items-center pl-16 md:pl-32"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex items-center justify-center group" title={brand.name}>
              <brand.Icon className="text-4xl md:text-5xl text-muted-foreground/40 select-none grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:text-foreground group-hover:scale-110" />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
