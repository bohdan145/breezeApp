import { colors } from '@app/theme/colors'
import { rem } from '@app/utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, .1)',
    borderRadius: 15,
    flex: 1,
  },
  input: {
    color: colors.paper,
    fontSize: rem(16),
    lineHeight: rem(18),
    padding: rem(12),
    paddingHorizontal: rem(15),
  },
  txt: {
    color: colors.paper,
    textAlign: 'center',
    fontSize: rem(15),
    fontWeight: '500',
  },
})
