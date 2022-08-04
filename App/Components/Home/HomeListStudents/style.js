import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';

const {width, height} = Dimensions.get('screen');
const LARGE_HEIGHT = height / 4.7;
const LARGE_WIDTH = width;

const styles = StyleSheet.create({
  container: {flex: 1},
  FlatList: {
    ...Metrics.paddingBottomFlatList,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginHorizontal: normal * 2,
    // ...Metrics.paddingHorizontalMain,
    // ...Helpers.crossCenter,
  },
  flatList: {
    width: '91%',
    alignSelf: 'center',
    //width: '93%',
    // backgroundColor: 'red',
    // marginHorizontal: 10,
  },
  mainBTN: {
    ...Metrics.normalRadius,
    ...Metrics.verticalMargin,
    ...ApplicationStyles.shadow,
    width: width * 0.43,
    height: width * 0.6,
    backgroundColor: Colors.white,
    // ...Metrics.horizontalMargin,
    // marginHorizontal: 18,
    // alignSelf: 'center',
    // flexGrow: 1,
    // alignSelf: 'flex-start',
  },
  image: {
    width: width * 0.4,
    height: width * 0.35,
    position: 'absolute',
    bottom: width * 0.01,
    alignSelf: 'center',
  },
  cover: {
    ...Helpers.center,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: width * 0.22,
    borderBottomLeftRadius: 1000000000,
    borderBottomRightRadius: 1000000000,
    borderTopLeftRadius: 100000000,
    borderTopRightRadius: 100000000,
    zIndex: 100,
  },
  title: {
    ...Fonts.h4,
    color: 'white',
    textAlign: 'center',
  },
  SkeletonPlaceholderCardMain: {
    ...Metrics.verticalMargin,
    height: LARGE_HEIGHT,
    width: LARGE_WIDTH,
  },
  SkeletonPlaceholderCard: {
    height: height / 5.2,
    width: '91%',
    alignSelf: 'center',
    ...Metrics.normalRadius,
  },
  sliderLoading: {
    ...Metrics.verticalMargin,
    height: LARGE_HEIGHT,
    width: LARGE_WIDTH,
  },
  wrapperStyle: {
    justifyContent: 'space-between',
  },
  row: {
    // flex: 1,
    // ...Metrics.horizontalMargin,
    // ...Metrics.verticalMargin,
  },
});

export default styles;
