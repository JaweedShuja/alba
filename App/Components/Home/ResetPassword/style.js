import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
  },
  input: {
    width: '100%',
    // ...ApplicationStyles.paddingHorizontalTextInputs,
    marginTop: width * 0.25,
  },
  inputReEnter: {
    width: '100%',
    // ...ApplicationStyles.paddingHorizontalTextInputs,
    marginTop: width * 0.02,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
  },
  btn: {
    marginTop: width * 0.1,
  },
  errorText: {fontSize: normal * 1.2, color: Colors.error},
});
