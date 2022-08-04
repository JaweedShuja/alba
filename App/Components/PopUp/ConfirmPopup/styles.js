import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Helpers, Metrics} from '../../../Theme';
import {dHeight, dWidth} from '../../../Theme/Metrics';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: dHeight(3),
    width: dWidth(75),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    color: 'black',
    ...Fonts.h5,
  },
  description: {
    color: 'black',
    ...Fonts.input,
    marginTop: dHeight(3),
    marginBottom: dHeight(2.1),
    textAlign: 'center',
    width: '70%',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#f2f2f2',
    opacity: 0.7,
  },
  btns: {
    height: dHeight(7),
    width: '80%',
    ...Helpers.center,
  },
  confirm: {
    color: '#4fbcff',
  },
});

export default styles;
