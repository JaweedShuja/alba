import React from 'react';
import {
  View,
  Text,
  TextInput,
  I18nManager,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Strings from 'App/Values/Strings';
import styles from './style';
import {navigate} from '../../../Services/NavigationService';
import {Formik} from 'formik';
import * as yup from 'yup';
import FormBtn from '../../Share/FormBtn';
import {Colors} from '../../../Theme';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from 'App/Stores/AppData/Actions';
import {string} from 'App/i18n';
import {useStrings} from 'App/Values/Strings';

const {COURSE_ACTIVATION_IMAGE} = Strings.ImageAddress;
const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {STUDENT_SIGN_UP_SCREEN, STUDENT_STACK, SHOP_LIST_SCREEN} =
  Strings.Routes;

const CourseActivation = ({courseId}) => {
  const stringData = useStrings();

  const {VALIDATION_COURSE_ACTIVATION_CODE} = stringData;

  // console.log(courseId);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.appData.courseActivationLoading);
  const onPressedGoStudentLogin = () => {
    navigate(STUDENT_STACK, {screen: STUDENT_SIGN_UP_SCREEN});
  };
  const onPressedGoToShopList = () => {
    navigate(STUDENT_STACK, {screen: SHOP_LIST_SCREEN});
  };

  const handleSubmit = async (value) => {
    const data = Object.assign(value, {courseId});
    dispatch(AppDataActions.courseActivation(data));
  };

  return (
    <Formik
      initialValues={{
        activationCode: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape(VALIDATION_COURSE_ACTIVATION_CODE)}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => {
        return (
          <KeyboardAvoidingView
            style={styles.container}
            enabled
            // behavior={Platform.OS === 'ios' ? 'padding' : null}
          >
            <FastImage
              source={COURSE_ACTIVATION_IMAGE}
              style={styles.image}
              resizeMode={'cover'}
            />
            <View style={styles.viewTextInput}>
              <TextInput
                value={values.activationCode}
                onChangeText={handleChange('activationCode')}
                onBlur={() => setFieldTouched('activationCode')}
                style={styles.textInput}
                placeholder={string.ENTER_ACTIVATION_CODE}
                maxLength={10}
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
              />
            </View>
            {touched.activationCode && errors.activationCode && (
              <Text style={styles.errorText}>{errors.activationCode}</Text>
            )}
            <FormBtn
              title={string.ACTIVATED_COURSE}
              disabled={loading}
              handleSubmit={handleSubmit}
              colorBtn={Colors.lightBlue}
              loading={loading}
              style={styles.activeCourseBtn}
            />
            {Platform.OS === 'android' && (
              <FormBtn
                title={string.BUY_ACTIVATION_CODE}
                // disabled={loading}
                handleSubmit={onPressedGoToShopList}
                colorBtn={Colors.redColorLess}
                // loading={loading}
                style={styles.buyActiveCodeBtn}
              />
            )}
            {/* <TouchableOpacity
              style={styles.activeCourseBtn}
              activeOpacity={ACTIVE_OPACITY}
              onPress={onPressedGoStudentLogin}>
              <Text style={styles.text}>Activated Course</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyActiveCodeBtn}
              activeOpacity={ACTIVE_OPACITY}
              onPress={onPressedGoToShopList}>
              <Text style={styles.text}>Buy Activation Code</Text>
            </TouchableOpacity> */}
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
};

export default CourseActivation;
