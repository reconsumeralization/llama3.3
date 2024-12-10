"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts'

interface ModelPerformance {
  accuracy: number
  f1Score: number
  precision: number
  recall: number
  latency: number
}

const mockModels: Record<string, ModelPerformance> = {
  'model1': { accuracy: 0.92, f1Score: 0.91, precision: 0.90, recall: 0.92, latency: 50 },
  'model2': { accuracy: 0.89, f1Score: 0.88, precision: 0.87, recall: 0.89, latency: 45 },
  'model3': { accuracy: 0.95, f1Score: 0.94, precision: 0.93, recall: 0.95, latency: 55 },
}

export function ModelPerformanceComparison() {
  const [selectedModels, setSelectedModels] = useState<string[]>(['model1', 'model2'])

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  const chartData = Object.entries(mockModels[selectedModels[0]]).map(([key, _]) => ({
    metric: key,
    ...Object.fromEntries(selectedModels.map(modelId => [modelId, mockModels[modelId][key as keyof ModelPerformance] * 100]))
  }))

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Model Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {Object.keys(mockModels).map((modelId) => (
              <Select
                key={modelId}
                value={selectedModels.includes(modelId) ? modelId : ''}
                onValueChange={(value) => handleModelToggle(value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={`Select ${modelId}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={modelId}>{modelId}</SelectItem>
                </SelectContent>
              </Select>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              {selectedModels.map((modelId) => (
                <Radar
                  key={modelId}
                  name={modelId}
                  dataKey={modelId}
                  stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                  fill={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                  fillOpacity={0.6}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

