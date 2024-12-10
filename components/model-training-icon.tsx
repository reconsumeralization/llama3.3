import React from 'react'
import { BaseSvgIcon } from './base-svg-icon'

export const ModelTrainingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <BaseSvgIcon {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </BaseSvgIcon>
)

