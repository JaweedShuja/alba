import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
  container: {
    ...Metrics.normalRadius,
    height: width * 0.65,
    ...Metrics.normalTopMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...Helpers.crossCenter,
  },
  downloadBtn: {
    ...ApplicationStyles.buttonDownload,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
  },
  image: {
    width: '100%',
    height: width * 0.46,
  },
  textTitle: {
    color: Colors.text,
    ...Fonts.input,
    ...Metrics.verticalPadding,
    backgroundColor: Colors.lessonGray,
    width: '100%',
    textAlign: 'center',
    ...ApplicationStyles.borderRadiusImageCards,
  },
});
