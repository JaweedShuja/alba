import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
    // backgroundColor: 'red',
    // height: 100,
    // width: 100,
    // ...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },
  scrollView: {
    flex: 1,
    ...Metrics.paddingHorizontalMain,
    // backgroundColor: 'red',
    // height: width * 20,
  },
  upLoadBtn: {
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow,
    width: '100%',
    height: width * 0.5,
    ...Metrics.powVerticalMargin,
    ...ApplicationStyles.borderRadiusCards,
    ...Helpers.center,
    // marginBottom: 70,
  },
  textUpload: {
    ...Fonts.input,
    color: Colors.textColorLess,
    ...Metrics.normalTopMargin,
  },
  textAnswer: {
    ...ApplicationStyles.textTitleAddNote,
  },
  errorText: {fontSize: normal * 1.2, color: Colors.error},
});

export default styles;
