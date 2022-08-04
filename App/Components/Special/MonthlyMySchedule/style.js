import {Dimensions, StyleSheet, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {FontFamily} from '../../../Theme/FontFamily';
const {width, height} = Dimensions.get('screen');

const borderWidth = 1;
const borderColor = Colors.textColorLess;
export default styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },
  flatList: {
    marginTop: normal * 1,
  },
  flatListContent: {
    ...Metrics.verticalPadding,
    ...Metrics.paddingHorizontalMain,
  },
  mainBTN: {
    // backgroundColor: Colors.white,
    // ...Metrics.tinyPowEndMArgin,
    // ...ApplicationStyles.borderRadiusCards,
    // ...ApplicationStyles.shadow,
    // ...Metrics.mediumHorizontalPadding,
    // ...Helpers.center,
    // ...Metrics.mediumVerticalPadding,
    flexDirection: 'row',
    height: width * 0.2,
  },
  text: {
    ...Fonts.input,
    textAlign: 'center',
  },
  viewDays: {
    flex: 1,
    borderTopWidth: borderWidth,
    borderRightWidth: borderWidth,
    ...Helpers.mainCenter,
    borderColor: borderColor,
  },
  viewLesson: {
    flex: 2,
    borderTopWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderColor: borderColor,
  },
  viewExam: {
    flex: 2,
    // ...Metrics.mediumVerticalPadding,
    borderTopWidth: borderWidth,
    borderColor: borderColor,
  },
  mainView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    // height: width * 0.2,
  },
  viewDays1: {
    flex: 1,
    // borderTopWidth: borderWidth,
    borderRightWidth: borderWidth,
    ...Helpers.center,
    ...Metrics.normalPaddingBottom,
    borderColor: borderColor,
  },
  viewLesson1: {
    flex: 2,
    // borderTopWidth: borderWidth,
    borderRightWidth: borderWidth,
    ...Helpers.mainCenter,
    ...Helpers.center,
    ...Metrics.normalPaddingBottom,
    borderColor: borderColor,
  },
  viewExam1: {
    flex: 2,
    ...Helpers.mainCenter,
    ...Helpers.center,
    ...Metrics.normalPaddingBottom,
    borderColor: borderColor,

    // ...Metrics.mediumVerticalPadding,
    // borderTopWidth: borderWidth,
  },
  textDay: {
    ...Fonts.input,
    color: Colors.redColorLess,
    textAlign: 'left',
  },
  textMonth: {
    // ...Fonts.input,
    fontSize: normal * 1.4,
    color: Colors.text,
  },
  textHeader: {
    ...Fonts.input,
    color: Colors.text,
  },
  episodeView: {
    ...Helpers.fill,
    backgroundColor: Colors.orange,
  },
  boxEpisodeTop: {
    flexDirection: 'row',
    ...Helpers.center,
    width: '95%',
    alignSelf: 'center',
    ...Helpers.mainCenter,
  },
  boxEpisodeBottom: {
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    flex: 1,
    // alignItems: '',
  },
  borderView: {
    width: '95%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.commonGray,
    marginVertical: normal * 0.5,
  },
  lorem: {
    color: Colors.white,
    fontSize: normal * 1.1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    ...FontFamily.light,
  },
  textBoxEpisode: {
    fontSize: normal * 1.2,
    color: Colors.white,
    ...FontFamily.regular,
    // marginBottom: normal * 0.5,
  },
  textBoxEpisodeTime: {
    color: Colors.yellowTime,
    ...FontFamily.bold,
    fontSize: normal * 1.5,
  },
});
