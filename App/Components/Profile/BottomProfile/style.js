import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    paddingBottom: normal * 1.5,
  },
  btn: {
    width: '98%',
    alignSelf: 'center',
    alignItems: 'center',
    height: width * 0.14,
    borderRadius: normal * 1.4,
    ...Metrics.smallVerticalMargin,
    ...Helpers.center,
    ...Helpers.mainSpaceBetween,
    ...Metrics.mediumHorizontalPadding,
    flexDirection: 'row',
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
  },
  btn1: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    height: width * 0.14,
    ...Helpers.mainSpaceBetween,
    flexDirection: 'row',
  },
  collapse: {
    width: '98%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: normal * 1.4,
    ...Metrics.smallVerticalMargin,
    ...Helpers.center,
    ...Helpers.mainSpaceBetween,
    ...Metrics.mediumHorizontalPadding,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
  },
  viewleft: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
  },
  text: {
    fontSize: normal * 1.3,
    ...Metrics.mediumStartMargin,
    color: Colors.text,
  },
  image: {
    width: normal * 2.5,
    height: normal * 2.5,
    backgroundColor: 'red',
    borderRadius: normal * 0.7,
  },
});

export default styles;
