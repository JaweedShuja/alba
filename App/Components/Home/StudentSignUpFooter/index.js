import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {useDispatch} from 'react-redux';
import AppDataActions from '../../../Stores/AppData/Actions';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const StudentSignUpFooter = ({type}) => {
  const dispatch = useDispatch();

  const onPressFooter = () => {
    if (type) {
      dispatch(AppDataActions.isTeacher('student'));
    } else {
      dispatch(AppDataActions.isTeacher('teacher'));
    }
  };
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={onPressFooter}
      activeOpacity={ACTIVE_OPACITY}>
      <Text style={styles.text}>
        {string.SIGN_UP_LOGIN_AS} {type ? string.STUDENT_K : string.TEACHER_K}
      </Text>
    </TouchableOpacity>
  );
};

export default StudentSignUpFooter;
