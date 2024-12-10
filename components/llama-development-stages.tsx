import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataPreparationIcon } from './data-preparation-icon'
import { ModelTrainingIcon } from './model-training-icon'
import { FineTuningIcon } from './fine-tuning-icon'
import { EvaluationIcon } from './evaluation-icon'
import { DeploymentIcon } from './deployment-icon'

const stages = [
  { name: 'Data Preparation', Icon: DataPreparationIcon },
  { name: 'Model Training', Icon: ModelTrainingIcon },
  { name: 'Fine-Tuning', Icon: FineTuningIcon },
  { name: 'Evaluation', Icon: EvaluationIcon },
  { name: 'Deployment', Icon: DeploymentIcon },
]

export const LLaMADevelopmentStages: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>LLaMA Development Stages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-8">
          {stages.map(({ name, Icon }) => (
            <div key={name} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

