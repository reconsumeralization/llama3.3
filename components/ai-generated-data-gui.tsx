"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Loader2, Upload } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckpointingProgress } from "@/components/checkpointing-progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GeneratedData {
  input: string
  output: string
  metadata?: Record<string, any>
}

const dataTypes = [
  { id: "qa", name: "Question-Answer Pairs" },
  { id: "sentiment", name: "Sentiment Analysis" },
  { id: "summary", name: "Text Summarization" },
  { id: "translation", name: "Translation Pairs" },
  { id: "classification", name: "Text Classification" },
  { id: "ner", name: "Named Entity Recognition" },
  { id: "paraphrase", name: "Paraphrasing" },
  { id: "dialogue", name: "Dialogue Generation" },
  { id: "code", name: "Code Generation" },
  { id: "vision", name: "Vision-Language Tasks" },
]

const modelVersions = [
  { id: "llama2", name: "Llama 2" },
  { id: "llama32", name: "Llama 3.2" },
  { id: "llama32vision", name: "Llama 3.2 Vision" },
]

export function AIGeneratedDataGUI() {
  const [dataType, setDataType] = useState<string>("")
  const [modelVersion, setModelVersion] = useState<string>("llama32")
  const [prompt, setPrompt] = useState<string>("")
  const [numSamples, setNumSamples] = useState<number>(100)
  const [temperature, setTemperature] = useState<number>(0.7)
  const [topP, setTopP] = useState<number>(0.9)
  const [maxTokens, setMaxTokens] = useState<number>(100)
  const [includeMetadata, setIncludeMetadata] = useState<boolean>(false)
  const [useFlashAttention, setUseFlashAttention] = useState<boolean>(true)
  const [usePEFT, setUsePEFT] = useState<boolean>(false)
  const [useDatasetPacking, setUseDatasetPacking] = useState<boolean>(true)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedData, setGeneratedData] = useState<GeneratedData[]>([])
  const [checkpointInterval, setCheckpointInterval] = useState<number>(100)
  const [resumeFromCheckpoint, setResumeFromCheckpoint] = useState<boolean>(false)
  const [checkpointId, setCheckpointId] = useState<string>("")
  const [imagePrompt, setImagePrompt] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleGenerateData = async () => {
    if (!dataType || !prompt) {
      setError("Please select a data type and provide a prompt.")
      return
    }

    setIsGenerating(true)
    setError(null)
    setGeneratedData([])

    try {
      // Simulate data generation process with checkpointing
      for (let i = 0; i < numSamples; i += checkpointInterval) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock generated data for this checkpoint
        const mockData: GeneratedData[] = Array.from({ length: checkpointInterval }, (_, j) => ({
          input: `Sample input ${i + j + 1} for ${dataType}`,
          output: `Sample output ${i + j + 1} for ${dataType}`,
          metadata: includeMetadata ? {
            timestamp: new Date().toISOString(),
            model: modelVersion,
            temperature: temperature,
            topP: topP,
            maxTokens: maxTokens,
          } : undefined
        }))

        setGeneratedData(prev => [...prev, ...mockData])

        // Simulate checkpoint creation
        const newCheckpointId = `checkpoint-${Date.now()}`
        console.log(`Created checkpoint: ${newCheckpointId}`)
        setCheckpointId(newCheckpointId)
      }

      console.log('Completed AI training data generation:', {
        dataType,
        modelVersion,
        prompt,
        numSamples,
        temperature,
        topP,
        maxTokens,
        includeMetadata,
        useFlashAttention,
        usePEFT,
        useDatasetPacking,
        checkpointInterval,
      })
      // Here you would typically call an API to generate the training data
    } catch (error) {
      console.error('Data generation error:', error)
      setError("An error occurred during the data generation process. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Generate AI Training Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="model-version">Model Version</Label>
          <Select onValueChange={setModelVersion} value={modelVersion}>
            <SelectTrigger id="model-version">
              <SelectValue placeholder="Choose a model version" />
            </SelectTrigger>
            <SelectContent>
              {modelVersions.map((version) => (
                <SelectItem key={version.id} value={version.id}>{version.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="data-type">Data Type</Label>
          <Select onValueChange={setDataType} value={dataType}>
            <SelectTrigger id="data-type">
              <SelectValue placeholder="Choose a data type" />
            </SelectTrigger>
            <SelectContent>
              {dataTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="text" className="w-full">
          <TabsList>
            <TabsTrigger value="text">Text Prompt</TabsTrigger>
            <TabsTrigger value="image" disabled={modelVersion !== "llama32vision"}>Image Prompt</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <div className="space-y-2">
              <Label htmlFor="prompt">Generation Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt to guide the data generation"
                rows={4}
              />
            </div>
          </TabsContent>
          <TabsContent value="image">
            <div className="space-y-2">
              <Label htmlFor="image-prompt">Image Prompt</Label>
              <Textarea
                id="image-prompt"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Describe the image you want to generate data for"
                rows={4}
              />
              <div className="mt-2">
                <Label htmlFor="image-upload">Or upload an image</Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <Label htmlFor="num-samples">Number of Samples: {numSamples}</Label>
          <Slider
            id="num-samples"
            min={1}
            max={1000}
            step={1}
            value={[numSamples]}
            onValueChange={(value) => setNumSamples(value[0])}
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
          <Label htmlFor="max-tokens">Max Tokens: {maxTokens}</Label>
          <Slider
            id="max-tokens"
            min={1}
            max={2048}
            step={1}
            value={[maxTokens]}
            onValueChange={(value) => setMaxTokens(value[0])}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkpoint-interval">Checkpoint Interval: {checkpointInterval}</Label>
          <Slider
            id="checkpoint-interval"
            min={10}
            max={1000}
            step={10}
            value={[checkpointInterval]}
            onValueChange={(value) => setCheckpointInterval(value[0])}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="include-metadata"
              checked={includeMetadata}
              onCheckedChange={setIncludeMetadata}
            />
            <Label htmlFor="include-metadata">Include Metadata</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="use-flash-attention"
              checked={useFlashAttention}
              onCheckedChange={setUseFlashAttention}
            />
            <Label htmlFor="use-flash-attention">Use Flash Attention</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="use-peft"
              checked={usePEFT}
              onCheckedChange={setUsePEFT}
            />
            <Label htmlFor="use-peft">Use PEFT (Parameter-Efficient Fine-Tuning)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="use-dataset-packing"
              checked={useDatasetPacking}
              onCheckedChange={setUseDatasetPacking}
            />
            <Label htmlFor="use-dataset-packing">Use Dataset Packing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="resume-from-checkpoint"
              checked={resumeFromCheckpoint}
              onCheckedChange={setResumeFromCheckpoint}
            />
            <Label htmlFor="resume-from-checkpoint">Resume from Checkpoint</Label>
          </div>
        </div>

        {resumeFromCheckpoint && (
          <div className="space-y-2">
            <Label htmlFor="checkpoint-id">Checkpoint ID</Label>
            <Input
              id="checkpoint-id"
              value={checkpointId}
              onChange={(e) => setCheckpointId(e.target.value)}
              placeholder="Enter checkpoint ID"
            />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleGenerateData} 
          disabled={isGenerating || !dataType || !prompt}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Data...
            </>
          ) : (
            "Generate Training Data"
          )}
        </Button>

        {isGenerating && (
          <CheckpointingProgress
            currentSamples={generatedData.length}
            totalSamples={numSamples}
            checkpointInterval={checkpointInterval}
            lastCheckpointId={checkpointId}
          />
        )}

        {generatedData.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Generated Data Preview</h3>
            <div className="max-h-96 overflow-y-auto border rounded-md p-4">
              {generatedData.slice(0, 10).map((item, index) => (
                <div key={index} className="mb-4 p-2 border-b last:border-b-0">
                  <p><strong>Input:</strong> {item.input}</p>
                  <p><strong>Output:</strong> {item.output}</p>
                  {item.metadata && (
                    <details>
                      <summary>Metadata</summary>
                      <pre>{JSON.stringify(item.metadata, null, 2)}</pre>
                    </details>
                  )}
                </div>
              ))}
              {generatedData.length > 10 && (
                <p className="text-center text-muted-foreground">
                  Showing 10 of {generatedData.length} generated samples...
                </p>
              )}
            </div>
            <Button onClick={() => console.log("Export data", generatedData)}>
              <Upload className="mr-2 h-4 w-4" />
              Export Generated Data
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

