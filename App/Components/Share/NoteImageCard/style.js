import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    ...Metrics.normalRadius,
    height: width * 0.65,
    ...Metrics.normalTopMargin,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...Helpers.crossCenter,
  },
  downloadBtn: {
    ...ApplicationStyles.buttonDelete,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
  },
  image: {
    width: '100%',
    height: width * 0.55,
    ...ApplicationStyles.borderRadiusImageCards,
  },
  textTitle: {
    ...Fonts.h5,
    color: Colors.text,
    //...Fonts.input,
    ...Metrics.verticalPadding,
  },
});

export default styles;
