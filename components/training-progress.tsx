"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface TrainingMetrics {
  epoch: number
  loss: number
  accuracy: number
  learningRate: number
}

export function TrainingProgress() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle')
  const [metrics, setMetrics] = useState<TrainingMetrics[]>([])

  useEffect(() => {
    // Simulating training progress and metrics
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval)
          setStatus('completed')
          return 100
        }
        const newProgress = Math.min(oldProgress + Math.random() * 10, 100)
        setStatus('running')
        
        // Simulating metrics
        const newMetric: TrainingMetrics = {
          epoch: Math.floor(newProgress / 10),
          loss: 1 - newProgress / 100 + Math.random() * 0.1,
          accuracy: newProgress / 100 + Math.random() * 0.1,
          learningRate: 0.001 * Math.pow(0.1, newProgress / 33.33)
        }
        setMetrics(prevMetrics => [...prevMetrics, newMetric])
        
        return newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = () => {
    switch (status) {
      case 'idle':
        return <Badge variant="secondary">Idle</Badge>
      case 'running':
        return <Badge variant="default">Running</Badge>
      case 'completed':
        return <Badge variant="success">Completed</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Training Progress
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full" />
        <p className="text-center">{Math.round(progress)}% Complete</p>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="loss" stroke="#8884d8" />
              <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="learningRate" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

