import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    // ...Helpers.crossCenter,
    ...Metrics.paddingBottomFlatList,
    // ...Metrics.verticalMargin,
  },
  mainView: {
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Metrics.mediumTopMargin,
  },
  viewLeft: {
    // backgroundColor: 'red',
    ...Helpers.mainCenter,
    ...Metrics.tinyHorizontalPadding,
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
    height: '50%',
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
    // borderColor: Colors.textColorLess,
    // borderColor: '#E8E8E8',
    height: width * 0.23,
    width: 0,
    alignSelf: 'center',
    top: 30,
  },
});

export default styles;
