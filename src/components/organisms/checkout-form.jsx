"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Checkbox } from "@/components/atoms/checkbox";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "Valid ZIP required"),
  useBilling: z.boolean().default(true),
});

export function CheckoutForm({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { useBilling: true },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="firstName" render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="First Name" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="lastName" render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="Last Name" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="Email Address" type="email" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="Phone Number" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="address" render={({ field }) => (
          <FormItem>
            <FormControl><Input placeholder="Address" className="h-12 rounded-xl" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl><Input placeholder="City" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="state" render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="State" className="h-12 rounded-xl uppercase" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="zip" render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="ZIP" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="useBilling" render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4 border-t">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-medium leading-none cursor-pointer">Billing address is same as shipping</FormLabel>
            </div>
          </FormItem>
        )} />

        <Button type="submit" size="lg" className="w-full h-14 rounded-full mt-4 text-lg shadow-premium">
          Continue to Delivery
        </Button>
      </form>
    </Form>
  );
}
