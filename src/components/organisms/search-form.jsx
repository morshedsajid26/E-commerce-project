"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  query: z.string().min(1, "Search query is required."),
});

export function SearchForm({ className, onSearch }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const onSubmit = (data) => {
    if (onSearch) {
      onSearch(data.query);
    } else {
      router.push(`/shop?q=${encodeURIComponent(data.query)}`);
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("relative flex w-full", className)}>
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormControl>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search products, categories, brands..." 
                    className="pl-12 h-14 rounded-full border-2 bg-background/50 shadow-sm text-base pr-32 transition-colors focus-visible:border-primary" 
                    {...field} 
                  />
                  <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-full px-6 shadow-sm">
                    Search
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
