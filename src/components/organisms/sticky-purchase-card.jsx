"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Share2, ShieldCheck, Truck } from "lucide-react";
import { Typography } from "@/components/atoms/typography";
import { Button } from "@/components/atoms/button";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import { useAppStore } from "@/store";

export function StickyPurchaseCard({ product }) {
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0].value);
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[0]);
  const setCartOpen = useAppStore(state => state.setCartOpen);
  const setWishlistOpen = useAppStore(state => state.setWishlistOpen);
  const addToCart = useAppStore(state => state.addToCart);
  const toggleWishlist = useAppStore(state => state.toggleWishlist);
  const wishlist = useAppStore(state => state.wishlist);
  
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="sticky top-28 bg-card border rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-1 text-yellow-500 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
        <span className="text-sm text-muted-foreground ml-2 font-medium">{product.rating} ({product.reviews} reviews)</span>
      </div>

      <Typography variant="h1" className="text-2xl md:text-3xl mb-2">{product.title}</Typography>
      
      <div className="flex items-baseline gap-3 mb-6">
        <Typography variant="h2" className="text-3xl">৳{product.price.toFixed(2)}</Typography>
        {product.oldPrice && (
          <span className="text-lg text-muted-foreground line-through">৳{product.oldPrice.toFixed(2)}</span>
        )}
        {product.discount > 0 && (
          <span className="text-sm font-semibold text-destructive ml-2 bg-destructive/10 px-2 py-1 rounded-md">Save {product.discount}%</span>
        )}
      </div>

      {/* Color Selection */}
      <div className="mb-6">
        <Typography variant="small" className="font-semibold mb-3 flex justify-between">
          <span>Color</span>
          <span className="text-muted-foreground font-normal">{product.colors.find(c => c.value === selectedColor)?.name}</span>
        </Typography>
        <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-3">
          {product.colors.map(color => (
            <div key={color.value} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={color.value} 
                id={`color-${color.value}`} 
                className="peer sr-only" 
              />
              <label
                htmlFor={`color-${color.value}`}
                className="h-10 w-10 rounded-full cursor-pointer ring-offset-background transition-all peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2 border shadow-sm"
                style={{ backgroundColor: color.hex }}
              >
                <span className="sr-only">{color.name}</span>
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Variant Selection */}
      <div className="mb-8">
        <Typography variant="small" className="font-semibold mb-3">Model Variant</Typography>
        <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-2 gap-3">
          {product.sizes.map(size => (
            <div key={size}>
              <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
              <label
                htmlFor={`size-${size}`}
                className="flex items-center justify-center px-4 py-3 border rounded-xl cursor-pointer text-sm font-medium transition-all hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary"
              >
                {size}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Main Actions */}
      <div className="flex flex-col gap-3 mb-6">
        <Button 
          size="lg" 
          className="w-full rounded-full h-14 text-base font-semibold shadow-premium group relative overflow-hidden"
          onClick={() => { addToCart(product, 1, selectedSize, selectedColor); setCartOpen(true); }}
        >
          <span className="flex items-center transition-transform duration-300 group-hover:-translate-y-12">
            Add to Cart - ৳{(product.price).toFixed(2)}
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-12 group-hover:translate-y-0">
            <ShoppingCart className="h-5 w-5 mr-2" /> Added to Cart
          </span>
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="w-full rounded-full" onClick={() => toggleWishlist(product.id)}>
            <Heart className={cn("h-4 w-4 mr-2", isWishlisted && "fill-primary text-primary")} /> Wishlist
          </Button>
          <Button variant="outline" size="lg" className="w-full rounded-full">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-col gap-3 p-4 bg-muted/50 rounded-2xl border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Truck className="h-4 w-4 text-primary shrink-0" />
          <span>{product.delivery || "Free shipping on orders over ৳5000"}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
          <span>2-Year Premium Warranty Included</span>
        </div>
      </div>
    </div>
  );
}
