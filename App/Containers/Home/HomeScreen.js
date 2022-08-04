import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Container from 'App/Components/Container';
import HomeListStudents from 'App/Components/Home/HomeListStudents';
import VerticalGetLessonsTeachers from 'App/Components/Home/VerticalGetLessonsTeachers';
import BanerHeader from 'App/Components/Share/BanerHeader';
import FilterRowUser from 'App/Components/Share/FilterRowUser';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../Components/Share/Loading';
import AppDataActions from '../../Stores/AppData/Actions';
import {useFocusEffect} from '@react-navigation/native';
import PlaceHolderHomeScreen from '../../Components/Home/PlaceHolderHomeScreen';
import VerticalGetLessonsTeachersPlaceHolder from '../../Components/Home/VerticalGetLessonsTeachersPlaceHolder';
import {NotificationService} from 'App/Services/NotificationService';
import UserChatActions from '../../Stores/UserChats/Actions';
import SocketActions from '../../Stores/Socket/Actions';
import asyncStorageHandler, {
  STORAGE_CONSTANTS,
} from '../../Services/asyncStorageHandler';
import {useInitialURL} from 'App/Services/hooks';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {getUrlAsync} = useInitialURL();

  NotificationService();

  //============================STATES===========================
  const socket = useSelector((state) => state?.socket?.socket);
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedInSuccess?.payload?.isLoggedIn,
  );
  const isLoggedIn2 = useSelector(
    (state) => state.auth.signInSuccessData?.userId,
  );
  const loadingGetLessonsTeacherLoading = useSelector(
    (state) => state.appData.getLessonsTeacherLoading,
  );
  const [loading, setLoading] = useState(true);
  const [getLessonsTeacherLoading, setGetLessonsTeacherLoading] =
    useState(true);
  const [stHomeListWatchType, setStHomeListWatchType] = useState(true);
  const typeOfScreen = useSelector((state) => state?.appData.homeScreenType);
  const homeLoading = useSelector((state) => state.appData.homeLoading);
  const data2 = useSelector((state) => state.appData.homeScreen);

  //============================EFFECTS==========================
  useEffect(() => {
    if (isLoggedIn || isLoggedIn2) {
      initialSocket();
    }
  }, [isLoggedIn, isLoggedIn2]);

  useEffect(() => {
    if (socket?.emit) {
      // dispatch(UserChatActions.getSupportChat());
      dispatch(UserChatActions.updateUserChatByOffset());
    }
  }, [socket]);

  useEffect(() => {
    dispatch(AppDataActions.homeScreen());
    dispatch(AppDataActions.isTeacher('student'));
    setTimeout(() => {
      setGetLessonsTeacherLoading(false);
    }, 1000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getStHomeListWatchType();
    }, []),
  );

  //============================METHODS==========================
  const initialSocket = async () => {
    try {
      const token = await asyncStorageHandler.storageHandler(
        STORAGE_CONSTANTS.GET,
      );
      console.log('tokentokentoken', token.token);
      if (token.token) {
        dispatch(SocketActions.initialSocket(token.token));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getStHomeListWatchType = async () => {
    const watchType = await AsyncStorage.getItem('homeListWatchType');
    if (watchType === 'student') {
      setStHomeListWatchType(true);
      setLoading(false);
    } else {
      setStHomeListWatchType(false);
      setLoading(false);
    }
  };

  console.log({typeOfScreen});

  if (loading) {
    return (
      <Container {...{navigation}}>
        <BanerHeader />
        <Loading />
      </Container>
    );
  }

  if (typeOfScreen) {
    return (
      <Container {...{navigation}}>
        <BanerHeader />
        {stHomeListWatchType ? (
          <>
            <FilterRowUser />
            {getLessonsTeacherLoading ? (
              <VerticalGetLessonsTeachersPlaceHolder />
            ) : (
              <VerticalGetLessonsTeachers />
            )}
          </>
        ) : homeLoading ? (
          <PlaceHolderHomeScreen {...{data2}} />
        ) : (
          <HomeListStudents {...{data2}} />
        )}
      </Container>
    );
  }

  return (
    <Container {...{navigation}}>
      <BanerHeader />
      <FilterRowUser />
      {loadingGetLessonsTeacherLoading ? (
        <VerticalGetLessonsTeachersPlaceHolder />
      ) : (
        <VerticalGetLessonsTeachers />
      )}
    </Container>
  );
};

export default HomeScreen;
