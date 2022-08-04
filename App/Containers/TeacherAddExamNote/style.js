import {StyleSheet, Dimensions} from 'react-native';
import {Colors, ApplicationStyles, Metrics, Helpers, Fonts} from 'App/Theme';
import {medium} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  finishBtn: {
    ...ApplicationStyles.buttonAddNote,
    zIndex: 1000,
    backgroundColor: Colors.green,
    width: '89%',
  },
  text: {
    ...ApplicationStyles.textWhite,
  },
  viewMessage: {
    width: '100%',
    height: width * 0.35,
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow,
    ...Metrics.borderRadiusContactUs,
    ...Metrics.verticalMargin,
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
    width: '90%',
    ...ApplicationStyles.textInputIos,
  },
  textInput: {
    color: Colors.text,
    ...Fonts.normal,
    width: '90%',
    textAlignVertical: 'top',
    marginTop: '-2.3%',
    textAlign: 'justify',
  },
  textInput1: {
    color: Colors.text,
    ...Fonts.normal,
    textAlignVertical: 'center',
    textAlign: 'justify',
  },
  textInput2: {
    color: Colors.text,
    ...Fonts.normal,
    textAlignVertical: 'top',
    textAlign: 'justify',
  },
});

export default styles;
