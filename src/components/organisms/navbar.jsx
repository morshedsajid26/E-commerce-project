"use client";

import * as React from "react";
import Link from "next/link";
import { useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/atoms/container";
import { MegaMenu } from "./mega-menu";
import { MobileNavigation } from "./mobile-navigation";
import { DarkModeToggle } from "@/components/molecules/dark-mode-toggle";
import { ProfileDropdown } from "@/components/molecules/profile-dropdown";
import { NotificationDropdown } from "@/components/molecules/notification-dropdown";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Heart, ShoppingCart, Search, Gift, ArrowRightLeft, LayoutDashboard } from "lucide-react";
import { useAppStore } from "@/store";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  const setCartOpen = useAppStore((state) => state.setCartOpen);
  const setWishlistOpen = useAppStore((state) => state.setWishlistOpen);

  React.useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col transition-all duration-300 shadow-sm">
      {/* Top Bar */}
      <div className="bg-zinc-950 dark:bg-background text-white py-3">
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MobileNavigation />
            <Link href="/" className="text-xl font-bold tracking-tighter sm:text-2xl flex-shrink-0 flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white text-sm">G</div>
              GADGETS<span className="text-primary text-sm mt-1">BD</span>
            </Link>
          </div>

          {/* Centered Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input 
                className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 pl-10 h-10 rounded-full focus-visible:ring-primary" 
                placeholder="Search product, brand, and more..." 
              />
            </div>
          </div>

          {/* Right Links & Icons */}
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden lg:flex items-center gap-5 text-sm font-semibold">
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link href="/pre-order" className="hover:text-primary transition-colors">Pre-order</Link>
              <Link href="/offers" className="hover:text-primary transition-colors flex items-center gap-1.5 text-primary">
                <Gift className="h-4 w-4 fill-primary text-primary" /> Offers
              </Link>
              <Link href="/compare" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <ArrowRightLeft className="h-4 w-4" /> Compare
              </Link>
            </div>

            <nav className="flex items-center gap-1 sm:gap-2 text-white">
              <div className="[&_button]:text-white [&_button]:hover:bg-zinc-800 dark:[&_button]:text-foreground dark:[&_button]:hover:bg-accent">
                <DarkModeToggle />
              </div>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-zinc-800 hover:text-white dark:hover:bg-accent dark:hover:text-foreground text-white dark:text-foreground" onClick={() => setCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  0
                </span>
                <span className="sr-only">Cart</span>
              </Button>
              <div className="[&_button]:text-white [&_button]:hover:bg-zinc-800 dark:[&_button]:text-foreground dark:[&_button]:hover:bg-accent">
                <ProfileDropdown />
              </div>
            </nav>
          </div>
        </Container>
      </div>

      {/* Bottom Categories Bar */}
      <div className="bg-background border-b border-border hidden md:block">
        <Container className="flex items-center justify-center">
          <MegaMenu />
        </Container>
      </div>
    </header>
  );
}
