import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  I18nManager,
  Platform,
} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const ContactUsMain = ({data, onSendMessageSupport}) => {
  const [message, setMessage] = useState('');
  const temp = data.contactInfo;

  const clearMessage = () => {
    setMessage('');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{temp.message}</Text>
      <View style={styles.viewMessage}>
        <View style={styles.viewInput}>
          <FontIcon
            name={Strings.Icons.MESSAGENER}
            color={Colors.login}
            size={normal * 2}
          />
          <TextInput
            placeholder={temp.placeholder}
            value={message}
            onChangeText={setMessage}
            style={styles.textInput}
            placeholderTextColor={Colors.login}
            multiline={true}
            numberOfLines={6}
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
          />
          {/* <TextInput style={styles.textInput}>{temp.placeholder}</TextInput> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (message !== '') {
              onSendMessageSupport(message, clearMessage);
            }
          }}
          style={styles.sendBtn}
          activeOpacity={ACTIVE_OPACITY}>
          <FontIcon
            name={Strings.Icons.SEND}
            style={styles.icon}
            color={Colors.white}
            size={normal * 1.7}
          />
        </TouchableOpacity>
      </View>
      {Platform.OS === 'android' && (
        <Text style={styles.text}>{temp.ways}</Text>
      )}
    </View>
  );
};

export default ContactUsMain;
