import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },
  textheader: {
    height: normal * 3,
    ...ApplicationStyles.borderRadiusCards,
  },
  flatList: {
    marginTop: normal * 1,
  },
  flatListContent: {
    ...Metrics.verticalPadding,
    ...Metrics.paddingHorizontalMain,
  },
  mainBTN: {
    width: width * 0.4,
    height: width * 0.5,
    backgroundColor: Colors.white,
    ...Metrics.tinyPowEndMArgin,
    ...ApplicationStyles.borderRadiusCards,
  },
  image: {
    width: '100%',
    height: '70%',
    ...ApplicationStyles.borderRadiusImageCards,
  },
  cover: {
    height: '30%',
    ...Helpers.mainCenter,
    ...Metrics.powHorizontalPadding,
  },
  text: {
    ...Fonts.input,
  },
  viewicontext: {
    flexDirection: 'row',
    ...Helpers.center,
  },
  textViewList: {
    ...ApplicationStyles.textViewListHorizontalListCourse,
  },
  viewTitle: {
    ...Metrics.paddingHorizontalMain,
    flexDirection: 'row',
    width: width,
    ...Helpers.mainSpaceBetween,
  },
  btnViewList: {
    ...Metrics.tinyPadding,
  },
});

export default styles;
