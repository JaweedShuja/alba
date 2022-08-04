import {Dimensions, StyleSheet, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    ...Metrics.paddingBottomFlatList,
    // ...Helpers.crossCenter,
    // ...Metrics.verticalMargin,
  },
  mainView: {
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Metrics.mediumTopMargin,
  },
  viewLeft: {
    ...Helpers.mainCenter,
    ...Metrics.tinyHorizontalPadding,
    // backgroundColor: 'red',
  },
  viewRight: {
    backgroundColor: Colors.white,
    width: '88%',
    height: width * 0.18,
    flexDirection: 'row',
    ...ApplicationStyles.shadow,
    ...Metrics.normalRadius,
    ...Helpers.crossCenter,
    ...Metrics.paddingStartMain,
  },
  viewTexts: {
    ...Metrics.mediumStartMargin,
  },
  textName: {
    ...Fonts.input,
    color: Colors.text,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    //...Metrics.mediumStartPadding,
    //width: '100%',
    //flex: 1,
    //alignSelf: 'flex-start',
  },
  textEpisode: {
    ...Fonts.normal,
    color: Colors.textColorLess,
    ...Metrics.smallTopMargin,
  },
  viewSituation: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '28%',
    height: '100%',
    ...Helpers.center,
    ...ApplicationStyles.borderSituationCoursesVideosLis,
  },
  textSituation: {
    color: Colors.white,
    fontSize: normal * 1,
    // ...Fonts.medium,
  },
  viewIndex: {
    ...ApplicationStyles.shadow,
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: 1000,
    ...Helpers.center,
  },
  textIndex: {
    ...Fonts.input,
  },
  viewLine: {
    borderWidth: 0.7,
    position: 'absolute',
    height: width * 0.23,
    width: 0,
    alignSelf: 'center',
    top: 30,
    // borderColor: Colors.textColorLess,
    // borderColor: '#E8E8E8',
  },
  topView: {flex: 1, alignItems: 'flex-start', justifyContent: 'center'},
  viewEnd: {
    flex: 1,
    height: '100%',
    ...Metrics.mediumStartMargin,
    //backgroundColor: 'red',
  },
});

export default styles;
