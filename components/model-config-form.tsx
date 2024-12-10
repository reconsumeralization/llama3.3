"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Save, Wand2 } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import type { ModelConfig } from "@/types"
import { suggestModelConfig } from "@/lib/model-suggestions"

export function ModelConfigForm() {
  const [config, setConfig] = useState<ModelConfig>({
    learningRate: 0.0001,
    batchSize: 32,
    epochs: 10,
    warmupSteps: 500,
    useAMP: false,
    useMixedPrecision: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [suggestion, setSuggestion] = useState<ModelConfig | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSuggestion = async () => {
      setIsLoading(true)
      try {
        const suggestedConfig = await suggestModelConfig()
        setSuggestion(suggestedConfig)
      } catch (error) {
        console.error("Failed to fetch model configuration suggestion:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSuggestion()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Here you would typically send the configuration to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
      toast({
        title: "Configuration saved",
        description: "Your model configuration has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (name: string, value: number | boolean) => {
    setConfig(prev => ({ ...prev, [name]: value }))
  }

  const applySuggestion = () => {
    if (suggestion) {
      setConfig(suggestion)
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-muted">
        <CardTitle>Model Configuration</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : suggestion ? (
          <Alert className="mb-4">
            <AlertTitle>Configuration Suggestion</AlertTitle>
            <AlertDescription>
              We've analyzed your data and suggest the following configuration:
              <ul className="mt-2 list-disc list-inside">
                <li>Learning Rate: {suggestion.learningRate}</li>
                <li>Batch Size: {suggestion.batchSize}</li>
                <li>Epochs: {suggestion.epochs}</li>
                <li>Warmup Steps: {suggestion.warmupSteps}</li>
              </ul>
              <Button onClick={applySuggestion} className="mt-2">
                <Wand2 className="mr-2 h-4 w-4" />
                Apply Suggestion
              </Button>
            </AlertDescription>
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="learningRate">Learning Rate</Label>
            <Slider
              id="learningRate"
              min={0.00001}
              max={0.1}
              step={0.00001}
              value={[config.learningRate]}
              onValueChange={([value]) => handleChange("learningRate", value)}
            />
            <Input
              type="number"
              value={config.learningRate}
              onChange={(e) => handleChange("learningRate", parseFloat(e.target.value))}
              step="0.00001"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batchSize">Batch Size</Label>
            <Slider
              id="batchSize"
              min={8}
              max={256}
              step={8}
              value={[config.batchSize]}
              onValueChange={([value]) => handleChange("batchSize", value)}
            />
            <Input
              type="number"
              value={config.batchSize}
              onChange={(e) => handleChange("batchSize", parseInt(e.target.value))}
              step="8"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="epochs">Epochs</Label>
            <Slider
              id="epochs"
              min={1}
              max={100}
              step={1}
              value={[config.epochs]}
              onValueChange={([value]) => handleChange("epochs", value)}
            />
            <Input
              type="number"
              value={config.epochs}
              onChange={(e) => handleChange("epochs", parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="warmupSteps">Warmup Steps</Label>
            <Slider
              id="warmupSteps"
              min={0}
              max={2000}
              step={50}
              value={[config.warmupSteps]}
              onValueChange={([value]) => handleChange("warmupSteps", value)}
            />
            <Input
              type="number"
              value={config.warmupSteps}
              onChange={(e) => handleChange("warmupSteps", parseInt(e.target.value))}
              step="50"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="useAMP"
              checked={config.useAMP}
              onCheckedChange={(checked) => handleChange("useAMP", checked)}
            />
            <Label htmlFor="useAMP">Use Automatic Mixed Precision (AMP)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="useMixedPrecision"
              checked={config.useMixedPrecision}
              onCheckedChange={(checked) => handleChange("useMixedPrecision", checked)}
            />
            <Label htmlFor="useMixedPrecision">Use Mixed Precision Training</Label>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

