import React, {useEffect} from 'react';
import AppDataActions from 'App/Stores/AppData/Actions';
import {useDispatch, useSelector} from 'react-redux';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import LessonsList from 'App/Components/Home/LessonsList';
import StudentExamsPlaceHolder from 'App/Components/Share/StudentExamsPlaceHolder';

const TeachersScreen = ({navigation, route}) => {
  const data = route?.params;
  const lessonId = data?.id;

  const dispatch = useDispatch();
  const lessonData = useSelector(
    (state) => state.appData.getTeachersByLessonData,
  );
  const loading = useSelector(
    (state) => state.appData.getTeachersByLessonLoading,
  );
  const title = lessonData?.title;
  useEffect(() => {
    dispatch(AppDataActions.getTeachersByLesson(lessonId));
  }, []);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} {...{title}} />
      {loading ? (
        <StudentExamsPlaceHolder />
      ) : (
        <LessonsList data={lessonData?.teachers} />
      )}
    </Container>
  );
};

export default TeachersScreen;
