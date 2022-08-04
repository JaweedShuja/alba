import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styles from './style';
import {Colors} from 'App/Theme';
import Strings from 'App/Values/Strings';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {string} from 'App/i18n';

const {width} = Dimensions.get('screen');

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const CELL_COUNT = 4;

const StudentEmailVerification = ({
  onCodeSubmitted,
  onSubmitResendVerify,
  email,
}) => {
  const min = 2;
  const sec = 59;

  const [seconds, setSeconds] = useState(sec);
  const [minute, setMinute] = useState(min);
  const [isActive, setIsActive] = useState(true);
  const [verificationCode, setValue] = useState('');
  const ref = useBlurOnFulfill({verificationCode, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    verificationCode,
    setValue,
  });

  const loading = useSelector((state) => state.auth?.verifyByEmailLoading);
  const loadingResend = useSelector(
    (state) => state.auth?.resendVerificationCodeLoading,
  );

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        seconds === 0
          ? minute > 0
            ? (setMinute(minute - 1), setSeconds(sec))
            : setIsActive(false)
          : setSeconds(seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== sec && minute !== min) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minute]);

  useEffect(() => {
    if (verificationCode?.length === 4 && !loading) {
      onCodeSubmitted(verificationCode);
    }
  }, [verificationCode]);

  const onSubmitResend = () => {
    console.log(loadingResend);
    setIsActive(true);
    setSeconds(sec);
    setMinute(min);
    onSubmitResendVerify(verificationCode);
  };

  const onSubmitVerifyCode = () => {
    if (verificationCode?.length === 4 && !loading) {
      onCodeSubmitted(verificationCode);
      //console.log(verificationCode)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.directionStyle}>
        <Text style={styles.text}>{string.ENTER_VERIFICATION_CODE}</Text>
      </View>
      <View style={styles.viewEmail}>
        <Text style={styles.textEmail}>{string.SEND_TO}</Text>
        <Text style={[styles.textEmail, styles.email]}>{email}</Text>

        <TouchableOpacity
          style={styles.resentBtn}
          activeOpacity={ACTIVE_OPACITY}
          disabled={isActive}
          onPress={onSubmitResend}>
          {loadingResend ? (
            <ActivityIndicator color={Colors.lightBlue} size={width * 0.06} />
          ) : (
            <Text
              style={[
                styles.textTryAgain,
                {color: isActive ? Colors.commonGray : Colors.lightBlue},
              ]}>
              {string.TRY_AGAIN}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={verificationCode}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View style={[styles.cell, isFocused && styles.focusCell]}>
            <Text
              key={index}
              style={styles.textCell}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <Text style={styles.time}>{`${minute < 10 ? '0' + minute : minute} : ${
        seconds < 10 ? '0' + seconds : seconds
      }`}</Text>
      <TouchableOpacity
        style={[
          styles.btn,
          {
            backgroundColor:
              loading || verificationCode?.length !== 4
                ? Colors.commonGray
                : Colors.lightBlue,
          },
        ]}
        disabled={loading || verificationCode?.length !== 4}
        activeOpacity={ACTIVE_OPACITY}
        onPress={onSubmitVerifyCode}>
        {loading ? (
          <ActivityIndicator color={Colors.white} size={width * 0.06} />
        ) : (
          <Text style={styles.textBtn}>{string.CONTINUE}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default StudentEmailVerification;
