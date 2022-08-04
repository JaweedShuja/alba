import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {FontFamily} from '../../../Theme/FontFamily';
import {dWidth} from '../../../Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {},
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Metrics.paddingHorizontalMain,
    alignItems: 'center',
  },
  flatList: {
    marginTop: dWidth(4),
    // ...Metrics.paddingStartMain,
  },
  FlatListContent: {
    ...Metrics.paddingHorizontalMain,
  },
  mainView: {
    width: dWidth(55),
    height: dWidth(30),
    marginEnd: dWidth(5),
    borderRadius: dWidth(5),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: dWidth(5),

    ...Metrics.paddingHorizontalMain,
  },
  textList: {
    marginTop: dWidth(8),
    color: Colors.white,
    fontSize: dWidth(8),
    ...FontFamily.regular,
  },
  seeAll: {
    ...FontFamily.regular,
    fontSize: dWidth(4),
    color: Colors.lightBlue,
  },
  title: {
    ...FontFamily.regular,
    fontSize: dWidth(4.5),
    color: Colors.text,
  },
});
