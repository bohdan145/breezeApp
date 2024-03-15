import { Dimensions } from 'react-native'

export const rem = (size: number) => {
  return Math.floor(size * (Dimensions.get('window').width / 375))
}

export const encodeGetParams = (p: { [s: string]: unknown } | ArrayLike<unknown>) =>
  Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&')

export const hitSlop = (size = 6) => {
  return {
    top: size,
    bottom: size,
    left: size,
    right: size,
  }
}
