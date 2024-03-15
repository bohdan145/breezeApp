import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import WelcomeScreen from '@app/screens/WelcomeScreen'
import { RootStackParamList } from './types'
import HomeScreen from '@app/screens/HomeScreen'
import { EScreenNames } from './screen-names'
import WeatherScreen from '@app/screens/WeatherScreen'
import { colors } from '@app/theme/colors'

const Stack = createNativeStackNavigator<RootStackParamList>()

const MyTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: colors.main,
    text: colors.paper,
  },
}

function RootNavigation() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        theme={MyTheme}
        children={
          <Stack.Navigator>
            <Stack.Screen
              name={EScreenNames.WELCOME_SCREEN}
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={EScreenNames.HOME_SCREEN} component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={EScreenNames.WEATHER_SCREEN}
              component={WeatherScreen}
              options={{
                title: '',
                headerBackTitleVisible: false,
                headerStyle: { backgroundColor: MyTheme.colors.background },
                headerTintColor: MyTheme.colors.text,
              }}
            />
          </Stack.Navigator>
        }
      />
    </SafeAreaProvider>
  )
}

export default RootNavigation
