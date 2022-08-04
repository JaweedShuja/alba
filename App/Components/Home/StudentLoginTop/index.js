import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  I18nManager,
  View,
} from 'react-native';
import {string} from 'App/i18n';
import {navigate} from 'App/Services/NavigationService';
import {Colors} from 'App/Theme';
import Strings from 'App/Values/Strings';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import AuthActions from '../../../Stores/Authentication/Actions';
import FormBtn from '../../Share/FormBtn';
import styles from './style';
import {useStrings} from 'App/Values/Strings';
import AppDataActions from 'App/Stores/AppData/Actions';
import FormInput from '../../Share/FormInput';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {FORGET_PASSWORD_SCREEN, STUDENT_STACK} = Strings.Routes;

const StudentLoginTop = () => {
  const dispatch = useDispatch();
  const stringData = useStrings();

  const {VALIDATION_SIGN_IN} = stringData;

  const deviceInfo = useSelector((state) => state.startUp.deviceInfo);
  const isTeacher = useSelector((state) => state.appData.isTeacher);
  const loading = useSelector((state) => state.auth?.signInLoading);

  const handleSubmit = async (value) => {
    const data = Object.assign(value, {isTeacher}, {deviceInfo});
    dispatch(AuthActions.signIn(data));
    dispatch(AppDataActions.getCategories());
    dispatch(AppDataActions.getCategoriesStHome());
  };

  const onPressedForgetPassword = () => {
    navigate(STUDENT_STACK, {screen: FORGET_PASSWORD_SCREEN});
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape(VALIDATION_SIGN_IN)}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <KeyboardAvoidingView
            enabled
            // behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={styles.welcomeText}>{string.WELCOME_TO_ALBA}</Text>
              <Text style={styles.text}>{string.CHOOSE_YOUR_LOGIN_METHOD}</Text>
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

            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={onPressedForgetPassword}
              style={styles.forgetBtn}>
              <Text style={[styles.textForget]}>{string.FORGOT_PASSWORD}</Text>
            </TouchableOpacity>
            <FormBtn
              title={string.LOGIN}
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

export default StudentLoginTop;

/* <TouchableOpacity
              onPress={handleSubmit}
              style={styles.signupBtn}
              activeOpacity={ACTIVE_OPACITY}>
              {loading ? (
                <ActivityIndicator color={Colors.white} size={width * 0.06} />
              ) : (
                <Text style={styles.textBtn}>Login</Text>
              )}
            </TouchableOpacity> */
