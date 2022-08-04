import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Modal from '../Modal';
import styles from './style';
import {string} from 'App/i18n';

const InputModal = ({
  modalVisible,
  onClose,
  screen,
  title,
  text,
  onChangeText,
  mode = 'date',
  ...rest
}) => {
  return (
    <Modal visible={modalVisible} onCloseActionSheet={onClose}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder={string.TYPE_A_TEXT}
            autoCorrect={false}
            onChangeText={onChangeText}
            value={text}
            multiline={true}
            enablesReturnKeyAutomatically
          />
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;
