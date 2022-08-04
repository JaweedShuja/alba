import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
const RequiredField = ({error}) => {
  return <Text style={styles.errorText}>{error}</Text>;
};

export default RequiredField;
