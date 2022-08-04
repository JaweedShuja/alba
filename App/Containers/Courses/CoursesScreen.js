import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Container from 'App/Components/Container';
import BanerHeader from 'App/Components/Share/BanerHeader';
import FilterRowCourses from 'App/Components/Share/FilterRowCourses';
import VerticalCoursesPlaceholder from 'App/Components/Share/VerticalCoursesPlaceholder';
import {string} from 'App/i18n';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import VerticalCourses from '../../Components/Home/VerticalCourses';
import EmptyView from '../../Components/Share/EmptyView';
import AppDataActions from '../../Stores/AppData/Actions';
import AuthActions from 'App/Stores/Authentication/Actions';

const CoursesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const data = useSelector((state) => state.appData.coursesScreenSuccess);
  const loading = useSelector((state) => state.appData.coursesScreenLoading);
  const categories = useSelector((state) => state.appData.getCategoriesData);
  const grades = useSelector((state) => state.appData.educationGrade);

  const categoryId = categories[0]?._id;
  const categoryTitle = categories[0]?.title;

  // useEffect(() => {
  //   const gradeId = grades?.[0]?._id;
  //   console.log('grades=>', grades);
  //   if (gradeId) {
  //     console.log('gradeId=>', gradeId);
  //     //dispatch(AppDataActions.getLessonsTeachers(gradeId));
  //     dispatch(AppDataActions.setCurrentGradeId(gradeId));
  //     dispatch(AppDataActions.coursesScreen({gradeId}));
  //   }
  // }, [grades]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        AppDataActions.coursesScreen({categoryId: 'All', gradeId: 'All'}),
      );
      //dispatch(AppDataActions.getCategories());
      // dispatch(AppDataActions.setCategoryTitleCourses(categoryTitle));
      // dispatch(AppDataActions.setGradeTitleCourses(string.ALL_GRADE));
      //dispatch(AppDataActions.educationGrade({categoryId: 'All'}));
      // dispatch(AppDataActions.setCurrentCategoryId(categoryId));
    }, []),
  );

  return (
    <Container {...{navigation}}>
      <BanerHeader {...{navigation}} />
      {/* <FilterRowCourses gradesData={grades} /> */}
      <FilterRowCourses />
      {loading ? (
        <VerticalCoursesPlaceholder />
      ) : (
        <>
          {data?.length === 0 ? (
            <EmptyView />
          ) : (
            <VerticalCourses type={'course'} {...{data}} {...{loading}} />
          )}
        </>
      )}
    </Container>
  );
};

export default CoursesScreen;
