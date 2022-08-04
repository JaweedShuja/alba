import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {Colors} from 'App/Theme';
import Icon from 'react-native-vector-icons/Fontisto';
import styles from './style';
import Strings from 'App/Values/Strings';
import RequiredField from '../../Special/RequiredField';
import {string} from 'App/i18n';
import {normal} from 'App/Theme/Metrics';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const errorMessage = {
  required: string.THIS_FIELD_IS_REQUIRED,
};
const AnswerInput = ({
  icon = true,
  selQuestion = false,
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  value,
  top = 0,
  style,
  error,
  errorText,
  isLast,
  children,
  option,
  placeHolderColor,
  ...rest
}) => {
  const [showError, setShowError] = useState(false);

  const endEditingInput = () => {
    if (value.length === 0) {
      setShowError(true);
    }
  };

  return (
    <View>
      <View style={styles.mainBTN}>
        <View style={styles.viewOption}>
          <Text style={styles.textOption}>{option})</Text>
          <TextInput
            {...rest}
            placeholder={placeholder}
            style={styles.answerInput}
            value={value}
            onEndEditing={endEditingInput}
            keyboardType={icon ? 'default' : 'phone-pad'}
            maxLength={icon ? 100000 : 3}
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
          />
          {icon ? (
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={ACTIVE_OPACITY}
              {...rest}>
              <Icon
                name={selQuestion ? 'checkbox-active' : 'checkbox-passive'}
                size={normal * 1.5}
                color={Colors.lightBlue}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {value.length === 0 ? (
        <RequiredField error={errorMessage.required} />
      ) : null}
    </View>
  );
};

export default AnswerInput;
