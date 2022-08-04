import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    ...Metrics.paddingBottomFlatList,
  },
  mainView: {
    ...Metrics.normalRadius,
    ...Metrics.verticalMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    height: width * 0.4,
    ...Metrics.normalPaddingTop,
    // backgroundColor: 'red',
  },
  viewType: {
    backgroundColor: Colors.lightBlue,
    ...Metrics.normalRadius,
    ...Metrics.powHorizontalPadding,
    ...Metrics.tinyVerticalPadding,
    start: 10,
    //position: 'absolute',
    //right: 10,
    //top: 10,
  },
  textType: {
    color: Colors.white,
    fontSize: normal * 1.5,
  },
  viewTop: {
    height: '72%',
    width: '100%',
    ...Metrics.mediumHorizontalPadding,
  },
  btn: {
    height: '28%',
    width: '100%',
    backgroundColor: Colors.green,
    ...ApplicationStyles.borderRadiusBottomCards,
    ...Helpers.center,
  },
  title: {
    color: Colors.text,
    ...Fonts.input,
    //...Metrics.normalTopMargin,
    //textAlign: 'right',
    //flex: 1,
    //alignSelf: 'flex-end',
  },
  text: {
    color: Colors.text,
    fontSize: normal * 1.3,
    ...Metrics.smallHorizontalMargin,
    // ...Fonts.normal,
  },
  endText: {
    color: Colors.text,
    fontSize: normal * 1.3,
  },
  viewTextIcon: {
    flexDirection: 'row',
    ...Metrics.mediumTopMargin,
    ...Helpers.crossCenter,
  },
  horView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  startView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  textTickerContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default styles;
