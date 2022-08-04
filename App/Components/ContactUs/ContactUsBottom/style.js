import {Dimensions, StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    ...Metrics.paddingHorizontalMain,
    paddingVertical: normal * 2,
  },

  btn: {
    width: '100%',
    alignSelf: 'center',
    ...Metrics.borderRadiusContactUs,
    ...Metrics.smallVerticalMargin,
    ...Helpers.center,
    ...Helpers.mainSpaceBetween,
    ...Metrics.mediumHorizontalPadding,
    ...ApplicationStyles.shadow,
    //height: width * 0.14,
    //flexDirection: 'row',
    //backgroundColor: Colors.white,
  },
  content: {
    width: '100%',
    height: width * 0.14,
    flexDirection: 'row',
    ...Helpers.center,
    ...Helpers.mainSpaceBetween,
    //...Metrics.mediumHorizontalPadding,
  },
  description: {
    width: '100%',
    alignSelf: 'center',
    ...Metrics.borderRadiusContactUs,
    ...Metrics.mediumBottomMargin,
    ...Helpers.center,
    ...Helpers.mainSpaceBetween,
    //...Metrics.mediumHorizontalPadding,
    //flexDirection: 'row',
    //...ApplicationStyles.shadow,
    //backgroundColor: Colors.white,
  },
  text: {...Fonts.input},
  descriptionText: {...Fonts.normal},
});

export default styles;
