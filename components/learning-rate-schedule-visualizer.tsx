"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface SchedulePoint {
  step: number
  learningRate: number
}

const generateLinearWarmup = (steps: number, maxLR: number): SchedulePoint[] => {
  return Array.from({ length: steps }, (_, i) => ({
    step: i,
    learningRate: (i / (steps - 1)) * maxLR,
  }))
}

const generateCosineDecay = (steps: number, maxLR: number, minLR: number): SchedulePoint[] => {
  return Array.from({ length: steps }, (_, i) => ({
    step: i,
    learningRate: minLR + 0.5 * (maxLR - minLR) * (1 + Math.cos((i / (steps - 1)) * Math.PI)),
  }))
}

const schedules = {
  'linear-warmup': generateLinearWarmup(100, 0.001),
  'cosine-decay': generateCosineDecay(100, 0.001, 0.0001),
  'step-decay': Array.from({ length: 100 }, (_, i) => ({
    step: i,
    learningRate: 0.001 * Math.pow(0.1, Math.floor(i / 33)),
  })),
}

export function LearningRateScheduleVisualizer() {
  const [selectedSchedule, setSelectedSchedule] = useState<keyof typeof schedules>('linear-warmup')

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Learning Rate Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={(value) => setSelectedSchedule(value as keyof typeof schedules)} value={selectedSchedule}>
            <SelectTrigger>
              <SelectValue placeholder="Select schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear-warmup">Linear Warmup</SelectItem>
              <SelectItem value="cosine-decay">Cosine Decay</SelectItem>
              <SelectItem value="step-decay">Step Decay</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={schedules[selectedSchedule]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="learningRate" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

