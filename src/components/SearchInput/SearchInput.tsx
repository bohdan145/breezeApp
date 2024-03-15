import React, { memo, useState } from 'react'
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Keyboard,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  Text,
  TextInputSubmitEditingEventData,
} from 'react-native'
import Animated, { Easing, FadeInRight, FadeOutRight, LinearTransition } from 'react-native-reanimated'

import { hitSlop, rem } from '@app/utils'
import { useNavigation } from '@react-navigation/native'
import { EScreenNames } from '@app/navigation/screen-names'
import { styles } from './styles'

const SearchInput: React.FC<
  TextInputProps & {
    onCancel?: () => void
    onFocus?: () => void
    autoFocus?: boolean
  }
> = ({ style = {}, onFocus = () => null, onCancel = () => null, autoFocus = false, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false)
  const [value, setValue] = useState('')
  const navigation = useNavigation()

  const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true)
    requestAnimationFrame(() => {
      onFocus(e)
    })
  }

  const handleSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    setValue('')
    setFocused(false)
    navigation.navigate(EScreenNames.WEATHER_SCREEN, { cityName: e.nativeEvent.text })
  }

  const handleCancel = () => {
    onCancel()
    setFocused(false)
    setValue('')
    requestAnimationFrame(Keyboard.dismiss)
  }

  return (
    <View style={styles.row}>
      <Animated.View layout={LinearTransition.duration(650).easing(Easing.elastic(1.2))} style={styles.inputWrapper}>
        <TextInput
          placeholder='Search'
          placeholderTextColor={'rgba(255, 255, 255, .4)'}
          style={[styles.input, style]}
          selectionColor={'#eee'}
          autoFocus={autoFocus}
          onSubmitEditing={handleSubmitEditing}
          onFocus={_onFocus}
          clearButtonMode='while-editing'
          underlineColorAndroid='transparent'
          autoCorrect={false}
          keyboardAppearance='dark'
          inputMode='search'
          onChangeText={setValue}
          defaultValue={value}
          blurOnSubmit
          {...(props as TextInputProps)}
        />
      </Animated.View>
      {focused && (
        <Animated.View style={{ width: rem(75) }} entering={FadeInRight.delay(70)} exiting={FadeOutRight}>
          <TouchableOpacity delayPressIn={0} hitSlop={hitSlop(8)} onPress={handleCancel}>
            <Text style={styles.txt}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

export default memo(SearchInput)
