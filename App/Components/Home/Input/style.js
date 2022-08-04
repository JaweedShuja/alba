import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.inPutCompletionProfile,
  },
  textInput: {
    ...ApplicationStyles.textInputIos,

    // backgroundColor: 'red',
    width: '88%',
  },
  icon: {
    width: '12%',
    ...Helpers.center,
  },
});
