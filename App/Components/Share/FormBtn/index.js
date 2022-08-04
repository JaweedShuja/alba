import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, Keyboard, View} from 'react-native';
import Indicator from '../Indicator';
import styles from './styles';
import {Colors} from '../../../Theme';
const FormBtn = ({
  handleSubmit,
  title,
  disabled,
  loading,
  style,
  colorBtn = Colors.secendry,
  position = false,
  children,
}) => {
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled || loading}
      onPress={handleSubmit}
      style={[
        styles.BtnContainer,
        style,
        {
          backgroundColor: !disabled ? colorBtn : Colors.commonGray,
          // position: !keyboardStatus && position ? 'absolute' : 'relative',
          // bottom: 0,
          // zIndex: 5000000,
        },
        // disabled && { backgroundColor: Colors.commonGray },
      ]}>
      {children ? (
        children
      ) : (
        <View>
          {loading ? (
            <Indicator color={Colors.white} />
          ) : (
            <Text style={[styles.textBtn]}>{title}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FormBtn;
