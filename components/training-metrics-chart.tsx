"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface TrainingMetric {
  epoch: number
  loss: number
  accuracy: number
  perplexity: number
}

const generateMockData = (epochs: number): TrainingMetric[] => {
  return Array.from({ length: epochs }, (_, i) => ({
    epoch: i + 1,
    loss: Math.max(0, 2 - 0.1 * i + Math.random() * 0.2),
    accuracy: Math.min(1, 0.5 + 0.01 * i + Math.random() * 0.05),
    perplexity: Math.max(1, 10 - 0.2 * i + Math.random()),
  }))
}

export function TrainingMetricsChart() {
  const [selectedMetric, setSelectedMetric] = useState<'loss' | 'accuracy' | 'perplexity'>('loss')
  const [data, setData] = useState<TrainingMetric[]>([])

  useEffect(() => {
    // In a real application, this would fetch data from an API
    setData(generateMockData(50))
  }, [])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Training Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={(value) => setSelectedMetric(value as 'loss' | 'accuracy' | 'perplexity')} value={selectedMetric}>
            <SelectTrigger>
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loss">Loss</SelectItem>
              <SelectItem value="accuracy">Accuracy</SelectItem>
              <SelectItem value="perplexity">Perplexity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

