"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface AugmentationOption {
  id: string
  label: string
}

const augmentationOptions: AugmentationOption[] = [
  { id: 'synonym', label: 'Synonym Replacement' },
  { id: 'backtranslation', label: 'Back Translation' },
  { id: 'insertion', label: 'Random Insertion' },
  { id: 'deletion', label: 'Random Deletion' },
]

// Mock augmentation function (replace with actual augmentation in production)
const mockAugment = (text: string, options: string[]): string[] => {
  const augmented = []
  if (options.includes('synonym')) {
    augmented.push(text.replace(/\b\w+\b/g, word => Math.random() > 0.7 ? `[SYN:${word}]` : word))
  }
  if (options.includes('backtranslation')) {
    augmented.push(`[BT:${text}]`)
  }
  if (options.includes('insertion')) {
    augmented.push(text.replace(/\s+/g, ' ').split(' ').map(word => Math.random() > 0.8 ? `${word} [INS:word]` : word).join(' '))
  }
  if (options.includes('deletion')) {
    augmented.push(text.split(' ').filter(() => Math.random() > 0.1).join(' '))
  }
  return augmented
}

export function DataAugmentationPreview() {
  const [inputText, setInputText] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [augmentedTexts, setAugmentedTexts] = useState<string[]>([])

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleAugment = () => {
    setAugmentedTexts(mockAugment(inputText, selectedOptions))
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Data Augmentation Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Enter text to augment"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex flex-wrap gap-4">
            {augmentationOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={() => handleOptionToggle(option.id)}
                />
                <label htmlFor={option.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <Button onClick={handleAugment}>Generate Augmented Data</Button>
          <div className="space-y-2">
            {augmentedTexts.map((text, index) => (
              <div key={index} className="border rounded p-2 bg-muted">
                {text}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

