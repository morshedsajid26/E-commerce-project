"use client";

import * as React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function GenericAreaChart({ data, xKey, yKey, color = "#3b82f6", height = 300, hideAxis = false, valuePrefix = "" }) {
  const chartId = React.useId();

  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: hideAxis ? 10 : -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          {!hideAxis && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.4} />}
          
          <XAxis 
            dataKey={xKey} 
            axisLine={false} 
            tickLine={false} 
            tick={!hideAxis ? { fill: '#94a3b8', fontSize: 12, fontWeight: 500 } : false}
            dy={10}
            hide={hideAxis}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={!hideAxis ? { fill: '#94a3b8', fontSize: 12, fontWeight: 500 } : false}
            tickFormatter={(value) => `${valuePrefix}${value}`}
            hide={hideAxis}
          />
          
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--foreground)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}
            itemStyle={{ color, fontWeight: 'bold' }}
            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            formatter={(value) => [`${valuePrefix}${value}`, yKey]}
          />
          
          <Area 
            type="monotone" 
            dataKey={yKey} 
            stroke={color} 
            strokeWidth={hideAxis ? 2 : 3}
            fillOpacity={1} 
            fill={`url(#gradient-${chartId})`} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
