"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typography } from "@/components/atoms/typography";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      
      {/* Back to Home Button - Floating */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors backdrop-blur-md bg-black/20 px-4 py-2 rounded-full border border-white/10"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Back to Store</span>
      </Link>

      {/* Left Panel: Visual/Branding (Hidden on small screens) */}
      <div className="hidden lg:flex flex-1 relative bg-zinc-950 items-center justify-center p-12 overflow-hidden">
        
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/30 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[100px]"
          />
        </div>

        {/* Branding Content */}
        <div className="relative z-10 w-full max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6">
              GADGETS<span className="text-primary">BD</span>
            </Typography>
            <Typography variant="h3" className="font-light opacity-80 leading-relaxed max-w-md">
              Elevate your digital lifestyle with meticulously curated technology and unparalleled design.
            </Typography>
            
            <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <div key={i} className="h-2 w-2 rounded-full bg-primary" />)}
              </div>
              <p className="italic opacity-80 mb-4">"The seamless integration and premium feel of every product has completely transformed my workflow. Unmatched quality."</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20" />
                <div>
                  <div className="text-sm font-bold">Alex Rivera</div>
                  <div className="text-xs opacity-60">Verified Buyer</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel: Forms with Glassmorphism on Mobile */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Mobile Background Fallback */}
        <div className="absolute inset-0 z-0 lg:hidden bg-zinc-950">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000')] bg-cover bg-center opacity-30" />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-background/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none p-8 lg:p-0 rounded-3xl border lg:border-none shadow-2xl lg:shadow-none"
          >
            {children}
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
