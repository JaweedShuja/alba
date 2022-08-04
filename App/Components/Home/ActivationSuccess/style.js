import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  imageBackground: {
    width: width,
    height: height,
    backgroundColor: Colors.lightBlue,
    ...Helpers.center,
    flex: 1,
    ...Metrics.paddingHorizontalMain,
  },
  textSuccess: {
    ...Fonts.h4,
    color: Colors.white,
    ...Metrics.normalTopMargin,
  },
  textDesc: {
    ...Fonts.input,
    color: Colors.white,
    ...Metrics.mediumTopMargin,
  },
  btn: {
    backgroundColor: Colors.white,
    ...ApplicationStyles.button,
    width: '100%',
    marginTop: normal * 10,
  },
  textBtn: {
    ...Fonts.h4,
    color: Colors.lightBlue,
  },
  image: {
    width: normal * 15,
    height: normal * 15,
  },
});
