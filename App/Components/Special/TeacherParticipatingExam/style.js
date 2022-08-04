import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    paddingBottom: width * 0.15,
  },
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    ...Metrics.paddingBottomFlatList,
  },
  mainView: {
    ...Metrics.normalRadius,
    height: width * 0.2,
    ...Metrics.verticalMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Helpers.crossCenter,
    ...Metrics.mediumHorizontalPadding,
  },

  title: {
    color: Colors.text,
    ...Fonts.input,
    ...Metrics.normalTopMargin,
  },

  textTitle: {
    ...ApplicationStyles.title,
    // marginStart: 0,
  },
  viewLeft: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
    // backgroundColor: 'red',
  },
  btn: {
    width: width * 0.22,
    height: width * 0.08,
    ...Helpers.center,
    ...Metrics.smallRadius,
    backgroundColor: Colors.lightBlue,
  },
  textBtn: {
    color: Colors.white,
    ...Fonts.input,
  },
  textName: {
    // backgroundColor: 'red',
    width: '50%',
    color: Colors.text,
    ...Fonts.input,
    ...Metrics.normalStartMargin,
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
    // width: '100%',
    // height: '100%',
    backgroundColor: Colors.white,
    // ...ApplicationStyles.shadow,
    borderRadius: 1000,
  },
  finishBtn: {
    ...ApplicationStyles.buttonAddNote,
    zIndex: 1000,
    backgroundColor: 'red',
    width: '100%',
  },
});
