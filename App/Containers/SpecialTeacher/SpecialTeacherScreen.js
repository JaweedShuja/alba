import React, {useEffect, useState} from 'react';
import Container from 'App/Components/Container';
import BanerHeader from 'App/Components/Share/BanerHeader';
import {useDummyData} from 'App/Values/DummyData';
import SpecialListStudents from 'App/Components/Special/SpecialListStudents';
import Strings from 'App/Values/Strings';
import {useFocusEffect} from '@react-navigation/native';
import AuthActions from 'App/Stores/Authentication/Actions';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../Components/Share/Loading';
import {navigate} from '../../Services/NavigationService';
import {showToast} from '../../utils/showToast';
import {string} from 'App/i18n';
import EmptyView from '../../Components/Share/EmptyView';

const {TEACHER_STACK, CREATE_TEACHER_PROFILE} = Strings.Routes;

const SpecialTeacherScreen = ({navigation}) => {
  const DummyData = useDummyData();
  const dispatch = useDispatch();
  const [showPage, setShowPage] = useState(false);
  const situationUser = useSelector(
    (state) => state.auth.situationUser?.status,
  );
  console.log('situationUser', situationUser);
  const loading = useSelector((state) => state.auth.situationUserLoading);
  const {SPECIAL_SCREEN_TEACHER_OBJECTS} = DummyData;
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
      {loading ? (
        <Loading />
      ) : showPage ? (
        <SpecialListStudents
          data={SPECIAL_SCREEN_TEACHER_OBJECTS}
          stack={TEACHER_STACK}
        />
      ) : (
        <EmptyView text={string.PLEASE_WAIT_FOR_CONFIRMATION} />
      )}
    </Container>
  );
};

export default SpecialTeacherScreen;

//import DummyData from 'App/Values/DummyData';

//const {SPECIAL_SCREEN_TEACHER_OBJECTS} = DummyData.Data;
