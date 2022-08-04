import Loading from 'App/Components/Share/Loading';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';

const LoadingPopUp = () => {
  return (
    <View style={styles.container}>
      <Loading />
    </View>
  );
};

export default LoadingPopUp;
