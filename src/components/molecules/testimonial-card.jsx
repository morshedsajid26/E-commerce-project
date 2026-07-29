"use client";

import * as React from "react";
import { Typography } from "@/components/atoms/typography";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/atoms/avatar";

export function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-card p-8 rounded-3xl border shadow-sm flex flex-col h-full">
      <div className="flex gap-1 text-yellow-500 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <Typography variant="large" className="font-normal italic leading-relaxed mb-8 flex-1">
        "{testimonial.content}"
      </Typography>
      <div className="flex items-center gap-4 mt-auto">
        <Avatar>
          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Typography variant="small" className="font-semibold">{testimonial.name}</Typography>
          <Typography variant="small" className="text-muted-foreground font-normal">{testimonial.role}</Typography>
        </div>
      </div>
    </div>
  );
}
