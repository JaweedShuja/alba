import React, {useEffect} from 'react';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import FilterRowTeacher from 'App/Components/Share/FilterRowTeacher';
import EmptyView from '../../Components/Share/EmptyView';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from '../../Stores/AppData/Actions';
import TeacherDataActions from '../../Stores/TeacherData/Actions';
import VerticalCourses from '../../Components/Home/VerticalCourses';
import {string} from 'App/i18n';
import Loading from 'App/Components/Share/Loading';
import VerticalCoursesPlaceholder from 'App/Components/Share/VerticalCoursesPlaceholder';
import {dWidth} from '../../Theme/Metrics';
const TeacherAddRemoveExamsScreen = ({navigation, route}) => {
  // const data = route.params;
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.appData.getCategoriesData);
  const data = useSelector((state) => state.teacherData.getTeacherScreenData);
  const loading = useSelector(
    (state) => state.teacherData.getTeacherScreenLoading,
  );
  const categoryId = categories[0]?._id;
  console.log({data});
  useEffect(() => {
    dispatch(TeacherDataActions.getTeacherScreen({categoryId}));
    dispatch(AppDataActions.educationGrade({categoryId}));
  }, []);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.ADD_REMOVE_EXAMS} />
      <FilterRowTeacher refresh={false} />
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
            <VerticalCourses {...{data}} {...{loading}} type="exam" />
          )}
        </>
      )}
    </Container>
  );
};

export default TeacherAddRemoveExamsScreen;
