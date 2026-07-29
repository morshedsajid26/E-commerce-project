"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Typography } from "@/components/atoms/typography";

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "99.9%", label: "Satisfaction" },
  { value: "4.9/5", label: "Average Rating" },
];

export function HeroStatistics() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="grid grid-cols-3 gap-4 md:gap-8 mt-12 bg-muted/30 backdrop-blur-md rounded-2xl p-6 border shadow-sm">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: i * 0.1 + 1, duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <Typography variant="h3" className="text-2xl md:text-3xl font-bold text-primary">
            {stat.value}
          </Typography>
          <Typography variant="small" className="text-muted-foreground mt-1">
            {stat.label}
          </Typography>
        </motion.div>
      ))}
    </div>
  );
}
