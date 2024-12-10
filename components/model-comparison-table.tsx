"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

interface ModelMetrics {
  id: string
  name: string
  accuracy: number
  f1Score: number
  perplexity: number
  trainTime: number
}

const mockModels: ModelMetrics[] = [
  { id: '1', name: 'LLaMA-7B', accuracy: 0.92, f1Score: 0.91, perplexity: 8.5, trainTime: 120 },
  { id: '2', name: 'GPT-3.5', accuracy: 0.94, f1Score: 0.93, perplexity: 7.8, trainTime: 180 },
  { id: '3', name: 'BERT-Large', accuracy: 0.89, f1Score: 0.88, perplexity: 9.2, trainTime: 90 },
  { id: '4', name: 'RoBERTa', accuracy: 0.91, f1Score: 0.90, perplexity: 8.9, trainTime: 110 },
]

export function ModelComparisonTable() {
  const [selectedModels, setSelectedModels] = useState<string[]>([])

  const toggleModelSelection = (modelId: string) => {
    setSelectedModels(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Model Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead>Model Name</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>F1 Score</TableHead>
              <TableHead>Perplexity</TableHead>
              <TableHead>Training Time (hours)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockModels.map((model) => (
              <TableRow key={model.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedModels.includes(model.id)}
                    onCheckedChange={() => toggleModelSelection(model.id)}
                  />
                </TableCell>
                <TableCell>{model.name}</TableCell>
                <TableCell>{model.accuracy.toFixed(2)}</TableCell>
                <TableCell>{model.f1Score.toFixed(2)}</TableCell>
                <TableCell>{model.perplexity.toFixed(2)}</TableCell>
                <TableCell>{model.trainTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

