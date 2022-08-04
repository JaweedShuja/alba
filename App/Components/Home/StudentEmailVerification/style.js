import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
    flex: 1,
  },
  btn: {
    position: 'absolute',
    bottom: width * 0.05,
    width: '100%',
    alignSelf: 'center',
    ...ApplicationStyles.button,
    backgroundColor: Colors.lightBlue,
  },
  textBtn: {
    ...ApplicationStyles.textWhite,
  },
  viewEmail: {
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    ...Metrics.mediumTopMargin,
    ...Helpers.crossCenter,
  },
  text: {
    ...Fonts.h4,
    ...Metrics.mediumTopMargin,
    color: Colors.text,
  },
  textEmail: {
    color: Colors.textColorLess,
    ...Fonts.input,
  },
  textTryAgain: {
    ...Fonts.normal,
    //color: Colors.lightBlue,
  },
  time: {
    color: Colors.lightBlue,
    ...Fonts.h4,
    width: '100%',
    textAlign: 'center',
    marginTop: normal * 5,
  },
  email: {
    width: '65%',

    textAlign: 'justify',
    ...Fonts.normal,
  },
  root: {flex: 1, padding: 200, backgroundColor: 'red'},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {...Metrics.mediumTopMargin},
  cell: {
    width: width * 0.14,
    height: width * 0.14,
    backgroundColor: Colors.lightBlue,
    borderRadius: 1000,
    opacity: 1,
    ...Helpers.center,

    fontSize: 24,
  },
  focusCell: {
    opacity: 0.5,
  },
  textCell: {
    ...Fonts.h4,
    color: Colors.white,
  },
  resentBtn: {
    width: width * 0.2,
    height: width * 0.1,

    ...Helpers.center,
    ...Metrics.normalPadding,
  },
  directionStyle: {flexDirection: 'row'},
});

export default styles;
