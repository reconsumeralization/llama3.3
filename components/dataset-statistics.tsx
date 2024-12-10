"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DatasetStats {
  totalSamples: number
  averageTokens: number
  classDistribution: Record<string, number>
}

const mockDatasets: Record<string, DatasetStats> = {
  'dataset1': {
    totalSamples: 10000,
    averageTokens: 256,
    classDistribution: { 'Class A': 3000, 'Class B': 2500, 'Class C': 4500 }
  },
  'dataset2': {
    totalSamples: 15000,
    averageTokens: 312,
    classDistribution: { 'Class X': 5000, 'Class Y': 7000, 'Class Z': 3000 }
  },
  'dataset3': {
    totalSamples: 8000,
    averageTokens: 189,
    classDistribution: { 'Type 1': 2000, 'Type 2': 3000, 'Type 3': 1500, 'Type 4': 1500 }
  }
}

export function DatasetStatistics() {
  const [selectedDataset, setSelectedDataset] = useState<string>('dataset1')
  const [stats, setStats] = useState<DatasetStats | null>(null)

  useEffect(() => {
    setStats(mockDatasets[selectedDataset])
  }, [selectedDataset])

  const distributionData = stats
    ? Object.entries(stats.classDistribution).map(([name, value]) => ({ name, value }))
    : []

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Dataset Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={setSelectedDataset} value={selectedDataset}>
            <SelectTrigger>
              <SelectValue placeholder="Select dataset" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(mockDatasets).map((datasetId) => (
                <SelectItem key={datasetId} value={datasetId}>{datasetId}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {stats && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Samples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stats.totalSamples.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Average Tokens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stats.averageTokens.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Class Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

