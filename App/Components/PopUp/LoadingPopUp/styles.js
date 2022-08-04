import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Helpers, Metrics} from '../../../Theme';
import {dHeight, dWidth} from '../../../Theme/Metrics';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Helpers.center,
  },
});

export default styles;
