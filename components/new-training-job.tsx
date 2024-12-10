"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NewTrainingJob() {
  const [dataset, setDataset] = useState("")
  const [config, setConfig] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically start a new training job
    toast({
      title: "Training job started",
      description: "Your new training job has been queued.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start New Training Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="dataset" className="block text-sm font-medium text-gray-700">
              Select Dataset
            </label>
            <Select onValueChange={setDataset}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dataset1">Dataset 1</SelectItem>
                <SelectItem value="dataset2">Dataset 2</SelectItem>
                <SelectItem value="dataset3">Dataset 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="config" className="block text-sm font-medium text-gray-700">
              Select Configuration
            </label>
            <Select onValueChange={setConfig}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a configuration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="config1">Configuration 1</SelectItem>
                <SelectItem value="config2">Configuration 2</SelectItem>
                <SelectItem value="config3">Configuration 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Start Training Job</Button>
        </form>
      </CardContent>
    </Card>
  )
}

