import {Metrics, Colors, Helpers, ApplicationStyles} from '../../../Theme';
import {StyleSheet, Dimensions} from 'react-native';
import {normal} from '../../../Theme/Metrics';
import {FontFamily} from '../../../Theme/FontFamily';
const {width, height} = Dimensions.get('window');

let screen;

if (height > 600) {
  screen = true;
} else screen = false;

export default styles = StyleSheet.create({
  BtnContainer: {
    ...ApplicationStyles.button,
  },
  textBtn: {
    color: Colors.white,
    fontSize: normal * 2,
    ...FontFamily.regular,
  },
});
