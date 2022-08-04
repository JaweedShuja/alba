import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors} from 'App/Theme';
import {FontFamily} from '../../Theme/FontFamily';
import {normal} from '../../Theme/Metrics';
const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
  container: {
    ...Helpers.fill,
    backgroundColor: 'white',
  },
  textEmpty: {
    ...FontFamily.bold,
    color: Colors.reColorless,
    fontSize: normal * 2,
  },
});
