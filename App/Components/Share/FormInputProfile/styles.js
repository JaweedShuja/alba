import {StyleSheet, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {FontFamily} from 'App/Theme/FontFamily';
import {normal} from 'App/Theme/Metrics';

const styles = StyleSheet.create({
  iconStyle: {
    marginHorizontal: 14,
    color: '#ff6744',
    width: 25,
    height: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  input: {
    ...FontFamily.light,
    marginVertical: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: normal * 1.5,
  },
  inputContainerStyle: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: -1000,
    paddingTop: -1000,
    paddingBottom: -100,
    paddingHorizontal: 0,
    // backgroundColor: 'yellow',
  },
  inputContainer: {
    ...Metrics.normalTopMargin,
    marginTop: normal * 1.5,
    // backgroundColor: 'yellow',
    // ...ApplicationStyles.inPutCompletionProfile,
    // ...Metrics.smallBottonMargin,
  },
  contentInput: {
    width: '100%',
    ...ApplicationStyles.textInputIos,
    ...Metrics.horizontalPadding,
    ...FontFamily.regular,
    borderRadius: 3,
    flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    // borderWidth: 0.7,
  },
  error: {
    marginTop: 0,
    fontSize: normal * 1.2,
    color: Colors.error,
  },
  viewInputs: {
    ...ApplicationStyles.inPutCompletionProfile,
    marginTop: 0,
  },
  icon: {
    width: '12%',
    ...Helpers.center,
  },
  text: {
    ...Fonts.normal,
    color: Colors.textColorLess,
    // marginBottom: normal * 0.8,
  },
  footerTextStyle: {flexDirection: 'row'},
});

export default styles;
