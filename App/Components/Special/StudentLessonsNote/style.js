import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    ...Metrics.paddingBottomFlatList,
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
  titleView: {flex: 1, flexDirection: 'row'},
  title: {
    ...Fonts.h3,
    color: Colors.text,
    ...Metrics.smallVerticalPadding,
    //width: width,
    // ...Metrics.mediumHorizontalMargin,
  },
  titleNotes: {
    ...Fonts.h4,
    color: Colors.commonGray,
    marginStart: normal * 3,
    ...Metrics.smallVerticalPadding,
    // ...Metrics.mediumHorizontalMargin,
    //width: width,
  },
});

export default styles;
