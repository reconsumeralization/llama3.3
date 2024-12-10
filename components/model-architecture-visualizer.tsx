"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tree, TreeNode } from 'react-organizational-chart'
import { motion } from 'framer-motion'

interface LayerInfo {
  name: string
  type: string
  children?: LayerInfo[]
}

const mockArchitectures: Record<string, LayerInfo> = {
  'model1': {
    name: 'LLaMA Model',
    type: 'root',
    children: [
      {
        name: 'Embedding Layer',
        type: 'embedding',
      },
      {
        name: 'Transformer Blocks',
        type: 'container',
        children: [
          { name: 'Self-Attention', type: 'attention' },
          { name: 'Feed Forward', type: 'feedforward' },
        ],
      },
      {
        name: 'Output Layer',
        type: 'output',
      },
    ],
  },
  'model2': {
    name: 'GPT Model',
    type: 'root',
    children: [
      {
        name: 'Input Embedding',
        type: 'embedding',
      },
      {
        name: 'Transformer Layers',
        type: 'container',
        children: [
          { name: 'Multi-Head Attention', type: 'attention' },
          { name: 'Position-wise FFN', type: 'feedforward' },
        ],
      },
      {
        name: 'Language Model Head',
        type: 'output',
      },
    ],
  },
}

const NodeContent = ({ node }: { node: LayerInfo }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="p-2 rounded-lg shadow-md bg-card text-card-foreground"
  >
    <h4 className="font-semibold">{node.name}</h4>
    <p className="text-sm text-muted-foreground">{node.type}</p>
  </motion.div>
)

const renderTree = (node: LayerInfo) => (
  <TreeNode label={<NodeContent node={node} />}>
    {node.children?.map((child, index) => (
      <TreeNode key={index} label={<NodeContent node={child} />}>
        {child.children && renderTree(child)}
      </TreeNode>
    ))}
  </TreeNode>
)

export function ModelArchitectureVisualizer() {
  const [selectedModel, setSelectedModel] = useState<string>('')

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-x-auto">
      <CardHeader>
        <CardTitle>Model Architecture Visualizer</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setSelectedModel} value={selectedModel}>
          <SelectTrigger>
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="model1">LLaMA Model</SelectItem>
            <SelectItem value="model2">GPT Model</SelectItem>
          </SelectContent>
        </Select>

        {selectedModel && (
          <div className="mt-6 p-4 overflow-x-auto">
            <Tree
              lineWidth="2px"
              lineColor="#718096"
              lineBorderRadius="10px"
              label={<NodeContent node={mockArchitectures[selectedModel]} />}
            >
              {mockArchitectures[selectedModel].children?.map((child, index) => (
                <TreeNode key={index} label={<NodeContent node={child} />}>
                  {child.children && renderTree(child)}
                </TreeNode>
              ))}
            </Tree>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

