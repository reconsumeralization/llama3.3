import { TrainingJobList } from "@/components/training-job-list"
import { NewTrainingJob } from "@/components/new-training-job"
import { TrainingProgress } from "@/components/training-progress"
import { ModelPerformanceVisualization } from "@/components/model-performance-visualization"

export default function Training() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Training</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <NewTrainingJob />
        <TrainingProgress />
      </div>
      <ModelPerformanceVisualization />
      <TrainingJobList />
    </div>
  )
}

