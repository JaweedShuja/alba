import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  FlatList: {
    //...Metrics.paddingHorizontalMain,
    ...Metrics.paddingBottomFlatList,
    // alignItems: 'flex-start',
  },
  mainBTN: {
    ...Metrics.normalRadius,
    height: width * 0.2,
    ...Metrics.verticalMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...Helpers.mainSpaceBetween,
    flexDirection: 'row',
  },
  leftView: {
    ...Helpers.center,
    width: '80%',
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
  },
  rightView: {
    ...Helpers.center,
    ...Metrics.mediumHorizontalPadding,
  },
  titleView: {
    height: '100%',
    width: width * 0.2,
    borderTopLeftRadius: normal * 1.5,
    borderBottomLeftRadius: normal * 1.5,
    ...Helpers.center,
  },

  title: {
    color: Colors.white,
    ...Fonts.input,
    textAlign: 'center',
    width: '100%',
  },
  descView: {
    width: width * 0.47,
    height: '100%',
    ...Helpers.mainCenter,
  },
  text: {
    ...Fonts.input,
    color: Colors.text,
    width: '100%',
  },
});

export default styles;
