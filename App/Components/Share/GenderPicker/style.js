import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.inPutCompletionProfile,
  },
  iconView: {
    width: '12%',
    ...Helpers.center,
    flexDirection: 'row',
  },
  viewDate: {
    ...Metrics.paddingHorizontalMain,
    ...Helpers.center,
    ...Metrics.tinyVerticalPadding,
  },
  doneBtn: {
    ...ApplicationStyles.button,
    width: '100%',
    backgroundColor: Colors.lightBlue,
    ...Metrics.mediumVerticalMargin,
  },
  textDone: {...ApplicationStyles.textWhite},
  icon: {
    position: 'absolute',
    ...Helpers.center,
    right: width * 0.02,
  },
  downIcon: {
    position: 'absolute',
    ...Helpers.center,
    right: width * 0.02,
  },
  genderView: {
    flexDirection: 'row',
    ...Metrics.tinyVerticalMargin,
    ...Metrics.smallVerticalPadding,
    alignSelf: 'flex-start',

    ...Helpers.center,

    width: '60%',
    justifyContent: 'flex-start',
  },
  textGender: {
    color: Colors.text,
    ...Metrics.normalStartMargin,
  },
});
