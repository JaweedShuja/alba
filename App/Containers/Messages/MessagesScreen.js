import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import Container from 'App/Components/Container';
import MessagesListStudents from 'App/Components/Messages/MessagesListStudents';
import BanerHeader from 'App/Components/Share/BanerHeader';
import {string} from 'App/i18n';
import {useDummyData} from 'App/Values/DummyData';
import styles from './MessagesStyle';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Loading from '../../Components/Share/Loading';
import {navigate} from '../../Services/NavigationService';
import Strings from 'App/Values/Strings';
import {showToast} from '../../utils/showToast';
import AuthActions from 'App/Stores/Authentication/Actions';
import EmptyView from '../../Components/Share/EmptyView';

const {TEACHER_STACK, CREATE_TEACHER_PROFILE} = Strings.Routes;

const MessagesScreen = ({navigation}) => {
  const DummyData = useDummyData();
  const dispatch = useDispatch();
  const {MESSAGES_SCREEN_STUDENTS_OBJECT} = DummyData;

  const userType = useSelector((state) => state.appData.isTeacher);

  const [showPage, setShowPage] = useState(false);
  const situationUser = useSelector(
    (state) => state.auth.situationUser?.status,
  );
  console.log('situationUser', situationUser);
  const loading = useSelector((state) => state.auth.situationUserLoading);

  const email = useSelector((state) => state.auth.email);
  useEffect(() => {
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
  }, [situationUser]);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(AuthActions.getSituationUser());
    }, []),
  );
  return (
    <Container {...{navigation}}>
      <BanerHeader />
      <Text style={styles.text}>{string.MESSAGES}</Text>
      {userType ? (
        loading ? (
          <Loading />
        ) : showPage ? (
          <MessagesListStudents data={MESSAGES_SCREEN_STUDENTS_OBJECT} />
        ) : (
          <EmptyView text={string.PLEASE_WAIT_FOR_CONFIRMATION} />
        )
      ) : (
        <MessagesListStudents data={MESSAGES_SCREEN_STUDENTS_OBJECT} />
      )}
    </Container>
  );
};

export default MessagesScreen;

//import React, {useEffect} from 'react';

// import {useDispatch, useSelector} from 'react-redux';
// import asyncStorageHandler, {
//   STORAGE_CONSTANTS,
// } from 'App/Services/asyncStorageHandler';
// import SocketActions from 'App/Stores/Socket/Actions';
// import UserChatActions from 'App/Stores/UserChats/Actions';

// const dispatch = useDispatch();

//============================STATES===========================
// const socket = useSelector((state) => state?.socket?.socket);
// const isLoggedIn = useSelector(
//   (state) => state.auth.isLoggedInSuccess?.payload?.isLoggedIn,
// );
// const isLoggedIn2 = useSelector(
//   (state) => state.auth.signInSuccessData?.userId,
// );

//============================EFFECTS==========================
//-------------------------------------------------------socket
// useEffect(() => {
//   if (isLoggedIn || isLoggedIn2) {
//     initialSocket();
//   }
// }, [isLoggedIn, isLoggedIn2]);

// useEffect(() => {
//   if (socket?.emit) {
//     // dispatch(UserChatActions.getSupportChat());
//     dispatch(UserChatActions.updateUserChatByOffset());
//   }
// }, [socket]);

//============================METHODS==========================
// const initialSocket = async () => {
//   try {
//     const token = await asyncStorageHandler.storageHandler(
//       STORAGE_CONSTANTS.GET,
//     );
//     if (token.token) {
//       dispatch(SocketActions.initialSocket(token.token));
//     }
//   } catch (error) {
//     console.log('error', error);
//   }
// };
