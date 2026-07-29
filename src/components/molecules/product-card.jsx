"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Star, Eye, ArrowRight, Truck, Flame, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { Typography } from "@/components/atoms/typography";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, variant = "grid", className }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const setCartOpen = useAppStore((state) => state.setCartOpen);
  const setWishlistOpen = useAppStore((state) => state.setWishlistOpen);
  const addToCart = useAppStore((state) => state.addToCart);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const toggleCompare = useAppStore((state) => state.toggleCompare);
  const wishlist = useAppStore((state) => state.wishlist);
  
  const isWishlisted = wishlist.includes(product.id);

  // Common UI Elements
  const Badges = () => (
    <div className="absolute top-3 left-3 z-20 flex flex-col items-start gap-2 pointer-events-none">
      {product.isNew && <Badge className="bg-primary text-primary-foreground shadow-sm">New</Badge>}
      {product.discount > 0 && <Badge variant="destructive" className="shadow-sm">-{product.discount}%</Badge>}
      {variant === "flash-sale" && (
        <Badge className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm flex items-center gap-1">
          <Flame className="h-3 w-3" /> Flash Deal
        </Badge>
      )}
    </div>
  );

  const ActionButtons = ({ vertical = true }) => (
    <AnimatePresence>
      {(isHovered || variant === "list" || variant === "featured") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: vertical ? 10 : 0, y: vertical ? 0 : 10 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: vertical ? 10 : 0, y: vertical ? 0 : 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute z-20 flex gap-2",
            vertical ? "top-3 right-3 flex-col" : "bottom-3 left-3 flex-row"
          )}
        >
          <button 
            type="button"
            title="Add to Wishlist"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }} 
            className="h-9 w-9 bg-background/90 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-background border shadow-sm transition-all hover:scale-110 active:scale-95"
          >
            <Heart className={cn("h-4 w-4 transition-colors", isWishlisted ? "fill-primary text-primary" : "")} />
          </button>
          <button 
            type="button"
            title="Compare"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCompare(product.id); }} 
            className="h-9 w-9 bg-background/90 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-background border shadow-sm transition-all hover:scale-110 active:scale-95"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const Price = ({ size = "normal" }) => (
    <div className="flex items-baseline gap-2">
      <span className={cn("font-bold text-foreground", size === "large" ? "text-2xl" : size === "small" ? "text-base" : "text-lg")}>
        ৳{product.price.toFixed(2)}
      </span>
      {product.oldPrice && (
        <span className={cn("text-muted-foreground line-through", size === "large" ? "text-base" : "text-xs")}>
          ৳{product.oldPrice.toFixed(2)}
        </span>
      )}
    </div>
  );

  const Rating = () => (
    <div className="flex items-center gap-1 text-yellow-500">
      <Star className="h-3 w-3 fill-current" />
      <span className="text-xs font-medium text-muted-foreground">{product.rating} ({product.reviews})</span>
    </div>
  );

  const StockAndDelivery = () => (
    <div className="flex flex-col gap-1 mt-2">
      {product.stock <= 10 ? (
        <span className="text-xs font-semibold text-destructive">Only {product.stock} left in stock!</span>
      ) : (
        <span className="text-xs text-green-600 dark:text-green-400 font-medium">In Stock</span>
      )}
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Truck className="h-3 w-3" />
        {product.delivery}
      </div>
    </div>
  );

  const AddToCartBtn = ({ fullWidth = false, size = "icon" }) => (
    <Button 
      size={size} 
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        fullWidth && "w-full",
        size === "icon" && "rounded-full rounded-tl-none rounded-br-2xl absolute bottom-0 right-0 h-12 w-12",
        size !== "icon" && "rounded-full shadow-premium"
      )}
      onClick={(e) => { e.preventDefault(); addToCart(product, 1); setCartOpen(true); }}
    >
      {size === "icon" ? (
        <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
      ) : (
        <>
          <span className="flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-10">
            Add to Cart
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-10 group-hover:translate-y-0">
            <ShoppingCart className="h-5 w-5" />
          </span>
        </>
      )}
    </Button>
  );

  const ImageArea = ({ className, children }) => (
    <div className={cn("relative overflow-hidden bg-muted/20 flex items-center justify-center", className)}>
      <motion.div
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-full relative p-6"
      >
        <Image src={product.image} fill alt={product.title} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain mix-blend-multiply dark:mix-blend-normal p-4" />
      </motion.div>
      {children}
    </div>
  );

  // Layout Renders
  const cardBaseClass = cn(
    "group relative flex bg-card border shadow-sm hover:shadow-premium transition-all duration-300 overflow-hidden",
    className
  );

  if (variant === "compact") {
    return (
      <Link href={`/product/${product.id}`}>
        <motion.div 
          className={cn(cardBaseClass, "flex-row items-center p-3 rounded-2xl gap-4")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-20 w-20 bg-muted/20 rounded-xl overflow-hidden shrink-0 p-2">
            <Image src={product.image} fill alt={product.title} sizes="80px" className="object-contain mix-blend-multiply dark:mix-blend-normal" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <Typography variant="small" className="font-semibold line-clamp-1">{product.title}</Typography>
            <Price size="small" />
            <Rating />
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/product/${product.id}`}>
        <motion.div 
          className={cn(cardBaseClass, "flex-row items-stretch rounded-2xl h-32 sm:h-40")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ImageArea className="w-1/3 min-w-[120px]" />
          <div className="p-4 flex flex-col flex-1 justify-center">
            <Rating />
            <Typography variant="large" className="line-clamp-1 mb-1">{product.title}</Typography>
            <Price />
            <div className="mt-auto flex justify-between items-end">
              {product.stock <= 10 && <span className="text-xs font-semibold text-destructive">Only {product.stock} left!</span>}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <Link href={`/product/${product.id}`}>
        <motion.div 
          className={cn(cardBaseClass, "flex-col sm:flex-row rounded-3xl")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -4 }}
        >
          <Badges />
          <ImageArea className="w-full sm:w-1/3 lg:w-1/4 aspect-[4/3] sm:aspect-auto" />
          <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start gap-4">
              <div>
                <Rating />
                <Typography variant="h3" className="mt-2 mb-2 line-clamp-2">{product.title}</Typography>
                <Typography variant="muted" className="line-clamp-2 max-w-2xl">{product.description}</Typography>
                <div className="mt-4">
                  <StockAndDelivery />
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0 gap-4">
                <Price size="large" />
                <AddToCartBtn size="lg" />
                <div className="flex gap-2 mt-2">
                  <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 text-muted-foreground hover:text-primary" onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}>
                    <Heart className={cn("h-4 w-4", isWishlisted && "fill-primary text-primary")} />
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 text-muted-foreground hover:text-primary" onClick={(e) => { e.preventDefault(); toggleCompare(product.id); }}>
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/product/${product.id}`}>
        <motion.div 
          className={cn(cardBaseClass, "flex-col rounded-3xl")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -4 }}
        >
          <Badges />
          <ActionButtons vertical={false} />
          <ImageArea className="w-full aspect-[4/3]" />
          <div className="p-8 flex flex-col flex-1 items-center text-center bg-gradient-to-t from-muted/50 to-transparent">
            <Rating />
            <Typography variant="h2" className="mt-2 mb-3">{product.title}</Typography>
            <Typography variant="muted" className="line-clamp-2 mb-6">{product.description}</Typography>
            <Price size="large" />
            <div className="w-full max-w-sm mt-6">
              <AddToCartBtn fullWidth size="lg" />
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default: grid & flash-sale
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        className={cn(cardBaseClass, "flex-col rounded-2xl h-full")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
      >
        <Badges />
        <ActionButtons />
        <ImageArea className="w-full aspect-square" />
        
        {variant === "flash-sale" && (
          <div className="w-full bg-destructive/10 h-1.5 absolute top-[calc(100%-1.5rem)] left-0 z-10 hidden">
             {/* Progress bar could go here, but let's put it in content */}
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          <Rating />
          <Typography variant="large" className="line-clamp-1 mt-1">{product.title}</Typography>
          <Typography variant="small" className="text-muted-foreground line-clamp-2 mt-1 mb-4 flex-1">
            {product.description}
          </Typography>

          {variant === "flash-sale" && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-destructive">85% Sold</span>
                <span className="text-muted-foreground">15 left</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div className="bg-destructive h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          )}

          <div className="flex items-end justify-between mt-auto">
            <Price />
            <AddToCartBtn size="icon" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
