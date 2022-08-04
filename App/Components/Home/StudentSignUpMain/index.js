import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {string} from 'App/i18n';
import GoogleLoginBtn from 'App/Components/Share/GoogleLoginBtn';
import FacebookLoginBtn from '../../../Components/Share/FacebookLoginBtn';
import AppleLoginBtn from '../../Share/AppleSigninBtn';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {STUDENT_LOGIN_SCREEN, STUDENT_STACK, STUDENT_EMAIL_VERIFICATION_SCREEN} =
  Strings.Routes;

const StudentSignUpMain = ({navigation}) => {
  const onPressGoLogin = () => {
    console.log('fromResponseHandler');

    navigation.replace(STUDENT_STACK, {
      screen: STUDENT_LOGIN_SCREEN,
      params: {fromResponseHandler: true},
    });
  };
  // const onAppleLogin = async () => {
  //   const appleCredential = await AppleSignin();
  //   const {token, secret, providerId} = appleCredential;
  //   console.log({token, secret, providerId});
  // };

  return (
    <View style={styles.container}>
      <View style={styles.viewOr}>
        <Text style={styles.textOr}>{string.OR}</Text>
      </View>
      <FacebookLoginBtn />
      <GoogleLoginBtn />
      {Platform.OS === 'ios' && <AppleLoginBtn />}
      <View style={styles.viewAccount}>
        <Text style={styles.textAccount}>{string.DO_YOU_HAVE_ACCOUNT}</Text>
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={styles.loginBtn}
          onPress={onPressGoLogin}>
          <Text style={styles.textBtn}>{string.LOGIN}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentSignUpMain;

/*

        // title={'Sign Up'}
        //  disabled={loading}
        //  loading={loading}

const onPressGoToSignUp = () => {
    navigate(STUDENT_STACK, {screen: STUDENT_EMAIL_VERIFICATION_SCREEN});
  };

const onPressLoginWithGoogle = () => {};

<FormBtn
        // title={'Sign Up'}
        //  disabled={loading}
        handleSubmit={onPressLoginWithGoogle}
        colorBtn={Colors.google}
        //  loading={loading}
        style={styles.googleBtn}>
        <FontIcon
          name={Strings.Icons.GOOGLE}
          color={Colors.white}
          size={normal * 1.5}
        />
        <Text style={styles.textBtn}>{string.LOGIN_WITH_GOOGLE}</Text>
        <View />
      </FormBtn> */

/* <FormBtn
        handleSubmit={onPressLoginWithFacebook}
        colorBtn={Colors.facebook}
        style={styles.facebookBtn}>
        <FontIcon
          name={Strings.Icons.FACEBOOK}
          color={Colors.white}
          size={normal * 2}
        />
        <Text style={styles.textBtn}>{string.LOGIN_WITH_FACEBOOK}</Text>
        <View />
      </FormBtn> */
