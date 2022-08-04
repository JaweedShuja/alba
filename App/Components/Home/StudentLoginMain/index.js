import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {string} from 'App/i18n';
import GoogleLoginBtn from 'App/Components/Share/GoogleLoginBtn';
import FacebookLoginBtn from 'App/Components/Share/FacebookLoginBtn';
import AppleLoginBtn from '../../Share/AppleSigninBtn';
import {isIOS} from '../../../Theme/Metrics';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {STUDENT_SIGN_UP_SCREEN, STUDENT_STACK} = Strings.Routes;

const StudentLoginMain = ({navigation}) => {
  const onPressGoSignUp = () => {
    navigation.replace(STUDENT_STACK, {screen: STUDENT_SIGN_UP_SCREEN});
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewOr}>
        <Text style={styles.textOr}>{string.OR}</Text>
      </View>
      <FacebookLoginBtn />
      <GoogleLoginBtn />
      {isIOS && <AppleLoginBtn />}

      <View style={styles.viewAccount}>
        <Text style={styles.textAccount}>{string.DO_YOU_HAVE_ACCOUNT}</Text>
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={styles.loginBtn}
          onPress={onPressGoSignUp}>
          <Text style={[styles.textBtn, {color: Colors.login}]}>
            {string.SIGN_UP_ACCOUNT}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentLoginMain;

// navigation.pop(1);

/*
      <FormBtn
        // title={'Sign Up'}
        //  disabled={loading}
        // handleSubmit={handleSubmit}
        colorBtn={Colors.facebook}
        //  loading={loading}
        style={styles.facebookBtn}>
        <FontIcon
          name={Strings.Icons.FACEBOOK}
          color={Colors.white}
          size={normal * 2}
        />
        <Text style={styles.textBtn}>{string.LOGIN_WITH_FACEBOOK}</Text>
        <View />
      </FormBtn>
*/
