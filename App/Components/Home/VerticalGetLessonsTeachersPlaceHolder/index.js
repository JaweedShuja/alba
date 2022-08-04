import HorizontalCategoryCoursesListPlaceHolder from 'App/Components/Home/HorizontalCategoryCoursesListPlaceHolder';
import Strings from 'App/Values/Strings';
import React from 'react';
import {FlatList} from 'react-native';
import styles from './style';

const VerticalGetLessonsTeachersPlaceHolder = () => {
  const Item = ({index, item}) => {
    return <HorizontalCategoryCoursesListPlaceHolder data={['', '', '']} />;
  };

  const renderItem = ({item, index}) => <Item />;

  return (
    <FlatList
      data={['', '', '']}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default VerticalGetLessonsTeachersPlaceHolder;
