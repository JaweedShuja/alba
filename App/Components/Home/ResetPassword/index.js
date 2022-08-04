import React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  I18nManager,
} from 'react-native';
import styles from './style';
import {useStrings} from 'App/Values/Strings';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import Loading from 'App/Components/Share/Loading';
import AuthActions from '../../../Stores/Authentication/Actions';
import {Colors} from '../../../Theme';
import FormBtn from '../../Share/FormBtn';
import {string} from 'App/i18n';
import FormInput from '../../Share/FormInput';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const stringData = useStrings();

  const {VALIDATION_RESET_PASSWORD} = stringData;
  const loading = useSelector((state) => state.auth?.resetPasswordLoading);
  const loadingScreen = useSelector(
    (state) => state.auth.resetPasswordCheckTokenLoading,
  );
  const data = useSelector(
    (state) => state.auth.resetPasswordCheckTokenSuccess,
  );
  console.log({data});
  const handleSubmit = async (value) => {
    console.log({value});
    const email = data?.email;
    const resetToken = data?.token;
    const data1 = Object.assign(value, {email}, {resetToken});
    console.log({data1});
    // navigate(STUDENT_STACK, {screen: RESET_PASSWORD_SCREEN});

    // const data = Object.assign(value, {isTeacher}, {deviceInfo});
    dispatch(AuthActions.resetPassword(data1));
  };

  if (loadingScreen) {
    return <Loading />;
  }

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape(VALIDATION_RESET_PASSWORD)}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
        handleBlur,
      }) => {
        return (
          <KeyboardAvoidingView
            enabled
            // behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}>
            <FormInput
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder={string.PASSWORD}
              onBlur={handleBlur('password')}
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.input}
              autoFocus
              error={values.password?.length >= 0 && errors.password}
              errorText={errors.password}
            />

            <FormInput
              name="confirmPassword"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              placeholder={string.RE_ENTER_PASSWORD}
              onBlur={handleBlur('confirmPassword')}
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.inputReEnter}
              // autoFocus
              error={
                values.confirmPassword?.length >= 0 && errors.confirmPassword
              }
              errorText={errors.confirmPassword}
            />
            <FormBtn
              title={string.RESET}
              disabled={loading}
              handleSubmit={handleSubmit}
              colorBtn={Colors.lightBlue}
              loading={loading}
              style={styles.btn}
            />
            {/* <TouchableOpacity
              style={styles.btn}
              disabled={loading}
              onPress={handleSubmit}
              activeOpacity={ACTIVE_OPACITY}>
              {loading ? (
                <ActivityIndicator color={Colors.white} size={width * 0.06} />
              ) : (
                <Text style={styles.textBtn}>RESET</Text>
              )}
            </TouchableOpacity> */}
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
};

export default ResetPassword;
