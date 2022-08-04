import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Colors, ApplicationStyles} from 'App/Theme';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  finishBtn: {
    ...Helpers.center,
    ...Metrics.smallRadius,
    backgroundColor: Colors.green,
    width: '89%',
    height: width * 0.12,
    //...ApplicationStyles.buttonAddNote,
    //zIndex: 1000,
  },
  text: {
    ...ApplicationStyles.textWhite,
  },
});

export default styles;
