import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
  I18nManager,
} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import AuthActions from '../../../Stores/Authentication/Actions';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import DatePickerComponent from '../../Share/DatePicker';
import GenderPicker from '../../Share/GenderPicker';
import {string} from 'App/i18n';
import {useStrings} from 'App/Values/Strings';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import FormInputProfile from '../../Share/FormInputProfile';

const {width} = Dimensions.get('screen');

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const StudentSignUpCompletion = ({email}) => {
  const dispatch = useDispatch();
  const stringData = useStrings();

  const {VALIDATION_STUDENT_COMPLETION_PROFILE} = stringData;
  console.log({email});
  const [userType, setUserType] = useState(0);
  const [date, setDate] = useState(new Date());

  const deviceInfo = useSelector((state) => state.startUp.deviceInfo);
  const loading = useSelector((state) => state.auth?.createUserProfileLoading);
  // const dob = useSelector((state) => state?.appData.dateBirthdayData);
  const genderType = useSelector((state) => state?.appData.genderUserData);

  var dateObj = new Date(date);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  const newDate = year + '/' + month + '/' + day;

  const handleSubmit = async (value) => {
    const voipIosPush = 'string';
    const apnsPush = 'string';
    const gender = genderType ? 1 : 0;
    const dob = date;
    console.log('df', {dob});

    const data = Object.assign(
      value,
      {gender},
      {deviceInfo},
      {dob},
      {userType},
      {voipIosPush},
      {apnsPush},
      {email},
    );
    console.log('df', {data});

    dispatch(AuthActions.createUserProfile(data));
  };

  const onSubmitChangeUserType = () => {
    setUserType(userType === 0 ? 1 : 0);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        phoneNumber: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={yup
        .object()
        .shape(VALIDATION_STUDENT_COMPLETION_PROFILE)}>
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
            <FormInputProfile
              name="firstName"
              autoFocus={true}
              iconName={Strings.Icons.USER}
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              placeholder={string.NAME_SURNAME}
              onBlur={handleBlur('firstName')}
              // style={styles.textInput}
              // autoFocus
              error={values.firstName?.length >= 0 && errors.firstName}
              errorText={errors.firstName}
              title={
                string.STUDENTS_WICH_YOURE_TEACHERS_ALSO_SEE_YOU_BY_THIS_NAME
              }
            />

            <View style={styles.viewInputs}>
              <View style={styles.icon}>
                <FontIcon
                  name={Strings.Icons.EMAIL_OUTLINE}
                  size={normal * 2}
                  color={Colors.lightBlue}
                />
              </View>
              <TextInput
                value={email}
                // onChangeText={handleChange('email')}
                // onBlur={() => setFieldTouched('email')}
                // placeholder={'Email'}
                editable={false}
                style={styles.textInput}
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
              />
            </View>
            {touched.email && errors.email && (
              <View style={styles.footerTextStyle}>
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            )}
            <View style={styles.footerTextStyle}>
              <Text style={styles.text}>
                {string.ENTER_STUDENTS_YOUR_CURRENT_EMAIL}
              </Text>
            </View>
            <GenderPicker {...{genderType}}>
              <Text style={styles.text}>{genderType ? 'Man' : 'Woman'}</Text>
            </GenderPicker>
            <View style={styles.footerTextStyle}>
              <Text style={styles.text}>{string.CHOOSE_STUDENTS_GENDER}</Text>
            </View>
            <DatePickerComponent date={date} onDateChange={setDate}>
              <Text style={styles.text}>{newDate}</Text>
            </DatePickerComponent>
            <View style={styles.footerTextStyle}>
              <Text style={styles.text}>
                {string.PLEASE_ENTER_STUDENTS_BIRTHDAY}
              </Text>
            </View>

            <FormInputProfile
              name="phoneNumber"
              iconName={Strings.Icons.SMARTPHONE}
              value={values.firstName}
              keyboardType={'phone-pad'}
              onChangeText={handleChange('phoneNumber')}
              placeholder={string.EXAMPLE_1234567890}
              onBlur={handleBlur('phoneNumber')}
              maxLength={11}
              // style={styles.textInput}
              // autoFocus
              error={values.phoneNumber?.length >= 0 && errors.phoneNumber}
              errorText={errors.phoneNumber}
              title={string.ENTER_PHONE_NUMBER}
            />

            <TouchableOpacity
              style={styles.radioButton}
              onPress={onSubmitChangeUserType}
              activeOpacity={ACTIVE_OPACITY}>
              <Icon
                name={userType === 0 ? 'circle-o' : 'dot-circle-o'}
                color={Colors.lightBlue}
                size={normal * 1.8}
              />
              <Text style={styles.textParent}>{string.I_AM_PARENT}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: loading
                    ? Colors.commonGray
                    : Colors.lightBlue,
                },
              ]}
              disabled={loading}
              onPress={handleSubmit}
              activeOpacity={ACTIVE_OPACITY}>
              {loading ? (
                <ActivityIndicator color={Colors.white} size={width * 0.06} />
              ) : (
                <Text style={styles.textBtn}>{string.SIGN_UP}</Text>
              )}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
};

export default StudentSignUpCompletion;
