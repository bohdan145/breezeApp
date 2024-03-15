import Button from '@app/components/Button'
import Stagger from '@app/components/Stagger'
import { EScreenNames } from '@app/navigation/screen-names'
import { WelcomeScreenProps } from '@app/navigation/types'
import { rem } from '@app/utils'
import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style='light' />
      <Stagger stagger={100} duration={500} style={styles.wrapper}>
        <Image resizeMode='contain' style={styles.img} source={require('@app/assets/icons/umbrella.png')} />
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Breeze</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>Weather app</Text>
        </View>
        <Button
          onPress={() => navigation.navigate(EScreenNames.HOME_SCREEN)}
          style={[styles.actionBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.btnTxt, { color: colors.text }]}>{'➜'}</Text>
        </Button>
      </Stagger>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: rem(120),
    transform: [{ rotate: '30deg' }],
  },
  wrapper: {
    height: '70%',
    minHeight: rem(200),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: rem(65),
    fontWeight: '700',
  },
  subtitle: {
    fontSize: rem(24),
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.5,
  },
  actionBtn: {
    width: rem(54),
    height: rem(54),
    borderRadius: rem(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: rem(20),
  },
})
