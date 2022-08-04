import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors} from 'App/Theme';
const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    ...Helpers.center,
  },
  circleView: {
    borderRadius: 1000,
    width: width * 0.01,
    height: width * 0.01,
    ...Metrics.tinyTopMargin,
    alignSelf: 'center',
  },
  Icon: {
    alignSelf: 'center',
  },
});
