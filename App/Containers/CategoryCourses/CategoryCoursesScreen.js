import Container from 'App/Components/Container';
import BanerHeader from 'App/Components/Share/BanerHeader';
import FilterRow from 'App/Components/Share/FilterRow';
import HorizontalCategoryCoursesList from 'App/Components/Share/HorizontalCategoryCoursesList';
import {useDummyData} from 'App/Values/DummyData';
import React from 'react';
import {ScrollView} from 'react-native';
import styles from './CategoryCoursesScreenStyle';

const CategoryCoursesScreen = ({navigation}) => {
  const DummyData = useDummyData();
  const {CATEGORY_COURSES_SCREEN_OBJECTS} = DummyData;

  return (
    <Container {...{navigation}}>
      <BanerHeader />
      <ScrollView style={styles.scrollview}>
        <FilterRow />
        <HorizontalCategoryCoursesList data={CATEGORY_COURSES_SCREEN_OBJECTS} />
        <HorizontalCategoryCoursesList data={CATEGORY_COURSES_SCREEN_OBJECTS} />
        <HorizontalCategoryCoursesList data={CATEGORY_COURSES_SCREEN_OBJECTS} />
      </ScrollView>
    </Container>
  );
};

export default CategoryCoursesScreen;
