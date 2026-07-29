"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Typography } from "@/components/atoms/typography";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function AnimatedHeading() {
  const text1 = "Experience Sound".split(" ");
  const text2 = "Like Never Before.".split(" ");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-3xl"
    >
      <Typography variant="h1" className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1]">
        <span className="flex flex-wrap gap-x-4">
          {text1.map((word, i) => (
            <motion.span key={`w1-${i}`} variants={item} className="inline-block">
              {word}
            </motion.span>
          ))}
        </span>
        <span className="flex flex-wrap gap-x-4 text-muted-foreground mt-2">
          {text2.map((word, i) => (
            <motion.span key={`w2-${i}`} variants={item} className="inline-block">
              {word}
            </motion.span>
          ))}
        </span>
      </Typography>
      
      <motion.div variants={item}>
        <Typography variant="large" className="mt-6 text-xl font-normal text-muted-foreground max-w-xl">
          Discover our flagship over-ear headphones. Engineered for audiophiles, designed for comfort, and built to last.
        </Typography>
      </motion.div>
    </motion.div>
  );
}
