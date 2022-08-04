import {Dimensions, StyleSheet, Platform, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors} from 'App/Theme';
import FontFamily from '../../../Theme/FontFamily';

const isIos = Platform.OS === 'ios' ? true : false;
const isRTL = I18nManager.isRTL;
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
    width: width,
    height: isIos ? width * 0.25 : width * 0.16,
    justifyContent: 'center',
    flexDirection: isRTL ? 'row' : 'row-reverse',
    alignItems: 'flex-end',
  },
  title: {
    ...Fonts.h3,
    color: Colors.text,
    ...FontFamily.regular,
    // position: 'absolute',
    // alignSelf: 'center',
    // bottom: width * 0.033,
  },

  btn: {
    borderRadius: 1000,
    width: width * 0.1,
    height: width * 0.1,
    ...Helpers.center,
    marginLeft: -width * 0.05,
    marginBottom: width * 0.015,
  },
  btnClose: {
    position: 'absolute',
    borderRadius: 1000,
    width: width * 0.1,
    height: width * 0.1,
    ...Helpers.center,
    right: width * 0.05,
    bottom: width * 0.011,
  },
  image: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: 1000,
    ...Metrics.normalEndMargin,
    // backgroundColor: 'red',
  },
  imageView: {
    flexDirection: 'row',
    ...Helpers.center,
    marginBottom: width * 0.023,
    // backgroundColor: 'green',
  },
  imageView1: {
    marginBottom: width * 0.033,
    ...Helpers.crossCenter,
    // backgroundColor: 'green',
  },
});

export default styles;
