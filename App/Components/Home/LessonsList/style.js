import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');
const radius = 2.8;
let screen;
if (height > 645) screen = true;
else screen = false;
export default styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },
  textheader: {
    ...ApplicationStyles.textTitleHorizontalListCourse,
    ...Metrics.paddingStartMain,
  },
  flatList: {
    marginTop: normal * 0.5,
  },
  flatListContent: {
    ...Metrics.verticalPadding,
    ...Metrics.paddingHorizontalMain,
    ...Metrics.paddingBottomFlatList,
  },
  mainBTN: {
    width: '100%',
    height: screen ? width * 0.63 : width * 0.6,
    backgroundColor: Colors.white,
    // ...ApplicationStyles.borderRadiusCards,
    borderRadius: normal * radius,
    ...ApplicationStyles.shadow,
    ...Metrics.mediumBottomMargin,
  },
  image: {
    width: '100%',
    height: '80%',
    borderTopRightRadius: normal * radius,
    borderTopLeftRadius: normal * radius,
    // ...ApplicationStyles.borderRadiusImageCards,
  },
  cover: {
    height: '21%',
    // ...ApplicationStyles.borderRadiusBottomCards,
    flexDirection: 'row',
    ...Helpers.scrollSpaceBetween,
    ...Helpers.crossCenter,
    paddingHorizontal: width * 0.07,
    borderBottomRightRadius: normal * radius,
    borderBottomLeftRadius: normal * radius,
    // ...Metrics.powHorizontalPadding,
  },
  text: {
    fontSize: screen ? normal * 2 : normal * 1.4,
    color: Colors.white,
    ...Metrics.smallEndMargin,
  },
  viewicontext: {
    flexDirection: 'row',
    ...Helpers.center,
  },
});
