import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FilterRowLessons from 'App/Components/Share/FilterRowLessons';
import VerticalGetLessonsTeachers from 'App/Components/Home/VerticalGetLessonsTeachers';
import AppDataActions from 'App/Stores/AppData/Actions';

const StudentGetCourseList = ({navigation}) => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.appData.getCategoriesData);
  const grades = useSelector((state) => state.appData.educationGrade);
  const categoryId = categories?.[0]?._id;

  useEffect(() => {
    dispatch(AppDataActions.getCategories());
    dispatch(AppDataActions.getCategoriesStHome());
    dispatch(AppDataActions.educationGrade({categoryId}));
    dispatch(AppDataActions.setCurrentCategoryId(categoryId));
  }, []);

  useEffect(() => {
    const gradeId = grades?.[0]?._id;
    console.log('grades=>', grades);
    if (gradeId) {
      console.log('gradeId=>', gradeId);
      //dispatch(AppDataActions.getLessonsTeachers(gradeId));
      dispatch(AppDataActions.setCurrentGradeId(gradeId));
    }
  }, [grades]);

  return (
    <>
      <FilterRowLessons gradesData={grades} />
      <VerticalGetLessonsTeachers />
    </>
  );
};

export default StudentGetCourseList;

// import {string} from 'App/i18n';
// import Loading from 'App/Components/Share/Loading';
// import DummyData from 'App/Values/DummyData';
// import styles from './style';

// const {HOME_SCREEN_OBJECT} = DummyData.Data;
// const {CATEGORY_COURSES_SCREEN_OBJECTS} = DummyData.Data;

// const data = useSelector((state) => state.appData.coursesScreenSuccess);
// const loading = useSelector((state) => state.appData.coursesScreenLoading);

// const gradeId = grades[0]?._id;
// const categoryId = categories[0]?._id;
//const categoryTitle = categories[0]?.title;

// useEffect(() => {
//   // dispatch(AppDataActions.setCategoryTitleCourses(categoryTitle));
//   // dispatch(AppDataActions.setGradeTitleCourses(string.ALL_GRADE)); //TODO
//   //dispatch(AppDataActions.coursesScreen({gradeId}));
//   console.log('categoriesLoading=>', categoriesLoading);
//   if (!gradesLoading && !categoriesLoading) {
//     const gradeId = grades?.[0]?._id;
//     const categoryId = categories?.[0]?._id;
//     console.log('gradeId=>', gradeId);
//     dispatch(AppDataActions.educationGrade({categoryId}));
//     dispatch(AppDataActions.getLessonsTeachers(gradeId));
//     dispatch(AppDataActions.setCurrentCategoryId(categoryId));
//     dispatch(AppDataActions.setCurrentGradeId(gradeId));
//   }
// }, [gradesLoading, categoriesLoading]);

// const categoriesLoading = useSelector(
//   (state) => state.appData.getCategoriesLoading,
// );
// const gradesLoading = useSelector(
//   (state) => state.appData.educationGradeLoading,
// );
//const [gradeId, setGradeId] = useState(null);
