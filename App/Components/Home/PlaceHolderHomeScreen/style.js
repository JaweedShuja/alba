import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const LARGE_HEIGHT = height / 4.7;

const LARGE_WIDTH = width;
const styles = StyleSheet.create({
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    ...Helpers.crossCenter,
    ...Metrics.paddingBottomFlatList,
  },
  mainBTN: {
    ...Metrics.normalRadius,
    width: width * 0.43,
    height: width * 0.6,
    ...Metrics.horizontalMargin,
    ...Metrics.verticalMargin,
    backgroundColor: Colors.white,
    flexGrow: 1,
    alignSelf: 'flex-start',
  },
  image: {
    width: width * 0.4,
    height: width * 0.35,
    position: 'absolute',
    bottom: width * 0.01,
    alignSelf: 'center',
  },
  cover: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: width * 0.22,

    borderBottomLeftRadius: 1000000000,
    borderBottomRightRadius: 1000000000,
    borderTopLeftRadius: 100000000,
    borderTopRightRadius: 100000000,
    zIndex: 100,
    ...Helpers.center,
  },
  title: {
    color: 'white',
    ...Fonts.h4,
    textAlign: 'center',
  },
  SkeletonPlaceholderCardMain: {
    height: LARGE_HEIGHT,
    width: LARGE_WIDTH,
    ...Metrics.verticalMargin,
  },
  SkeletonPlaceholderCard: {
    height: height / 5.2,
    width: '91%',
    alignSelf: 'center',
    ...Metrics.normalRadius,
  },
});

export default styles;
