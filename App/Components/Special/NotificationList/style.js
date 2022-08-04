import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {FontFamily} from '../../../Theme/FontFamily';
import {dWidth, LVL_HEIGHT_PHONE} from '../../../Theme/Metrics';
const {width, height} = Dimensions.get('screen');
const borderImage = dWidth(5);
export default styles = StyleSheet.create({
  errorText: {
    fontSize: normal * 1.2,
    ...FontFamily.lightItalic,
    color: Colors.error,
    marginTop: normal * 0.3,
  },
  flatList: {
    marginTop: dWidth(5),
  },
  FlatListContent: {
    ...Metrics.paddingHorizontalMain,
  },
  mainView: {
    width: '100%',
    marginBottom: dWidth(5),
    borderRadius: borderImage,
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow,
    paddingBottom: dWidth(3),
  },
  image: {
    width: '100%',
    height: dWidth(60),
    borderTopRightRadius: borderImage,
    borderTopLeftRadius: borderImage,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: dWidth(4.5),
    ...FontFamily.regular,
    marginBottom: dWidth(5),
  },
  description: {
    paddingHorizontal: dWidth(3),
    marginVertical: dWidth(2),
    fontSize: dWidth(3.8),
    ...FontFamily.regular,
    lineHeight: 20,
    color: Colors.commonGray,
    alignSelf: 'flex-start',
  },
  viewProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dWidth(3),
    // backgroundColor: Colors.red,
  },
  imageProfile: {
    width: dWidth(12),
    height: dWidth(12),
    borderRadius: dWidth(100),
  },
  textView: {
    marginTop: dWidth(4),
    // marginStart: dWidth(5),
  },
  onlineStatus: {
    marginTop: dWidth(2),
    fontSize: dWidth(4),
    ...FontFamily.regular,
    color: Colors.commonGray,
  },
  nameProfile: {
    fontSize: dWidth(5),
    ...FontFamily.regular,
    color: Colors.text,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
