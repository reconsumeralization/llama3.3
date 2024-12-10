"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ProgressData {
  epoch: number
  loss: number
  accuracy: number
}

const generateMockData = (epochs: number): ProgressData[] => {
  return Array.from({ length: epochs }, (_, i) => ({
    epoch: i + 1,
    loss: Math.max(0, 2 - 0.1 * i + Math.random() * 0.2),
    accuracy: Math.min(1, 0.5 + 0.01 * i + Math.random() * 0.05),
  }))
}

export function FineTuningProgressDashboard() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle')
  const [data, setData] = useState<ProgressData[]>([])

  useEffect(() => {
    // Simulate fine-tuning progress
    const interval = setInterval(() => {
      if (status === 'running') {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setStatus('completed')
            return 100
          }
          return prev + 1
        })
        setData(prev => [...prev, ...generateMockData(1)])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [status])

  const startFineTuning = () => {
    setStatus('running')
    setProgress(0)
    setData([])
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Fine-Tuning Progress
          <Badge variant={status === 'running' ? 'default' : status === 'completed' ? 'success' : 'secondary'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{progress.toFixed(2)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="loss" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <Button onClick={startFineTuning} disabled={status === 'running'}>
          {status === 'idle' ? 'Start Fine-Tuning' : 'Restart Fine-Tuning'}
        </Button>
      </CardContent>
    </Card>
  )
}

