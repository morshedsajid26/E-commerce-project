"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export function AdminStatCard({ title, value, prefix, suffix, trend, trendLabel, chart }) {
  return (
    <div className="p-6 bg-background rounded-2xl border shadow-sm flex flex-col">
      <h3 className="text-sm font-semibold text-muted-foreground mb-4">{title}</h3>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold font-mono tracking-tight">
            {prefix}{value}{suffix}
          </div>
          {trend !== undefined && (
            <div className={cn("flex items-center gap-1 mt-2 text-sm font-medium", trend >= 0 ? "text-green-500" : "text-destructive")}>
              {trend >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{Math.abs(trend)}%</span>
              <span className="text-muted-foreground font-normal ml-1">{trendLabel}</span>
            </div>
          )}
        </div>
        {chart && (
          <div className="w-24 h-12 ml-auto flex items-end">
            {chart}
          </div>
        )}
      </div>
    </div>
  );
}
