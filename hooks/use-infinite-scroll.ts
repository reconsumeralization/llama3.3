import { useState, useEffect, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  initialPage?: number
}

export function useInfiniteScroll(
  loadMore: (page: number) => Promise<void>,
  { threshold = 100, initialPage = 1 }: UseInfiniteScrollOptions = {}
) {
  const [page, setPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight - threshold) return
    if (loading) return

    setLoading(true)
    loadMore(page).then(() => {
      setLoading(false)
      setPage(prevPage => prevPage + 1)
    })
  }, [loadMore, page, loading, threshold])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { page, loading }
}

