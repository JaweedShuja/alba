import {StyleSheet, I18nManager, Dimensions} from 'react-native';
import {Metrics, Colors, ApplicationStyles} from '../../../Theme';
import {FontFamily} from '../../../Theme/FontFamily';
import {normal} from '../../../Theme/Metrics';
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  iconStyle: {
    marginHorizontal: 14,
    color: '#ff6744',
    width: 25,
    height: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  input: {
    ...FontFamily.light,
    marginVertical: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: normal * 1.5,
  },
  inputContainerStyle: {
    alignSelf: 'center',
    // backgroundColor: 'yellow',
    width: '100%',
    paddingVertical: -1000,
    paddingTop: -1000,
    paddingBottom: -100,
    paddingHorizontal: 0,
  },
  inputContainer: {
    // backgroundColor: 'yellow',

    marginTop: normal * 1.5,
  },
  contentInput: {
    width: '100%',
    // backgroundColor: 'red',
    ...ApplicationStyles.textInputIos,
    ...Metrics.horizontalPadding,
    borderWidth: 0.7,
    borderRadius: 3,
    ...FontFamily.regular,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  error: {
    marginTop: 5,
    fontSize: normal * 1.2,
    color: Colors.error,
  },
});

export default styles;
