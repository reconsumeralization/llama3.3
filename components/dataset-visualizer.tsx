"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

interface DatasetStats {
  totalSamples: number
  labelDistribution: Record<string, number>
  averageTokenLength: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function DatasetVisualizer() {
  const [selectedDataset, setSelectedDataset] = useState<string>('')
  const [datasetStats, setDatasetStats] = useState<DatasetStats | null>(null)

  const fetchDatasetStats = async (datasetId: string) => {
    // In a real application, this would be an API call
    // For this example, we'll use mock data
    const mockStats: DatasetStats = {
      totalSamples: 10000,
      labelDistribution: {
        'Class A': 3000,
        'Class B': 2500,
        'Class C': 2000,
        'Class D': 1500,
        'Class E': 1000,
      },
      averageTokenLength: 128,
    }
    setDatasetStats(mockStats)
  }

  const handleDatasetChange = (value: string) => {
    setSelectedDataset(value)
    fetchDatasetStats(value)
  }

  const pieChartData = datasetStats
    ? Object.entries(datasetStats.labelDistribution).map(([name, value]) => ({ name, value }))
    : []

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Dataset Visualizer</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={handleDatasetChange} value={selectedDataset}>
          <SelectTrigger>
            <SelectValue placeholder="Select a dataset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dataset1">Dataset 1</SelectItem>
            <SelectItem value="dataset2">Dataset 2</SelectItem>
            <SelectItem value="dataset3">Dataset 3</SelectItem>
          </SelectContent>
        </Select>

        {datasetStats && (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Total Samples</h3>
              <p>{datasetStats.totalSamples.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Average Token Length</h3>
              <p>{datasetStats.averageTokenLength.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Label Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

