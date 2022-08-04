import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
    paddingTop: 25,
  },
  viewInputs: {
    ...ApplicationStyles.inPutCompletionProfile,
  },
  icon: {
    width: '12%',
    ...Helpers.center,
  },
  textInput: {
    width: '88%',
    height: '100%',
    ...ApplicationStyles.textInputIos,

    // backgroundColor: 'red',
  },
  btn: {
    ...ApplicationStyles.button,
    backgroundColor: Colors.lightBlue,
    ...Metrics.powBottomMargin,
    marginTop: width * 0.1,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
  },
  text: {
    ...Fonts.normal,
    color: Colors.textColorLess,
  },
  radioButton: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
    ...Metrics.mediumTopMargin,

    ...Metrics.smallVerticalPadding,
  },
  errorText: {fontSize: normal * 1.2, color: Colors.error},
  textParent: {
    ...Fonts.normal,
    ...Metrics.smallStartMargin,
    color: Colors.text,
  },
  footerTextStyle: {flexDirection: 'row'},
});

export default styles;
