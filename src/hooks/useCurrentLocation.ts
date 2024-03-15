import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { InteractionManager } from 'react-native'

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>()

  useEffect(() => {
    async function getLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
      setLocation(location)
    }

    InteractionManager.runAfterInteractions(getLocation)
  }, [])

  return location
}

export default useCurrentLocation
