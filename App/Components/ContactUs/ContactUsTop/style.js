import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {medium} from 'App/Theme/Metrics';

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
  },
  image: {
    width: width * 0.06,
    height: width * 0.06,
    ...Metrics.smallEndMargin,
  },
  viewParent: {
    width: '100%',
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Metrics.powVerticalMargin,
  },
  btn: {
    backgroundColor: Colors.white,
    width: '48%',
    ...ApplicationStyles.shadow,
    ...Metrics.borderRadiusContactUs,
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    height: width * 0.12,
    ...Helpers.crossCenter,
    ...Metrics.paddingHorizontalMain,
  },
  text: {
    ...Fonts.large,
    color: Colors.text,
    fontWeight: 'bold',
  },
  textTitle: {
    ...Fonts.input,
    ...Metrics.powVerticalMargin,
    color: Colors.text,
  },
  icon: {
    fontSize: medium,
  },
});

export default styles;
