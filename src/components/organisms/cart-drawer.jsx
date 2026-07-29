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
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> Your Cart
          </SheetTitle>
          <SheetDescription>
            You have {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        
        <ScrollArea className="flex-1 -mx-6 px-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
              <Typography variant="large">Your cart is empty.</Typography>
              <Button variant="link" onClick={() => setCartOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="flex gap-4">
                  <div className="h-20 w-20 bg-muted/20 rounded-xl border flex items-center justify-center p-2 shrink-0">
                    <img src={item.product.image} alt={item.product.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <Link href={`/product/${item.product.id}`} className="font-semibold text-sm hover:underline line-clamp-2 pr-4" onClick={() => setCartOpen(false)}>
                        {item.product.title}
                      </Link>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 text-muted-foreground hover:text-destructive shrink-0" onClick={() => removeFromCart(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-1 mb-2">
                      {item.variant && <span>{item.variant}</span>}
                      {item.variant && item.color && <span> | </span>}
                      {item.color && <span>{item.color}</span>}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border rounded-lg overflow-hidden h-8">
                        <button className="px-2 hover:bg-muted transition-colors h-full" onClick={() => updateCartQuantity(index, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                        <button className="px-2 hover:bg-muted transition-colors h-full" onClick={() => updateCartQuantity(index, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-semibold">৳{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {cart.length > 0 && (
          <>
            <Separator className="my-4" />
            <SheetFooter className="flex-col gap-4 sm:flex-col pt-2">
              <div className="flex flex-col gap-2 w-full text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
              </div>
              <Button asChild className="w-full h-12 shadow-premium rounded-full" size="lg">
                <Link href="/cart" onClick={() => setCartOpen(false)}>View Cart & Checkout</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
