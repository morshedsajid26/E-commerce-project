"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/atoms/accordion";
import { Typography } from "@/components/atoms/typography";
import { TestimonialCard } from "@/components/molecules/testimonial-card";
import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";

export function ProductInfoTabs({ product }) {
  return (
    <div className="mt-16">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8 overflow-x-auto overflow-y-hidden">
          <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6 text-base">Description</TabsTrigger>
          <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6 text-base">Specifications</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6 text-base">Reviews</TabsTrigger>
          <TabsTrigger value="policies" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6 text-base">Policies & FAQ</TabsTrigger>
        </TabsList>
        
        {/* Description Tab */}
        <TabsContent value="description" className="space-y-6 animate-in fade-in-50 duration-500">
          <Typography variant="h3" className="mb-4">Overview</Typography>
          <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
          
          <Typography variant="h3" className="mt-12 mb-4">Key Features</Typography>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        {/* Specs Tab */}
        <TabsContent value="specs" className="animate-in fade-in-50 duration-500">
          <Typography variant="h3" className="mb-6">Technical Specifications</Typography>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y">
                {Object.entries(product.specs).map(([key, value]) => (
                  <tr key={key} className="even:bg-muted/30 hover:bg-muted/50 transition-colors">
                    <th className="px-6 py-4 font-medium w-1/3">{key}</th>
                    <td className="px-6 py-4 text-muted-foreground">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="animate-in fade-in-50 duration-500">
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 p-8 bg-muted/30 rounded-2xl border">
            <div className="text-center">
              <Typography variant="h1" className="text-5xl lg:text-7xl font-bold">{product.rating}</Typography>
              <Typography variant="small" className="text-muted-foreground mt-2">Based on {product.reviews} reviews</Typography>
            </div>
            {/* Simple dummy rating bar breakdown */}
            <div className="flex-1 w-full space-y-2">
              {[5,4,3,2,1].map(r => (
                <div key={r} className="flex items-center gap-2 text-sm">
                  <span className="w-4">{r}</span>
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${r === 5 ? 85 : r === 4 ? 10 : 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviewsList.map((review, i) => (
              <TestimonialCard key={i} testimonial={review} />
            ))}
          </div>
        </TabsContent>

        {/* Policies & FAQ Tab */}
        <TabsContent value="policies" className="animate-in fade-in-50 duration-500 space-y-12">
          
          <div>
            <Typography variant="h3" className="mb-6">Frequently Asked Questions</Typography>
            <Accordion type="single" collapsible className="w-full border rounded-2xl px-6 bg-card">
              {product.faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
                  <AccordionTrigger className="text-left font-medium hover:no-underline hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-muted/30 rounded-2xl border">
              <Truck className="h-6 w-6 text-primary mb-3" />
              <Typography variant="large" className="mb-2">Shipping</Typography>
              <Typography variant="small" className="text-muted-foreground">{product.shippingPolicy}</Typography>
            </div>
            <div className="p-6 bg-muted/30 rounded-2xl border">
              <RefreshCcw className="h-6 w-6 text-primary mb-3" />
              <Typography variant="large" className="mb-2">Returns</Typography>
              <Typography variant="small" className="text-muted-foreground">{product.returnPolicy}</Typography>
            </div>
            <div className="p-6 bg-muted/30 rounded-2xl border">
              <ShieldCheck className="h-6 w-6 text-primary mb-3" />
              <Typography variant="large" className="mb-2">Warranty</Typography>
              <Typography variant="small" className="text-muted-foreground">{product.warranty}</Typography>
            </div>
          </div>

        </TabsContent>
      </Tabs>
    </div>
  );
}
