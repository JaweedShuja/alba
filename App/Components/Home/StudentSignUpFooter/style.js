import {Dimensions, StyleSheet, Platform} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  btn: {
    width: width,
    backgroundColor: Colors.redColorLess,
    height: Platform.OS === 'ios' ? width * 0.18 : width * 0.15,
    ...ApplicationStyles.borderRadiusImageCards,
    ...Helpers.center,
  },
  text: {
    ...Fonts.input,
    color: Colors.white,
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
  },
});
