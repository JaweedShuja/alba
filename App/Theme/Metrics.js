/**
 * This file contains metric values that are global to the application.
 */
import {Dimensions, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Examples of metrics you can define:
export const tiny = wp('0.8%');
console.log({tiny});
const {width, height} = Dimensions.get('screen');

export const small = tiny * 2;
export const normal = tiny * 3;
export const tinyPow = tiny * tiny;
export const medium = normal * 2;
export const dHeight = hp;
export const dWidth = wp;
export const isIOS = Platform.OS === 'ios';
export const LVL_HEIGHT_PHONE = height < 700;
export default {
  //=====================PADDINGS==============
  tinyPadding: {
    padding: tiny,
  },

  normalStartPadding: {
    paddingStart: normal,
  },
  smallPadding: {
    padding: small,
  },
  normalPadding: {
    padding: normal,
  },
  mediumPadding: {
    padding: medium,
  },
  mediumVerticalPadding: {
    paddingVertical: medium,
  },
  tinyPowPadding: {
    padding: tinyPow,
  },

  normalHorizontalPadding: {
    paddingHorizontal: normal,
  },
  //============= PADDING VERTICAL
  smallVerticalPadding: {
    paddingVertical: small,
  },
  verticalPadding: {
    paddingVertical: normal,
  },
  tinyVerticalPadding: {
    paddingVertical: tiny,
  },
  mediumVerticalPadding: {
    paddingVertical: medium * 0.9,
  },
  //============= PADDING HORIZANTAL
  tinyHorizontalPadding: {
    paddingHorizontal: tiny,
  },
  smallHorizontalPadding: {
    paddingHorizontal: small,
  },
  horizontalPadding: {
    paddingHorizontal: normal,
  },
  powHorizontalPadding: {
    paddingHorizontal: tinyPow,
  },
  mediumHorizontalPadding: {
    paddingHorizontal: medium * 1.2,
  },
  //============= PADDING BOTTOM
  normalPaddingBottom: {
    paddingBottom: normal,
  },
  //============= PADDING TOP
  normalPaddingTop: {
    paddingTop: normal,
  },
  //============= PADDING END
  smallEndPadding: {
    paddingEnd: small,
  },
  endPadding: {
    paddingEnd: normal,
  },
  mediumEndPadding: {
    paddingEnd: medium,
  },
  //============= PADDING START
  mediumStartPadding: {
    paddingStart: medium,
  },
  normalStartPadding: {
    paddingStart: normal,
  },
  smallStartPadding: {
    paddingStart: small,
  },

  //=====================MARGINS==============
  //=============MARGIN
  tinyTotalMargin: {
    margin: tiny,
  },
  //=============MARGIN TOP
  tinyTopMargin: {
    marginTop: tiny,
  },
  normalTopMargin: {
    marginTop: normal,
  },
  smallTopMargin: {
    marginTop: small,
  },
  mediumTopMargin: {
    marginTop: medium,
  },
  //=============MARGIN BOTTOM
  smallBottonMargin: {
    marginBottom: small,
  },
  bottomMargin: {
    marginBottom: normal,
  },
  mediumBottomMargin: {
    marginBottom: medium,
  },
  powBottomMargin: {
    marginBottom: tinyPow,
  },
  //=============MARGIN END
  smallEndMargin: {
    marginEnd: small,
  },
  normalEndMargin: {
    marginEnd: normal,
  },
  tinyPowEndMArgin: {
    marginEnd: tinyPow,
  },
  mediumEndMargin: {
    marginEnd: medium,
  },

  //=============MARGIN START
  tinyStartMargin: {
    marginStart: tiny,
  },
  smallStartMargin: {
    marginStart: small,
  },
  normalStartMargin: {
    marginStart: normal,
  },
  mediumStartMargin: {
    marginStart: medium,
  },

  //=============MARGIN VERTICAL
  tinyVerticalMargin: {
    marginVertical: tiny,
  },
  smallVerticalMargin: {
    marginVertical: small,
  },
  verticalMargin: {
    marginVertical: normal,
  },
  mediumVerticalMargin: {
    marginVertical: medium,
  },
  powVerticalMargin: {
    marginVertical: tinyPow,
  },
  //=============MARGIN Horizantal
  tinyHorizontalMargin: {
    marginHorizontal: tiny,
  },
  smallHorizontalMargin: {
    marginHorizontal: small,
  },
  horizontalMargin: {
    marginHorizontal: normal,
  },
  mediumHorizontalMargin: {
    marginHorizontal: medium,
  },

  //=====================BORDERS_RADIUS==============
  tinyRadius: {
    borderRadius: tiny,
  },
  smallRadius: {
    borderRadius: small,
  },
  tinyPowRadius: {
    borderRadius: tinyPow,
  },
  normalRadius: {
    borderRadius: normal * 1.5,
  },
  fullRadius: {
    borderRadius: 1000,
  },
  //=====================MIAIN_MARGIN_PADDING_APP=========
  paddingHorizontalMain: {
    paddingHorizontal: medium * 1.2,
  },
  marginHorizontalMain: {
    marginHorizontal: medium * 1.2,
  },
  paddingStartMain: {
    paddingStart: medium * 1.2,
  },
  paddingBottomFlatList: {
    paddingBottom: medium * 4,
  },
  borderRadiusContactUs: {
    borderRadius: medium * 0.8,
  },
  twoTinyPowPadding: {
    padding: tinyPow * 2,
  },
  twoTinyPowHorizontalPadding: {
    paddingHorizontal: tinyPow * 2,
  },
};
