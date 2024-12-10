import { useState, useEffect, useRef } from 'react'

interface UseIntersectionObserverProps {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  onIntersect?: () => void
}

export function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
}: UseIntersectionObserverProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<Element | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && onIntersect) {
          onIntersect()
        }
      },
      { root, rootMargin, threshold }
    )

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [root, rootMargin, threshold, onIntersect])

  return [targetRef, isIntersecting] as const
}

