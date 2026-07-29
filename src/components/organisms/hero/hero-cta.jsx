"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      className="flex flex-wrap items-center gap-4 mt-8"
    >
      <Button asChild size="lg" className="rounded-full shadow-premium group">
        <Link href="/shop">
          <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Shop Now
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-full group">
        <Link href="/learn-more">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </motion.div>
  );
}
