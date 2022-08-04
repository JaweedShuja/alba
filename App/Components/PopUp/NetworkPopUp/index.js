import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  checkInternetConnection,
  offlineActionCreators,
} from 'react-native-offline';
import {useDispatch} from 'react-redux';
import {NoNetworkIcon} from '../../../Assets/Svg/noNetwork';
import {dWidth} from '../../../Theme/Metrics';
import styles from './style';
import {string} from 'App/i18n';

const NetworkPopUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {connectionChange} = offlineActionCreators;
  const retry = async () => {
    setLoading(true);
    setTimeout(() => {
      checkInternetConnection('https://www.google.com/', 0, true, 'HEAD').then(
        (response) => {
          setLoading(false);
          console.log('internet connection: ', response);
          dispatch(connectionChange(response));
        },
      );
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <NoNetworkIcon size={dWidth(35)} />

        <Text style={styles.text}>{string.NETWORK_DETECTOR_DISCONNECTED}</Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={retry} style={styles.btn}>
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text style={styles.btnTxt}>{string.TRY_AGAIN}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NetworkPopUp;
