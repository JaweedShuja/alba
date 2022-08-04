import {Platform} from 'react-native';
import ImageColors from 'react-native-image-colors';
import {showToast} from 'App/utils/showToast';
import {string} from 'App/i18n';

const fetchColors = async (url) => {
  try {
    const colors = await ImageColors.getColors(url, {
      fallback: '#228B22',
      cache: true,
      key: url,
    });
    if (colors?.platform === 'android') {
      return colors?.average;
    } else {
      return colors?.detail;
    }
  } catch (err) {
    showToast('e', string.SOMETHING_WENT_WRONG);
  }
};

export default fetchColors;
