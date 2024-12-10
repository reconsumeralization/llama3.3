"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface HyperparameterImportance {
  name: string
  importance: number
}

const mockData: HyperparameterImportance[] = [
  { name: 'Learning Rate', importance: 0.85 },
  { name: 'Batch Size', importance: 0.72 },
  { name: 'Number of Layers', importance: 0.68 },
  { name: 'Hidden Size', importance: 0.61 },
  { name: 'Dropout Rate', importance: 0.53 },
  { name: 'Weight Decay', importance: 0.47 },
  { name: 'Attention Heads', importance: 0.39 },
  { name: 'Warmup Steps', importance: 0.32 },
]

export function HyperparameterImportanceChart() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Hyperparameter Importance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={mockData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 1]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="importance" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

