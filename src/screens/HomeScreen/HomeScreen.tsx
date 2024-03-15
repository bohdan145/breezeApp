import React, { useState } from 'react'
import { HomeScreenProps } from '@app/navigation/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Platform, RefreshControl, ScrollView, View } from 'react-native'
import { encodeGetParams, rem } from '@app/utils'
import { useCurrentLocation } from '@app/hooks'
import { weatherAPI } from '@app/api'
import useSWR from 'swr'

import WeatherDetails from '@app/components/WeatherDetails'
import SearchInput from '@app/components/SearchInput'
import { useTheme } from '@react-navigation/native'
import KeyboardSpacer from '@app/components/KeyboardSpacer'
import WeatherUnitToggle, { TUnit } from '@app/components/WeatherUnitToggle'
import Animated, { FadeInUp } from 'react-native-reanimated'

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { colors } = useTheme()
  const location = useCurrentLocation()
  const [fetching, setFetching] = useState(false)
  const [units, setUnits] = useState<TUnit>('metric')

  const { latitude, longitude } = location?.coords || {}

  const { data, isLoading, mutate } = useSWR(
    location?.coords ? `/weather?${encodeGetParams({ lat: latitude, lon: longitude, units })}` : null,
    weatherAPI.getCurrentWeatherForLocation,
  )

  const onRefresh = async () => {
    try {
      setFetching(true)
      await mutate()
      setFetching(false)
    } catch (e) {
      setFetching(false)
    }
  }

  const isReady = !!location?.coords && !isLoading

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          stickyHeaderIndices={[0]}
          refreshControl={<RefreshControl tintColor={colors.text} refreshing={fetching} onRefresh={onRefresh} />}
          keyboardShouldPersistTaps='handled'
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: rem(100) }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            entering={FadeInUp.delay(400)}
            style={{ padding: rem(15), backgroundColor: colors.background }}
          >
            <SearchInput />
          </Animated.View>
          <WeatherDetails units={units} ready={isReady} data={data} />
        </ScrollView>
        <WeatherUnitToggle units={units} onToggle={setUnits} />
      </View>
      {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-30} />}
    </SafeAreaView>
  )
}

export default HomeScreen
