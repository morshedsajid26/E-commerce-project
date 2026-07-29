"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/atoms/icon";
import { Typography } from "@/components/atoms/typography";

export function FeatureCard({ feature }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="flex flex-col items-center text-center p-8 bg-card rounded-3xl border shadow-sm hover:shadow-premium transition-shadow"
    >
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
        <Icon name={feature.icon} size={32} />
      </div>
      <Typography variant="large" className="mb-2">
        {feature.title}
      </Typography>
      <Typography variant="muted">
        {feature.description}
      </Typography>
    </motion.div>
  );
}
