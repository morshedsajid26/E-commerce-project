"use client";

import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/atoms/accordion";
import { Checkbox } from "@/components/atoms/checkbox";
import { Slider } from "@/components/atoms/slider";
import { Typography } from "@/components/atoms/typography";
import { Star } from "lucide-react";

export function ProductFilters({ filters, setFilters }) {
  const categories = ["Audio", "Wearables", "Accessories", "Gaming", "Laptops"];
  const brands = ["Apple", "Sony", "Bose", "Sennheiser"];
  const availability = ["In Stock", "Pre-order", "Out of Stock"];

  const handleCategoryToggle = (cat) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const handleBrandToggle = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  return (
    <div className="w-full">
      <Accordion type="multiple" defaultValue={["categories", "price", "brands", "rating"]} className="w-full">
        
        <AccordionItem value="categories" className="border-b-0 mb-4">
          <AccordionTrigger className="hover:no-underline py-2">
            <Typography variant="large">Category</Typography>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 mt-2">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cat-${cat}`} 
                    checked={filters.categories.includes(cat)}
                    onCheckedChange={() => handleCategoryToggle(cat)}
                  />
                  <label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b-0 mb-4">
          <AccordionTrigger className="hover:no-underline py-2">
            <Typography variant="large">Price Range</Typography>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-4 px-2">
              <Slider
                defaultValue={[0, 1000]}
                max={2000}
                step={10}
                value={filters.priceRange}
                onValueChange={(val) => setFilters(prev => ({ ...prev, priceRange: val }))}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>৳{filters.priceRange[0]}</span>
                <span>৳{filters.priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands" className="border-b-0 mb-4">
          <AccordionTrigger className="hover:no-underline py-2">
            <Typography variant="large">Brand</Typography>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 mt-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating" className="border-b-0 mb-4">
          <AccordionTrigger className="hover:no-underline py-2">
            <Typography variant="large">Rating</Typography>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 mt-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`rating-${rating}`}
                    checked={filters.rating === rating}
                    onCheckedChange={(checked) => setFilters(prev => ({ ...prev, rating: checked ? rating : null }))}
                  />
                  <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                    <div className="flex text-yellow-500 mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-current" : "text-muted opacity-30"}`} />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">& Up</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}
