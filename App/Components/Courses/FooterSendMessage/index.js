import React, {useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const FooterSendMessage = ({setMessage, message, onSendPress, disabled}) => {
  return (
    <View style={styles.containerInput}>
      <TextInput
        placeholder={string.MESSAGE}
        value={message}
        onChangeText={setMessage}
        style={styles.input}
        placeholderTextColor={Colors.lightBlue}
        multiline={true}
        blurOnSubmit={false}
        returnKeyType="default"
        scrollEnabled={true}
        maxHeight={normal * 15}
      />
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        style={[
          styles.sendContainer,
          {
            backgroundColor: disabled ? Colors.commonGray : Colors.lightBlue,
          },
        ]}
        disabled={disabled ? true : false}
        onPress={onSendPress}>
        <FontIcon
          name={Strings.Icons.SEND}
          color={Colors.white}
          size={normal * 1.7}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FooterSendMessage;
