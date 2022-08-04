import {StyleSheet, Dimensions} from 'react-native';
import {ApplicationStyles} from 'App/Theme';
import {Colors} from '../../Theme';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  text: {
    ...ApplicationStyles.title,
  },
  image: {
    width: width * 0.7,
    height: width * 0.755,
    //backgroundColor:'red'
  },
  loading: {
    marginBottom: width * 0.05,
    color: Colors.red,
    fontSize: width * 0.035,
  },
});

export default styles;
