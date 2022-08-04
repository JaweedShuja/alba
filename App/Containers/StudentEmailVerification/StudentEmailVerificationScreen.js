import React from 'react';
import {View, Text, Keyboard, TouchableWithoutFeedback} from 'react-native';
import styles from './StudentEmailVerificationStyle';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import StudentEmailVerification from 'App/Components/Home/StudentEmailVerification';
import {useSelector, useDispatch} from 'react-redux';
import AuthActions from '../../Stores/Authentication/Actions';
import {string} from 'App/i18n';

const StudentEmailVerificationScreen = ({navigation, route}) => {
  const email = route?.params?.email;
  const dispatch = useDispatch();

  const data = useSelector((state) => state.auth.signUpSuccessData);

  const onCodeSubmitted = (verificationCode) => {
    const userId = data?.payload?.userId;
    const sessionId = data?.payload?.sessionId;
    const myData = Object.assign({userId}, {sessionId}, {verificationCode});
    dispatch(AuthActions.verifyByEmail(myData));
  };

  const onSubmitResendVerify = () => {
    const userId = data?.payload?.userId;
    const sessionId = data?.payload?.sessionId;
    const myData = Object.assign({userId}, {sessionId});
    dispatch(AuthActions.resendVerificationCode(myData));
  };

  return (
    <Container {...{navigation}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <Header {...{navigation}} title={string.EMAIL_VERIFICATION} />
          <StudentEmailVerification
            {...{onCodeSubmitted, onSubmitResendVerify, email}}
          />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default StudentEmailVerificationScreen;
