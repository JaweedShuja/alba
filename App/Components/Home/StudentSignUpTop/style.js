import {Dimensions, StyleSheet, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
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
    // ...Metrics.normalTopMargin,
  },
  input: {
    width: '100%',
    ...ApplicationStyles.paddingHorizontalTextInputs,

    // borderWidth: 0.5,
    // borderColor: Colors.textColorLess,
    // ...Metrics.horizontalPadding,
    // borderRadius: 3,
  },
  viewInput: {
    // backgroundColor: 'red',
    width: '47%',
  },
  errorText: {fontSize: normal * 1.2, color: Colors.error},
  signupBtn: {
    ...ApplicationStyles.button,
    // backgroundColor: Colors.login,
    //marginTop: normal * 4.5,
    ...Metrics.mediumTopMargin,
  },
  textBtn: {
    ...Fonts.input,
    color: Colors.white,
  },
  privacyViewStyle: {
    flexDirection: 'row',
    ...Metrics.normalTopMargin,
    justifyContent: 'flex-start',
  },
  linkStyle: {
    textDecorationLine: 'underline',
  },
  textContainer: {alignItems: 'flex-start'},
});

export default styles;
