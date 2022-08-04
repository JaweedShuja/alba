import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import {string} from 'App/i18n';
import React from 'react';
import {
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import CreateTeacherProfile from '../../Components/Home/CreateTeacherProfile';
import {isIOS} from '../../Theme/Metrics';
import styles from './CreateTeacherProfileStyle';

const CreateTeacherProfileScreen = ({navigation, route}) => {
  const data = route.params;
  const email = route.params?.email;
  const fromResponse = route.params?.fromResponse;

  return (
    <Container {...{navigation}}>
      <Header {...{navigation, fromResponse}} title={string.TEACHER_SIGN_UP} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={[styles.scrollView]}>
        <KeyboardAvoidingView
          enabled
          behavior={isIOS && 'padding'}
          style={{flex: 1}}>
          <CreateTeacherProfile {...{email}} />
        </KeyboardAvoidingView>
      </ScrollView>
    </Container>
  );
};

export default CreateTeacherProfileScreen;
