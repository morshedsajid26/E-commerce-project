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
} from "@/components/atoms/sheet";
import { Button } from "@/components/atoms/button";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Separator } from "@/components/atoms/separator";
import { Heart, Trash2 } from "lucide-react";
import { Typography } from "@/components/atoms/typography";
import { DUMMY_PRODUCTS } from "@/data/dummy/homepage-data";

export function WishlistDrawer() {
  const { isWishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart, setCartOpen } = useAppStore();

  // Map wishlist IDs to full product objects
  const wishlistedProducts = React.useMemo(() => {
    return wishlist.map(id => DUMMY_PRODUCTS.find(p => p.id === id)).filter(Boolean);
  }, [wishlist]);

  return (
    <Sheet open={isWishlistOpen} onOpenChange={setWishlistOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" /> Your Wishlist
          </SheetTitle>
          <SheetDescription>
            {wishlist.length} saved items for later.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        
        <ScrollArea className="flex-1 -mx-6 px-6">
          {wishlistedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center text-muted-foreground">
              <Heart className="h-12 w-12 mb-4 opacity-20" />
              <Typography variant="large">Your wishlist is empty.</Typography>
              <Button variant="link" onClick={() => setWishlistOpen(false)}>Explore Products</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {wishlistedProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 bg-muted/10 p-3 rounded-2xl border">
                  <div className="h-16 w-16 bg-muted/30 rounded-xl flex items-center justify-center p-1 shrink-0">
                    <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${product.id}`} className="font-semibold text-sm hover:underline line-clamp-1 block" onClick={() => setWishlistOpen(false)}>
                      {product.title}
                    </Link>
                    <p className="text-sm font-bold mt-1">৳{product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="rounded-full shadow-sm text-xs h-7 px-3"
                      onClick={() => {
                        addToCart(product, 1);
                        setWishlistOpen(false);
                        setCartOpen(true);
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-destructive text-xs h-7 px-0"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {wishlist.length > 0 && (
          <div className="pt-4 border-t mt-4">
            <Button asChild variant="outline" className="w-full rounded-full h-12">
              <Link href="/wishlist" onClick={() => setWishlistOpen(false)}>View Full Wishlist</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
