"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/atoms/container";
import { Section } from "@/components/organisms/section";
import { Typography } from "@/components/atoms/typography";
import { ProductCard } from "@/components/molecules/product-card";
import { Button } from "@/components/atoms/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProductGridSection({ title, subtitle, products, limit = 8, viewAllLink }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayProducts = products.slice(0, limit);

  return (
    <Section ref={ref} className="bg-background">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <Typography variant="h2">{title}</Typography>
            {subtitle && (
              <Typography variant="muted" className="mt-2 text-lg">
                {subtitle}
              </Typography>
            )}
          </div>
          {viewAllLink && (
            <Button asChild variant="ghost" className="group">
              <Link href={viewAllLink}>
                View All {title}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-8"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {displayProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
