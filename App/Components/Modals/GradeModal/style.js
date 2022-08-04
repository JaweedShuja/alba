import {Dimensions, StyleSheet} from 'react-native';
import {
  Helpers,
  Metrics,
  Fonts,
  Colors,
  ApplicationStyles,
} from '../../../Theme';
import {color} from 'react-native-reanimated';
import {normal} from 'App/Theme/Metrics';
import {FontFamily} from '../../../Theme/FontFamily';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.inPutCompletionProfile,
  },
  FlatList: {
    width: '100%',
  },
  btn: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'red',
    ...Helpers.crossCenter,
    ...Metrics.verticalMargin,
  },
  text: {
    ...Metrics.mediumStartMargin,
    ...FontFamily.regular,
    ...Fonts.input,
  },
});
