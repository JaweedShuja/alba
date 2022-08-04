import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import React, {useState} from 'react';
import CoursesVideoListLock from '../../Components/Courses/CoursesVideoListLock';
import CoursesVideosList from '../../Components/Courses/CoursesVideosList';
import Loading from 'App/Components/Share/Loading';

const CoursesVideosScreen = ({navigation, route}) => {
  const data = route?.params;
  const coursesEpisodes = data?.course?.episodes;
  const isUserBuyCourse = data?.isUserBuyCourse;
  const courseId = data?.course?._id;
  const [loading, setLoading] = useState(true);
  const title = data?.course?.title;
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} {...{title}} />
      {loading ? (
        <Loading />
      ) : !isUserBuyCourse ? (
        <CoursesVideoListLock
          {...{coursesEpisodes}}
          {...{courseId, titleCource: title}}
        />
      ) : (
        <CoursesVideosList
          {...{coursesEpisodes}}
          {...{courseId, titleCource: title}}
        />
      )}
    </Container>
  );
};

export default CoursesVideosScreen;

//import {useSelector} from 'react-redux';
//import DummyData from 'App/Values/DummyData';

//const {COURSES_SCREEN_OBJECTS} = DummyData.Data;

// const loading = useSelector((state) => state.appData.getEpisodeLoading);

// if (loading) return <Loading />;
