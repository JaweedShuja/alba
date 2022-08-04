import {Dimensions, StyleSheet, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
  },
  welcomeText: {
    ...Fonts.h4,
    color: Colors.text,
    ...Metrics.mediumTopMargin,
  },
  text: {
    ...Fonts.input,
    color: Colors.textColorLess,
    ...Metrics.normalTopMargin,
  },
  emailInput: {
    width: '100%',
    ...ApplicationStyles.paddingHorizontalTextInputs,
  },
  viewInputs: {
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Metrics.normalTopMargin,
  },
  input: {
    width: '100%',
    ...ApplicationStyles.paddingHorizontalTextInputs,

    // borderWidth: 0.5,
    // borderColor: Colors.textColorLess,
    // ...Metrics.horizontalPadding,
    // borderRadius: 3,
  },
  errorText: {fontSize: normal * 1.2, color: Colors.error},
  forgetBtn: {
    alignSelf: 'flex-end',
  },
  textForget: {
    width: '100%',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    ...Metrics.verticalMargin,
    color: Colors.login,
  },
  signupBtn: {
    ...ApplicationStyles.button,
    // backgroundColor: Colors.login,
  },
  textBtn: {
    ...Fonts.input,
    color: Colors.white,
  },
  textContainer: {alignItems: 'flex-start'},
});
