import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {FontFamily} from '../../../Theme/FontFamily';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...Metrics.paddingHorizontalMain,
    ...Metrics.smallVerticalPadding,
    alignSelf: 'center',
  },
  viewBody: {
    backgroundColor: Colors.white,
    width: '100%',
    height: width * 0.38,
    borderRadius: normal * 1.2,
    ...Metrics.verticalPadding,
    ...Metrics.smallHorizontalPadding,
    ...ApplicationStyles.shadow,
    ...Helpers.mainSpaceBetween,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: width * 0.27,
    height: width * 0.3,
    ...ApplicationStyles.borderRadiusCards,
    marginStart: width * 0.01,
  },
  viewTexts: {
    width: '63%',
    height: '95%',
    alignItems: 'flex-start',
  },
  textName: {
    ...Fonts.h3,
    color: Colors.text,
    ...FontFamily.bold,
  },
  textLesson: {
    ...Fonts.input,
    color: Colors.textColorLess,
    ...FontFamily.regular,
  },
  textDesc: {
    ...Fonts.normal,
    color: Colors.textColorLess,

    textAlign: 'justify',
    ...Metrics.tinyPowEndMArgin,
    marginTop: normal * 0.2,
    ...FontFamily.regular,
  },
});

export default styles;
