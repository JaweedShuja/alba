import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  FlatListContent: {
    ...Metrics.paddingHorizontalMain,
    // ...Metrics.paddingBottomFlatList,
    paddingBottom: width * 0.2,
  },
  flatList: {
    // paddingBottom: width * 0.15,
  },
  mainView: {},
  textTitleQuestion: {
    ...ApplicationStyles.title,
    marginStart: 0,
    // ...Fonts.h4,
    // color: Colors.text,
    // width: width,
    // // ...Metrics.mediumHorizontalMargin,
    // ...Metrics.smallVerticalPadding,
  },
  viewQuestion: {
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow,
    ...Metrics.mediumPadding,
    ...Metrics.normalRadius,
    ...Metrics.mediumVerticalMargin,
  },
  text: {
    color: Colors.text,
    ...Fonts.input,
    textAlign: 'justify',
  },
  textTitleAnswer: {
    ...ApplicationStyles.title,
    marginStart: 0,
    // ...Fonts.input,
    // color: Colors.text,
    // width: width,
    // // ...Metrics.mediumHorizontalMargin,
    // ...Metrics.smallVerticalPadding,
  },
  viewYourAnswer: {
    height: width * 0.15,
    ...Metrics.verticalPadding,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Helpers.crossCenter,
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.smallRadius,
    ...Metrics.verticalMargin,
  },
  viewIcon: {
    width: width * 0.05,
    height: width * 0.05,
    // borderWidth: 1,
    ...Metrics.tinyRadius,
    // backgroundColor: 'red',
    ...Helpers.center,
  },
  textAnswer: {
    // backgroundColor: 'red',
    width: '90%',
  },
  viewCorrectAnswer: {
    height: width * 0.15,
    ...Metrics.verticalPadding,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.green,
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Helpers.crossCenter,
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.smallRadius,
    ...Metrics.verticalMargin,
  },
  textCorrectAnswer: {
    width: '90%',
    color: Colors.white,
    ...Fonts.input,
    textAlign: 'justify',
  },
  viewCorrectIcon: {
    borderWidth: 1,
    borderColor: Colors.white,
  },
});
