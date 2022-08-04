import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');
let screen;
if (height < 600) {
  screen = true;
} else {
  screen = false;
}
export default styles = StyleSheet.create({
  container: {
    ...Helpers.fill,
    ...Metrics.paddingHorizontalMain,
  },
  image: {
    width: screen ? width * 0.6 : width * 0.85,
    height: screen ? (width * 0.6) / 0.9 : (width * 0.85) / 0.9,
    alignSelf: 'center',
  },
  viewTextInput: {
    width: '100%',
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    // ...Metrics.mediumVerticalMargin,
    marginTop: normal * 3,
    ...Metrics.mediumHorizontalPadding,
  },
  textInput: {
    ...ApplicationStyles.textInputIos,

    width: '100%',
  },
  activeCourseBtn: {
    backgroundColor: Colors.lightBlue,
    marginTop: normal * 4,
    ...ApplicationStyles.button,
  },
  buyActiveCodeBtn: {
    backgroundColor: Colors.redColorLess,
    marginTop: normal * 1.8,
    ...Metrics.mediumBottomMargin,
    marginTop: normal * 5,
    ...ApplicationStyles.button,
  },
  text: {
    color: Colors.white,
    ...Fonts.input,
  },
  errorText: {
    fontSize: normal * 1.2,
    color: Colors.error,
    ...Metrics.normalTopMargin,
  },
});
