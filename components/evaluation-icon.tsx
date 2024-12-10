import React from 'react'
import { BaseSvgIcon } from './base-svg-icon'

export const EvaluationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <BaseSvgIcon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </BaseSvgIcon>
)
