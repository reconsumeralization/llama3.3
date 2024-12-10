"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    name: "Model A",
    accuracy: 0.89,
    f1Score: 0.92,
  },
  {
    name: "Model B",
    accuracy: 0.91,
    f1Score: 0.94,
  },
  {
    name: "Model C",
    accuracy: 0.87,
    f1Score: 0.90,
  },
]

export function ModelComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value * 100}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          itemStyle={{ color: "#E5E7EB" }}
          cursor={{ fill: "rgba(107, 114, 128, 0.15)" }}
        />
        <Legend />
        <Bar dataKey="accuracy" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="f1Score" fill="#10B981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

