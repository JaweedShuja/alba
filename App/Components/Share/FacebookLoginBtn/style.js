import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';

const styles = StyleSheet.create({
  facebookBtn: {
    ...ApplicationStyles.button,
    backgroundColor: Colors.facebook,
    ...Helpers.mainSpaceBetween,
    ...Metrics.paddingHorizontalMain,
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

export default styles;
