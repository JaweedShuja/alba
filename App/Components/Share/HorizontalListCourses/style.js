import {Dimensions, StyleSheet, I18nManager} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');
console.log({height});
let screen;
if (height > 645) screen = true;
else screen = false;

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.spaceVerticalHorizontalListCourse,
  },
  textheader: {
    ...ApplicationStyles.textTitleHorizontalListCourse,
    //...Metrics.paddingStartMain,
    ...Metrics.paddingHorizontalMain,
    alignSelf: 'flex-start',
  },
  flatList: {
    marginTop: normal * 1,
  },
  flatListContent: {
    ...Metrics.verticalPadding,
    //...Metrics.paddingStartMain,
    ...Metrics.paddingHorizontalMain,
  },
  mainBTN: {
    width: width * 0.65,
    height: width * 0.45,
    backgroundColor: Colors.white,
    ...Metrics.tinyPowEndMArgin,
    ...ApplicationStyles.borderRadiusCards,
    ...ApplicationStyles.shadow,
  },
  image: {
    // width: '100%',
    // height: '80%',
    width: width * 0.65,
    height: width * 0.36,
    ...ApplicationStyles.borderRadiusImageCards,
  },
  cover: {
    height: '22%',
    ...ApplicationStyles.borderRadiusBottomCards,
    flexDirection: 'row',
    ...Helpers.scrollSpaceBetween,
    ...Helpers.crossCenter,
    ...Metrics.powHorizontalPadding,
  },
  text: {
    fontSize: normal * 1.3,
    color: Colors.white,
  },
  viewicontext: {
    flexDirection: 'row',
    ...Helpers.center,
  },
  viewParticipants: {
    position: 'absolute',
    bottom: width * 0.12,
    left: 20,
    backgroundColor: Colors.white,
    zIndex: 100,
    ...Metrics.normalRadius,
    ...Metrics.horizontalPadding,
    ...Metrics.tinyVerticalPadding,
  },
  viewPlus: {
    position: 'absolute',
    width: screen ? width * 0.13 : width * 0.115,
    height: screen ? width * 0.13 : width * 0.115,
    backgroundColor: Colors.green,
    borderRadius: 1000,
    alignSelf: 'center',
    // textAlignVertical: 'center',
    top: width * 0.1,
    ...Helpers.center,
    opacity: 0.85,
  },
  viewExam: {
    backgroundColor: Colors.white,
    ...Metrics.powHorizontalPadding,
    ...ApplicationStyles.borderRadiusCards,
  },
  viewMainModal: {
    backgroundColor: Colors.white,
    ...ApplicationStyles.borderRadiusCards,
    height: width * 0.7,
    ...Helpers.center,
  },
  viewExit: {
    flexDirection: 'row',
    ...Helpers.crossCenter,
    ...Helpers.mainSpaceBetween,
  },
  textTitleModal: {
    color: Colors.text,
    ...Fonts.input,
    ...Metrics.normalEndMargin,
    fontWeight: 'bold',
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
    ...Metrics.bottomMargin,
  },
});

export default styles;
