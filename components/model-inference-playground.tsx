"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

// Mock inference function (replace with actual API call in production)
const mockInference = async (model: string, input: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
  return `This is a mock inference result for the input: "${input}" using model: ${model}`
}

export function ModelInferencePlayground() {
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [inputText, setInputText] = useState<string>('')
  const [inferenceResult, setInferenceResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleInference = async () => {
    if (!selectedModel || !inputText) return

    setIsLoading(true)
    try {
      const result = await mockInference(selectedModel, inputText)
      setInferenceResult(result)
    } catch (error) {
      console.error('Inference error:', error)
      setInferenceResult('An error occurred during inference.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Model Inference Playground</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={setSelectedModel} value={selectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="model1">LLaMA Fine-tuned Model</SelectItem>
              <SelectItem value="model2">GPT Custom Model</SelectItem>
              <SelectItem value="model3">BERT Specialized Model</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Enter your input text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
          />

          <Button onClick={handleInference} disabled={isLoading || !selectedModel || !inputText}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Inference...
              </>
            ) : (
              'Run Inference'
            )}
          </Button>

          {inferenceResult && (
            <Card>
              <CardHeader>
                <CardTitle>Inference Result</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{inferenceResult}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

