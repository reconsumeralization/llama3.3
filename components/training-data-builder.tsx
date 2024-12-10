"use client"

import { useState } from "react"
import { Plus, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import CodeEditor from '@/components/code-editor'

interface TrainingPair {
  input: string
  output: string
}

export function TrainingDataBuilder() {
  const [trainingData, setTrainingData] = useState<TrainingPair[]>([
    { input: "", output: "" }
  ])
  const { toast } = useToast()

  const addPair = () => {
    setTrainingData([...trainingData, { input: "", output: "" }])
  }

  const removePair = (index: number) => {
    setTrainingData(trainingData.filter((_, i) => i !== index))
  }

  const updatePair = (index: number, field: 'input' | 'output', value: string) => {
    const newData = [...trainingData]
    newData[index][field] = value
    setTrainingData(newData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(JSON.stringify(trainingData, null, 2))
    toast({
      title: "Training data saved",
      description: "Your training data has been successfully saved.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Data Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {trainingData.map((pair, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-md">
              <Tabs defaultValue="input" className="w-full">
                <TabsList>
                  <TabsTrigger value="input">Input</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>
                <TabsContent value="input">
                  <div className="space-y-2">
                    <Label htmlFor={`input-${index}`}>Input</Label>
                    <CodeEditor
                      value={pair.input}
                      onChange={(value) => updatePair(index, 'input', value)}
                      language="javascript"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="output">
                  <div className="space-y-2">
                    <Label htmlFor={`output-${index}`}>Output</Label>
                    <CodeEditor
                      value={pair.output}
                      onChange={(value) => updatePair(index, 'output', value)}
                      language="javascript"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removePair(index)}
                disabled={trainingData.length === 1}
              >
                <Trash className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addPair} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Training Pair
          </Button>
          <Button type="submit" className="w-full">Save Training Data</Button>
        </form>
      </CardContent>
    </Card>
  )
}

