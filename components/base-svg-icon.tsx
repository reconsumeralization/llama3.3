import React from 'react'

interface BaseSvgIconProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode
}

export const BaseSvgIcon: React.FC<BaseSvgIconProps> = ({ children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
)

