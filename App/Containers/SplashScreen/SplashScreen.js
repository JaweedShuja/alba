import React, {useEffect} from 'react';
import {View, Platform} from 'react-native';
import styles from './style';
import AppDataActions from 'App/Stores/AppData/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {navigateAndReset} from '../../Services/NavigationService';
import Strings from '../../Values/Strings';
import AsyncStorage from '@react-native-community/async-storage';
import {Helpers} from 'App/Theme';
import FastImage from 'react-native-fast-image';
import messaging from '@react-native-firebase/messaging';
import asyncStorageHandler, {
  STORAGE_CONSTANTS,
} from 'App/Services/asyncStorageHandler';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import Loading from '../../Components/Share/Loading';
import {Text} from 'react-native';
import {string} from 'App/i18n';
import {getDeviceInfo} from 'App/Services/DeviceInfo';

const {FCM_TOKEN} = STORAGE_CONSTANTS;
const {STUDENTS_BOTTOMS_TABS, TEACHER_BOTTOMS_TABS} = Strings.Routes;
const {SPLASHSCREEN} = Strings.ImageAddress;

const SplashScreen = () => {
  const dispatch = useDispatch();
  const firstRun = useSelector((state) => state?.startUp?.firstRun);

  //============================EFFECTS==========================
  //-----------------------------------------------------firebase
  useEffect(() => {
    checkPermission();
    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      saveFcmToken(token);
    });
  }, []);

  //---------------------------------------------------------home
  useEffect(() => {
    setTimeout(() => {
      getStHomeListWatchType();
    }, 5000);
  }, []);

  useEffect(() => {
    dispatch(AppDataActions.getCategoriesStHome());
    dispatch(AppDataActions.getCategories());
  }, []);

  if (Platform.OS === 'ios') {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        const {foreground, userInteraction, title, message} = notification;
        if (foreground && (title || message) && !userInteraction)
          PushNotification.localNotification(notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    });
  }

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    enabled === 1 ? getFcmToken() : requestPermission();
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    fcmToken && (saveFcmToken(fcmToken), messageListener());
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getFcmToken();
    } catch (error) {
      // User has rejected permissions
    }
  };

  const saveFcmToken = async (token) => {
    asyncStorageHandler.storageHandler(FCM_TOKEN, token);
    const deviceInfo = await getDeviceInfo();
    const deviceId = deviceInfo?.deviceId;
    const param = {deviceId: deviceId, token: token};
    dispatch(AppDataActions.updateToken(param));
  };

  const messageListener = () => {
    messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        data: remoteMessage.data,
        //color: 'red',
      });
      // if (Platform.OS == 'android') {
      // }
      console.log('remoteMessage*=>', remoteMessage);
    });
  };

  const getStHomeListWatchType = async () => {
    try {
      const watchType = await AsyncStorage.getItem('homeListWatchType');
      console.log('watchType*=>', watchType);
      if (watchType === 'student') {
        navigateAndReset(STUDENTS_BOTTOMS_TABS);
      } else if (watchType === 'teacher') {
        navigateAndReset(TEACHER_BOTTOMS_TABS);
      } else {
        navigateAndReset(STUDENTS_BOTTOMS_TABS);
      }
      //setWatchTypeLoading(false);
      console.log('watchType=>', watchType);
    } catch (error) {
      console.log('watchType error=>', error);
      //setWatchTypeLoading(false);
      navigateAndReset(STUDENTS_BOTTOMS_TABS);
    }
  };

  return (
    <View style={Helpers.fillRowCenter}>
      {firstRun ? (
        <Loading>
          <Text style={styles.loading}>{string.LOADING_PLEASE_WAIT}</Text>
        </Loading>
      ) : (
        <FastImage source={SPLASHSCREEN} style={[styles.image]} />
      )}
    </View>
  );
};

export default SplashScreen;
