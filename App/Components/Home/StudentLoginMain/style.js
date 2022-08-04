import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
  },
  signupBtn: {
    ...ApplicationStyles.button,
    backgroundColor: Colors.login,
  },

  facebookBtn: {
    ...ApplicationStyles.button,
    backgroundColor: Colors.facebook,
    ...Helpers.mainSpaceBetween,
    ...Metrics.paddingHorizontalMain,
  },
  googleBtn: {
    ...ApplicationStyles.button,
    backgroundColor: Colors.google,
    ...Helpers.mainSpaceBetween,
    ...Metrics.paddingHorizontalMain,
    ...Metrics.mediumTopMargin,
  },
  viewOr: {
    borderWidth: 1,
    width: '100%',
    borderColor: Colors.login,
    marginVertical: normal * 3,
  },
  textOr: {
    position: 'absolute',
    alignSelf: 'center',
    top: -11,
    backgroundColor: Colors.white,
    width: '10%',
    color: Colors.login,
    ...Helpers.textCenter,
    borderRadius: 1000,
    ...Fonts.input,
  },
  textBtn: {
    ...Fonts.input,
    color: Colors.white,
  },
  viewAccount: {
    alignSelf: 'center',
    marginTop: normal * 3,
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    marginBottom: 50,
    ...Helpers.center,
  },
  loginBtn: {
    ...Helpers.center,
    borderRadius: normal * 10,
    height: width * 0.07,
    ...Metrics.tinyHorizontalMargin,
    ...Metrics.smallHorizontalPadding,
  },
  textAccount: {
    color: Colors.textColorLess,
    ...Fonts.normal,
  },
});
