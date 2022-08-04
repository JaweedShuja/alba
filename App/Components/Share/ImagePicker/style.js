import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  viewMainModal: {
    backgroundColor: Colors.white,
    ...ApplicationStyles.borderRadiusCards,
    ...Helpers.center,
    paddingTop: 30,
  },
  viewExit: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
    ...Helpers.mainSpaceBetween,
    ...Metrics.mediumHorizontalPadding,
  },
  textTitleModal: {
    color: Colors.text,
    ...Fonts.input,
    ...Metrics.normalEndMargin,
    fontWeight: 'bold',
    flex: 1,
  },
  modalBtn: {
    width: width * 0.7,
    height: width * 0.1,
    backgroundColor: Colors.lightBlue,
    ...Metrics.mediumVerticalMargin,
    alignSelf: 'center',
    ...ApplicationStyles.borderRadiusCards,
    ...Helpers.center,
    flexDirection: 'row',
  },
  textModalBtn: {
    ...ApplicationStyles.textWhite,
    ...Metrics.normalStartMargin,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: Colors.textColorLess,
    width: '100%',
    ...Metrics.mediumTopMargin,
    //...Metrics.bottomMargin,
  },
  image: {
    width: normal * 2,
    height: normal * 2,
  },
});

export default styles;
