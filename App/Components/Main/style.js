import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...Helpers.center,
    ...Helpers.fill,
    ...Metrics.paddingHorizontalMain,
  },
  btn: {
    ...ApplicationStyles.button,
    width: '100%',
    ...Metrics.smallVerticalMargin,
  },
  text: {
    ...ApplicationStyles.textWhite,
  },
});
