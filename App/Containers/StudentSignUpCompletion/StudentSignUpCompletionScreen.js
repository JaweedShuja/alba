import React from 'react';
import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import styles from './StudentSignUpCompletionStyle';
import DummyData from 'App/Values/DummyData';
import StudentSignUpCompletion from 'App/Components/Home/StudentSignUpCompletion';
import {useSelector, useDispatch} from 'react-redux';
import AuthActions from '../../Stores/Authentication/Actions';
import {string} from 'App/i18n';
import {isIOS} from '../../Theme/Metrics';

const StudentSignUpCompletionScreen = ({navigation, route}) => {
  const data = route.params;
  const email = route.params?.email;
  const fromResponse = route.params?.fromResponse;
  return (
    <Container {...{navigation}}>
      <Header {...{navigation, fromResponse}} title={string.SIGN_UP_STUDENT} />
      <KeyboardAvoidingView
        enabled
        behavior={isIOS && 'padding'}
        style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <StudentSignUpCompletion {...{email}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default StudentSignUpCompletionScreen;
