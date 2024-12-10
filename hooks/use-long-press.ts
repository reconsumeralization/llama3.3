import { useCallback, useRef, useState } from 'react'

interface UseLongPressOptions {
  isPreventDefault?: boolean
  delay?: number
}

export function useLongPress(
  onLongPress: (e: React.MouseEvent | React.TouchEvent) => void,
  onClick: (e: React.MouseEvent | React.TouchEvent) => void,
  { isPreventDefault = true, delay = 300 }: UseLongPressOptions = {}
) {
  const [longPressTriggered, setLongPressTriggered] = useState(false)
  const timeout = useRef<NodeJS.Timeout>()
  const target = useRef<EventTarget>()

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (isPreventDefault && e.target) {
        e.target.addEventListener('touchend', preventDefault, { passive: false })
        target.current = e.target
      }
      timeout.current = setTimeout(() => {
        onLongPress(e)
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, delay, isPreventDefault]
  )

  const clear = useCallback(
    (e: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current)
      shouldTriggerClick && !longPressTriggered && onClick(e)
      setLongPressTriggered(false)
      if (isPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault)
      }
    },
    [shouldTriggerClick, onClick, longPressTriggered, isPreventDefault]
  )

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
  }
}

const isTouchEvent = (event: Event): event is TouchEvent => {
  return 'touches' in event
}

const preventDefault = (event: Event) => {
  if (!isTouchEvent(event)) return

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault()
  }
}

