"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";

export function ProductCard({ product, className }) {
  const addToCart = useAppStore(state => state.addToCart);
  const setCartOpen = useAppStore(state => state.setCartOpen);

  // Calculate discount amount and original price if discount exists
  const hasDiscount = (product.discount || 0) > 0;
  
  const displayOldPrice = hasDiscount 
    ? (product.price / (1 - product.discount / 100))
    : product.oldPrice;

  const discountAmount = hasDiscount && displayOldPrice 
    ? Math.round(displayOldPrice - product.price) 
    : 0;

  return (
    <div 
      className={cn(
        "relative flex flex-col group bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1",
        className
      )}
    >
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-0"></Link>

      {/* Image Area */}
      <div className="relative w-full aspect-square p-6 flex items-center justify-center bg-white pointer-events-none">
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
          <Image 
            src={product.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"} 
            fill 
            alt={product.title} 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            className="object-contain drop-shadow-md" 
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white z-10 pointer-events-none">
        <h3 className="font-semibold text-[15px] leading-tight text-slate-900 line-clamp-2 mb-3">
          {product.title}
        </h3>
        
        <div className="flex flex-col gap-1 mt-auto">
          <span className="font-medium text-lg text-slate-900 tracking-tight">
            ৳ {product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          </span>
          
          <div className="h-6 flex items-center gap-2">
            {hasDiscount && (
              <>
                <span className="text-[13px] text-slate-400 line-through">
                  ৳{displayOldPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] font-medium text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-md tracking-wide">
                  ৳ {discountAmount.toLocaleString()} OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4 w-full pointer-events-auto">
          <Link 
            href={`/product/${product.id}`}
            className="flex-1 h-[36px] text-[14px] font-medium text-slate-900 border border-slate-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
          >
            Shop Now
          </Link>
          
          <button 
            type="button"
            title="Compare"
            className={cn(
              "h-[36px] w-[36px] flex-shrink-0 flex items-center justify-center border rounded-full transition-colors",
              useAppStore(state => state.compare).includes(product.id)
                ? "bg-blue-600 text-white border-blue-600"
                : "text-slate-600 border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
            )}
            onClick={(e) => {
              e.preventDefault();
              useAppStore.getState().toggleCompare(product.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m16 3 4 4-4 4"/>
              <path d="M20 7H4"/>
              <path d="m8 21-4-4 4-4"/>
              <path d="M4 17h16"/>
            </svg>
          </button>

          <button 
            type="button"
            title="Add to Cart"
            className="h-[36px] w-[36px] flex-shrink-0 flex items-center justify-center text-slate-600 border border-slate-200 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
              setCartOpen(true);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
