"use client";

import * as React from "react";
import Link from "next/link";
import { useAppStore } from "@/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/atoms/accordion";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Menu } from "lucide-react";
import { Button } from "@/components/atoms/button";

export function MobileNavigation() {
  const isMobileNavOpen = useAppStore((state) => state.isMobileNavOpen);
  const setMobileNavOpen = useAppStore((state) => state.setMobileNavOpen);

  return (
    <>
      <Sheet open={isMobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="lg:hidden h-12 w-12 p-0 -ml-2 rounded-full active:scale-95" aria-label="Open Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader className="text-left">
            <SheetTitle className="text-xl font-bold tracking-tight">PremiumStore</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] mt-6 pr-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <Link href="/category/men" className="text-muted-foreground hover:text-primary py-1 block">Men's Fashion</Link>
                  <Link href="/category/women" className="text-muted-foreground hover:text-primary py-1 block">Women's Fashion</Link>
                  <Link href="/category/kids" className="text-muted-foreground hover:text-primary py-1 block">Kids' Apparel</Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Explore</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <Link href="/category/new" className="text-muted-foreground hover:text-primary py-1 block">New Arrivals</Link>
                  <Link href="/category/bestsellers" className="text-muted-foreground hover:text-primary py-1 block">Bestsellers</Link>
                  <Link href="/collections" className="text-muted-foreground hover:text-primary py-1 block">Collections</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <Link href="/shop" onClick={() => setMobileNavOpen(false)} className="font-medium hover:text-primary py-2 block">All Products</Link>
              <Link href="/deals" onClick={() => setMobileNavOpen(false)} className="font-medium hover:text-primary py-2 block">Deals & Offers</Link>
              <Link href="/account" onClick={() => setMobileNavOpen(false)} className="font-medium hover:text-primary py-2 block">My Account</Link>
              <Link href="/account/settings" onClick={() => setMobileNavOpen(false)} className="font-medium hover:text-primary py-2 block">Profile Settings</Link>
              <Link href="/account/orders" onClick={() => setMobileNavOpen(false)} className="font-medium hover:text-primary py-2 block">My Orders</Link>
              <Link href="/admin" onClick={() => setMobileNavOpen(false)} className="font-medium hover:text-primary py-2 block">Admin Panel</Link>
              <Link href="/about" onClick={() => setMobileNavOpen(false)} className="font-medium hover:text-primary py-2 block text-muted-foreground">About Us</Link>
              <Link href="/contact" onClick={() => setMobileNavOpen(false)} className="font-medium hover:text-primary py-2 block text-muted-foreground">Contact</Link>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
