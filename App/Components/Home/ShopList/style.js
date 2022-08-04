import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    ...Metrics.paddingBottomFlatList,
  },
  mainBTN: {
    ...Metrics.normalRadius,
    height: width * 0.23,
    ...Metrics.verticalMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...Metrics.verticalPadding,
    ...Metrics.horizontalPadding,
    ...Helpers.mainCenter,
  },
  textName: {
    color: Colors.white,
    fontSize: normal * 1.2,
    textAlign: 'center',
    width: '100%',
    textAlign: 'center',
  },
  text: {
    fontSize: normal * 1.2,
    color: Colors.text,
    width: '75%',
    ...Metrics.normalStartMargin,
  },
  view: {
    flexDirection: 'row',
  },
  viewCity: {
    position: 'absolute',
    height: width * 0.23,
    width: width * 0.14,
    right: 0,
    borderTopLeftRadius: 10000,
    borderBottomLeftRadius: 10000,
    borderTopRightRadius: 1000,
    borderBottomRightRadius: 1000,
    ...Helpers.center,
  },
});
