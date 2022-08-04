import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Colors, ApplicationStyles} from '../../../Theme';

const styles = StyleSheet.create({
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
    // ...Helpers.fill,
    ...Metrics.paddingHorizontalMain,
    ...Helpers.center,
    ...Metrics.verticalPadding,
  },
  doneBtn: {
    ...ApplicationStyles.button,
    width: '100%',
    backgroundColor: Colors.lightBlue,
    ...Metrics.mediumVerticalMargin,
  },
  textDone: {...ApplicationStyles.textWhite},
});

export default styles;
