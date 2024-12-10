"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface PerformanceMetric {
  timestamp: string
  accuracy: number
  latency: number
  throughput: number
}

const generateMockData = (days: number): PerformanceMetric[] => {
  const data: PerformanceMetric[] = []
  const now = new Date()
  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    data.unshift({
      timestamp: date.toISOString().split('T')[0],
      accuracy: 0.8 + Math.random() * 0.15,
      latency: 50 + Math.random() * 20,
      throughput: 1000 + Math.random() * 500,
    })
  }
  return data
}

export function ModelPerformanceMonitoring() {
  const [selectedModel, setSelectedModel] = useState<string>('model1')
  const [selectedMetric, setSelectedMetric] = useState<keyof PerformanceMetric>('accuracy')
  const [data, setData] = useState<PerformanceMetric[]>([])

  useEffect(() => {
    // In a real application, this would fetch data from an API
    setData(generateMockData(30

