"use client";

import React, { useState, useMemo } from 'react';
import { ProductCard } from "@/components/molecules/product-card";
import { Filter, X, ChevronDown, Check, Search } from "lucide-react";
import { Button } from "@/components/atoms/button";

export function CategoryFilterClient({ initialProducts, categoryName }) {
  const [products] = useState(initialProducts);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Extract unique brands for filter
  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand).filter(Boolean);
    return [...new Set(allBrands)].sort();
  }, [products]);

  // Determine min/max price for filter
  const [minPrice, maxPrice] = useMemo(() => {
    if (products.length === 0) return [0, 100000];
    const prices = products.map(p => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  // Filter State
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sync initial price range when products change
  React.useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Handle filtering
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    });
  }, [products, selectedBrands, priceRange, inStockOnly]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    setInStockOnly(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{categoryName}</h2>
        <Button variant="outline" size="sm" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
      </div>

      {/* Sidebar Filter */}
      <aside className={`
        w-full md:w-64 lg:w-72 flex-shrink-0 
        ${isMobileFilterOpen ? 'block' : 'hidden md:block'}
      `}>
        <div className="bg-card border border-border rounded-xl p-5 sticky top-36">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>
            {(selectedBrands.length > 0 || inStockOnly || priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
              <button onClick={clearFilters} className="text-xs text-primary font-medium hover:underline">
                Clear All
              </button>
            )}
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-sm">Availability</h4>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inStockOnly ? 'bg-primary border-primary' : 'border-input group-hover:border-primary'}`}>
                {inStockOnly && <Check size={14} className="text-primary-foreground" />}
              </div>
              <span className="text-sm text-foreground font-medium">In Stock Only</span>
              <input type="checkbox" className="hidden" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
            </label>
          </div>

          {/* Price Range */}
          <div className="mb-6 pb-6 border-b border-border">
            <h4 className="font-semibold mb-3 text-sm flex justify-between">
              Price Range
            </h4>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">৳</span>
                <input 
                  type="number" 
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full h-9 pl-6 pr-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="relative w-full">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">৳</span>
                <input 
                  type="number" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-9 pl-6 pr-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Brands */}
          {brands.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 text-sm">Brands</h4>
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-primary border-primary' : 'border-input group-hover:border-primary'}`}>
                      {selectedBrands.includes(brand) && <Check size={14} className="text-primary-foreground" />}
                    </div>
                    <span className="text-sm text-foreground">{brand}</span>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedBrands.includes(brand)} 
                      onChange={() => toggleBrand(brand)} 
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="hidden md:flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{categoryName}</h2>
          <div className="text-sm text-muted-foreground font-medium">
            Showing {filteredProducts.length} results
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-card border border-border rounded-xl py-20 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="text-muted-foreground w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
