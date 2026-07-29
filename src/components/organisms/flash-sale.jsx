"use client";

import * as React from "react";
import { Container } from "@/components/atoms/container";
import { Section } from "@/components/organisms/section";
import { Typography } from "@/components/atoms/typography";
import { ProductCard } from "@/components/molecules/product-card";
import { Button } from "@/components/atoms/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
export function FlashSale({ products = [] }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Get only products on sale
  const saleProducts = products.filter(p => p.oldPrice).slice(0, 4);

  // Simple dummy countdown timer
  const [timeLeft, setTimeLeft] = React.useState({ h: 12, m: 45, s: 30 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section ref={ref} className="bg-destructive/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-destructive/10 blur-[100px] rounded-full" />
      
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-destructive/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-destructive text-destructive-foreground flex items-center justify-center">
              <Zap className="h-8 w-8" />
            </div>
            <div>
              <Typography variant="h2" className="text-destructive flex items-center gap-2">
                Flash Sale
              </Typography>
              <Typography variant="muted" className="mt-1">
                Don't miss out on these limited time offers.
              </Typography>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xl font-bold font-mono bg-background px-4 py-2 rounded-lg border shadow-sm">
              <span>{String(timeLeft.h).padStart(2, '0')}</span><span className="text-destructive opacity-50">:</span>
              <span>{String(timeLeft.m).padStart(2, '0')}</span><span className="text-destructive opacity-50">:</span>
              <span>{String(timeLeft.s).padStart(2, '0')}</span>
            </div>
            <Button asChild variant="outline" className="group">
              <Link href="/sale">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {saleProducts.map((product) => (
            <motion.div key={product.id} variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}>
              <ProductCard product={product} variant="flash-sale" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
