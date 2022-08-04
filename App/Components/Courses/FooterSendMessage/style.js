import {Dimensions, StyleSheet, Platform, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');
const isIos = Platform.OS === 'ios' ? true : false;

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.toolbarChat,
    paddingVertical: normal * 1.5,
  },
  input: {
    // borderWidth: 1,
    flex: 1,
    // marginLeft: 10,
    marginHorizontal: normal * 2,
    borderRadius: normal * 3,
    backgroundColor: Colors.white,
    paddingHorizontal: normal,
    color: Colors.lightBlue,
    ...ApplicationStyles.textInputIos,
    paddingTop: isIos ? width * 0.04 : 0,
    // paddingStart: 100,
    marginBottom: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  sendContainer: {
    width: normal * 4.0,
    height: normal * 4.0,
    backgroundColor: Colors.lightBlue,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: normal * 2,
    marginBottom: isIos ? 10 : 0,
    // ...ApplicationStyles.shadow,

    // margin: 10,
  },
  sendTxt: {
    color: 'white',
  },
});

export default styles;
