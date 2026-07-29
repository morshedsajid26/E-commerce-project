"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { ProductCard } from "@/components/molecules/product-card";
import { Typography } from "@/components/atoms/typography";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/atoms/sheet";
import { ProductFilters } from "./product-filters";

export function ProductCatalog({ products }) {
  const [viewMode, setViewMode] = React.useState("grid"); // "grid" | "list"
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortOption, setSortOption] = React.useState("featured");
  
  // Filter State
  const [filters, setFilters] = React.useState({
    categories: [],
    brands: [],
    priceRange: [0, 2000],
    rating: null,
  });

  // Mocking filter logic on dummy data
  const filteredProducts = React.useMemo(() => {
    let result = products;
    if (searchQuery) {
      result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    if (filters.rating) {
      result = result.filter(p => parseFloat(p.rating) >= filters.rating);
    }
    
    // Sort logic
    if (sortOption === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortOption === "rating") result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

    return result;
  }, [products, filters, searchQuery, sortOption]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Desktop Sidebar Filters */}
      <aside className="hidden lg:block w-64 shrink-0">
        <Typography variant="h3" className="mb-6">Filters</Typography>
        <ProductFilters filters={filters} setFilters={setFilters} />
      </aside>

      {/* Main Catalog Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-muted/30 p-4 rounded-xl border">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader className="mb-6 text-left">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <ProductFilters filters={filters} setFilters={setFilters} />
              </SheetContent>
            </Sheet>
            
            <Typography variant="small" className="text-muted-foreground whitespace-nowrap">
              Showing {filteredProducts.length} results
            </Typography>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <Input 
              placeholder="Search products..." 
              className="w-full sm:w-48 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-md h-9 bg-background shrink-0">
              <Button 
                variant={viewMode === "grid" ? "secondary" : "ghost"} 
                size="icon" 
                className="h-8 w-8 rounded-none rounded-l-md"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "secondary" : "ghost"} 
                size="icon" 
                className="h-8 w-8 rounded-none rounded-r-md"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Grid / List */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className={cn(
              "grid gap-6 xl:gap-8 mb-12",
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" : "grid-cols-1"
            )}
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} variant={viewMode} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Typography variant="h3" className="mb-2">No products found</Typography>
            <Typography variant="muted">Try adjusting your filters or search query.</Typography>
            <Button variant="outline" className="mt-6" onClick={() => {
              setSearchQuery("");
              setFilters({ categories: [], brands: [], priceRange: [0, 2000], rating: null });
            }}>
              Clear all filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-auto pt-8 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
