"use client";

import * as React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Typography } from "@/components/atoms/typography";

const data = [
  { name: 'Jan', total: 120 },
  { name: 'Feb', total: 210 },
  { name: 'Mar', total: 800 },
  { name: 'Apr', total: 450 },
  { name: 'May', total: 950 },
  { name: 'Jun', total: 1249 },
];

export function SpendingChart() {
  return (
    <div className="bg-card rounded-3xl border shadow-sm p-6 md:p-8">
      <div className="mb-8">
        <Typography variant="h3">Spending History</Typography>
        <Typography variant="small" className="text-muted-foreground">Your total expenditure over the last 6 months.</Typography>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.4} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
              tickFormatter={(value) => `৳${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                borderRadius: '12px', 
                border: '1px solid var(--border)', 
                color: 'var(--foreground)', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' 
              }}
              itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTotal)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
