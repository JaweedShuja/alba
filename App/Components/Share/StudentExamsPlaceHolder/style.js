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
    backgroundColor: Colors.white,
    height: width * 0.4,
    ...Metrics.normalPaddingTop,
  },
  viewType: {
    backgroundColor: Colors.lightBlue,
    ...Metrics.normalRadius,
    ...Metrics.powHorizontalPadding,
    ...Metrics.tinyVerticalPadding,
    start: 10,
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
  },
  text: {
    color: Colors.text,
    fontSize: normal * 1.3,
    ...Metrics.smallHorizontalMargin,
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
});

export default styles;
