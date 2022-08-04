import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  FlatList: {
    ...Metrics.paddingBottomFlatList,
    ...Metrics.paddingHorizontalMain,
  },
  container: {
    flex: 1,
    // backgroundColor: 'red',
    ...Metrics.paddingHorizontalMain,
  },

  mainView: {
    // ...Metrics.normalRadius,
    // height: width * 0.28,
    // ...Metrics.verticalMargin,
    // ...ApplicationStyles.shadow,
    // backgroundColor: Colors.white,
    // ...Helpers.crossCenter,
    // ...Metrics.paddingHorizontalMain,
    // flexDirection: 'row',
    // ...Helpers.mainSpaceBetween,
  },
  title: {
    ...Fonts.h4,
    color: Colors.text,
    width: width,
    // ...Metrics.mediumHorizontalMargin,
    ...Metrics.smallVerticalPadding,
  },
  btn: {
    backgroundColor: Colors.lightBlue,
    ...ApplicationStyles.buttonAddNote,
    width: '100%',
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
    ...Metrics.smallStartMargin,
  },
});
