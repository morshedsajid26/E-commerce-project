"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";
import { Tag } from "lucide-react";

const couponSchema = z.object({
  code: z.string().min(3, "Coupon code is too short.").max(15, "Code is too long."),
});

export function CouponForm({ onApply }) {
  const form = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = (data) => {
    const success = onApply?.(data.code);
    if (!success) {
      form.setError("code", { type: "manual", message: "Invalid or expired coupon code." });
    } else {
      toast.success("Coupon applied!");
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 mb-2"><Tag className="h-4 w-4" /> Apply Discount Code</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input 
                    placeholder="Enter code (Try PREMIUM20)" 
                    className="h-12 rounded-xl flex-1 uppercase" 
                    {...field} 
                  />
                </FormControl>
                <Button type="submit" className="h-12 rounded-xl px-6 shadow-sm" disabled={form.formState.isSubmitting}>
                  Apply
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
