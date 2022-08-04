import {Dimensions, StyleSheet} from 'react-native';
import {Metrics, Fonts, Colors} from 'App/Theme';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
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
  scrollView: {
    flex: 1,
  },
  content: {
    ...Metrics.paddingBottomFlatList,
  },
});

export default styles;
