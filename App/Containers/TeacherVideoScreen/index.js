import React from 'react';
import {ScrollView} from 'react-native';
import styles from './style';
import PlayVideo from 'App/Components/Courses/PlayVideo';
import Container from 'App/Components/Container';

const TeacherVideoScreen = ({navigation, route}) => {
  const data = route?.params?.data;
  console.log('getTeacherCourseSagaa', {data});

  return (
    <Container {...{navigation}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.content}>
        <PlayVideo available={true} videoDataUrl={data} />
      </ScrollView>
    </Container>
  );
};

export default TeacherVideoScreen;
