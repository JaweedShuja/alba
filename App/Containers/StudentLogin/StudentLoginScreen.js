import React, {useEffect} from 'react';
import {
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Container from 'App/Components/Container';
import StudentLoginMain from 'App/Components/Home/StudentLoginMain';
import StudentLoginTop from 'App/Components/Home/StudentLoginTop';
import StudentSignUpFooter from 'App/Components/Home/StudentSignUpFooter';
import Header from 'App/Components/Share/Header';
import {string} from 'App/i18n';
import {useSelector} from 'react-redux';
import Strings from '../../Values/Strings';
import styles from './StudentLoginStyle';

const StudentLoginScreen = ({navigation, route}) => {
  const type = useSelector((state) => state.appData.isTeacher);

  const backHandler = () => {
    console.log('backHandler');
    navigation.navigate(Strings.Routes.MAIN_SCREEN);
  };

  useEffect(() => {
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

  const fromResponseHandler = route?.params?.fromResponseHandler;
  console.log('aaaaaaaaa', {fromResponseHandler});
  return (
    <Container {...{navigation}}>
      <Header
        {...{fromResponseHandler}}
        {...{navigation}}
        login={true}
        title={type ? string.TEACHER_LOGIN : string.STUDENT_LOGIN}
        close={true}
        backHandler={backHandler}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollView}>
        <KeyboardAvoidingView
          style={styles.container}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <StudentLoginTop />
          <StudentLoginMain {...{navigation}} {...{fromResponseHandler}} />
        </KeyboardAvoidingView>
      </ScrollView>
      <StudentSignUpFooter {...{type}} />
    </Container>
  );
};

export default StudentLoginScreen;
