import React from 'react';
import {View, I18nManager, TextInput} from 'react-native';
import styles from './style';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const Input = ({icon, placeholder, dropdown = false}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <FontIcon name={icon} size={normal * 2} color={Colors.lightBlue} />
      </View>

      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        textAlign={I18nManager.isRTL ? 'right' : 'left'}
      />
    </View>
  );
};

export default Input;
