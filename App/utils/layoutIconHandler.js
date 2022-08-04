import {I18nManager, Platform} from 'react-native';
import Strings from 'App/Values/Strings';
const isIos = Platform.OS === 'ios' ? true : false;
export const fontIconHandler = () => {
  if (I18nManager.isRTL) {
    if (isIos) {
      return {
        transform: [{rotate: '180deg'}],
      };
    } else {
      return {
        transform: [{rotateY: '180deg'}],
      };
    }
  } else {
    return {}
  }
};

export const fontIconHandlerX = () => {
  return {
    transform: [{rotate: '90deg'}],
  };
};

export const fontIconReverseHandler = () => {
  if (I18nManager.isRTL) {
    return {};
  } else {
    if (isIos) {
      return {transform: [{rotate: '180deg'}]};
    } else {
      return {transform: [{rotate: '180deg'}]};
    }
  }
};

export const IconHandler = () => {
  if (I18nManager.isRTL) {
    return 'chevron-back-outline';
  } else {
    return 'chevron-forward-outline';
  }
};

export const IconReverseHandler = () => {
  if (I18nManager.isRTL) {
    return 'chevron-forward-outline';
  } else {
    return 'chevron-back-outline';
  }
};

export const AntDesignIconHandler = () => {
  if (I18nManager.isRTL) {
    return Strings.Icons.LEFT_ICON;
  } else {
    return Strings.Icons.RIGHT_ICON;
  }
};

export const AntDesignReverseIconHandler = () => {
  if (I18nManager.isRTL) {
    return Strings.Icons.RIGHT_ICON;
  } else {
    return Strings.Icons.LEFT_ICON;
  }
};

// export const layoutIconHandler = (right) => {
//     if (right) {
//       if (I18nManager.isRTL) {
//         return 'chevron-thin-right';
//       } else {
//         return 'chevron-thin-left';
//       }
//     } else {
//       if (I18nManager.isRTL) {
//         return 'chevron-thin-left';
//       } else {
//         return 'chevron-thin-right';
//       }
//     }
//   };
