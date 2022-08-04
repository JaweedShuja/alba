import {Dimensions, StyleSheet, Platform, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';

const isIos = Platform.OS === 'ios' ? true : false;
const {width} = Dimensions.get('screen');
const positionRTL = I18nManager.isRTL ? true : false;

let a = false;
if (positionRTL) {
  a = normal * 1.2;
  if (isIos) a = normal * 1.2;
} else {
  a = normal * 34.2;
  if (isIos) a = normal * 37.2;
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    // backgroundColor: 'red',
    // height: isIos ? width * 0.25 : width * 0.16,
  },
  container: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  image: {
    width: width,
    height: width * 0.8,
    zIndex: 99,
  },
  absolute: {position: 'absolute'},
  btnPlay: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: Colors.lightBlue,
    width: width * 0.17,
    height: width * 0.17,
    borderRadius: 1000,
    top: width * 0.35,
    ...Helpers.center,
    zIndex: 102,
  },
  viewDesc: {
    ...Metrics.paddingHorizontalMain,
    ...ApplicationStyles.borderRadiusBottomCards,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...Metrics.mediumVerticalPadding,
    alignItems: 'flex-start',
  },
  textTitle: {
    color: Colors.text,
    ...Fonts.input,
    fontWeight: 'bold',
  },
  text: {
    color: Colors.textColorLess,
    ...Fonts.normal,
    ...Metrics.normalTopMargin,
  },
  textDesc: {
    color: Colors.text,
    ...Fonts.input,
    ...Metrics.mediumTopMargin,
    textAlign: 'justify',
  },
});

export default styles;
