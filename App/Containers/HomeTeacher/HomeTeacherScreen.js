import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Container from 'App/Components/Container';
import BanerHeader from 'App/Components/Share/BanerHeader';
import FilterRowTeacher from 'App/Components/Share/FilterRowTeacher';
import AppDataActions from 'App/Stores/AppData/Actions';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import {useDispatch, useSelector} from 'react-redux';
import VerticalCourses from '../../Components/Home/VerticalCourses';
import EmptyView from '../../Components/Share/EmptyView';
import {useFocusEffect} from '@react-navigation/native';
import VerticalCoursesPlaceholder from 'App/Components/Share/VerticalCoursesPlaceholder';
import {NotificationService} from 'App/Services/NotificationService';
import SocketActions from 'App/Stores/Socket/Actions';
import asyncStorageHandler, {
  STORAGE_CONSTANTS,
} from '../../Services/asyncStorageHandler';
import UserChatActions from '../../Stores/UserChats/Actions';
import {useInitialURL} from 'App/Services/hooks';
import AuthActions from 'App/Stores/Authentication/Actions';
import {showToast} from '../../utils/showToast';
import {string} from 'App/i18n';
import {navigate} from '../../Services/NavigationService';
import Strings from 'App/Values/Strings';
import HomeScreen from '../Home/HomeScreen';
import HomeListStudents from 'App/Components/Home/HomeListStudents';
import Loading from '../../Components/Share/Loading';
import {dWidth} from '../../Theme/Metrics';

const {TEACHER_STACK, CREATE_TEACHER_PROFILE} = Strings.Routes;

const HomeTeacherScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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
  const categories = useSelector((state) => state.appData.getCategoriesData);
  const data = useSelector((state) => state.teacherData.getTeacherScreenData);
  const loading = useSelector(
    (state) => state.teacherData.getTeacherScreenLoading,
  );
  const current = useSelector((state) => state.appData.currentCategoryId);
  const data2 = useSelector((state) => state.appData.homeScreen);

  const situationUser = useSelector(
    (state) => state.auth.situationUser?.status,
  );
  console.log('situationUser', situationUser);
  const loadingSituation = useSelector(
    (state) => state.auth.situationUserLoading,
  );
  console.log({categories});
  console.log('categories', categories[0]?._id);

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

  useFocusEffect(
    React.useCallback(() => {
      const categoryId = categories[0]?._id;
      // if (situationUser == '4')
      dispatch(TeacherDataActions.getTeacherScreen({categoryId}));
    }, []),
  );

  useEffect(() => {
    const categoryId = categories[0]?._id;
    dispatch(AppDataActions.educationGrade({categoryId}));
  }, [isFocused]);

  //============================METHODS==========================

  const initialSocket = async () => {
    try {
      const token = await asyncStorageHandler.storageHandler(
        STORAGE_CONSTANTS.GET,
      );
      if (token.token) {
        dispatch(SocketActions.initialSocket(token.token));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  //================================================SITUATION_USER================================
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    switch (situationUser) {
      case '1':
        setShowPage(true);
        break;
      default:
        setShowPage(false);

        break;
    }
  }, [situationUser]);

  useEffect(() => {
    dispatch(AppDataActions.homeScreen());
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(AuthActions.getSituationUser());
    }, []),
  );
  const email = useSelector((state) => state.auth.email);

  const onPress = () => {
    switch (situationUser) {
      case '4':
        navigate(TEACHER_STACK, {
          screen: CREATE_TEACHER_PROFILE,
          params: {email: email, fromResponse: true},
        });

        break;
      case '5':
        showToast('i', string.PLEASE_WAIT_FOR_CONFIRMATION);
        break;
      case '1':
        setShowPage(true);
        break;
      default:
        break;
    }
  };

  if (!showPage)
    return (
      <Container {...{navigation}}>
        <BanerHeader {...{navigation}} />
        {loadingSituation ? (
          <Loading />
        ) : (
          <HomeListStudents {...{data2, onPress}} />
        )}
      </Container>
    );

  return (
    <Container {...{navigation}}>
      <BanerHeader {...{navigation}} />
      <FilterRowTeacher />

      {loading ? (
        <VerticalCoursesPlaceholder />
      ) : (
        <>
          {data?.length === 0 ? (
            <EmptyView
              text={
                string.YOU_DONT_HAVE_COURSE_ASSIGNED_FROM_ADMIN_CONTACT_US_FOR_CONFIRM_YOUR_ACCOUNT
              }
              fontSize={dWidth(4)}
            />
          ) : (
            <VerticalCourses {...{data}} {...{loading}} />
          )}
        </>
      )}
    </Container>
  );
};

export default HomeTeacherScreen;
