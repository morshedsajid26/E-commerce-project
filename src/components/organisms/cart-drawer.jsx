"use client";

import * as React from "react";
import Link from "next/link";
import { useAppStore } from "@/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/atoms/sheet";
import { Button } from "@/components/atoms/button";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Separator } from "@/components/atoms/separator";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Typography } from "@/components/atoms/typography";

export function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, updateCartQuantity, removeFromCart } = useAppStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-0 sm:border-l shadow-2xl">
        <SheetHeader className="px-6 pt-6 pb-4 border-b bg-muted/10 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2.5 text-xl">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              My Cart
            </SheetTitle>
            <div className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
              {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
            </div>
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex-1 px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <div className="h-32 w-32 bg-muted/30 rounded-full flex items-center justify-center mb-6 relative">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/50 absolute z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full animate-pulse" />
              </div>
              <Typography variant="h4" className="mb-2">Your cart is empty</Typography>
              <p className="text-muted-foreground text-sm mb-6 max-w-[250px]">Looks like you haven't added anything to your cart yet.</p>
              <Button onClick={() => setCartOpen(false)} className="rounded-full px-8 shadow-premium">
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="flex gap-4 group p-3 -mx-3 rounded-2xl hover:bg-muted/40 transition-all border border-transparent hover:border-border/50">
                  <div className="h-24 w-24 bg-background rounded-xl border flex items-center justify-center p-2 shrink-0 shadow-sm relative overflow-hidden group-hover:shadow-md transition-all">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src={item.product.image} alt={item.product.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500 ease-out" />
                  </div>
                  <div className="flex flex-col flex-1 py-0.5">
                    <div className="flex justify-between items-start gap-2">
                      <Link href={`/product/${item.product.id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2 pr-2 leading-tight" onClick={() => setCartOpen(false)}>
                        {item.product.title}
                      </Link>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive shrink-0 rounded-full transition-all opacity-0 group-hover:opacity-100 -mr-1" onClick={() => removeFromCart(index)}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    
                    {(item.variant || item.color) ? (
                      <div className="flex mt-1.5 mb-2">
                        <div className="text-[10px] font-medium text-muted-foreground bg-muted/60 border inline-flex items-center px-2 py-0.5 rounded-md gap-1.5">
                          {item.variant && <span>{item.variant}</span>}
                          {item.variant && item.color && <span className="h-2 w-[1px] bg-border" />}
                          {item.color && <span>{item.color}</span>}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1.5 mb-2 flex-1"></div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center bg-background border rounded-lg overflow-hidden h-7 shadow-sm">
                        <button className="px-2 hover:bg-primary hover:text-primary-foreground transition-colors h-full flex items-center justify-center" onClick={() => updateCartQuantity(index, Math.max(1, item.quantity - 1))}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-semibold w-7 text-center tabular-nums">{item.quantity}</span>
                        <button className="px-2 hover:bg-primary hover:text-primary-foreground transition-colors h-full flex items-center justify-center" onClick={() => updateCartQuantity(index, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-[15px] text-primary">৳{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {cart.length > 0 && (
          <div className="mt-auto border-t bg-muted/10 backdrop-blur-md px-6 py-5">
            <div className="flex flex-col gap-3 w-full text-sm mb-5">
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span className="text-foreground font-medium">Included</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3 mt-1">
                <span>Subtotal</span>
                <span className="text-primary">৳{subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Button asChild className="w-full h-14 shadow-premium rounded-2xl text-base group relative overflow-hidden" size="lg">
              <Link href="/checkout" onClick={() => setCartOpen(false)}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ShoppingCart className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-primary/10 transition-transform group-hover:scale-105 duration-300" />
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
