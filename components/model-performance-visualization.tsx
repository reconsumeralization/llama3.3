"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const mockData = {
  accuracyOverTime: [
    { epoch: 1, trainAccuracy: 0.6, valAccuracy: 0.55 },
    { epoch: 2, trainAccuracy: 0.7, valAccuracy: 0.65 },
    { epoch: 3, trainAccuracy: 0.75, valAccuracy: 0.7 },
    { epoch: 4, trainAccuracy: 0.8, valAccuracy: 0.75 },
    { epoch: 5, trainAccuracy: 0.85, valAccuracy: 0.8 },
  ],
  lossOverTime: [
    { epoch: 1, trainLoss: 0.5, valLoss: 0.55 },
    { epoch: 2, trainLoss: 0.4, valLoss: 0.45 },
    { epoch: 3, trainLoss: 0.3, valLoss: 0.35 },
    { epoch: 4, trainLoss: 0.25, valLoss: 0.3 },
    { epoch: 5, trainLoss: 0.2, valLoss: 0.25 },
  ],
  confusionMatrix: [
    { predicted: 'A', actual: 'A', count: 85 },
    { predicted: 'A', actual: 'B', count: 10 },
    { predicted: 'B', actual: 'A', count: 15 },
    { predicted: 'B', actual: 'B', count: 90 },
  ],
}

type ChartType = 'accuracy' | 'loss' | 'confusion'

export function ModelPerformanceVisualization() {
  const [chartType, setChartType] = useState<ChartType>('accuracy')

  const renderChart = () => {
    switch (chartType) {
      case 'accuracy':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.accuracyOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="trainAccuracy" stroke="#8884d8" name="Train Accuracy" />
              <Line type="monotone" dataKey="valAccuracy" stroke="#82ca9d" name="Validation Accuracy" />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'loss':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.lossOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="trainLoss" stroke="#8884d8" name="Train Loss" />
              <Line type="monotone" dataKey="valLoss" stroke="#82ca9d" name="Validation Loss" />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'confusion':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="predicted" name="Predicted" />
              <YAxis dataKey="actual" name="Actual" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Confusion Matrix" data={mockData.confusionMatrix} fill="#8884d8">
                {mockData.confusionMatrix.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.predicted === entry.actual ? "#82ca9d" : "#8884d8"} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Model Performance Visualization
          <Select value={chartType} onValueChange={(value: ChartType) => setChartType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accuracy">Accuracy</SelectItem>
              <SelectItem value="loss">Loss</SelectItem>
              <SelectItem value="confusion">Confusion Matrix</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  )
}

