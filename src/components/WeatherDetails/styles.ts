import { colors } from '@app/theme/colors'
import { rem } from '@app/utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    padding: rem(15),
  },
  errorTxt: {
    fontSize: rem(20),
    color: colors.paper,
    opacity: 0.5,
    marginTop: rem(15),
  },
  largeTxt: {
    fontSize: rem(42),
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryTxt: {
    fontSize: rem(16),
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.4,
    marginTop: rem(5),
  },
  weatherIcon: {
    alignItems: 'center',
    marginVertical: rem(35),
  },
  box: {
    padding: rem(15),
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, .1)',
    width: '47%',
    minHeight: rem(90),
    justifyContent: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    gap: rem(20),
    marginTop: rem(40),
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxDesc: {
    color: colors.paper,
    fontWeight: '800',
    fontSize: rem(12),
    opacity: 0.4,
  },
  boxTitle: {
    color: colors.paper,
    fontWeight: '800',
    fontSize: rem(26),
    marginTop: rem(5),
  },
})
