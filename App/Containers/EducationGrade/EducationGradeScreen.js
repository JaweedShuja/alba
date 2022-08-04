import Container from 'App/Components/Container';
import EducationGradeList from 'App/Components/Home/EducationGradeList';
import Header from 'App/Components/Share/Header';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from '../../Stores/AppData/Actions';
import EmptyView from 'App/Components/Share/EmptyView';
import Loading from 'App/Components/Share/Loading';

const EducationGradeScreen = ({navigation, route}) => {
  const data = route?.params;
  const dispatch = useDispatch();
  const categoryId = data?.categoryId;
  const grades = data?.grades;
  const categories = useSelector((state) => state.appData.getCategoriesData);
  const categoriesLoading = useSelector(
    (state) => state.appData.getCategoriesLoading,
  );
  console.log({categories}, {grades});
  useEffect(() => {
    let dataGrades = [];
    categories.forEach(function (item, index, array) {
      if (categories[index]?._id === categoryId) {
        dataGrades = categories[index]?.grades;
      }
    });
    dispatch(AppDataActions.educationGradeSuccess(dataGrades));

    // dispatch(AppDataActions.educationGrade({categoryId}));
  }, [categories]);

  console.log({data});
  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={data?.title} />
      {categoriesLoading ? (
        <Loading />
      ) : (
        <>
          {grades?.length === 0 ? (
            <EmptyView />
          ) : (
            <EducationGradeList data2={grades} {...{navigation}} />
          )}
        </>
      )}
    </Container>
  );
};

export default EducationGradeScreen;

//import DummyData from 'App/Values/DummyData';

//const {EDUCATION_GRADE_SCREEN_OBJECTS} = DummyData.Data;
