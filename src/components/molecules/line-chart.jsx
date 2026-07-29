"use client";

import * as React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function GenericLineChart({ data, xKey, yKey, color = "hsl(var(--primary))", height = 300, hideAxis = false, valuePrefix = "" }) {
  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: hideAxis ? 10 : -20, bottom: 0 }}>
          
          {!hideAxis && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />}
          
          <XAxis 
            dataKey={xKey} 
            axisLine={false} 
            tickLine={false} 
            tick={!hideAxis ? { fill: 'hsl(var(--muted-foreground))', fontSize: 12 } : false}
            dy={10}
            hide={hideAxis}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={!hideAxis ? { fill: 'hsl(var(--muted-foreground))', fontSize: 12 } : false}
            tickFormatter={(value) => `${valuePrefix}${value}`}
            hide={hideAxis}
          />
          
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
            labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
            formatter={(value) => [`${valuePrefix}${value}`, yKey]}
          />
          
          <Line 
            type="monotone" 
            dataKey={yKey} 
            stroke={color} 
            strokeWidth={hideAxis ? 2 : 3}
            dot={!hideAxis ? { r: 4, strokeWidth: 2 } : false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
