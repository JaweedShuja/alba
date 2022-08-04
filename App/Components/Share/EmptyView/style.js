import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {FontFamily} from 'App/Theme/FontFamily';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    ...Helpers.center,
    flex: 1,
    backgroundColor: Colors.white,
    marginBottom: width * 0.15,
    // ...Helpers.fillCenter,
  },
  textEmpty: {
    ...FontFamily.boldItalic,
    color: Colors.commonGray,
    // fontSize: normal * 3,
    textAlign: 'center',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
});

export default styles;
