import {Dimensions, StyleSheet, Platform} from 'react-native';
import {
  Helpers,
  Metrics,
  Fonts,
  Colors,
  ApplicationStyles,
} from '../../../Theme';
import {color} from 'react-native-reanimated';
import {normal} from 'App/Theme/Metrics';
import {FontFamily} from '../../../Theme/FontFamily';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'red',
    width: '100%',
    ...Helpers.center,
    // ...ApplicationStyles.inPutCompletionProfile,
  },
  FlatList: {
    width: '100%',
  },
  btn: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'red',
    ...Helpers.crossCenter,
    ...Metrics.verticalMargin,
  },
  text: {
    ...FontFamily.bold,
    ...Fonts.h3,
    color: Colors.lightBlue,
    ...Metrics.verticalMargin,
  },
  input: {
    width: width * 0.9,
    color: Colors.lightBlue,
    backgroundColor: Colors.replyMessage,
    borderRadius: normal * 5,
    paddingHorizontal: normal * 1.5,
    //marginHorizontal: normal * 1.5,
    marginVertical: normal * 1,
    marginTop: 20,
    marginBottom: 20,
    textAlignVertical: 'center',
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
});

export default styles;
