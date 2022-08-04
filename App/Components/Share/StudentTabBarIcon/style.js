import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Colors} from 'App/Theme';
const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    ...Helpers.center,
    width: '100%',
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 10,
    //flex: 1,
    // alignItems: 'center',
    //zIndex:9999,
    //height:'100%'
  },
  circleView: {
    borderRadius: 1000,
    width: width * 0.01,
    height: width * 0.01,
    ...Metrics.tinyTopMargin,
    alignSelf: 'center',
    position: 'absolute',
    bottom: -7,
  },
  Icon: {
    alignSelf: 'center',
  },
});

export default styles;
