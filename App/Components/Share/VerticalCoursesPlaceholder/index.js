import React from 'react';
import {FlatList} from 'react-native';
import styles from './style';
import Loading from 'App/Components/Share/Loading';
import HorizontalListCoursesPlaceHolder from '../../../Components/Share/HorizontalListCoursesPlaceHolder';

const VerticalCoursesPlaceholder = () => {
  const renderItem = ({item}) => {
    return <HorizontalListCoursesPlaceHolder data={['', '']} />;
  };

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

export default VerticalCoursesPlaceholder;
