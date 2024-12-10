import { HyperparameterTuning } from "@/components/hyperparameter-tuning"
import { Breadcrumb } from "@/components/breadcrumb"

export default function HyperparameterTuningPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ href: "/hyperparameter-tuning", label: "Hyperparameter Tuning" }]} />
      <h1 className="text-3xl font-bold tracking-tight">Hyperparameter Tuning</h1>
      <HyperparameterTuning />
    </div>
  )
}

