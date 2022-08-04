import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    ...Metrics.normalRadius,
    height: width * 0.35,
    ...Metrics.normalTopMargin,
    ...Metrics.verticalPadding,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...Helpers.crossCenter,
  },
  viewPdf: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
    ...Metrics.mediumTopMargin,
    width: '100%',
    paddingHorizontal: 15,
  },
  downloadBtn: {
    ...ApplicationStyles.buttonDownload,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
  },
  textTitle: {
    ...Fonts.h4,
    color: Colors.text,
    //...Metrics.normalTopMargin,
  },
  textName: {
    ...Fonts.normal,
    color: Colors.lightBlue,
    ...Metrics.normalStartMargin,
    width: '90%',
  },
  image: {
    width: normal * 2.5,
    height: normal * 2.5,
  },
});

export default styles;
