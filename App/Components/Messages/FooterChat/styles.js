import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Helpers, Metrics, ApplicationStyles} from '../../../Theme';
import {normal} from '../../../Theme/Metrics';
const isIos = Platform.OS === 'ios' ? true : false;

const styles = StyleSheet.create({
  chatFooter: {
    backgroundColor: Colors.toolbarChat,
    elevation: 0,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: Colors.white,
    borderTopWidth: 0,
    paddingHorizontal: normal,
  },
  footerRowContainer: {
    ...Helpers.rowCenter,
    justifyContent: 'space-between',
    marginBottom: isIos ? 30 : 10,
  },
  inputWraper: {
    borderRadius: 25,
    height: '100%',
    marginTop: 8,
    ...Helpers.row,
    // alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingStart: 0,
  },
  input: {
    width: '100%',
    height: '100%',
    color: Colors.lightBlue,
    backgroundColor: Colors.white,
    borderRadius: normal * 5,
    paddingHorizontal: normal * 1.5,
    marginVertical: normal * 1,
    marginTop: 20,
    marginBottom: 20,
    textAlignVertical: 'center',
    paddingTop: isIos ? 10 : 0,
    // ...ApplicationStyles.textInputIos,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 100,
    ...Helpers.center,
    backgroundColor: Colors.lightBlue,
    ...Helpers.center,
    marginLeft: 8,
  },
  leftItems: {
    ...Helpers.rowCenter,
  },
  attachIconHolder: {
    ...Helpers.center,
    height: 38,
    width: 38,
    borderRadius: 100,
    marginTop: 8,
    // backgroundColor: 'red',
  },
  attachIcon: {
    // marginHorizontal: 10,
    // marginStart: 20,
  },
  blockedText: {
    color: Colors.white,
  },
  cancelAudioText: {
    textAlign: 'center',
    color: Colors.lightBlue,
    marginEnd: wp(8),
  },
  containerAttachment: {
    width: '10%',
    ...Helpers.center,
  },
  containerRecording: {
    height: '100%',
    width: '81%',
    ...Helpers.row,
    ...Helpers.center,
    // paddingTop: hp(1.6),
    ...Helpers.mainSpaceAround,
  },
  lottie: {
    height: wp(30),
    width: wp(30),
  },
  secretSection: {
    width: wp(30),
    height: wp(9),
    // backgroundColor: colors.backgroundChat,
    ...Helpers.center,
    ...Metrics.smallRadius,
  },
  secretText: {
    // color: colors.text,
  },
  containerSecretFooter: {
    width: wp(100),
    height: 62,
    // height: isIos ? 75 : 62,
    ...Metrics.horizontalPadding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: 'center',
    // backgroundColor: colors.bgSecretContainer,
    ...Helpers.row,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
});

export default styles;
