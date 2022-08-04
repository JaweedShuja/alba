import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    // backgroundColor: 'red',
  },
  FlatList: {
    ...Metrics.paddingBottomFlatList,
    ...Metrics.paddingHorizontalMain,
  },
  container: {
    flex: 1,
    ...Metrics.paddingHorizontalMain,
    // backgroundColor: 'red',
    // ...Metrics.paddingHorizontalMain,
  },

  mainView: {
    // ...Metrics.normalRadius,
    // height: width * 0.28,
    // ...Metrics.verticalMargin,
    // ...ApplicationStyles.shadow,
    // backgroundColor: Colors.white,
    // ...Helpers.crossCenter,
    // ...Metrics.paddingHorizontalMain,
    // flexDirection: 'row',
    // ...Helpers.mainSpaceBetween,
  },
  title: {
    ...ApplicationStyles.textTitleAddNote,
    // ...Fonts.input,
    // color: Colors.text,
    // ...Metrics.powVerticalMargin,
  },
  btn: {
    width: '89%',
    backgroundColor: Colors.green,
    ...ApplicationStyles.buttonAddNote,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
    ...Metrics.smallStartMargin,
  },
  errorText: {fontSize: normal * 1.2, color: Colors.error},
  viewCourseDetail: {
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow,
    width: '100%',
    height: width * 0.25,
    ...Metrics.powVerticalMargin,
    ...ApplicationStyles.borderRadiusCards,
    ...Metrics.twoTinyPowPadding,
    ...Helpers.mainCenter,
  },
  textGrade: {
    color: Colors.green,
    ...Fonts.input,
  },
  textLesson: {
    color: Colors.textColorLess,
    ...Fonts.input,
    ...Metrics.normalTopMargin,
  },
  textInput: {
    // backgroundColor: 'red',
    width: '100%',
    ...Metrics.powHorizontalPadding,
  },
  viewNoteName: {
    width: '100%',
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...ApplicationStyles.borderRadiusCards,
    ...Metrics.twoTinyPowHorizontalPadding,
    flexDirection: 'row',
    ...Helpers.crossCenter,
  },
  upLoadBtn: {
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow,
    width: '100%',
    height: width * 0.65,
    ...Metrics.powVerticalMargin,
    ...ApplicationStyles.borderRadiusCards,
    ...Helpers.center,
    //marginBottom: 70,
  },
  textUpload: {
    ...Fonts.input,
    color: Colors.textColorLess,
    ...Metrics.normalTopMargin,
  },
  viewMainModal: {
    backgroundColor: Colors.white,
    ...ApplicationStyles.borderRadiusCards,
    height: width * 0.7,
    ...Helpers.center,
  },
  viewExit: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
    ...Helpers.mainSpaceBetween,
  },
  textTitleModal: {
    color: Colors.text,
    ...Fonts.input,
    ...Metrics.normalEndMargin,
    fontWeight: 'bold',
  },
  modalBtn: {
    width: width * 0.7,
    height: width * 0.1,
    backgroundColor: Colors.lightBlue,
    ...Metrics.mediumVerticalMargin,
    alignSelf: 'center',
    ...ApplicationStyles.borderRadiusCards,
    ...Helpers.center,
    flexDirection: 'row',
  },
  textModalBtn: {
    ...ApplicationStyles.textWhite,
    ...Metrics.normalStartMargin,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: Colors.textColorLess,
    width: '100%',
    ...Metrics.mediumTopMargin,
    ...Metrics.bottomMargin,
  },
});

export default styles;
