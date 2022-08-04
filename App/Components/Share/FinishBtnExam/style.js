import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';

export default StyleSheet.create({
  scrollView: {
    // flexGrow: 1,
    flex: 1,
    // backgroundColor: 'red',
  },
  finishBtn: {
    ...ApplicationStyles.buttonAddNote,
    zIndex: 1000,
    backgroundColor: Colors.red,
    width: '89%',
  },
  text: {
    ...ApplicationStyles.textWhite,
  },
});
