import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,

    // ...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },

  textTitleQuestion: {
    ...ApplicationStyles.textTitleAddNote,
  },
  viewQuestion: {
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow,
    ...Metrics.mediumPadding,
    ...Metrics.normalRadius,
    ...Metrics.mediumBottomMargin,

    // ...Metrics.mediumVerticalMargin,
  },
  text: {
    color: Colors.text,
    ...Fonts.input,
    textAlign: 'justify',
  },

  flatList: {
    paddingBottom: width * 0.17,
    // backgroundColor: 'red',
  },
  viewNewQuestion: {
    width: '100%',
    height: width * 0.3,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...ApplicationStyles.borderRadiusCards,
    ...Metrics.twoTinyPowHorizontalPadding,
    flexDirection: 'row',
    ...Helpers.crossCenter,
    backgroundColor: 'red',
  },
  title: {
    ...ApplicationStyles.textTitleAddNote,
    ...Metrics.paddingHorizontalMain,
  },
  textInput: {
    // backgroundColor: 'red',
    width: '100%',
    ...Metrics.powHorizontalPadding,
  },
  mainBTN: {
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Helpers.crossCenter,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    height: width * 0.15,
    ...Metrics.mediumBottomMargin,
    ...Metrics.smallRadius,
    ...Metrics.powHorizontalPadding,
  },
  viewOption: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
  },
  flatListContent: {
    // ...Metrics.paddingHorizontalMain,
    paddingHorizontal: 5,
  },
  answerInput: {
    // backgroundColor: 'red',
    width: '90%',
    ...Metrics.normalStartPadding,
    color: Colors.text,
  },
  textOption: {
    color: Colors.text,
    ...Fonts.normal,
  },
  btn: {
    width: '89%',
    backgroundColor: Colors.green,
    // position: 'absolute',
    bottom: width * 0.05,
    ...Helpers.center,
    // width: '100%',
    alignSelf: 'center',
    ...Metrics.smallRadius,
    flexDirection: 'row',
    height: width * 0.12,
    ...Metrics.mediumTopMargin,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
    ...Metrics.smallStartMargin,
  },
  scale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
