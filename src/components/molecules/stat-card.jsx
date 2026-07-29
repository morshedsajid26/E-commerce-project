"use client";

import * as React from "react";
import { Typography } from "@/components/atoms/typography";
import { cn } from "@/lib/utils";

export function StatCard({ title, value, icon: Icon, trend, className }) {
  return (
    <div className={cn("p-6 bg-background rounded-3xl border shadow-sm flex flex-col", className)}>
      <div className="flex justify-between items-start mb-4">
        <Typography variant="small" className="text-muted-foreground font-semibold uppercase tracking-wider">{title}</Typography>
        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-auto">
        <Typography variant="h2" className="text-3xl font-bold">{value}</Typography>
        {trend && (
          <p className={cn("text-xs font-medium mt-2", trend > 0 ? "text-green-500" : "text-destructive")}>
            {trend > 0 ? "+" : ""}{trend}% from last month
          </p>
        )}
      </div>
    </div>
  );
}
