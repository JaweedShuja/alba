import React from 'react';
import {View} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {navigate} from 'App/Services/NavigationService';
import FormBtn from '../../Share/FormBtn';
import {Colors} from '../../../Theme';
import AppDataActions from '../../../Stores/AppData/Actions';
import {useDispatch} from 'react-redux';
import AuthActions from 'App/Stores/Authentication/Actions';
import {string} from 'App/i18n';
import PopupsActions from 'App/Stores/PopUps/Actions';

const {STUDENT_SIGN_UP_SCREEN, STUDENT_STACK} = Strings.Routes;

const MainProfile = ({data, isLoggedInSuccess, email}) => {
  const dispatch = useDispatch();

  const onPressedStudentLogin = () => {
    dispatch(AppDataActions.isTeacher('student'));
    navigate(STUDENT_STACK, {screen: STUDENT_SIGN_UP_SCREEN});
  };

  const onPressedTeacherTabs = () => {
    dispatch(AppDataActions.isTeacher('teacher'));
    navigate(STUDENT_STACK, {screen: STUDENT_SIGN_UP_SCREEN});
  };

  const onPressedLogout = async () => {
    dispatch(
      PopupsActions.showModal(Strings.MODAL_TYPES.CONFIRM_MODAL, {
        description: string.ARE_YOU_SURE_YOU_WANT_TO_LOG_OUT,
        confirm: () => {
          dispatch(AuthActions.logOut());
        },
        cancel: () =>
          dispatch(PopupsActions.hideModal(Strings.MODAL_TYPES.CONFIRM_MODAL)),
      }),
    );
  };

  return (
    <View style={styles.container}>
      {isLoggedInSuccess?.payload?.isLoggedIn || email ? (
        <FormBtn
          title={string.LOGOUT}
          handleSubmit={onPressedLogout}
          colorBtn={Colors.redColorLess}
          style={styles.teacherBtn}
        />
      ) : (
        <>
          <FormBtn
            title={data.english.studentLogin}
            handleSubmit={onPressedStudentLogin}
            colorBtn={Colors.lightBlue}
            style={styles.studentBtn}
          />
          <FormBtn
            title={data.english.teacherLogin}
            handleSubmit={onPressedTeacherTabs}
            colorBtn={Colors.redColorLess}
            style={styles.teacherBtn}
          />
        </>
      )}
    </View>
  );
};

export default MainProfile;

// await AsyncStorage.removeItem('homeListWatchType');
// AsyncStorageHandler.storageHandler(REMOVE);
