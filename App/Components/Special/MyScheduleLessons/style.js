import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },

  flatList: {
    marginTop: normal * 1,
  },
  flatListContent: {
    ...Metrics.verticalPadding,
    ...Metrics.paddingHorizontalMain,
    //...Metrics.paddingStartMain,
    //...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },
  mainBTN: {
    backgroundColor: Colors.white,
    ...Metrics.tinyPowEndMArgin,
    ...ApplicationStyles.borderRadiusCards,
    ...ApplicationStyles.shadow,
    ...Metrics.mediumHorizontalPadding,
    ...Helpers.center,
    ...Metrics.mediumVerticalPadding,
    // width: width * 0.25,
    // height: width * 0.15,
  },

  text: {
    ...Fonts.input,
    // color: Colors.white,
  },
});

export default styles;
