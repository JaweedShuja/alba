import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
  FlatList: {
    ...Metrics.mediumHorizontalPadding,
    ...Helpers.crossCenter,
    ...Metrics.paddingBottomFlatList,
  },
  mainBTN: {
    width: width * 0.9,
    height: width * 0.28,
    borderBottomWidth: 0.4,
    ...Helpers.center,
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  image: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: normal * 1000,
  },

  viewleftparent: {
    flexDirection: 'row',
  },
  viewparenttexts: {
    ...Metrics.mediumHorizontalPadding,
    width: width * 0.7,
  },
  viewnamejob: {
    flexDirection: 'row',
  },
  viewrightparent: {
    height: '100%',
    ...Helpers.crossCenter,
    alignSelf: 'center',
    width: width * 0.1,
  },
  texttime: {
    ...Fonts.normal,
    color: Colors.textColorLess,
    marginTop: width * 0.085,
  },
  unreadmeassagecount: {
    backgroundColor: Colors.redColorLess,
    ...Helpers.center,
    borderRadius: normal * 100,
    width: width * 0.07,
    height: width * 0.07,
    ...Metrics.smallTopMargin,
  },
  textunread: {
    color: Colors.white,
    fontSize: normal * 1.1,
  },
  textname: {
    ...Fonts.input,
    color: Colors.text,
  },
  textmessage: {
    ...Fonts.normal,
    color: Colors.textColorLess,
    ...Metrics.smallTopMargin,
    width: '100%',
  },
});
