import React, { Component } from 'react'
import {
  View,
  Keyboard,
  Platform,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  EmitterSubscription,
  KeyboardEvent,
} from 'react-native'

interface KeyboardSpacerProps {
  topSpacing?: number
  onToggle?: (isKeyboardOpened: boolean, keyboardSpace: number) => void
  style?: object
}

interface KeyboardSpacerState {
  keyboardSpace: number
  isKeyboardOpened: boolean
}

const defaultAnimation = LayoutAnimation.Presets.easeInEaseOut

export default class KeyboardSpacer extends Component<KeyboardSpacerProps, KeyboardSpacerState> {
  static defaultProps: KeyboardSpacerProps = {
    topSpacing: 0,
    onToggle: () => null,
  }

  private _listeners: EmitterSubscription[] | null = null

  constructor(props: KeyboardSpacerProps) {
    super(props)
    this.state = {
      keyboardSpace: 0,
      isKeyboardOpened: false,
    }
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
  }

  componentDidMount() {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow'
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide'
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace),
    ]
  }

  componentWillUnmount() {
    this._listeners?.forEach((listener) => listener.remove())
  }

  updateKeyboardSpace(event: KeyboardEvent) {
    if (!event.endCoordinates) {
      return
    }

    let animationConfig = defaultAnimation
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      )
    }

    LayoutAnimation.configureNext(animationConfig)

    // get updated on rotation
    const screenHeight = Dimensions.get('window').height
    // when an external physical keyboard is connected
    // event.endCoordinates.height still equals virtual keyboard height
    // however, only the keyboard toolbar is showing if there should be one
    const keyboardSpace = screenHeight - event.endCoordinates.screenY + (this.props.topSpacing || 0)
    this.setState(
      {
        keyboardSpace,
        isKeyboardOpened: true,
      },
      () => this.props.onToggle?.(true, keyboardSpace),
    )
  }

  resetKeyboardSpace(event: KeyboardEvent) {
    let animationConfig = defaultAnimation
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      )
    }

    LayoutAnimation.configureNext(animationConfig)

    this.setState(
      {
        keyboardSpace: 0,
        isKeyboardOpened: false,
      },
      () => this.props.onToggle?.(false, 0),
    )
  }

  render() {
    return <View style={[styles.container, { height: this.state.keyboardSpace }, this.props.style]} />
  }
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
})
