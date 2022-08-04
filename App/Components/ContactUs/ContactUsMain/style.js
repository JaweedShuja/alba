import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {medium} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
  },
  text: {
    ...Fonts.input,
    color: Colors.text,
    ...Metrics.mediumTopMargin,
  },
  viewMessage: {
    width: '100%',
    height: width * 0.35,
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow,
    ...Metrics.borderRadiusContactUs,
    ...Metrics.mediumVerticalMargin,
    ...Metrics.mediumPadding,
  },
  sendBtn: {
    position: 'absolute',
    backgroundColor: Colors.login,
    width: width * 0.08,
    height: width * 0.08,
    ...Helpers.center,
    borderRadius: 1000,
    bottom: medium,
    right: medium,
  },
  viewInput: {
    flexDirection: 'row',
    // ...Helpers.crossCenter,
    // backgroundColor: 'red',
    width: '90%',
    ...ApplicationStyles.textInputIos,
  },
  textInput: {
    color: Colors.login,
    ...Metrics.normalStartMargin,
    ...Fonts.normal,
    width: '90%',
    textAlignVertical: 'top',
    // backgroundColor: 'blue',
    marginTop: '-2.3%',
    textAlign: 'justify',
  },
});
