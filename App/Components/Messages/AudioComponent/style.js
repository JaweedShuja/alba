import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';

export default styles = StyleSheet.create({
  audioContainer: {
    width: wp(60),
    height: hp(7),
    ...Metrics.tinyTopMargin,
    ...Metrics.smallRadius,
    ...Helpers.rowCenter,
  },
  containerPlayPause: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(6),
    ...Helpers.center,
    backgroundColor: Colors.lightBlue,
    top: 5,
    left: 15,
  },
  lottieUploadAudio: {
    height: wp(16.5),
    width: wp(16.5),
    marginTop: hp(0.5),
    ...Helpers.center,
    top: 5,
    left: 5,
  },
  audioContainerStart: {
    flex: 1.5,
    ...Helpers.center,
  },
  lottiePlayAudio: {
    height: wp(8),
    width: wp(8),
  },
  lottieEqulizerAudio: {
    height: wp(18),
    width: wp(50),
    top: 5,
    // backgroundColor: 'red',
  },
  audioContainerEnd: {
    flex: 8,
    // ...Helpers.mainCenter,
    // ...Helpers.mainStart,
    paddingHorizontal: normal * 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
});
