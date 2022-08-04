import {Dimensions, StyleSheet, Platform, I18nManager} from 'react-native';
import {Helpers} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');
const positionRTL = I18nManager.isRTL ? true : false;
const isIos = Platform.OS === 'ios' ? true : false;
let a = false;
if (positionRTL) {
  a = normal * 1.2;
  if (isIos) a = normal * 1.2;
} else {
  a = normal * 34.2;
  if (isIos) a = normal * 37.2;
}
const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    borderRadius: 1000,
    width: width * 0.1,
    height: width * 0.1,
    ...Helpers.center,
    top: Platform.OS === 'ios' ? width * 0.135 : width * 0.05,
    end: a,
    start: a,
    zIndex: 1000,
    // backgroundColor: 'red',
    // marginLeft: normal * 1.2,
    // marginBottom: width * 0.015,
  },
});

export default styles;
