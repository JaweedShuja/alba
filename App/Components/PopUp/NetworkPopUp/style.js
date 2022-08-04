import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Helpers, Metrics} from '../../../Theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(82,84,122, 0.8)', // colors.popUpsBg,
    width: wp(75),
    height: heightPercentageToDP(42),
    alignSelf: 'center',
    ...Metrics.smallPadding,
    ...Metrics.normalRadius,
  },
  closeIcon: {
    ...Helpers.fullWidth,
    ...Helpers.crossEnd,
  },
  main: {
    ...Metrics.mediumTopMargin,
    ...Helpers.crossCenter,
  },
  text: {color: 'white', ...Metrics.verticalMargin, marginTop: 30},
  btnContainer: {
    width: '100%',
    height: '21%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  btn: {
    width: '80%',
    height: '90%',
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnTxt: {color: 'black', fontSize: 15},
});

export default styles;
