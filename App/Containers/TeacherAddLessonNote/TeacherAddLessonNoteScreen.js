import React, {useEffect} from 'react';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import FilterRowTeacher from 'App/Components/Share/FilterRowTeacher';
import {useDispatch, useSelector} from 'react-redux';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import EmptyView from 'App/Components/Share/EmptyView';
import VerticalCourses from '../../Components/Home/VerticalCourses';
import AppDataActions from '../../Stores/AppData/Actions';
import {string} from 'App/i18n';
import Loading from 'App/Components/Share/Loading';
import VerticalCoursesPlaceholder from 'App/Components/Share/VerticalCoursesPlaceholder';
import {dWidth} from '../../Theme/Metrics';

const TeacherAddLessonNoteScreen = ({navigation, route}) => {
  //const data = route.params;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.appData.getCategoriesData);
  const data = useSelector((state) => state.teacherData.getTeacherScreenData);
  const loading = useSelector(
    (state) => state.teacherData.getTeacherScreenLoading,
  );

  const current = useSelector((state) => state.appData.currentCategoryId);
  const categoryId = current?.categoryId?.categoryId
    ? current?.categoryId?.categoryId
    : categories[0]?._id;
  console.log({current});
  console.log('categories', categories[0]?._id);
  console.log({categoryId});
  useEffect(() => {
    dispatch(TeacherDataActions.getTeacherScreen({categoryId}));
    dispatch(AppDataActions.educationGrade({categoryId}));
  }, []);

  return (
    <Container {...{navigation}}>
      <Header
        {...{navigation}}
        //title={data?.title}
        title={string.ADD_LESSON_NOTE}
      />
      <FilterRowTeacher refresh={false} />
      {loading ? (
        <VerticalCoursesPlaceholder />
      ) : data?.length === 0 ? (
        <EmptyView
          text={
            string.YOU_DONT_HAVE_COURSE_ASSIGNED_FROM_ADMIN_CONTACT_US_FOR_CONFIRM_YOUR_ACCOUNT
          }
          fontSize={dWidth(4)}
        />
      ) : (
        <VerticalCourses type={'note'} {...{data}} />
      )}
    </Container>
  );
};

export default TeacherAddLessonNoteScreen;
