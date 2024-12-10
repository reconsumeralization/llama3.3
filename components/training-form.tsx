"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { TrainingExample } from "@/types/training"

export function TrainingForm() {
  const [loading, setLoading] = useState(false)
  const [styleSystem, setStyleSystem] = useState("tailwind")
  const [builderName, setBuilderName] = useState("")
  const [jsonData, setJsonData] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const componentsData = JSON.parse(jsonData) as TrainingExample[]
      
      const response = await fetch("/api/training", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          componentsData,
          styleSystem,
          builderName,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit training data")
      }

      const result = await response.json()
      console.log("Training data processed:", result)
      
      // Here you would typically handle the successful submission
      // For example, showing a success message or redirecting
      
    } catch (error) {
      console.error("Error submitting training data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>LLaMA Fine-Tuning Data Preparation</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="styleSystem">Style System</Label>
            <Input
              id="styleSystem"
              value={styleSystem}
              onChange={(e) => setStyleSystem(e.target.value)}
              placeholder="e.g., tailwind"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="builderName">Builder Name</Label>
            <Input
              id="builderName"
              value={builderName}
              onChange={(e) => setBuilderName(e.target.value)}
              placeholder="e.g., my-custom-builder"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jsonData">Training Data (JSON)</Label>
            <Textarea
              id="jsonData"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder="Paste your training data JSON here"
              className="min-h-[200px] font-mono"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Prepare Training Data"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

