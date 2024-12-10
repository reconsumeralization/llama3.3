"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'

const deploymentSteps = [
  'Select Model',
  'Configure Deployment',
  'Review & Deploy'
]

export function ModelDeploymentWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedModel, setSelectedModel] = useState('')
  const [deploymentName, setDeploymentName] = useState('')
  const [deploymentType, setDeploymentType] = useState('')
  const [autoScaling, setAutoScaling] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)

  const handleNext = () => {
    if (currentStep < deploymentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsDeploying(false)
    // Here you would typically call an API to start the deployment process
    console.log('Deploying model:', { selectedModel, deploymentName, deploymentType, autoScaling })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Model Deployment Wizard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between mb-4">
            {deploymentSteps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {index + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>

          {currentStep === 0 && (
            <div className="space-y-4">
              <Label htmlFor="model-select">Select a model to deploy</Label>
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
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="deployment-name">Deployment Name</Label>
                <Input
                  id="deployment-name"
                  value={deploymentName}
                  onChange={(e) => setDeploymentName(e.target.value)}
                  placeholder="Enter deployment name"
                />
              </div>
              <div>
                <Label htmlFor="deployment-type">Deployment Type</Label>
                <Select onValueChange={setDeploymentType} value={deploymentType}>
                  <SelectTrigger id="deployment-type">
                    <SelectValue placeholder="Choose deployment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="serverless">Serverless</SelectItem>
                    <SelectItem value="dedicated">Dedicated Instances</SelectItem>
                    <SelectItem value="edge">Edge Deployment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-scaling"
                  checked={autoScaling}
                  onCheckedChange={(checked) => setAutoScaling(checked as boolean)}
                />
                <Label htmlFor="auto-scaling">Enable Auto-scaling</Label>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Deployment Configuration</h3>
              <p><strong>Model:</strong> {selectedModel}</p>
              <p><strong>Deployment Name:</strong> {deploymentName}</p>
              <p><strong>Deployment Type:</strong> {deploymentType}</p>
              <p><strong>Auto-scaling:</strong> {autoScaling ? 'Enabled' : 'Disabled'}</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
            )}
            {currentStep < deploymentSteps.length - 1 ? (
              <Button onClick={handleNext} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button onClick={handleDeploy} disabled={isDeploying} className="ml-auto">
                {isDeploying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  'Deploy Model'
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

