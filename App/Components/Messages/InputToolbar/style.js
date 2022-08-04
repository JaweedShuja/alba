import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  inputToolbar: {
    backgroundColor: Colors.toolbarChat,
    ...Helpers.center,
    elevation: 0,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: Colors.white,
    borderTopWidth: 0,
  },
  composer: {
    color: Colors.lightBlue,
    backgroundColor: Colors.white,
    borderRadius: normal * 5,
    paddingHorizontal: normal * 1.5,
    marginEnd: normal * 0.8,
    marginStart: normal * 0.8,
    marginVertical: normal * 1,
    marginTop: 20,
    marginBottom: 20,
  },
  actions: {
    ...Helpers.center,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 0,
    marginStart: 7,
    marginBottom: 0,
  },
  send: {
    ...Helpers.center,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    marginStart: 0,
    marginEnd: 7,
    marginBottom: 0,
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
    marginTop: heightPercentageToDP(1.6),
    ...Helpers.mainSpaceAround,
  },
  lottie: {
    height: widthPercentageToDP(30),
    width: widthPercentageToDP(30),
  },
});
