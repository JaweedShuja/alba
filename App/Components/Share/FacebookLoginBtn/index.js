import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
// import {ApplicationStyles, Images} from '../../Theme';
import {useDispatch, useSelector} from 'react-redux';
// import SocialActions from "../../Stores/SocialAuth/Actions";
import FormBtn from 'App/Components/Share/FormBtn';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {Colors} from 'App/Theme';
import Strings from 'App/Values/Strings';
import {normal} from 'App/Theme/Metrics';
import {string} from 'App/i18n';
import AuthActions from 'App/Stores/Authentication/Actions';
import {signUpFacebook} from 'App/utils/signUpFacebook';

const FacebookLoginBtn = () => {
  const dispatch = useDispatch();

  const [fbInfo, setFbInfo] = useState(null);
  const isTeacher = useSelector((state) => state.appData.isTeacher);

  const deviceInfo = useSelector((state) => state.startUp.deviceInfo);

  useEffect(() => {
    if (fbInfo) {
      console.log('facebookInfoDATA=>', fbInfo);
      const socialId = fbInfo?.id;
      const email = fbInfo?.email;
      const firstName = fbInfo?.name;
      const registerType = 'FACEBOOK';
      const data = Object.assign(
        {socialId},
        {email},
        {firstName},
        {registerType},
        {isTeacher},
        {deviceInfo},
      );
      dispatch(AuthActions.socialSignUp(data));
    }
  }, [fbInfo]);
  console.log('FB_INFO', fbInfo);
  const onFacebookSignIn = async () => {
    await signUpFacebook(setFbInfo);
  };

  return (
    <FormBtn
      handleSubmit={onFacebookSignIn}
      colorBtn={Colors.facebook}
      style={styles.facebookBtn}>
      <FontIcon
        name={Strings.Icons.FACEBOOK}
        color={Colors.white}
        size={normal * 2}
      />
      <Text style={styles.textBtn}>{string.LOGIN_WITH_FACEBOOK}</Text>
      <View />
    </FormBtn>
  );
};
export default FacebookLoginBtn;

//  const loading = useSelector((state) => state.auth?.socialSignUpLoading);

// const fResult = await signUpFacebook();
// console.log('fResult*=>', fResult);
