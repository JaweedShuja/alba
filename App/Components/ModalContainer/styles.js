import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  popup: {
    borderRadius: 40,
    backgroundColor: 'white',
    width: width - 30,
    alignSelf: 'center',
    paddingBottom: 10,
  },
});

export default styles;
