import React, { useEffect, useState } from 'react'
import { WeatherScreenProps } from '@app/navigation/types'
import { InteractionManager, RefreshControl, ScrollView, View } from 'react-native'
import { weatherAPI } from '@app/api'
import useSWR from 'swr'

import WeatherDetails from '@app/components/WeatherDetails'
import { useTheme } from '@react-navigation/native'
import WeatherUnitToggle, { TUnit } from '@app/components/WeatherUnitToggle'
import { rem } from '@app/utils'

const WeatherScreen: React.FC<WeatherScreenProps> = ({ route }) => {
  const { colors } = useTheme()
  const [initialized, setInitialized] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [units, setUnits] = useState<TUnit>('metric')
  const { cityName } = route.params

  const { data, isLoading, mutate } = useSWR(
    cityName.length ? `/weather?q=${cityName}&units=${units}` : null,
    weatherAPI.getCurrentWeatherForLocation,
  )

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => setInitialized(true))
  }, [])

  const onRefresh = async () => {
    try {
      setFetching(true)
      await mutate()
      setFetching(false)
    } catch (e) {
      setFetching(false)
    }
  }

  const isReady = !isLoading

  if (!initialized) return null

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={<RefreshControl tintColor={colors.text} refreshing={fetching} onRefresh={onRefresh} />}
          keyboardShouldPersistTaps='handled'
          scrollEventThrottle={16}
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: rem(100) }}
          showsVerticalScrollIndicator={false}
        >
          <WeatherDetails units={units} ready={isReady} data={data} />
        </ScrollView>
        <WeatherUnitToggle units={units} onToggle={setUnits} />
      </View>
    </>
  )
}

export default WeatherScreen
