import {StyleSheet} from 'react-native';
import {Colors, ApplicationStyles} from 'App/Theme';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
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

export default styles;
