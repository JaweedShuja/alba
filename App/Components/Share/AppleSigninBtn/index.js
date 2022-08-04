import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
// import styles from './style';
// import {ApplicationStyles, Images} from '../../Theme';
import {useDispatch, useSelector} from 'react-redux';
// import SocialActions from "../../Stores/SocialAuth/Actions";
// import FormBtn from 'App/Components/Share/FormBtn';
// import FontIcon from 'App/Components/CustomIcon/FontIcon';
// import {Colors} from 'App/Theme';
// import Strings from 'App/Values/Strings';
// import {normal} from 'App/Theme/Metrics';
import {string} from 'App/i18n';
import AuthActions from 'App/Stores/Authentication/Actions';
import {AppleSignin} from '../../../Services/AppleSignin';
import {showToast} from '../../../utils/showToast';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {ApplicationStyles, Helpers, Metrics} from '../../../Theme';
import {normal} from '../../../Theme/Metrics';

import AppleIcon from 'react-native-vector-icons/FontAwesome5';

const AppleLoginBtn = () => {
  const dispatch = useDispatch();

  const [appleInfo, setAppleInfo] = useState(null);
  const isTeacher = useSelector((state) => state.appData.isTeacher);

  const deviceInfo = useSelector((state) => state.startUp.deviceInfo);

  const appleData = useSelector((state) => state?.auth?.socialData);
  console.log({appleData});
  useEffect(() => {
    if (appleInfo) {
      console.log('AppleInfoDATA=>', appleInfo);
      const socialId = appleInfo?.user;
      let email = appleInfo?.email;
      if (!email) {
        let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let temp = '';
        for (var ii = 0; ii < 15; ii++) {
          temp += chars[Math.floor(Math.random() * chars.length)];
        }
        email = temp + '@gmail.com';
      }
      const firstName = appleInfo?.fullName?.givenName || appleData?.firstName;
      const registerType = 'APPLE';

      const data = Object.assign(
        {socialId},
        {email},
        {firstName},
        {registerType},
        {isTeacher},
        {deviceInfo},
      );
      if (email) {
        dispatch(AuthActions.appleSignUp(data));
      } else {
        showToast('e', string.PROBLEM_IN_APPLE_INITIATE_DATA);
      }
    }
  }, [appleInfo]);
  console.log('FB_INFO', appleInfo);
  const onAppleLogin = async () => {
    await AppleSignin(setAppleInfo);
  };

  return (
    <TouchableOpacity
      style={{
        ...ApplicationStyles.button,
        // ...Helpers.mainSpaceBetween,
        // ...Metrics.paddingHorizontalMain,
        // ...Metrics.mediumTopMargin,
        height: 48,
        borderRadius: normal * 10,
        marginTop: 16,
        backgroundColor: 'black',
      }}
      onPress={() => onAppleLogin()}>
      <AppleIcon
        name={'apple'}
        color={'white'}
        style={{position: 'absolute', left: 25}}
        size={20}
      />
      <Text style={{color: 'white', fontWeight: '400'}}>
        Sign in with Apple
      </Text>
    </TouchableOpacity>
  );
};
export default AppleLoginBtn;

//  const loading = useSelector((state) => state.auth?.socialSignUpLoading);

// const fResult = await signUpFacebook();
// console.log('fResult*=>', fResult);
