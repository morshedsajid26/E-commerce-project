"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/container";
import { Section } from "@/components/organisms/section";
import { HeroBackground } from "./hero-background";
import { AnimatedHeading } from "./animated-heading";
import { HeroSearchBar } from "./hero-search-bar";
import { CategoriesShortcut } from "./categories-shortcut";
import { HeroCTA } from "./hero-cta";
import { HeroStatistics } from "./hero-statistics";
import { TrustedBrands } from "./trusted-brands";
import Image from "next/image";

export function HeroSection() {
  return (
    <Section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden min-h-screen flex flex-col justify-center">
      <HeroBackground />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col items-start">
            <AnimatedHeading />
            <HeroSearchBar />
            <CategoriesShortcut />
            <HeroCTA />
            <HeroStatistics />
          </div>

          {/* Right Column: Premium Floating Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.4,
            }}
            className="relative mx-auto w-full max-w-md lg:max-w-none aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center"
          >
            {/* Soft glow behind image */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              {/* Note: We use a standard img tag here or Next/Image if configured. */}
              <img
                src="/hero-product.png"
                alt="Premium Wireless Headphones"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Marquee */}
        <TrustedBrands />
      </Container>
    </Section>
  );
}
