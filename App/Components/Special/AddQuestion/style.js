import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
  },
  viewNewQuestion: {
    width: '100%',

    ...ApplicationStyles.shadow,
    backgroundColor: Colors.white,
    ...ApplicationStyles.borderRadiusCards,
    ...Metrics.twoTinyPowHorizontalPadding,
    flexDirection: 'row',
  },
  title: {
    ...ApplicationStyles.textTitleAddNote,
  },
  textInput: {
    width: '95%',
    ...Metrics.powHorizontalPadding,
    textAlignVertical: 'top',
    height: width * 0.3,
    ...ApplicationStyles.textInputIos,
  },
  icon: {
    marginTop: normal,

    paddingHorizontal: 5,
  },
  errorText: {fontSize: normal * 1.2, color: Colors.error},
});
