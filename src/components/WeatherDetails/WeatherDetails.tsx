import { rem } from '@app/utils'
import React, { memo } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { IWeatherData } from '@app/api/types'
import { useTheme } from '@react-navigation/native'
import { weatherConditions } from '@app/constants'
import Stagger from '../Stagger'
import { TUnit } from '../WeatherUnitToggle'
import { styles } from './styles'
import Button from '../Button'

interface Props {
  ready: boolean
  data: IWeatherData | undefined
  units: TUnit
}

const WeatherDetails: React.FC<Props> = ({ ready = false, units = 'metric', data }) => {
  const { colors } = useTheme()

  const activeMetric = units === 'metric'
  const unitSymbol = activeMetric ? 'C' : 'F'
  const windSpeed = activeMetric ? 'm/sec' : 'mi/hour'

  if (!ready) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.text} />
      </View>
    )
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <MaterialIcons name='error-outline' size={rem(44)} color={colors.text} style={{ opacity: 0.5 }} />
        <Text style={styles.errorTxt}>No data for specified location</Text>
      </View>
    )
  }

  const weatherType = data.weather[0]?.main || 'Clear'
  const weatherDesc = data.weather[0]?.description || ''

  return (
    <View style={styles.wrapper}>
      <Stagger duration={500}>
        <Text style={[styles.secondaryTxt, { color: colors.text }]}>Current location</Text>
        <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.largeTxt, { color: colors.text }]}>
          {data.name}
        </Text>
        <Text style={[styles.secondaryTxt, { color: colors.text }]}>
          Chanse of rain: {`${(data.rain?.['1h'] || 0) * 100}%`}
        </Text>
        <View style={styles.weatherIcon}>
          <View style={{ height: rem(122) }}>
            <MaterialCommunityIcons size={rem(122)} name={weatherConditions[weatherType].icon} color={colors.text} />
          </View>
          <Text style={[styles.secondaryTxt, { color: colors.text }]}>{weatherDesc}</Text>
        </View>
        <Text style={[styles.largeTxt, { color: colors.text }]}>
          {data.main.temp.toFixed(1)}°{unitSymbol}
        </Text>
        <Text style={[styles.secondaryTxt, { color: colors.text }]}>
          Feels like: {data.main.feels_like.toFixed(1)}°{unitSymbol}
        </Text>
        <View style={styles.boxContainer}>
          <Button style={styles.box}>
            <Text style={styles.boxDesc}>{'Humidity'.toUpperCase()}</Text>
            <Text style={styles.boxTitle}>{data.main.humidity}%</Text>
          </Button>
          <Button style={styles.box}>
            <Text style={styles.boxDesc}>{'pressure'.toUpperCase()}</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.boxTitle}>
              {data.main.pressure} hPa
            </Text>
          </Button>
          <Button style={styles.box}>
            <Text style={styles.boxDesc}>{'Wind'.toUpperCase()}</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.boxTitle}>
              {data.wind.speed} {windSpeed}
            </Text>
          </Button>
          <Button style={styles.box}>
            <Text style={styles.boxDesc}>{'Visibility'.toUpperCase()}</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.boxTitle}>
              {data.visibility / 1000} km
            </Text>
          </Button>
        </View>
      </Stagger>
    </View>
  )
}

export default memo(WeatherDetails)
