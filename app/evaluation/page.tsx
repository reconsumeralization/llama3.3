import { ModelEvaluationForm } from "@/components/model-evaluation-form"
import { EvaluationResults } from "@/components/evaluation-results"

export default function Evaluation() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Model Evaluation</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <ModelEvaluationForm />
        <EvaluationResults />
      </div>
    </div>
  )
}

