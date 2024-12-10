"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Download, Loader2 } from 'lucide-react'

export function ModelExport() {
  const [selectedModel, setSelectedModel] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    if (!selectedModel) {
      toast({
        title: "No model selected",
        description: "Please select a model to export.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)
    try {
      // Simulating export process
      await new Promise(resolve => setTimeout(resolve, 3000))

      // In a real application, you would generate a download link here
      const downloadUrl = `https://api.example.com/models/${selectedModel}/download`

      // Trigger download
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `${selectedModel}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Model exported successfully",
        description: "Your model has been exported and is ready for download.",
      })
    } catch (error) {
      toast({
        title: "Error exporting model",
        description: "An error occurred while exporting the model. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Fine-Tuned Model</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={setSelectedModel}>
          <SelectTrigger>
            <SelectValue placeholder="Select a model to export" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="model1">Model 1</SelectItem>
            <SelectItem value="model2">Model 2</SelectItem>
            <SelectItem value="model3">Model 3</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleExport} disabled={isExporting || !selectedModel}>
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Model
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

