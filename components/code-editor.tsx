import React from 'react'
import { Textarea } from "@/components/ui/textarea"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export default function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-md min-h-[200px]"
      placeholder={`Enter ${language} code here...`}
    />
  )
}

