import { useState, useEffect } from 'react'

interface NetworkStatus {
  online: boolean
  downlink: number | null
  downlinkMax: number | null
  effectiveType: string | null
  rtt: number | null
  saveData: boolean | null
  type: string | null
}

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    online: navigator.onLine,
    downlink: null,
    downlinkMax: null,
    effectiveType: null,
    rtt: null,
    saveData: null,
    type: null,
  })

  useEffect(() => {
    const updateStatus = () => {
      if ('connection' in navigator && navigator['connection']) {
        const connection = navigator['connection']
        setStatus({
          online: navigator.onLine,
          downlink: connection.downlink,
          downlinkMax: connection.downlinkMax,
          effectiveType: connection.effectiveType,
          rtt: connection.rtt,
          saveData: connection.saveData,
          type: connection.type,
        })
      } else {
        setStatus(prevStatus => ({
          ...prevStatus,
          online: navigator.onLine,
        }))
      }
    }

    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
    if ('connection' in navigator && navigator['connection']) {
      navigator['connection'].addEventListener('change', updateStatus)
    }

    updateStatus()

    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
      if ('connection' in navigator && navigator['connection']) {
        navigator['connection'].removeEventListener('change', updateStatus)
      }
    }
  }, [])

  return status
}

