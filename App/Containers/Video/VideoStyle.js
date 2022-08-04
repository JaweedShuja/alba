import {StyleSheet} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';

export default StyleSheet.create({
  scrollView: {
    // flexGrow: 1,
    flex: 1,
    // backgroundColor: 'red',
    // ...Metrics.paddingBottomFlatList,
  },
  content: {
    ...Metrics.paddingBottomFlatList,
  },
  finishBtn: {
    ...ApplicationStyles.buttonAddNote,
    zIndex: 1000,
    backgroundColor: Colors.redColorLess,
    ...Metrics.normalRadius,
    width: '89%',
  },
  text: {
    ...ApplicationStyles.textWhite,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  sendContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  sendTxt: {
    color: 'white',
  },
});
