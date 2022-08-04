import {Dimensions, StyleSheet, Platform} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
const {width, height} = Dimensions.get('screen');
const isIos = Platform.OS === 'ios' ? true : false;
export default styles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',
    top: isIos ? 40 : 20,
    left: isIos ? 30 : 10,
    // backgroundColor: 'red',
    zIndex: 1000,
    ...Helpers.center,
    alignSelf: 'flex-end',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    // transform: [{rotate: '90deg'}],
  },
  loading: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 1001,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fullScreen: {
    // flex: 1,
    width: '100%',
    height: '100%',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mixWithOthersControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300,
  },
  iconQuality: {
    position: 'absolute',
    top: isIos ? 35 : 10,
    right: 10,
    // backgroundColor: 'red',
    padding: 10,
    zIndex: 1000,
  },
  FlatList: {
    width: '100%',
    // backgroundColor: 'red',
  },
});
