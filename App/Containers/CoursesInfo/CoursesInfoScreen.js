import Container from 'App/Components/Container';
import ActiveCoursesCardList from 'App/Components/Share/ActiveCoursesCardList';
import Header from 'App/Components/Share/Header';
import Loading from 'App/Components/Share/Loading';
import TeacherInfoCard from 'App/Components/Share/TeacherInfoCard';
import {string} from 'App/i18n';
import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from '../../Stores/AppData/Actions';
import styles from './CoursesInfoStyle';
import StudentExamsPlaceHolder from 'App/Components/Share/StudentExamsPlaceHolder';

const CoursesInfoScreen = ({navigation, route}) => {
  const data = route?.params;
  const dispatch = useDispatch();
  const teacherInfoData = useSelector(
    (state) => state.appData.getTeacherInfoSuccess,
  );
  const loading = useSelector((state) => state.appData.getTeacherInfoLoading);
  useEffect(() => {
    dispatch(AppDataActions.getTeacherInfo(data?.teacherId));
  }, []);
  console.log({teacherInfoData});

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.COURSES} />
      {loading ? (
        <StudentExamsPlaceHolder />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <TeacherInfoCard data={teacherInfoData} />
          <ActiveCoursesCardList data={teacherInfoData?.courses} />
        </ScrollView>
      )}
    </Container>
  );
};

export default CoursesInfoScreen;
