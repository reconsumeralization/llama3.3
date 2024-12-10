"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const baseModels = [
  { id: "llama2", name: "LLaMA 2" },
  { id: "mistral", name: "Mistral" },
  { id: "vicuna", name: "Vicuna" },
]

export function OllamaVariantGUI() {
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [variantName, setVariantName] = useState<string>("")
  const [temperature, setTemperature] = useState<number>(0.7)
  const [topP, setTopP] = useState<number>(0.9)
  const [customPrompt, setCustomPrompt] = useState<string>("")
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateVariant = async () => {
    if (!selectedModel || !variantName) {
      setError("Please select a base model and provide a variant name.")
      return
    }

    setIsCreating(true)
    setError(null)

    try {
      // Simulate variant creation process
      await new Promise(resolve => setTimeout(resolve, 3000))

      console.log('Creating Ollama variant:', {
        baseModel: selectedModel,
        variantName,
        temperature,
        topP,
        customPrompt
      })
      // Here you would typically call an API to create the Ollama variant
    } catch (error) {
      console.error('Variant creation error:', error)
      setError("An error occurred during the variant creation process. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Ollama Variant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="model-select">Select Base Model</Label>
          <Select onValueChange={setSelectedModel} value={selectedModel}>
            <SelectTrigger id="model-select">
              <SelectValue placeholder="Choose a base model" />
            </SelectTrigger>
            <SelectContent>
              {baseModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="variant-name">Variant Name</Label>
          <Input
            id="variant-name"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
            placeholder="Enter a name for your variant"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="temperature">Temperature: {temperature}</Label>
          <Slider
            id="temperature"
            min={0}
            max={1}
            step={0.1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="top-p">Top P: {topP}</Label>
          <Slider
            id="top-p"
            min={0}
            max={1}
            step={0.1}
            value={[topP]}
            onValueChange={(value) => setTopP(value[0])}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom-prompt">Custom Prompt (Optional)</Label>
          <Textarea
            id="custom-prompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Enter a custom prompt for your variant"
            rows={4}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleCreateVariant} 
          disabled={isCreating || !selectedModel || !variantName}
          className="w-full"
        >
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Variant...
            </>
          ) : (
            "Create Ollama Variant"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

