import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  FlatList: {
    ...Metrics.paddingHorizontalMain,
    ...Metrics.verticalPadding,
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  viewMain: {
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    // ...Metrics.verticalMargin,
    ...Metrics.normalRadius,
    width: width * 0.65,
    borderTopRightRadius: 0,
  },
  viewTop: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
    ...Metrics.powHorizontalPadding,
    ...Metrics.verticalPadding,
  },
  viewReplyMessage: {
    ...ApplicationStyles.borderRadiusBottomCards,
    backgroundColor: Colors.replyMessage,
  },
  textMessage: {
    ...Metrics.smallVerticalPadding,
    ...Metrics.smallHorizontalPadding,
    // backgroundColor: 'red',
  },
  viewTexts: {
    // height: '100%',
    // backgroundColor: 'red',
    ...Metrics.smallStartMargin,
    justifyContent: 'center',
    // marginBottom: 15,
  },
  viewType: {
    position: 'absolute',
    right: width * 0.04,
    bottom: width * 0.03,
    // ...Metrics.powHorizontalPadding,
    // ...Metrics.tinyPowRadius,
    paddingVertical: normal * 0.07,
    // ...Metrics.tinyVerticalPadding,
    backgroundColor: Colors.green,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.022,
  },
  textType: {
    color: Colors.white,
    ...Fonts.normal,
  },
  textTitle: {
    color: Colors.text,
    ...Fonts.input,
  },
  textEpisode: {
    color: Colors.textColorLess,
    ...Fonts.normal,
    ...Metrics.tinyTopMargin,
  },
});
