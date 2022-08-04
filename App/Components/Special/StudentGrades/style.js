import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import FontFamily from '../../../Theme/FontFamily';
const {width, height} = Dimensions.get('screen');
const border = normal * 2.3;
export default styles = StyleSheet.create({
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    ...Metrics.paddingBottomFlatList,
  },
  mainBTN: {
    // borderRadius: normal * 5.5,
    // ...Metrics.normalRadius,
    borderRadius: border,
    height: width * 0.28,
    ...Metrics.verticalMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,

    ...Helpers.crossCenter,
    ...Metrics.paddingHorizontalMain,
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
  },
  viewTexts: {
    width: '75%',
  },
  title: {
    color: Colors.text,
    ...Fonts.input,
    width: '90%',
    ...FontFamily.bold,
  },

  text: {
    ...Fonts.normal,
    color: Colors.text,
    ...Metrics.normalTopMargin,
    width: '100%',
    ...FontFamily.regular,
  },
  viewGrade: {
    width: width * 0.2,
    height: width * 0.2,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    borderRadius: border,

    // ...Metrics.normalRadius,
    ...Helpers.center,
    ...Metrics.tinyHorizontalPadding,
  },
  textGrade: {
    ...Fonts.normal,
    ...FontFamily.bold,
  },
  textGradeNumber: {
    ...Fonts.h4,
    // ...Metrics.normalTopMargin,
    // fontWeight: 'bold',
    ...FontFamily.bold,
  },
});
