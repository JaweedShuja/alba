import React, {useEffect} from 'react';
import StudentLessonsNote from 'App/Components/Special/StudentLessonsNote';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from '../../Stores/AppData/Actions';
import {string} from 'App/i18n';
import EmptyView from 'App/Components/Share/EmptyView';
import Loading from 'App/Components/Share/Loading';
import StudentExamsPlaceHolder from 'App/Components/Share/StudentExamsPlaceHolder';

const StudentLessonsNoteScreen = ({navigation, route}) => {
  // const data = route?.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppDataActions.getNoteByUser());
  }, []);
  const data = useSelector((state) => state.appData.getNoteByUserData);
  const loading = useSelector((state) => state.appData.getNoteByUserLoading);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.LESSONS_NOTES} />
      {loading ? (
        <StudentExamsPlaceHolder />
      ) : data?.length === 0 ? (
        <EmptyView text={string.YOUR_TEACHER_DID_NOT_ADD_NOTES} />
      ) : (
        <StudentLessonsNote {...{data}} />
      )}
    </Container>
  );
};

export default StudentLessonsNoteScreen;
