import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {small} from 'App/Theme/Metrics';

export default StyleSheet.create({
  scrollView: {
    // flexGrow: 1,
    flex: 1,
    // backgroundColor: 'red',
  },
  finishBtn: {
    ...ApplicationStyles.buttonAddNote,
    zIndex: 1000,
    backgroundColor: Colors.green,
    width: '89%',
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  text: {
    ...ApplicationStyles.textWhite,
    textAlign: 'center',
  },
  scoreInput: {
    backgroundColor: Colors.white,
    width: '30%',
    height: '100%',
    // borderWidth: 1,
    textAlign: 'center',
    borderTopLeftRadius: small,
    borderBottomLeftRadius: small,
    ...ApplicationStyles.textInputIos,

    // borderColor: Colors.green,
  },
  submitScore: {
    flex: 1,
    ...Helpers.center,
    width: '70%',
    height: '100%',
    // backgroundColor: Colors.lightBlue,
  },
});
