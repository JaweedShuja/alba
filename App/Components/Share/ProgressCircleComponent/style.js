import {StyleSheet} from 'react-native';
import {Fonts, Colors} from 'App/Theme';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    color: Colors.text,
    ...Fonts.input,
  },
});

export default styles;
