import { LRUCache } from 'lru-cache'

const options = {
  max: 500,
  maxSize: 5000,
  sizeCalculation: (value: string, key: string) => {
    return value.length + key.length
  },
  ttl: 1000 * 60 * 5, // 5 minutes
}

const cache = new LRUCache<string, string>(options)

export function cacheData(key: string, data: string): void {
  cache.set(key, data)
}

export function getCachedData(key: string): string | undefined {
  return cache.get(key)
}

export function clearCache(): void {
  cache.clear()
}

