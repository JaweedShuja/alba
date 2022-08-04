import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Colors} from 'App/Theme';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Helpers.center,
    width: '100%',
    backgroundColor: Colors.white,
    // alignItems: 'center',
  },
  circleView: {
    borderRadius: 1000,
    width: width * 0.01,
    height: width * 0.01,
    ...Metrics.tinyTopMargin,
    alignSelf: 'center',
    position: 'absolute',
    bottom: width * 0.01,
  },
  Icon: {
    alignSelf: 'center',
  },
});

export default styles;
