import Container from 'App/Components/Container';
import CourseActivation from 'App/Components/Home/CourseActivation';
import Header from 'App/Components/Share/Header';
import {string} from 'App/i18n';
import React from 'react';
import {ScrollView} from 'react-native';
import styles from './CourseActivationStyle';

const CourseActivationScreen = ({navigation, route}) => {
  console.log(route?.params?.param?.courseId);
  const courseId = route?.params?.param?.courseId;
  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.COURSE_ACTIVATION} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={styles.scrollView}>
        <CourseActivation {...{courseId}} />
      </ScrollView>
    </Container>
  );
};

export default CourseActivationScreen;
