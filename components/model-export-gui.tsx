"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Download, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const models = [
  { id: "model1", name: "LLaMA Fine-tuned Model" },
  { id: "model2", name: "GPT Custom Model" },
  { id: "model3", name: "BERT Specialized Model" },
]

const exportFormats = ["PyTorch", "ONNX", "TensorFlow"]

const exportOptions = [
  { id: "weights", label: "Model Weights" },
  { id: "config", label: "Model Configuration" },
  { id: "tokenizer", label: "Tokenizer" },
  { id: "metadata", label: "Training Metadata" },
]

export function ModelExportGUI() {
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [selectedFormat, setSelectedFormat] = useState<string>("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isExporting, setIsExporting] = useState<boolean>(false)
  const [exportProgress, setExportProgress] = useState<number>(0)
  const [exportError, setExportError] = useState<string | null>(null)

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleExport = async () => {
    if (!selectedModel || !selectedFormat || selectedOptions.length === 0) {
      setExportError("Please select a model, export format, and at least one export option.")
      return
    }

    setIsExporting(true)
    setExportError(null)
    setExportProgress(0)

    try {
      // Simulate export process
      for (let i = 0; i <= 100; i += 10) {
        setExportProgress(i)
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      console.log('Exporting model:', { selectedModel, selectedFormat, selectedOptions })
      // Here you would typically call an API to start the export process
    } catch (error) {
      console.error('Export error:', error)
      setExportError("An error occurred during the export process. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Export Fine-Tuned Model</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="model-select">Select Model</Label>
          <Select onValueChange={setSelectedModel} value={selectedModel}>
            <SelectTrigger id="model-select">
              <SelectValue placeholder="Choose a model to export" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="format-select">Export Format</Label>
          <Select onValueChange={setSelectedFormat} value={selectedFormat}>
            <SelectTrigger id="format-select">
              <SelectValue placeholder="Choose export format" />
            </SelectTrigger>
            <SelectContent>
              {exportFormats.map((format) => (
                <SelectItem key={format} value={format}>{format}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Export Options</Label>
          <div className="grid grid-cols-2 gap-4">
            {exportOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={() => handleOptionToggle(option.id)}
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {exportError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{exportError}</AlertDescription>
          </Alert>
        )}

        {isExporting && (
          <div className="space-y-2">
            <Progress value={exportProgress} className="w-full" />
            <p className="text-sm text-center">{exportProgress}% exported</p>
          </div>
        )}

        <Button 
          onClick={handleExport} 
          disabled={isExporting || !selectedModel || !selectedFormat || selectedOptions.length === 0}
          className="w-full"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export Model
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

