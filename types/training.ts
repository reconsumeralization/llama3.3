export interface TrainingTurn {
  user_prompt: string
  generated_code: Record<string, string>
  files: Record<string, FileData>
}

export interface FileData {
  content: string
  styling?: string[]
  props?: string[]
}

export interface BoltMetadata {
  framework: "nextjs"
  style_system: string
  builder: string
}

export interface TrainingExample {
  conversation: TrainingTurn[]
  bolt_metadata: BoltMetadata
}

