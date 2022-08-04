import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {},
  flatList: {
    marginTop: normal * 1,
  },
  flatListContent: {
    ...Metrics.verticalPadding,
    ...Metrics.paddingStartMain,
  },
  mainBTN: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: Colors.white,
    ...Metrics.normalEndMargin,
    ...Metrics.tinyPowRadius,
    ...ApplicationStyles.shadow,
    ...Helpers.center,
  },
  text: {
    ...Fonts.input,
  },
});
