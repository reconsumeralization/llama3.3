"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ModelEvaluationForm() {
  const [modelId, setModelId] = useState("")
  const [testDataset, setTestDataset] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically start the evaluation process
    toast({
      title: "Evaluation started",
      description: "Model evaluation has been initiated.",
    })
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-muted">
        <CardTitle>Evaluate Model</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="modelId">Model ID</Label>
            <Input
              id="modelId"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              placeholder="Enter the model ID"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testDataset">Test Dataset</Label>
            <Input
              id="testDataset"
              value={testDataset}
              onChange={(e) => setTestDataset(e.target.value)}
              placeholder="Enter the test dataset name"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">Start Evaluation</Button>
        </form>
      </CardContent>
    </Card>
  )
}

