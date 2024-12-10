import { useState, useEffect } from 'react'

export function useIdle(timeout: number) {
  const [isIdle, setIsIdle] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    function handleActivity() {
      setIsIdle(false)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsIdle(true), timeout)
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => document.addEventListener(event, handleActivity))

    handleActivity()

    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity))
      clearTimeout(timeoutId)
    }
  }, [timeout])

  return isIdle
}

