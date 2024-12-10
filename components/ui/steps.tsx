import React from 'react'

interface StepProps {
  title: string
  children: React.ReactNode
}

const Step: React.FC<StepProps> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="pl-4 border-l-2 border-gray-200">{children}</div>
  </div>
)

interface StepsProps {
  children: React.ReactNode
}

const Steps: React.FC<StepsProps> & { Step: typeof Step } = ({ children }) => (
  <div className="space-y-4">{children}</div>
)

Steps.Step = Step

export { Steps }

