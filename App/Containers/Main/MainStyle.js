import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
  text: {
    ...ApplicationStyles.title,
  },
});
