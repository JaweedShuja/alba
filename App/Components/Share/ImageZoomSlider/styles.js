import {StyleSheet, Dimensions} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, styleSheetFactory} from 'App/Theme';
const {width, height} = Dimensions.get('window');
const styles = styleSheetFactory(({colors}) => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50000,
    width: width,
    height: height,
  },
  closeWrapper: {
    backgroundColor: Colors.whitetint03,
    borderRadius: 100 / 2,
    marginLeft: width / 2.2,
    marginBottom: 50,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: Colors.white,
    ...Helpers.center,
  },
}));

export default styles;
