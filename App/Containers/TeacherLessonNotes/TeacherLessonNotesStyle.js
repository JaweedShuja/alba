import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';

export default StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    ...Metrics.paddingHorizontalMain,
  },
  scrollView: {
    // flexGrow: 1,
    flex: 1,
    // backgroundColor: 'red',
  },
  btn: {
    backgroundColor: Colors.lightBlue,
    ...ApplicationStyles.buttonAddNote,
    width: '100%',
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
    ...Metrics.smallStartMargin,
  },
});
