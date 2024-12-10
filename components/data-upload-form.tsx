"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cacheData, getCachedData } from "@/lib/cache"
import { Upload, FileText } from 'lucide-react'

export function DataUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const validateDataset = (data: string): { isValid: boolean; error?: string } => {
    if (data.trim() === "") {
      return { isValid: false, error: "Dataset cannot be empty" }
    }
    try {
      JSON.parse(data)
      return { isValid: true }
    } catch {
      return { isValid: false, error: "Invalid JSON format" }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setUploadProgress(0)

    try {
      let data: string
      if (file) {
        const cachedData = getCachedData(file.name)
        if (cachedData) {
          data = cachedData
        } else {
          data = await file.text()
          cacheData(file.name, data)
        }
      } else if (text) {
        data = text
      } else {
        throw new Error("No data provided")
      }

      const validationResult = validateDataset(data)
      if (!validationResult.isValid) {
        throw new Error(`Invalid dataset: ${validationResult.error}`)
      }

      // Simulating file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      toast({
        title: "Data uploaded successfully",
        description: "Your training data has been validated and uploaded.",
      })
    } catch (error) {
      toast({
        title: "Error uploading data",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Training Data</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Upload Dataset File</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={isLoading}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("file")?.click()}
                disabled={isLoading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              {file && (
                <span className="text-sm text-gray-500">
                  {file.name}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Or Paste Text Data</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your training data here..."
              className="h-32"
              disabled={isLoading}
            />
          </div>
          {isLoading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-center">{uploadProgress}% uploaded</p>
            </div>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <FileText className="w-4 h-4 mr-2 animate-pulse" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Data
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

