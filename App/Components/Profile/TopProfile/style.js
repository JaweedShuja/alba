import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, Shadow} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    ...Helpers.mainSpaceBetween,
    flexDirection: 'row',
    width: '100%',
    marginTop: normal * 9,
  },
  startView: {
    ...Helpers.mainCenter,
    flex: 1,
  },
  endView: {
    backgroundColor: Colors.lightBlue,
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: normal * 100,
    ...Helpers.center,
  },
  welcomeText: {
    color: Colors.textColorLess,
    ...Fonts.h4,
  },
  descText: {
    color: Colors.textColorLess,
    ...Fonts.input,
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  textStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default styles;

// textlogo: {
//   color: Colors.white,
//   ...Fonts.input,
// },
