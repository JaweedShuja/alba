import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, Shadow} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    paddingHorizontal: normal * 3.8,
    marginVertical: normal * 7,
  },
  studentBtn: {
    backgroundColor: Colors.lightBlue,
    ...Helpers.center,
    borderRadius: normal * 10,
    height: width * 0.1,
  },
  teacherBtn: {
    backgroundColor: Colors.redColorLess,
    ...Helpers.center,
    borderRadius: normal * 10,
    marginTop: normal * 1.8,
    height: width * 0.1,
  },
  text: {
    color: Colors.white,
    ...Fonts.input,
    // marginVertical: normal * 0.8,
  },
});
