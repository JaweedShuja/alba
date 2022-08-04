import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },
  scrollView: {
    flex: 1,
    // ...Metrics.paddingHorizontalMain,
    // backgroundColor: 'red',
    // backgroundColor: 'red',
    // height: width * 20,
  },
});
