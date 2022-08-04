import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors} from 'App/Theme';
const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
  coloredView: {
    width: width,
    ...Metrics.horizontalPadding,
    paddingTop: 20,
    ...Metrics.mediumBottomMargin,
  },

  AboutUsText: {
    ...Fonts.h3,
    color: Colors.text,
  },
  AboutUsDesc: {
    ...Fonts.normal,
    color: Colors.text,
  },
});
