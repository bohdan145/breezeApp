/* eslint-disable @typescript-eslint/no-namespace */
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { EScreenNames } from './screen-names'

type RootStackParamList = {
  WelcomeScreen: undefined
  HomeScreen: undefined
  WeatherScreen: { cityName: string }
}

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, EScreenNames.HOME_SCREEN>
  route: RouteProp<RootStackParamList, EScreenNames.HOME_SCREEN>
}
type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, EScreenNames.WELCOME_SCREEN>
  route: RouteProp<RootStackParamList, EScreenNames.WELCOME_SCREEN>
}
type WeatherScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, EScreenNames.WEATHER_SCREEN>
  route: RouteProp<RootStackParamList, EScreenNames.WEATHER_SCREEN>
}

export type { HomeScreenProps, RootStackParamList, WelcomeScreenProps, WeatherScreenProps }

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
