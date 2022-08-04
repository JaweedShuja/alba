import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {small} from '../../Theme/Metrics';

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
    ...Helpers.center,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  text: {
    ...ApplicationStyles.textWhite,
    // width: '70%',
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

    // borderColor: Colors.green,
  },
});
