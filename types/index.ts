export interface TrainingData {
  text: string
  label?: string
}

export interface ModelConfig {
  learningRate: number
  batchSize: number
  epochs: number
  warmupSteps: number
  useAMP: boolean
  useMixedPrecision: boolean
}

export interface FineTuningJob {
  id: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  progress: number
  modelConfig: ModelConfig
  createdAt: Date
  updatedAt: Date
}

export interface EvaluationResult {
  accuracy: number
  perplexity: number
  f1Score: number
}

export interface TrainingPair {
  input: string
  output: string
}

