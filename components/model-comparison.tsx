"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface ModelMetrics {
  accuracy: number
  f1Score: number
  precision: number
  recall: number
  perplexity: number
  latency: number
}

interface Model {
  id: string
  name: string
  metrics: ModelMetrics
}

const mockModels: Model[] = [
  {
    id: "1",
    name: "Model A",
    metrics: {
      accuracy: 0.92,
      f1Score: 0.91,
      precision: 0.90,
      recall: 0.92,
      perplexity: 1.15,
      latency: 50
    },
  },
  {
    id: "2",
    name: "Model B",
    metrics: {
      accuracy: 0.89,
      f1Score: 0.88,
      precision: 0.87,
      recall: 0.89,
      perplexity: 1.22,
      latency: 45
    },
  },
  {
    id: "3",
    name: "Model C",
    metrics: {
      accuracy: 0.95,
      f1Score: 0.94,
      precision: 0.93,
      recall: 0.95,
      perplexity: 1.08,
      latency: 55
    },
  },
]

export function ModelComparison() {
  const [selectedModels, setSelectedModels] = useState<string[]>([])

  const handleModelSelect = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  const selectedModelData = mockModels.filter(model => selectedModels.includes(model.id))

  const chartData = [
    { name: 'Accuracy', ...Object.fromEntries(selectedModelData.map(m => [m.name, m.metrics.accuracy])) },
    { name: 'F1 Score', ...Object.fromEntries(selectedModelData.map(m => [m.name, m.metrics.f1Score])) },
    { name: 'Precision', ...Object.fromEntries(selectedModelData.map(m => [m.name, m.metrics.precision])) },
    { name: 'Recall', ...Object.fromEntries(selectedModelData.map(m => [m.name, m.metrics.recall])) },
  ]

  const radarData = selectedModelData.map(model => ({
    name: model.name,
    accuracy: model.metrics.accuracy * 100,
    f1Score: model.metrics.f1Score * 100,
    precision: model.metrics.precision * 100,
    recall: model.metrics.recall * 100,
    perplexity: (1 / model.metrics.perplexity) * 100, // Inverse of perplexity for better visualization
    latency: (1 / model.metrics.latency) * 1000, // Inverse of latency for better visualization
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Comparison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex space-x-4">
          {mockModels.map(model => (
            <Button
              key={model.id}
              variant={selectedModels.includes(model.id) ? "default" : "outline"}
              onClick={() => handleModelSelect(model.id)}
            >
              {model.name}
            </Button>
          ))}
        </div>
        {selectedModelData.length > 0 && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Accuracy</TableHead>
                  <TableHead>F1 Score</TableHead>
                  <TableHead>Precision</TableHead>
                  <TableHead>Recall</TableHead>
                  <TableHead>Perplexity</TableHead>
                  <TableHead>Latency (ms)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedModelData.map(model => (
                  <TableRow key={model.id}>
                    <TableCell>{model.name}</TableCell>
                    <TableCell>{model.metrics.accuracy.toFixed(2)}</TableCell>
                    <TableCell>{model.metrics.f1Score.toFixed(2)}</TableCell>
                    <TableCell>{model.metrics.precision.toFixed(2)}</TableCell>
                    <TableCell>{model.metrics.recall.toFixed(2)}</TableCell>
                    <TableCell>{model.metrics.perplexity.toFixed(2)}</TableCell>
                    <TableCell>{model.metrics.latency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {selectedModelData.map((model, index) => (
                    <Bar key={model.id} dataKey={model.name} fill={`hsl(${index * 60}, 70%, 50%)`} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  {selectedModelData.map((model, index) => (
                    <Radar key={model.id} name={model.name} dataKey={model.name} stroke={`hsl(${index * 60}, 70%, 50%)`} fill={`hsl(${index * 60}, 70%, 50%)`} fillOpacity={0.6} />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

