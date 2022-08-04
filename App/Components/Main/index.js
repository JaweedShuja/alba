import {string} from 'App/i18n';
import React, {useEffect, useState} from 'react';
import {navigateAndReset} from 'App/Services/NavigationService';
import {Colors} from 'App/Theme';
import Strings from 'App/Values/Strings';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import AppDataActions from '../../Stores/AppData/Actions';
import FormBtn from '../Share/FormBtn';
import Loading from '../Share/Loading';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';

const {STUDENTS_BOTTOMS_TABS, TEACHER_BOTTOMS_TABS} = Strings.Routes;

const Main = () => {
  const dispatch = useDispatch();

  const [watchTypeLoading, setWatchTypeLoading] = useState(true);

  useEffect(() => {
    getStHomeListWatchType();
  }, []);

  const getStHomeListWatchType = async () => {
    try {
      const watchType = await AsyncStorage.getItem('homeListWatchType');
      if (watchType === 'student') {
        navigateAndReset(STUDENTS_BOTTOMS_TABS);
      } else if (watchType === 'teacher') {
        navigateAndReset(TEACHER_BOTTOMS_TABS);
      } else {
        console.log('error0', watchType);
        setWatchTypeLoading(false);
      }
    } catch (error) {
      console.log('error1', error);
      setWatchTypeLoading(false);
    }
  };

  const onPressedGotoStudentTab = () => {
    dispatch(AppDataActions.isTeacher('student'));
    dispatch(AppDataActions.homeScreenType(true));
    navigateAndReset(STUDENTS_BOTTOMS_TABS);
  };

  const onPressedGotoTeacherTab = () => {
    dispatch(AppDataActions.isTeacher('teacher'));
    dispatch(AppDataActions.homeScreenType(true));
    navigateAndReset(TEACHER_BOTTOMS_TABS);
  };

  if (watchTypeLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FormBtn
        title={string.STUDENT}
        handleSubmit={onPressedGotoStudentTab}
        colorBtn={Colors.redColorLess}
        style={[styles.btn, {backgroundColor: Colors.redColorLess}]}
      />
      <FormBtn
        title={string.TEACHER}
        handleSubmit={onPressedGotoTeacherTab}
        colorBtn={Colors.lightBlue}
        style={[
          styles.btn,
          {
            backgroundColor: Colors.lightBlue,
          },
        ]}
      />
    </View>
  );
};

export default Main;
