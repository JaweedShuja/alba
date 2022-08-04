import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';
import AuthActions from '../../../Stores/Authentication/Actions';
import * as yup from 'yup';
import {Formik} from 'formik';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import FormBtn from '../../Share/FormBtn';
import {string} from 'App/i18n';
import {useStrings} from 'App/Values/Strings';
import FormInput from '../../Share/FormInput';

const {PRIVACY_POLICY_URL, TERMS_URL} = Strings.CONSTANTS;

const StudentSignUpTop = () => {
  const dispatch = useDispatch();
  const stringData = useStrings();

  const {VALIDATION_SIGN_UP} = stringData;

  const deviceInfo = useSelector((state) => state.startUp.deviceInfo);
  const isTeacher = useSelector((state) => state.appData.isTeacher);
  const loading = useSelector((state) => state.auth?.signUpLoading);

  const handleSubmit1 = async (value) => {
    const data = Object.assign(value, {isTeacher}, {deviceInfo});
    dispatch(AuthActions.signUp(data));
  };

  const privacyOnPressHandler = () => {
    Linking.openURL(PRIVACY_POLICY_URL);
  };

  const termsOnPressHandler = () => {
    Linking.openURL(TERMS_URL);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={handleSubmit1}
      validationSchema={yup.object().shape(VALIDATION_SIGN_UP)}>
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
            <View style={{alignItems: 'flex-start'}}>
              <Text style={styles.welcomeText}>{string.WELCOME_TO_ALBA}</Text>
              <Text style={styles.text}>
                {string.CHOOSE_YOUR_SIGN_UP_METHOD}
              </Text>
            </View>
            <FormInput
              name="email"
              value={values.email}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              placeholder={string.EMAIL_ADDRESS}
              onBlur={handleBlur('email')}
              // autoFocus
              error={values.email?.length >= 0 && errors.email}
              errorText={errors.email}
            />

            <View style={styles.viewInputs}>
              <View style={styles.viewInput}>
                <FormInput
                  name="password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder={string.PASSWORD}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  // autoFocus
                  error={values.password?.length >= 0 && errors.password}
                  errorText={errors.password}
                />
              </View>
              <View style={styles.viewInput}>
                <FormInput
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder={string.RE_ENTER_PASSWORD}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  // autoFocus
                  error={
                    values.confirmPassword?.length >= 0 &&
                    errors.confirmPassword
                  }
                  errorText={errors.confirmPassword}
                />
              </View>
            </View>
            <View
              style={[styles.privacyViewStyle, {justifyContent: 'flex-start'}]}>
              <Text style={[styles.text]}>
                <Text>{string.BY_SIGNING_UP_YOU_GREE_OUR}</Text>
                <Text onPress={privacyOnPressHandler} style={styles.linkStyle}>
                  {string.PRIVACY_POLICY_COMMA}
                </Text>
                <Text>{'\n'}</Text>
                <Text onPress={termsOnPressHandler} style={styles.linkStyle}>
                  {string.TERMS_CONDITIONS}
                </Text>
              </Text>
            </View>
            <FormBtn
              title={string.SIGN_UP}
              disabled={loading}
              handleSubmit={handleSubmit}
              colorBtn={Colors.lightBlue}
              loading={loading}
              style={styles.signupBtn}
            />
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
};

export default StudentSignUpTop;
