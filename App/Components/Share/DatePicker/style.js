import {Dimensions, StyleSheet} from 'react-native';
import {
  Helpers,
  Metrics,
  Fonts,
  Colors,
  ApplicationStyles,
} from '../../../Theme';
import {color} from 'react-native-reanimated';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.inPutCompletionProfile,
  },
  textInput: {
    // backgroundColor: 'red',
    // width: '88%',
  },
  icon: {
    width: '12%',
    ...Helpers.center,
  },
  viewDate: {
    // backgroundColor: 'red',
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
});
