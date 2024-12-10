import { useEffect } from 'react'

export function useAsyncEffect(
  effect: () => Promise<void | (() => void)>,
  deps?: React.DependencyList
) {
  useEffect(() => {
    const cleanupPromise = effect()
    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup())
    }
  }, deps)
}

