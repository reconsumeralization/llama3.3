import { useState, useEffect, useRef } from 'react'

export function useOnScreen<T extends Element>(
  rootMargin: string = '0px'
): [React.RefObject<T>, boolean] {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [rootMargin])

  return [ref, isIntersecting]
}

