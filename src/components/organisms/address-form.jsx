"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Checkbox } from "@/components/atoms/checkbox";
import { toast } from "sonner";

const addressSchema = z.object({
  name: z.string().min(2, "Address name is required (e.g. Home, Office)."),
  recipient: z.string().min(2, "Recipient name is required."),
  street: z.string().min(5, "Street address is required."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  zip: z.string().min(5, "ZIP code is required."),
  country: z.string().min(2, "Country is required."),
  isDefault: z.boolean().default(false),
});

export function AddressForm({ defaultValues, onSuccess }) {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues || {
      name: "",
      recipient: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      isDefault: false,
    },
  });

  const onSubmit = async (data) => {
    toast.loading("Saving address...");
    await new Promise(r => setTimeout(r, 1000));
    toast.dismiss();
    toast.success("Address saved successfully!");
    onSuccess?.(data);
    if (!defaultValues) form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Address Label</FormLabel>
              <FormControl><Input placeholder="e.g. Home, Office" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="recipient" render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Name</FormLabel>
              <FormControl><Input placeholder="John Doe" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="street" render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address</FormLabel>
            <FormControl><Input placeholder="123 Innovation Drive, Apt 4B" className="h-12 rounded-xl" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>City</FormLabel>
              <FormControl><Input placeholder="San Francisco" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="state" render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl><Input placeholder="CA" className="h-12 rounded-xl uppercase" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="zip" render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP</FormLabel>
              <FormControl><Input placeholder="94105" className="h-12 rounded-xl" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="isDefault" render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 shadow-sm">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Set as default address</FormLabel>
            </div>
          </FormItem>
        )} />

        <Button type="submit" size="lg" className="w-full h-14 rounded-xl shadow-premium text-lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save Address"}
        </Button>
      </form>
    </Form>
  );
}
