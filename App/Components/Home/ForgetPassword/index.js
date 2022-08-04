import React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  I18nManager,
} from 'react-native';
import styles from './style';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import AuthActions from '../../../Stores/Authentication/Actions';
import {Colors} from '../../../Theme';
import FormBtn from '../../Share/FormBtn';
import {string} from 'App/i18n';
import FormInput from '../../Share/FormInput';
import {navigate} from 'App/Services/NavigationService';
import Strings from 'App/Values/Strings';

const {RESET_PASSWORD_SCREEN, STUDENT_STACK} = Strings.Routes;

const ForgetPassword = ({link}) => {
  console.log(link);

  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.auth?.requestResetPasswordLoading,
  );

  const handleSubmit = async (value) => {
    console.log(value);
    // navigate(STUDENT_STACK, {screen: RESET_PASSWORD_SCREEN});

    // const data = Object.assign(value, {isTeacher}, {deviceInfo});
    dispatch(AuthActions.requestResetPassword(value));
  };
  const errorText = (msg) => {
    return (
      <>
        <Text style={styles.errorText}>{msg}</Text>
      </>
    );
  };

  const errorHandle = (toch, err, val) => {
    if (toch.email && err.email && val.email.length > 0) {
    }
    if (toch.password && err.password && val.password.length > 0) {
      return errorText(err.password);
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email(string.EMAIL_MUST_BE_A_VALID_EMAIL)
          .required(string.EMAIL_IS_REQUIRED),
      })}>
      {({
        handleChange,
        values,
        handleSubmit,
        errors,
        isValid,
        touched,
        handleBlur,
        isSubmitting,
      }) => {
        return (
          <KeyboardAvoidingView
            enabled
            // behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}>
            <FormInput
              name="email"
              value={values.email}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              placeholder={string.EMAIL_ADDRESS}
              onBlur={handleBlur('email')}
              style={styles.input}
              autoFocus
              error={values.email?.length >= 0 && errors.email}
              errorText={errors.email}
            />

            <FormBtn
              title={string.SEND}
              disabled={loading}
              handleSubmit={handleSubmit}
              colorBtn={Colors.lightBlue}
              loading={loading}
              style={styles.btn}
            />
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
};

export default ForgetPassword;

/* <KeyboardAvoidingView style={styles.container}>
      <TextInput placeholder="Email Address" style={styles.input} />
      <TouchableOpacity
        style={styles.btn}
        onPress={onPressedSend}
        activeOpacity={ACTIVE_OPACITY}>
        <Text style={styles.textBtn}>SEND</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView> */

/* <FormInput
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder={string.EMAIL_ADDRESS}
              onBlur={handleBlur('email')}
              // autoFocus
              style={styles.input}
              error={values.email?.length && errors.email}
              errorText={errors.email}
            /> */
