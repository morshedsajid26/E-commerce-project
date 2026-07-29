"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrackingTimeline({ currentStep }) {
  const steps = [
    { title: "Order Placed", date: "Oct 24, 09:00 AM" },
    { title: "Processing", date: "Oct 24, 11:30 AM" },
    { title: "Shipped", date: "Oct 25, 08:15 AM" },
    { title: "Out for Delivery", date: "Oct 26, 07:00 AM" },
    { title: "Delivered", date: "Pending" }
  ];

  return (
    <div className="relative border-l-2 border-muted ml-6 space-y-12 py-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isFuture = index > currentStep;

        return (
          <div key={index} className="relative pl-8">
            {/* Dot */}
            <div 
              className={cn(
                "absolute -left-[17px] top-0.5 h-8 w-8 rounded-full flex items-center justify-center border-4 border-background transition-colors",
                isCompleted ? "bg-primary text-primary-foreground" : 
                isActive ? "bg-background border-primary ring-4 ring-primary/20" : 
                "bg-muted"
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : <div className={cn("h-3 w-3 rounded-full", isActive ? "bg-primary" : "bg-transparent")} />}
            </div>

            {/* Content */}
            <div className={cn("transition-opacity", isFuture ? "opacity-40" : "opacity-100")}>
              <h4 className={cn("text-lg font-bold mb-1", isActive && "text-primary")}>{step.title}</h4>
              <p className="text-sm text-muted-foreground font-mono">{step.date}</p>
              
              {isActive && index === 3 && (
                <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <p className="text-sm font-medium text-primary">Your package is on the final leg of its journey! Make sure someone is home to sign for the premium delivery.</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
