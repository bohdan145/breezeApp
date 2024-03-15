import { rem } from '@app/utils'
import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../Button'
import { useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type TUnit = 'metric' | 'imperial'

interface Props {
  units: TUnit
  onToggle: (val: TUnit) => void
}

const WeatherUnitToggle: React.FC<Props> = ({ units = 'metric', onToggle = () => null }) => {
  const { colors } = useTheme()
  const { bottom } = useSafeAreaInsets()

  const activeMetric = units === 'metric'
  const activIimperial = units === 'imperial'

  return (
    <View style={{ position: 'absolute', bottom: bottom + rem(20), right: rem(15) }}>
      <Button
        onPress={() => onToggle(units === 'metric' ? 'imperial' : 'metric')}
        style={[styles.btn, { backgroundColor: colors.text }]}
      >
        <Text style={[styles.txt, { color: activeMetric ? '#222' : '#ccc' }]}>C°</Text>
        <Text style={[styles.txt, { marginHorizontal: rem(5) }]}>/</Text>
        <Text style={[styles.txt, { color: activIimperial ? '#222' : '#ccc' }]}>F°</Text>
      </Button>
    </View>
  )
}

export default memo(WeatherUnitToggle)

const styles = StyleSheet.create({
  txt: {
    fontSize: rem(16),
    fontWeight: '600',
    color: '#ccc',
  },
  btn: {
    width: rem(80),
    padding: rem(10),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#222',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
})
