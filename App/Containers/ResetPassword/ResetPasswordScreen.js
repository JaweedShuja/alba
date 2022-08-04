import Container from 'App/Components/Container';
import ResetPassword from 'App/Components/Home/ResetPassword';
import Header from 'App/Components/Share/Header';
import {string} from 'App/i18n';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AuthActions from '../../Stores/Authentication/Actions';

const ResetPasswordScreen = ({navigation, route}) => {
  const token = route?.params;
  console.log({token});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.resetPasswordCheckToken(token));
  }, []);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.RESET_PASSWORD} />
      <ResetPassword />
    </Container>
  );
};

export default ResetPasswordScreen;
