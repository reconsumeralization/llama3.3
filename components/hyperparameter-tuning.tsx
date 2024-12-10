"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Play } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface HyperparameterRange {
  min: number
  max: number
  step: number
}

interface HyperparameterConfig {
  learningRate: HyperparameterRange
  batchSize: HyperparameterRange
  epochs: HyperparameterRange
  dropoutRate: HyperparameterRange
}

const defaultConfig: HyperparameterConfig = {
  learningRate: { min: 0.0001, max: 0.1, step: 0.0001 },
  batchSize: { min: 8, max: 128, step: 8 },
  epochs: { min: 1, max: 50, step: 1 },
  dropoutRate: { min: 0, max: 0.5, step: 0.05 },
}

export function HyperparameterTuning() {
  const [config, setConfig] = useState(defaultConfig)
  const [isTuning, setIsTuning] = useState(false)
  const [tuningResults, setTuningResults] = useState<any[]>([])
  const { toast } = useToast()

  const handleConfigChange = (param: keyof HyperparameterConfig, field: keyof HyperparameterRange, value: number) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      [param]: {
        ...prevConfig[param],
        [field]: value,
      },
    }))
  }

  const handleTune = async () => {
    setIsTuning(true)
    setTuningResults([])
    try {
      // Simulating hyperparameter tuning process
      for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const newResult = {
          iteration: i + 1,
          learningRate: Math.random() * (config.learningRate.max - config.learningRate.min) + config.learningRate.min,
          batchSize: Math.floor(Math.random() * (config.batchSize.max - config.batchSize.min) / config.batchSize.step) * config.batchSize.step + config.batchSize.min,
          epochs: Math.floor(Math.random() * (config.epochs.max - config.epochs.min)) + config.epochs.min,
          dropoutRate: Math.random() * (config.dropoutRate.max - config.dropoutRate.min) + config.dropoutRate.min,
          accuracy: Math.random() * 0.3 + 0.7,
        }
        setTuningResults(prev => [...prev, newResult])
      }
      toast({
        title: "Hyperparameter tuning complete",
        description: "The best hyperparameters have been found and applied to your model.",
      })
    } catch (error) {
      toast({
        title: "Error during hyperparameter tuning",
        description: "An error occurred while tuning hyperparameters. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTuning(false)
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-muted">
        <CardTitle>Hyperparameter Tuning</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Tabs defaultValue="config">
          <TabsList>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          <TabsContent value="config" className="space-y-6">
            {Object.entries(config).map(([param, range]) => (
              <div key={param} className="space-y-2">
                <Label htmlFor={param}>{param.charAt(0).toUpperCase() + param.slice(1)}</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id={`${param}-min`}
                    type="number"
                    value={range.min}
                    onChange={(e) => handleConfigChange(param as keyof HyperparameterConfig, 'min', parseFloat(e.target.value))}
                    className="w-20"
                  />
                  <Slider
                    min={range.min}
                    max={range.max}
                    step={range.step}
                    value={[range.min, range.max]}
                    onValueChange={([min, max]) => {
                      handleConfigChange(param as keyof HyperparameterConfig, 'min', min)
                      handleConfigChange(param as keyof HyperparameterConfig, 'max', max)
                    }}
                    className="flex-1"
                  />
                  <Input
                    id={`${param}-max`}
                    type="number"
                    value={range.max}
                    onChange={(e) => handleConfigChange(param as keyof HyperparameterConfig, 'max', parseFloat(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
            ))}
            <Button onClick={handleTune} disabled={isTuning} className="w-full">
              {isTuning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Tuning...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Hyperparameter Tuning
                </>
              )}
            </Button>
          </TabsContent>
          <TabsContent value="results">
            {tuningResults.length > 0 ? (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={tuningResults}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="iteration" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Iteration</th>
                        <th>Learning Rate</th>
                        <th>Batch Size</th>
                        <th>Epochs</th>
                        <th>Dropout Rate</th>
                        <th>Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tuningResults.map((result, index) => (
                        <tr key={index}>
                          <td>{result.iteration}</td>
                          <td>{result.learningRate.toFixed(4)}</td>
                          <td>{result.batchSize}</td>
                          <td>{result.epochs}</td>
                          <td>{result.dropoutRate.toFixed(2)}</td>
                          <td>{(result.accuracy * 100).toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p>No tuning results available. Start hyperparameter tuning to see results.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

