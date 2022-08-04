import React from 'react';
import {View, Text} from 'react-native';
import Modal from '../Modal';
import styles from './style';
import DatePicker from 'react-native-date-picker';

const DatePickerModal = ({
  modalVisible,
  onClose,
  screen,
  title,
  mode = 'date',
  ...rest
}) => {
  return (
    <Modal visible={modalVisible} onCloseActionSheet={onClose}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <DatePicker mode={mode} {...rest} />
      </View>
    </Modal>
  );
};

export default DatePickerModal;
