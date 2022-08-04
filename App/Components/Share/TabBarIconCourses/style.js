import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Colors} from 'App/Theme';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Helpers.center,
    width: width * 0.3,
    height: (width * 0.3) / 1.71,
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
    // alignItems: 'center',
    // height: width * 0.1,
    //backgroundColor: 'red',
  },
  circleView: {
    borderRadius: 1000,
    width: width * 0.01,
    height: width * 0.01,
    ...Metrics.tinyTopMargin,
    alignSelf: 'center',
    position: 'absolute',
    //top: 30,
    //bottom: width * 0.01,
    bottom: 20,
  },
  Icon: {
    alignSelf: 'center',
  },
  viewIcon: {
    position: 'absolute',
    top: -width * 0.08,
    borderRadius: 1000,
    ...Helpers.center,
    padding: 1,
    // backgroundColor: 'red',
    // width: width * 0.18,
    // height: width * 0.18,
    // backgroundColor: 'blue',
    // zIndex: 10001,
  },
  view: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 1000,
    width: width * 0.15,
    height: width * 0.15,
    ...Helpers.center,
    // padding: 10,
  },
});

export default styles;
