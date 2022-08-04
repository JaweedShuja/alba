import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  mainBTN: {
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Helpers.crossCenter,
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    // height: width * 0.15,
    // ...Metrics.mediumBottomMargin,
    marginTop: normal * 1.2,
    ...Metrics.smallRadius,
    ...Metrics.powHorizontalPadding,
  },
  viewOption: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
  },

  answerInput: {
    // backgroundColor: 'blue',
    width: '88%',
    ...Metrics.normalStartPadding,
    color: Colors.text,
    ...ApplicationStyles.textInputIos,
  },
  textOption: {
    color: Colors.text,
    ...Fonts.normal,
  },
  btn: {
    // backgroundColor: 'red',
    padding: 10,
  },
});
