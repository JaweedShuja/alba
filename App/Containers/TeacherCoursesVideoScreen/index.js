import React from 'react';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import TeacherCoursesVideosList from 'App/Components/Courses/TeacherCoursesVideosList';

const TeacherCoursesVideosScreen = ({navigation, route}) => {
  const data = route?.params;
  const coursesEpisodes = data?.data?.episodes;
  const courseId = data?.data?._id;
  const title = data?.data?.title;

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} {...{title}} />
      <TeacherCoursesVideosList {...{coursesEpisodes}} {...{courseId}} />
    </Container>
  );
};

export default TeacherCoursesVideosScreen;
