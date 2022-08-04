import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';

export default StyleSheet.create({
  scrollview: {
    // flexGrow: 1,
    // marginBottom: 200,
    flex: 1,
    // backgroundColor: 'red',
  },
  finishBtn: {
    ...ApplicationStyles.buttonAddNote,
    zIndex: 1000,
    backgroundColor: Colors.green,
    width: '89%',
  },
  text: {
    ...ApplicationStyles.textWhite,
  },
});
