import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, ApplicationStyles, Colors} from 'App/Theme';
const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
  text: {
    ...ApplicationStyles.title,

    // ...Fonts.input,
    // color: Colors.text,
    // width: width,
    // ...Metrics.mediumHorizontalMargin,
    ...Metrics.smallVerticalPadding,
  },
});
