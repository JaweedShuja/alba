import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Text,
  Easing,
  Dimensions,
  Platform,
  TextInput,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import styles from './styles';
import {Colors, Metrics} from '../../../Theme';
import {useFormikContext} from 'formik';
import {useSelector} from 'react-redux';
import {FontFamily} from '../../../Theme/FontFamily';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const {width, height} = Dimensions.get('window');
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};
const hapticTriggerType = Platform.select({
  ios: 'selection',
  android: 'notificationError',
  /**
   selection => (default)
   impactLight
   impactMedium
   impactHeavy
   rigid
   soft
   notificationSuccess
   notificationWarning
   notificationError
   ===============(Android only)============
   clockTick
   contextClick
   keyboardPress
   keyboardRelease
   keyboardTap
   longPress
   textHandleMove
   virtualKey
   virtualKeyRelease
   ===============(Android only)============
   */
});
const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType = 'default',
  name,
  placeholder,
  value,
  top = 0,
  style,
  error,
  errorText,
  isLast,
  children,
  placeHolderColor = Colors.textColorLess,
  secureTextEntry,
  autoFocus = false,
  ...rest
}) => {
  const {setFieldError} = useFormikContext();
  // const serverError = useSelector((state) => state.auth.error);

  const [animValue] = useState(new Animated.Value(0));
  const [animHeight] = useState(new Animated.Value(0));
  const [endEditing, setEndEditing] = useState(false);
  // useEffect(() => {
  //   if (isLast && serverError) {
  //     console.log("DOROSTE");
  //     setFieldError(name, serverError);
  //   }
  // }, [serverError]);
  const startShake = () => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const showError = () => {
    ReactNativeHapticFeedback.trigger(hapticTriggerType, hapticOptions);

    Animated.timing(animHeight, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  const hideError = () => {
    Animated.timing(animHeight, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    if (error && endEditing) {
      startShake();
      showError();
      setEndEditing(false);
    } else {
      setEndEditing(false);
      hideError();
    }
  }, [error, endEditing]);

  const endEditingInput = () => {
    setEndEditing(true);
  };
  const inputRef = useRef(null);
  return (
    <Animated.View
      style={[
        styles.inputContainer,
        {top: top, ...style},
        {transform: [{translateX: animValue}]},
      ]}>
      <TextInput
        value
        {...{placeholder}}
        {...{secureTextEntry}}
        {...{keyboardType}}
        {...{autoFocus}}
        {...rest}
        placeholderTextColor={placeHolderColor}
        returnKeyType="default"
        autoCapitalize={secureTextEntry ? 'none' : 'words'}
        style={[
          styles.contentInput,
          style,
          {
            borderColor: error ? Colors.error : Colors.textColorLess,
          },
        ]}
        onBlur={endEditingInput}
        onEndEditing={endEditingInput}
      />

      {children}
      {errorText ? (
        <Animated.Text
          style={[
            styles.error,
            {
              transform: [{translateX: animHeight}],

              // transform: [{scale: animHeight}],
              // opacity: animHeight,
              // height: animHeight,
            },
          ]}>
          {errorText}
        </Animated.Text>
      ) : null}
    </Animated.View>
  );
};

export default memo(FormInput);
