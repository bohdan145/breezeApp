import React, { useRef } from 'react'
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps, Animated, ViewStyle } from 'react-native'

type ScaleProps = {
  style?: ViewStyle
  defaultScale?: number
  activeScale?: number
  tension?: number
  friction?: number
  pressInTension?: number
  pressInFriction?: number
  pressOutTension?: number
  pressOutFriction?: number
  useNativeDriver?: boolean
  children: React.ReactNode
} & Partial<TouchableWithoutFeedbackProps>

const Button: React.FC<ScaleProps> = (props) => {
  const scaleAnimation = useRef(new Animated.Value(props.defaultScale)).current

  const onPressIn = (...args: any[]) => {
    const tension = typeof props.pressInTension !== 'undefined' ? props.pressInTension : props.tension
    const friction = typeof props.pressInFriction !== 'undefined' ? props.pressInFriction : props.friction

    Animated.spring(scaleAnimation, {
      toValue: props.activeScale,
      tension,
      friction,
      useNativeDriver: props.useNativeDriver,
    }).start()

    if (props.onPressIn) {
      props.onPressIn.apply(null, args)
    }
  }

  const onPressOut = (...args: any[]) => {
    const tension = typeof props.pressOutTension !== 'undefined' ? props.pressOutTension : props.tension
    const friction = typeof props.pressOutFriction !== 'undefined' ? props.pressOutFriction : props.friction

    Animated.spring(scaleAnimation, {
      toValue: props.defaultScale,
      tension,
      friction,
      useNativeDriver: props.useNativeDriver,
    }).start()

    if (props.onPressOut) {
      props.onPressOut.apply(null, args)
    }
  }

  return (
    <TouchableWithoutFeedback {...props} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          props.style,
          {
            transform: [{ scale: scaleAnimation }],
            opacity: scaleAnimation.interpolate({
              inputRange: [props.activeScale, props.defaultScale],
              outputRange: [0.5, 1],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        {props.children}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default Button

Button.defaultProps = {
  defaultScale: 1,
  activeScale: 0.9,
  tension: 100,
  friction: 3,
  useNativeDriver: true,
}
