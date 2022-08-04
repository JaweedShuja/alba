import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
  },
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    ...Metrics.paddingBottomFlatList,
  },
  mainView: {
    ...Metrics.normalRadius,
    height: width * 0.51,
    ...Metrics.verticalMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
  },
  viewType: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: Colors.lightBlue,
    ...Metrics.normalRadius,
    ...Metrics.powHorizontalPadding,
    ...Metrics.tinyVerticalPadding,
  },
  textType: {
    color: Colors.white,
    fontSize: normal * 1.5,
  },
  viewTop: {
    height: '80%',
    width: '100%',
    ...Metrics.mediumHorizontalPadding,
  },

  title: {
    color: Colors.text,
    ...Fonts.input,
    ...Metrics.normalTopMargin,
  },
  text: {
    color: Colors.text,
    fontSize: normal * 1.3,

    ...Metrics.horizontalMargin,
  },
  viewTextIcon: {
    flexDirection: 'row',
    ...Metrics.mediumTopMargin,
    ...Helpers.crossCenter,
  },
  textTitle: {
    ...ApplicationStyles.title,
    marginStart: 0,
  },
});
