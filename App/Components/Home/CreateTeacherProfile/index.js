import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  I18nManager,
} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import AuthActions from '../../../Stores/Authentication/Actions';
import {Helpers, Metrics, Fonts, Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import GenderPicker from '../../Share/GenderPicker';
import {string} from 'App/i18n';
import {useStrings} from 'App/Values/Strings';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import FormInputProfile from '../../Share/FormInputProfile';
import {isIOS} from '../../../Theme/Metrics';

const {width} = Dimensions.get('screen');

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const CreateTeacherProfile = ({email}) => {
  const dispatch = useDispatch();
  const stringData = useStrings();

  const {VALIDATION_CREATE_TEACHER_PROFILE} = stringData;

  console.log({email});
  const [userType, setUserType] = useState(0);

  const deviceInfo = useSelector((state) => state.startUp.deviceInfo);
  const loading = useSelector(
    (state) => state.auth?.createTeacherProfileLoading,
  );
  const dob = useSelector((state) => state?.appData.dateBirthdayData);
  const genderType = useSelector((state) => state?.appData.genderUserData);

  var dateObj = new Date(dob);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  const newDate = year + '/' + month + '/' + day;

  const handleSubmit = async (value) => {
    const voipIosPush = 'string';
    const apnsPush = 'string';
    const gender = genderType ? 1 : 0;
    const data = Object.assign(
      value,
      {gender},
      {deviceInfo},
      // {dob},
      {voipIosPush},
      {apnsPush},
      {email},
      // {city},
    );
    console.log({data});
    dispatch(AuthActions.createTeacherProfile(data));
  };

  const onSubmitChangeUserType = () => {
    setUserType(userType === 0 ? 1 : 0);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        phoneNumber: '',
        school: '',
        lesson: '',
        city: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape(VALIDATION_CREATE_TEACHER_PROFILE)}>
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
          <View enabled behavior={isIOS && 'padding'} style={styles.container}>
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
                string.TEACHER_WICH_YOURE_TEACHERS_ALSO_SEE_YOU_BY_THIS_NAME
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
              <Text style={styles.text}>
                {genderType ? string.MAN : string.woman}
              </Text>
            </GenderPicker>
            <View style={styles.footerTextStyle}>
              <Text style={styles.text}>{string.CHOOSE_STUDENTS_GENDER}</Text>
            </View>

            <FormInputProfile
              name="city"
              iconName={Strings.Icons.BUILDING}
              value={values.city}
              onChangeText={handleChange('city')}
              placeholder={string.CITY}
              onBlur={handleBlur('city')}
              // style={styles.textInput}
              // autoFocus
              error={values.city?.length >= 0 && errors.city}
              errorText={errors.city}
              title={string.ENTER_CITY_YOU_TEACHER}
            />

            <FormInputProfile
              name="school"
              iconName={Strings.Icons.UNIVERSITY}
              value={values.school}
              onChangeText={handleChange('school')}
              placeholder={string.SCHOOL}
              onBlur={handleBlur('school')}
              // style={styles.textInput}
              // autoFocus
              error={values.school?.length >= 0 && errors.school}
              errorText={errors.school}
              title={string.ENTER_SCHOOL_YOU_TEACHER}
            />

            <FormInputProfile
              name="lesson"
              iconName={Strings.Icons.BOOK_ALT}
              value={values.lesson}
              onChangeText={handleChange('lesson')}
              placeholder={string.LESSON}
              onBlur={handleBlur('lesson')}
              // style={styles.textInput}
              // autoFocus
              error={values.lesson?.length >= 0 && errors.lesson}
              errorText={errors.lesson}
              title={string.ENTER_LESSON_YOU_TEACHER}
            />

            <FormInputProfile
              name="phoneNumber"
              iconName={Strings.Icons.SMARTPHONE}
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              placeholder={string.EXAMPLE_1234567890}
              onBlur={handleBlur('phoneNumber')}
              keyboardType={'phone-pad'}
              maxLength={11}
              // style={styles.textInput}
              // autoFocus
              error={values.phoneNumber?.length >= 0 && errors.phoneNumber}
              errorText={errors.phoneNumber}
              title={string.ENTER_PHONE_NUMBER}
            />

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
          </View>
        );
      }}
    </Formik>
  );
};

export default CreateTeacherProfile;
