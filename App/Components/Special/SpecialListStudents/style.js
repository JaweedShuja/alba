import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  FlatList: {
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.paddingBottomFlatList,

    ...Metrics.normalTopMargin,
  },
  mainBTN: {
    flexDirection: 'row',
    ...Metrics.normalRadius,
    width: '100%',
    height: width * 0.28,
    ...Metrics.verticalMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    ...Helpers.center,
    ...Helpers.mainSpaceBetween,
    ...Metrics.mediumHorizontalPadding,
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
  },
  leftview: {
    flexDirection: 'row',
    ...Helpers.center,
  },
  text: {
    ...Fonts.input,
    ...Metrics.mediumStartMargin,
    color: Colors.text,
    // marginStart: 20,
  },
});

export default styles;
