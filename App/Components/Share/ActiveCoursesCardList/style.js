import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');
const radius = 2.8;
const screen = height > 645 ? true : false;

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },
  textheader: {
    ...ApplicationStyles.textTitleHorizontalListCourse,
    ...Metrics.mediumHorizontalPadding,
    //...Metrics.paddingStartMain,
  },
  flatList: {
    marginTop: normal * 0.5,
  },
  flatListContent: {
    ...Metrics.verticalPadding,
    ...Metrics.paddingHorizontalMain,
  },
  mainBTN: {
    width: '100%',
    height: screen ? width * 0.63 : width * 0.6,
    backgroundColor: Colors.white,
    borderRadius: normal * radius,
    ...ApplicationStyles.shadow,
    ...Metrics.mediumBottomMargin,
    // ...ApplicationStyles.borderRadiusCards,
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
    flexDirection: 'row',
    ...Helpers.scrollSpaceBetween,
    ...Helpers.crossCenter,
    paddingHorizontal: width * 0.07,
    borderBottomRightRadius: normal * radius,
    borderBottomLeftRadius: normal * radius,
    // ...ApplicationStyles.borderRadiusBottomCards,
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

export default styles;

// let screen;
// if (height > 645) screen = true;
// else screen = false;
