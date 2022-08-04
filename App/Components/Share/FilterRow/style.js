import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {color} from 'react-native-reanimated';
import {normal} from 'App/Theme/Metrics';
import {FontFamily} from '../../../Theme/FontFamily';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Metrics.tinyTopMargin,
    ...Metrics.verticalPadding,
  },
  btn: {
    width: '47%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    ...Helpers.center,
    height: width * 0.11,
    borderRadius: normal * 1.2,
    ...ApplicationStyles.shadow,
    ...Helpers.mainSpaceBetween,
    ...Metrics.horizontalPadding,
  },
  image: {
    width: width * 0.043,
    height: width * 0.043,
  },
  text: {
    // ...Fonts.normal,
    fontSize: normal * 1.5,
    color: Colors.text,
    ...FontFamily.regular,
  },
});
