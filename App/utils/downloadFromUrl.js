import React from 'react';
import {View, Text, Linking} from 'react-native';
import {showToast} from './showToast';
import {string} from 'App/i18n';

const downloadFromUrl = (url) => {
  //   handleClick = () => {
  console.log({url});
  if (!url) showToast('e', string.URL_IS_EMPTY);
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
      //   .catch((err) => {
      //     showToast('e', 'url is empty');
      //   });
    } else {
      showToast('e', string.DONT_KNOW_HOW_TO_OPEN_URL, url);
      //   console.log("Don't know how to open URI: " + url);
    }
  });
  //   };
};

export default downloadFromUrl;
