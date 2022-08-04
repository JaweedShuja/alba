import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {FontFamily} from '../../../Theme/FontFamily';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  errorText: {
    fontSize: normal * 1.2,
    ...FontFamily.lightItalic,
    color: Colors.error,
    marginTop: normal * 0.3,
  },
});
