import { useState, useEffect } from 'react'

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
  })

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setState(s => ({ ...s, error: 'Geolocation is not supported' }))
      return
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      })
    }

    const onError = (error: GeolocationPositionError) => {
      setState(s => ({ ...s, error: error.message }))
    }

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError)

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return state
}

