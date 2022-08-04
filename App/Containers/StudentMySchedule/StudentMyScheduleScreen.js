import React, {useEffect, useState} from 'react';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import MyScheduleLessons from 'App/Components/Special/MyScheduleLessons';
import MonthlyMySchedule from 'App/Components/Special/MonthlyMySchedule';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from '../../Stores/AppData/Actions';
import Loading from 'App/Components/Share/Loading';
import EmptyView from 'App/Components/Share/EmptyView';
import {string} from 'App/i18n';

const StudentMyScheduleScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const data = route.params;
  const [enable, setEnable] = useState(true);
  const courseTitles = useSelector((state) => state.appData?.userCourseTitles);

  const courseTitlesLoading = useSelector(
    (state) => state.appData?.userCourseTitlesLoading,
  );
  const userSchedules = useSelector((state) => state.appData?.userScheduleData);
  const loadingSchedule = useSelector(
    (state) => state.appData?.userScheduleLoading,
  );

  setTimeout(() => {
    setEnable(false);
  }, 1500);

  useEffect(() => {
    dispatch(AppDataActions.getAllUserCourseTitles());
  }, []);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={data.title} />
      {courseTitlesLoading ? (
        <Loading />
      ) : courseTitles?.courses?.length === 0 ? (
        <EmptyView text={string.YOU_DON_T_HAVE_COURSE_TO_BE_SCHEDULED} />
      ) : (
        <>
          <MyScheduleLessons
            courseTitles={courseTitles?.courses}
            {...{courseTitlesLoading}}
          />
          {enable ? (
            <Loading />
          ) : (
            <MonthlyMySchedule {...{loadingSchedule}} {...{userSchedules}} />
          )}
        </>
      )}
    </Container>
  );
};

export default StudentMyScheduleScreen;

//import DummyData from 'App/Values/DummyData';
//const {STUDENT_MY_SCHEDULE_OBJECTS} = DummyData.Data;
