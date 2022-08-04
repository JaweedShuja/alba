import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import styles from './StudentSignUpStyle';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import StudentSignUpTop from 'App/Components/Home/StudentSignUpTop';
import StudentSignUpMain from 'App/Components/Home/StudentSignUpMain';
import StudentSignUpFooter from 'App/Components/Home/StudentSignUpFooter';
import Loading from 'App/Components/Share/Loading';
import {useSelector, useDispatch} from 'react-redux';
import {string} from 'App/i18n';
import Strings from '../../Values/Strings';
import AuthActions from 'App/Stores/Authentication/Actions';
import {Colors} from '../../Theme';

const StudentSignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.socialSignUpLoading);
  const type = useSelector((state) => state.appData.isTeacher);

  const backHandler = () => {
    console.log('backHandler');
    navigation.navigate(Strings.Routes.MAIN_SCREEN);
  };
  useEffect(() => {
    dispatch(AuthActions.onFail());
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const backAction = () => {
    console.log('backHandler');
    backHandler();
    return true;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        {...{navigation}}
        title={type ? string.SIGN_UP_TEACHER : string.SIGN_UP_STUDENT}
        close={true}
        backHandler={backHandler}
      />
      {/* <View style={styles.scrollView}> */}
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={styles.container}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <StudentSignUpTop />
          <StudentSignUpMain {...{navigation}} />
        </KeyboardAvoidingView>
      </ScrollView>
      <StudentSignUpFooter {...{type}} />
    </View>
  );
};

export default StudentSignUpScreen;
