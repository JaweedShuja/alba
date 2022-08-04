import {Dimensions, StyleSheet, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors} from 'App/Theme';
import {normal, dWidth} from 'App/Theme/Metrics';
const {width} = Dimensions.get('screen');

export const ACTION_CHAT_WIDTH = dWidth(20);

export const styles = StyleSheet.create({
  mainBTN: {
    width: width * 0.9,
    height: width * 0.28,
    borderBottomWidth: 0.4,
    ...Helpers.center,
    flexDirection: 'row',
    ...Helpers.mainSpaceBetween,
    borderColor: 'rgba(0,0,0,0.2)',

    backgroundColor: 'white',
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
    width: width * 0.8,
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
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingRight: 2.5,
    ...Helpers.fillRow,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ACTION_CHAT_WIDTH,
  },
  backRightBtnRight: {
    backgroundColor: 'tomato',
    height: '95%',
    alignSelf: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  containerIcon: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTxt: {
    ...Fonts.mediumRegular,
    height: '40%',
    color: 'white',
    textAlign: 'center',
  },
  subTitle: {textAlign: 'left'},
  typeMessage: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
  icon: {
    width: normal * 2,
    height: normal * 2,
  },
  start: {
    flex: 1,
    alignItems: 'flex-start',
  },
  end: {
    alignItems: 'flex-end',
  },
  sub: {
    color: 'grey',
    opacity: 0.6,
  },
});
