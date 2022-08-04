import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
// import {ApplicationStyles, Images} from '../../Theme';
import {useDispatch, useSelector} from 'react-redux';
// import SocialActions from "../../Stores/SocialAuth/Actions";
import {googleLogin} from '../../../Services/GoogleLogin';
import FastImage from 'react-native-fast-image';
import FormBtn from 'App/Components/Share/FormBtn';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {Colors} from 'App/Theme';
import Strings from 'App/Values/Strings';
import {normal} from 'App/Theme/Metrics';
import {string} from 'App/i18n';
import AuthActions from 'App/Stores/Authentication/Actions';
import {navigate} from '../../../Services/NavigationService';

const {STUDENT_STACK} = Strings.Routes;

const GoogleLoginBtn = () => {
  const isTeacher = useSelector((state) => state.appData.isTeacher);
  const loading = useSelector((state) => state.auth?.socialSignUpLoading);

  const [googleInfo, setGlInfo] = useState(null);
  const dispatch = useDispatch();
  const deviceInfo = useSelector((state) => state.startUp.deviceInfo);

  useEffect(() => {
    if (googleInfo) {
      const socialId = googleInfo?.response?.user?.id;
      const email = googleInfo?.response?.user?.email;
      const firstName = googleInfo?.response?.user?.name;
      const registerType = 'GOOGLE';
      const data = Object.assign(
        {socialId},
        {email},
        {firstName},
        {registerType},
        {isTeacher},
        {deviceInfo},
      );
      console.log('googleInfoDATA=>', googleInfo);
      dispatch(AuthActions.socialSignUp(data));
      // dispatch(SocialActions.googleLogin({googleInfo, deviceInfo}));
      navigate(STUDENT_STACK);
    }
  }, [googleInfo]);

  const onGoogleSignIn = async () => {
    googleLogin(setGlInfo);
    // .then((res) => {
    //   onLoginWithGoogle(res);
    // })
    // .catch(() => {
    //   console.log('eeeeeeeeeeeeeeeeeeee');
    // });
  };

  const onLoginWithGoogle = () => {
    if (googleInfo) {
      const socialId = googleInfo?.response?.user?.id;
      const email = googleInfo?.response?.user?.email;
      const firstName = googleInfo?.response?.user?.name;
      const registerType = 'GOOGLE';
      const data = Object.assign(
        {socialId},
        {email},
        {firstName},
        {registerType},
        {isTeacher},
        {deviceInfo},
      );
      console.log('googleInfoDATA=>', googleInfo);
      dispatch(AuthActions.socialSignUp(data));
    }
  };

  return (
    <FormBtn
      handleSubmit={onGoogleSignIn}
      colorBtn={Colors.google}
      style={styles.googleBtn}>
      <FontIcon
        name={Strings.Icons.GOOGLE}
        color={Colors.white}
        size={normal * 1.5}
      />
      <Text style={styles.textBtn}>{string.LOGIN_WITH_GOOGLE}</Text>
      <View />
    </FormBtn>
  );
};
export default GoogleLoginBtn;

// loading={loading}
// title={'Sign Up'}
// disabled={loading}

// <TouchableOpacity
//   onPress={onGoogleSignIn}
//   style={styles.googleBtn}
//   activeOpacity={0.8}>
//   {/* <FastImage source={Images.google} style={styles.googleIcon} /> */}

//   <Text>{'SIGN_UP_WHIT_GOOGLE'}</Text>
// </TouchableOpacity>
