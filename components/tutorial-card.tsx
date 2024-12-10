import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlock {
  language: string
  code: string
}

interface TutorialStep {
  title: string
  content: React.ReactNode
  codeBlocks?: CodeBlock[]
}

interface TutorialCardProps {
  title: string
  steps: TutorialStep[]
}

export function TutorialCard({ title, steps }: TutorialCardProps) {
  const [currentStep, setCurrentStep] = React.useState(0)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{steps[currentStep].title}</h3>
          <div className="mt-2">{steps[currentStep].content}</div>
        </div>
        {steps[currentStep].codeBlocks && (
          <Tabs defaultValue="code-0" className="mt-4">
            <TabsList>
              {steps[currentStep].codeBlocks.map((_, index) => (
                <TabsTrigger key={index} value={`code-${index}`}>
                  Code Block {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {steps[currentStep].codeBlocks.map((codeBlock, index) => (
              <TabsContent key={index} value={`code-${index}`}>
                <SyntaxHighlighter language={codeBlock.language} style={tomorrow}>
                  {codeBlock.code}
                </SyntaxHighlighter>
              </TabsContent>
            ))}
          </Tabs>
        )}
        <div className="flex justify-between mt-6">
          <Button onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

