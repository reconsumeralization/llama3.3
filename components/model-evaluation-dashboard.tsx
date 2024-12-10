"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface ModelMetrics {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  perplexity: number
}

const mockModels: Record<string, ModelMetrics> = {
  'model1': { accuracy: 0.92, precision: 0.89, recall: 0.94, f1Score: 0.91, perplexity: 8.5 },
  'model2': { accuracy: 0.88, precision: 0.86, recall: 0.90, f1Score: 0.88, perplexity: 9.2 },
  'model3': { accuracy: 0.95, precision: 0.93, recall: 0.96, f1Score: 0.94, perplexity: 7.8 },
}

export function ModelEvaluationDashboard() {
  const [selectedModel, setSelectedModel] = useState<string>('model1')

  const barChartData = Object.entries(mockModels[selectedModel]).map(([key, value]) => ({
    metric: key,
    value: key === 'perplexity' ? value : value * 100,
  }))

  const radarChartData = [mockModels[selectedModel]].map(metrics => ({
    ...metrics,
    accuracy: metrics.accuracy * 100,
    precision: metrics.precision * 100,
    recall: metrics.recall * 100,
    f1Score: metrics.f1Score * 100,
  }))

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Model Evaluation Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={setSelectedModel} value={selectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="model1">Model 1</SelectItem>
              <SelectItem value="model2">Model 2</SelectItem>
              <SelectItem value="model3">Model 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue="bar">
          <TabsList>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="radar">Radar Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="bar">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="radar">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name={selectedModel} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

