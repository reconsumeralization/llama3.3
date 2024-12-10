import { DataUploadForm } from "@/components/data-upload-form"
import { DatasetManager } from "@/components/dataset-manager"
import { TrainingDataBuilder } from "@/components/training-data-builder"
import { Breadcrumb } from "@/components/breadcrumb"

export default function DataPreparation() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ href: "/data-preparation", label: "Data Preparation" }]} />
      <h1 className="text-3xl font-bold tracking-tight">Data Preparation</h1>
      <DatasetManager />
      <div className="grid gap-6 md:grid-cols-2">
        <DataUploadForm />
        <TrainingDataBuilder />
      </div>
    </div>
  )
}

