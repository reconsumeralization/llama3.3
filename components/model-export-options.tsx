"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, Download } from 'lucide-react'

interface ExportOption {
  id: string
  label: string
}

const exportOptions: ExportOption[] = [
  { id: 'weights', label: 'Model Weights' },
  { id: 'config', label: 'Model Configuration' },
  { id: 'tokenizer', label: 'Tokenizer' },
  { id: 'metadata', label: 'Training Metadata' },
]

const exportFormats = ['PyTorch', 'ONNX', 'TensorFlow']

export function ModelExportOptions() {
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [selectedFormat, setSelectedFormat] = useState<string>('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isExporting, setIsExporting] = useState<boolean>(false)

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleExport = async () => {
    if (!selectedModel || !selectedFormat || selectedOptions.length === 0) return

    setIsExporting(true)
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 3000))
      console.log('Exporting model:', { selectedModel, selectedFormat, selectedOptions })
      // Here you would typically call an API to start the export process
    } catch (error) {
      console.error('Export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Model Export Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="model-select">Select Model</Label>
            <Select onValueChange={setSelectedModel} value={selectedModel}>
              <SelectTrigger id="model-select">
                <SelectValue placeholder="Choose a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="model1">LLaMA Fine-tuned Model</SelectItem>
                <SelectItem value="model2">GPT Custom Model</SelectItem>
                <SelectItem value="model3">BERT Specialized Model</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
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

          <Button onClick={handleExport} disabled={isExporting || !selectedModel || !selectedFormat || selectedOptions.length === 0}>
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
        </div>
      </CardContent>
    </Card>
  )
}

