import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';

const styles = StyleSheet.create({
  scrollView: {
    // flexGrow: 1,
    flex: 1,
    // backgroundColor: 'red',
  },
  content: {
    ...Metrics.paddingBottomFlatList,
  },
  finishBtn: {
    ...ApplicationStyles.buttonAddNote,
    zIndex: 1000,
    backgroundColor: Colors.redColorLess,
    ...Metrics.normalRadius,
    width: '89%',
  },
  text: {
    ...ApplicationStyles.textWhite,
  },
});

export default styles;
