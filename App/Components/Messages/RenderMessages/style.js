import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Colors} from 'App/Theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  slackImage: {
    width: width * 0.4,
    height: width * 0.45,
  },
  messageImageContainer: {
    width: wp(70),
    height: wp(70),
    marginBottom: hp(0.5),
    ...Metrics.normalRadius,
    ...Metrics.tinyTopMargin,
    ...Metrics.tinyHorizontalMargin,
  },
  messageImage: {...Helpers.fullSize, borderRadius: 15},
  indicatorStyle: {
    width: wp(70),
    height: wp(70),
    ...Metrics.normalRadius,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,1)',
    // backgroundColor: colors.chatRoomIndicatorBg,
    top: 0,
    opacity: 0.5,
    ...Helpers.center,
  },
  tryAgainContainer: {
    width: wp(70),
    height: wp(70),
    ...Metrics.normalRadius,
    position: 'absolute',
    // backgroundColor: colors.chatRoomTryAgainContainer,
    backgroundColor: 'white',
    top: 0,
    // opacity: 0.5,
    ...Helpers.center,
  },
  tryAgain: {
    width: 100,
    height: 60,
    backgroundColor: Colors.blackTint07,
    ...Helpers.center,
    ...Metrics.normalRadius,
  },
  tryAgainTxt: {color: 'red'},
  lottieUploadAudio: {
    height: wp(16.5),
    width: wp(16.5),
    marginTop: hp(0.5),
    ...Helpers.center,
  },
});

export default styles;
