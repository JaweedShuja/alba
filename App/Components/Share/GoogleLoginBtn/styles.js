import {StyleSheet} from 'react-native';
import {
  Helpers,
  Metrics,
  Fonts,
  Colors,
  ApplicationStyles,
} from '../../../Theme';
export default styles = StyleSheet.create({
  googleBtn: {
    ...ApplicationStyles.button,
    backgroundColor: Colors.google,
    ...Helpers.mainSpaceBetween,
    ...Metrics.paddingHorizontalMain,
    ...Metrics.mediumTopMargin,
  },
  googleIcon: {
    position: 'absolute',
    left: 30,
    width: 20,
    height: 20,
  },
  googleBtnText: {
    textAlign: 'center',
    width: '100%',
    ...Fonts.input,
    fontWeight: '400',
  },
  textBtn: {
    ...Fonts.input,
    color: Colors.white,
  },
});
