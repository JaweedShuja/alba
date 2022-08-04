import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    // ...Metrics.paddingHorizontalMain,
    position: 'absolute',
    bottom: width * 0.05,
    // backgroundColor: 'red',
    alignSelf: 'center',
    width: '89%',
    zIndex: 1000,
  },
  btn: {
    ...Helpers.center,
    flexDirection: 'row',
    width: '45%',
    backgroundColor: Colors.green,
    height: width * 0.12,
    ...Metrics.smallRadius,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
    ...Metrics.smallHorizontalPadding,
  },
});
