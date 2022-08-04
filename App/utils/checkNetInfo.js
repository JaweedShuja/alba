import React from 'react';
import {View, Text, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const checkNetInfo = () => {
  console.log('isConnected');

  if (Platform.OS === 'android') {
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        console.log('isConnected');
        return true;
        // Alert.alert('You are online!');
      } else {
        console.log('not isConnected');

        return false;
        // Alert.alert('You are offline!');
      }
    });
  } else {
    // For iOS devices
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange(),
    );
  }
  const handleFirstConnectivityChange = (isConnected) => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange(),
    );

    if (isConnected === false) {
      return false;
      //   Alert.alert('You are offline!');
    } else {
      return true;
      //   Alert.alert('You are online!');
    }
  };
};
