import { useState } from 'react'

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    } else {
      console.error('Clipboard API not supported')
    }
  }

  return { isCopied, copyToClipboard }
}

