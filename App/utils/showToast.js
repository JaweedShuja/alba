import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

const hapticTriggerType = Platform.select({
  ios: 'selection',
  android: 'impactMedium',
  /**
   selection => (default)
   impactLight
   impactMedium
   impactHeavy
   rigid
   soft
   notificationSuccess
   notificationWarning
   notificationError
   ===============(Android only)============
   clockTick
   contextClick
   keyboardPress
   keyboardRelease
   keyboardTap
   longPress
   textHandleMove
   virtualKey
   virtualKeyRelease
   ===============(Android only)============
   */
});

export const showToast = (type, message = '', desc = '') => {
  //   'success = s | error = e | info'

  let options = {
    type: type,
    position: 'top',
    text1: message,
    text2: desc,
    visibilityTime: 5000,
    autoHide: true,
    topOffset: Platform.OS === 'ios' ? 40 : 10,
    bottomOffset: 40,
    onShow: () => {},
    onHide: () => {},
    onPress: () => {},
  };
  if (type === 'e') {
    options.type = 'error';
    ReactNativeHapticFeedback.trigger(hapticTriggerType, hapticOptions);
  } else if (type === 's') {
    options.type = 'success';
  } else {
    options.type = 'info';
  }
  Toast.show(options);
};
