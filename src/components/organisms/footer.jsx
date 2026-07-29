"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/atoms/container";
import { Typography } from "@/components/atoms/typography";
import { Globe, Mail, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 inline-block flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white text-sm">G</div>
              GADGETS <span className="text-primary text-sm mt-1">BD</span>
            </Link>
            <Typography variant="muted" className="mb-6 max-w-sm">
              Elevating your digital lifestyle with meticulously curated, high-performance technology.
            </Typography>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors"><Globe className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><MessageCircle className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Mail className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Phone className="h-5 w-5" /></Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="large" className="mb-2">Shop</Typography>
            <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors text-sm">All Products</Link>
            <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors text-sm">Categories</Link>
            <Link href="/brands" className="text-muted-foreground hover:text-primary transition-colors text-sm">Brands</Link>
            <Link href="/deals" className="text-muted-foreground hover:text-primary transition-colors text-sm">Deals & Offers</Link>
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="large" className="mb-2">Support</Typography>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</Link>
            <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</Link>
            <Link href="/tracking" className="text-muted-foreground hover:text-primary transition-colors text-sm">Track Order</Link>
            <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors text-sm">Returns & Exchanges</Link>
            <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors text-sm">Shipping Info</Link>
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="large" className="mb-2">Company</Typography>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</Link>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography variant="small" className="text-muted-foreground font-normal">
            &copy; {new Date().getFullYear()} GADGETS BD Inc. All rights reserved.
          </Typography>
          <div className="flex items-center gap-4">
            {/* Dummy Payment Icons */}
            <div className="h-8 w-12 bg-muted rounded" />
            <div className="h-8 w-12 bg-muted rounded" />
            <div className="h-8 w-12 bg-muted rounded" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
