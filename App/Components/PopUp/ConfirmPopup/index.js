import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {dHeight} from '../../../Theme/Metrics';
import styles from './styles';
import {string} from 'App/i18n';

const ConfirmPopup = ({extraData, contentType, onPressClose}) => {
  const dispatch = useDispatch();
  console.log('extraData', extraData);
  return (
    <View style={styles.container}>
      {extraData?.title && <Text style={styles.title}>{extraData?.title}</Text>}
      {extraData?.description && (
        <Text style={styles.description}>{extraData?.description}</Text>
      )}
      {extraData?.confirm && extraData?.cancel && <View style={styles.line} />}
      {extraData?.confirm && (
        <TouchableOpacity
          onPress={() => {
            extraData?.confirm();
            onPressClose();
          }}
          style={styles.btns}>
          <Text style={styles.confirm}>{string.CONFIRM}</Text>
        </TouchableOpacity>
      )}
      {extraData?.confirm && extraData?.cancel && <View style={styles.line} />}
      {extraData?.cancel && (
        <TouchableOpacity onPress={extraData?.cancel} style={styles.btns}>
          <Text>{string.CANCEL}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ConfirmPopup;
