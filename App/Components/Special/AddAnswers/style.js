import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Metrics.paddingHorizontalMain,

    // backgroundColor: 'red',
    // ...Metrics.paddingHorizontalMain,
  },
  flatList: {
    paddingBottom: width * 0.17,
  },
  viewNewQuestion: {
    width: '100%',
    height: width * 0.3,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...ApplicationStyles.borderRadiusCards,
    ...Metrics.twoTinyPowHorizontalPadding,
    flexDirection: 'row',
    // ...Helpers.crossCenter,
  },
  title: {
    ...ApplicationStyles.textTitleAddNote,
    // ...Metrics.paddingHorizontalMain,
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
    // height: width * 0.15,
    ...Metrics.mediumBottomMargin,
    ...Metrics.smallRadius,
    ...Metrics.powHorizontalPadding,
  },
  viewOption: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
  },
  flatListContent: {
    ...Metrics.paddingHorizontalMain,
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
  textInputQuestion: {
    width: '95%',
    ...Metrics.powHorizontalPadding,
    textAlignVertical: 'top',
    height: width * 0.3,
    // backgroundColor: 'red',
    ...ApplicationStyles.textInputIos,
  },
  icon: {
    marginTop: normal,

    paddingHorizontal: 5,
  },
  finishBtn: {
    ...ApplicationStyles.buttonAddNote,
    zIndex: 1000,
    backgroundColor: Colors.green,
    width: '100%',
    position: 'absolute',
  },
  // textBtn: {
  //   ...ApplicationStyles.textWhite,
  // },
  errorText: {fontSize: normal * 1.2, color: Colors.error},
});
