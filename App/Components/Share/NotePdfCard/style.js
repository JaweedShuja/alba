import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    ...Metrics.normalRadius,
    height: width * 0.35,
    ...Metrics.normalTopMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...Helpers.crossCenter,
  },
  viewPdf: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
    ...Metrics.mediumTopMargin,
  },
  downloadBtn: {
    ...ApplicationStyles.buttonDelete,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
  },
  textTitle: {
    ...Fonts.h5,
    color: Colors.text,
    ...Metrics.normalTopMargin,
  },
  textName: {
    ...Fonts.normal,
    color: Colors.lightBlue,
    ...Metrics.normalStartMargin,
  },
  image: {
    width: normal * 2.5,
    height: normal * 2.5,
  },
});

export default styles;
