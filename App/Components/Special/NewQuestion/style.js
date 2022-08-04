import {Dimensions, StyleSheet, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.spaceVerticalHorizontalListCourse,
    flexDirection: 'row',
    alignItems: 'center',
    ...Metrics.horizontalPadding,
  },
  textHeader: {
    ...Fonts.input,
    ...Metrics.paddingStartMain,
    color: Colors.textColorLess,
  },
  flatList: {
    // transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}],
    //marginTop: normal * 1,
    // transform: [{rotateX: I18nManager.isRTL ? '180deg' : '0deg'}],
    //backgroundColor: 'red',
    //flex: 1,
  },
  flatListContent: {
    ...Metrics.verticalPadding,
    flexDirection: 'row-reverse',
    flexGrow: 1,
    //...Metrics.horizontalPadding,
    // transform: [{rotate:''}],
    // transform: [{scaleX: I18nManager.isRTL ? '180deg' : '0deg'}],
  },
  mainBTN: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: Colors.lightBlue,
    // ...Metrics.smallRadius,
    ...ApplicationStyles.shadow,
    ...Helpers.center,
    borderRadius: normal * 1,
    ...Metrics.normalEndMargin,
  },
  text: {
    color: Colors.white,
    ...Fonts.input,
  },
  deleteBtn: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: Colors.error,
    // ...Metrics.smallRadius,
    ...ApplicationStyles.shadow,
    ...Helpers.center,
    borderRadius: normal * 1,
    position: 'absolute',
  },
  deleteText: {
    color: Colors.white,
  },
});

export default styles;
