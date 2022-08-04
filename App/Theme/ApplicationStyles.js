/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import {Dimensions, Platform} from 'react-native';
import Colors from './Colors';
import {normal} from './Metrics';
import Shadow from './Shadow';
import Metrics from './Metrics';
import Helpers from './Helpers';
import Fonts from './Fonts';
import {FontFamily} from './FontFamily';
const {width, height} = Dimensions.get('screen');

export default {
  button: {
    ...Helpers.center,
    borderRadius: normal * 10,
    height: width * 0.12,
    flexDirection: 'row',
    // ...Helpers.mainSpaceBetween,
  },
  buttonAddNote: {
    position: 'absolute',
    bottom: width * 0.05,
    ...Helpers.center,
    // width: '100%',
    alignSelf: 'center',
    ...Metrics.smallRadius,
    flexDirection: 'row',
    height: width * 0.12,
  },
  shadow: {
    ...Shadow({
      opacity: 0.25,
      color: '#000',
      radius: 3.84,
      offsetWidth: 0,
      offsetHeight: 2,
      elevation: 3,
    }),
  },
  spaceVerticalHorizontalListCourse: {
    marginTop: normal * 1,
    paddingBottom: normal * 1,
  },
  textTitleHorizontalListCourse: {
    ...Fonts.h4,
  },
  textViewListHorizontalListCourse: {
    ...Fonts.input,
    color: Colors.lightBlue,
  },
  borderRadiusCards: {
    borderRadius: normal * 1.5,
  },
  borderRadiusImageCards: {
    borderTopLeftRadius: normal * 1.5,
    borderTopRightRadius: normal * 1.5,
  },
  borderRadiusBottomCards: {
    borderBottomRightRadius: normal * 1.5,
    borderBottomLeftRadius: normal * 1.5,
  },
  borderSituationCoursesVideosLis: {
    borderTopLeftRadius: normal * 1,
    borderBottomLeftRadius: normal * 1,
    borderBottomRightRadius: normal * 1.5,
  },
  title: {
    ...Fonts.h4,
    color: Colors.text,
    // width: width,
    ...Metrics.mediumHorizontalMargin,
    ...Metrics.smallHorizontalPadding,
    alignSelf: 'flex-start',
    // backgroundColor: 'red',
  },
  buttonDownload: {
    position: 'absolute',
    backgroundColor: Colors.green,
    bottom: 0,
    width: '100%',
    height: width * 0.1,
    borderBottomRightRadius: normal * 1.5,
    borderBottomLeftRadius: normal * 1.5,
    ...Helpers.center,
  },
  buttonDelete: {
    position: 'absolute',
    backgroundColor: Colors.red,
    bottom: 0,
    width: '100%',
    height: width * 0.1,
    borderBottomRightRadius: normal * 1.5,
    borderBottomLeftRadius: normal * 1.5,
    ...Helpers.center,
  },
  textWhite: {
    color: Colors.white,
    ...Fonts.input,
  },
  textTitleAddNote: {
    ...Fonts.input,
    color: Colors.text,
    ...Metrics.powVerticalMargin,
  },
  titleTeacherAnswer: {
    ...Fonts.input,
    color: Colors.text,
    width: width,
    ...Metrics.mediumHorizontalMargin,
    ...Metrics.smallVerticalPadding,
  },
  paddingHorizontalTextInputs: {
    borderColor: Colors.textColorLess,
    ...Metrics.mediumTopMargin,
    ...Metrics.horizontalPadding,
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRadius: 3,
    ...FontFamily.regular,
    // backgroundColor: 'yellow',
    // fontSize: normal * 1,
  },
  inPutCompletionProfile: {
    width: '100%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    borderWidth: 0.8,
    borderColor: Colors.textColorLess,
    ...Metrics.normalTopMargin,
    ...Metrics.smallBottonMargin,
    ...Helpers.crossCenter,
    height: normal * 5,
  },
  textInputIos: {
    height: Platform.OS === 'ios' ? width * 0.125 : width * 0.125,
    textAlignVertical: 'center',
  },
};
