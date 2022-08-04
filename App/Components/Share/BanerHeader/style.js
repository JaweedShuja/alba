import {Dimensions, StyleSheet, I18nManager, Platform} from 'react-native';
import {Helpers, Metrics, Colors, ApplicationStyles} from 'App/Theme';
import {FontFamily} from '../../../Theme';
import {normal} from '../../../Theme/Metrics';

const {width} = Dimensions.get('screen');
const isIos = Platform.OS === 'ios' ? true : false;

const styles = StyleSheet.create({
  container: {
    width: isIos ? width * 1 : width,
    height: isIos ? width / 2.5 : width / 2.54,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    ...Metrics.fullRadius,
  },
  textContact: {
    ...FontFamily.regular,
    fontSize: isIos ? normal * 2 : normal * 2,
    color: Colors.white,
  },
  contactBTN: {
    flexDirection: 'row',
    ...Helpers.center,
    width: '100%',
    height: '100%',
  },
  viewGradient: {
    ...ApplicationStyles.shadow,
    ...Metrics.input,
    ...Helpers.center,
    ...Metrics.fullRadius,
    width: isIos ? '75%' : '70%',
    height: '100%',
    //height: isIos ? '22%' : '23%',
    //top: isIos ? '34%' : '30%',
    // start: I18nManager.isRTL ? '8%' : null,
    // end: I18nManager.isRTL ? null : '8%',
    // isIos?start:10:start:20,
    // start: I18nManager.isRTL ? (Platform.OS === 'ios' ? '22%' : '8%') : null,
    // end: I18nManager.isRTL ? null : Platform.OS === 'ios' ? '26%' : '8%',
  },
  iconimage: {
    width: width * 0.025,
    height: width * 0.059,
  },
  header: {
    height: isIos ? '22%' : '23%',
    top: isIos ? '2%' : '1%',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    justifyContent: 'center',
    zIndex: 50,
    marginEnd: '26%',
  },
  back: {
    height: isIos ? '22%' : '23%',
    top: isIos ? '14%' : '10%',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 51,
    paddingStart: 8,
    width: '11%',
  },
  top1: {top: isIos ? '2%' : '1%'},
  top2: {top: isIos ? '14%' : '10%'},
});

export default styles;
